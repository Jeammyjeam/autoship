const express = require('express');
const multer = require('multer');
const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs').promises;
const Anthropic = require('@anthropic-ai/sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 50000000, // 50MB default
  },
});

// Helper function to read file contents
async function readFileContent(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    return `[Binary file or read error: ${error.message}]`;
  }
}

// Helper function to analyze code with Claude
async function analyzeCodeWithAI(files) {
  const fileContents = files.map(f => 
    `File: ${f.name}\n\`\`\`${f.extension}\n${f.content.substring(0, 5000)}\n\`\`\``
  ).join('\n\n');

  const prompt = `You are an expert code analyzer for AutoShip, a deployment platform. Analyze this codebase and provide:

1. **Project Type**: Identify the framework/language (React, Vue, Node.js, Python Flask, etc.)
2. **Dependencies**: List main dependencies and if any are missing
3. **Issues Found**: Security vulnerabilities, syntax errors, missing configs
4. **Entry Point**: Main file to run (index.html, main.py, app.js, etc.)
5. **Deployment Recommendation**: Best platform (Vercel, Railway, Docker, etc.)
6. **Auto-fix Suggestions**: What can be automatically fixed

Here are the project files:

${fileContents}

Provide analysis in JSON format:
{
  "projectType": "",
  "framework": "",
  "language": "",
  "entryPoint": "",
  "dependencies": [],
  "issues": [{"severity": "", "file": "", "description": "", "fix": ""}],
  "deploymentPlatform": "",
  "recommendations": []
}`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  const responseText = message.content[0].text;
  
  // Extract JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  return {
    projectType: "Unknown",
    framework: "Could not detect",
    analysis: responseText
  };
}

// Extract and analyze uploaded file
async function processUpload(filePath, originalName) {
  const files = [];
  
  try {
    // Check if it's a ZIP/RAR file
    if (originalName.endsWith('.zip')) {
      const zip = new AdmZip(filePath);
      const zipEntries = zip.getEntries();
      
      for (const entry of zipEntries) {
        if (!entry.isDirectory && entry.entryName.split('/').pop()[0] !== '.') {
          const content = entry.getData().toString('utf8');
          const extension = path.extname(entry.name).substring(1);
          
          files.push({
            name: entry.entryName,
            extension: extension,
            size: entry.header.size,
            content: content.length > 10000 ? content.substring(0, 10000) + '\n... [truncated]' : content
          });
        }
      }
    } else {
      // Single file upload
      const content = await readFileContent(filePath);
      const extension = path.extname(originalName).substring(1);
      
      files.push({
        name: originalName,
        extension: extension,
        size: (await fs.stat(filePath)).size,
        content: content
      });
    }
    
    // Analyze with AI
    const analysis = await analyzeCodeWithAI(files);
    
    return {
      success: true,
      filesFound: files.length,
      files: files.map(f => ({ name: f.name, size: f.size, extension: f.extension })),
      analysis: analysis
    };
    
  } catch (error) {
    console.error('Processing error:', error);
    throw error;
  } finally {
    // Cleanup uploaded file
    await fs.unlink(filePath).catch(() => {});
  }
}

// Routes
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    console.log(`Processing: ${req.file.originalname}`);
    
    const result = await processUpload(req.file.path, req.file.originalname);
    
    res.json(result);
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Processing failed', 
      message: error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AutoShip API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AutoShip server running on http://localhost:${PORT}`);
  console.log(`📦 Ready to analyze and deploy code!`);
});
