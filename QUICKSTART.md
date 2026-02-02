# ⚡ AutoShip Quick Start Guide

Get AutoShip running in 5 minutes!

## 📋 What You Need

1. **Node.js** installed (version 16 or higher)
   - Check: `node --version`
   - Download: https://nodejs.org/

2. **Anthropic API Key** (for AI analysis)
   - Sign up: https://console.anthropic.com/
   - Create an API key
   - Free tier available!

## 🎯 Step-by-Step Setup

### Step 1: Extract the Files
Unzip the AutoShip folder to your desired location.

### Step 2: Open Terminal/Command Prompt
Navigate to the AutoShip folder:
```bash
cd path/to/autoship
```

### Step 3: Install Dependencies
```bash
npm install
```
This will download all required packages (~5-10 seconds).

### Step 4: Configure API Key
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` in any text editor and add your API key:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
PORT=3000
```

### Step 5: Start AutoShip!
```bash
npm start
```

You should see:
```
🚀 AutoShip server running on http://localhost:3000
📦 Ready to analyze and deploy code!
```

### Step 6: Open in Browser
Go to: **http://localhost:3000**

## 🎉 You're Ready!

Now you can:
1. Drag and drop a ZIP file of your code
2. Or click to browse and select files
3. Watch as AI analyzes your code
4. Get instant feedback and deployment recommendations!

## 🧪 Test It Out

Don't have a project ready? Create a simple test file:

**test.js**
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);
```

Upload this file and watch AutoShip analyze it!

## 🐛 Troubleshooting

**"npm: command not found"**
- Install Node.js from https://nodejs.org/

**"ANTHROPIC_API_KEY is required"**
- Make sure you created the `.env` file
- Check that your API key is correct

**"Port 3000 is already in use"**
- Change the PORT in `.env` to another number (e.g., 3001)

**"Cannot find module"**
- Run `npm install` again

## 💡 Tips

- **Max file size**: 50MB
- **Supported formats**: .zip files or individual code files
- **Best results**: Upload complete projects with package.json or requirements.txt
- **Privacy**: All files are deleted after analysis - nothing is stored!

## 📚 Next Steps

- Check out the full README.md for more details
- Explore the roadmap for upcoming features
- Contribute ideas or code!

---

Need help? The AI is here to analyze code, not debug the app itself - but check the console for error messages!

**Happy shipping! 🚀**
