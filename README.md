# 🚀 AutoShip

**AI-powered automatic code analysis and deployment platform**

AutoShip analyzes your codebase using AI, detects issues, and recommends the best deployment strategy - all automatically!

## ✨ Features

- 📦 **Upload Anything**: ZIP files, RAR, or individual code files
- 🤖 **AI Analysis**: Powered by Claude AI for intelligent code understanding
- 🔍 **Issue Detection**: Finds security vulnerabilities, syntax errors, missing configs
- 🎯 **Smart Deployment**: Recommends the best hosting platform for your project
- 🛠️ **Auto-fix Suggestions**: Get actionable fixes for detected issues

## 🏗️ Tech Stack

- **Backend**: Node.js + Express
- **AI**: Anthropic Claude API
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **File Processing**: ADM-ZIP for archive handling

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

1. **Clone or download this project**

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Anthropic API key
nano .env
```

Add your API key:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
PORT=3000
```

4. **Start the server**
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 📖 How to Use

1. **Upload Your Code**
   - Drag and drop a ZIP file
   - Or click to browse and select files
   - Supports: `.zip`, `.rar`, or individual code files

2. **Wait for Analysis**
   - AI reads all your files
   - Detects framework and language
   - Identifies issues and vulnerabilities

3. **Review Results**
   - See project type and dependencies
   - Review issues found with suggested fixes
   - Get deployment recommendations

4. **Deploy** (Coming Soon!)
   - One-click deployment to recommended platform

## 🎯 Roadmap

### Phase 1: MVP (Current)
- [x] File upload (ZIP, individual files)
- [x] AI-powered code analysis
- [x] Issue detection
- [x] Deployment recommendations

### Phase 2: Enhanced Analysis
- [ ] RAR file support
- [ ] More detailed security scanning
- [ ] Dependency vulnerability checking
- [ ] Auto-fix implementation

### Phase 3: Deployment
- [ ] Integration with Vercel API
- [ ] Integration with Railway API
- [ ] Docker container generation
- [ ] One-click deployment

### Phase 4: Mobile
- [ ] Convert web apps to APK
- [ ] Capacitor/Cordova integration
- [ ] React Native conversion

## 🔧 Project Structure

```
autoship/
├── server.js           # Backend API server
├── package.json        # Dependencies
├── .env.example        # Environment variables template
├── public/             # Frontend files
│   ├── index.html      # Main UI
│   ├── styles.css      # Styling
│   └── app.js          # Frontend logic
└── uploads/            # Temporary file storage (auto-created)
```

## 🤝 Contributing

This is a prototype! Ideas and contributions welcome:

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 Notes

- Maximum file size: 50MB
- Analysis uses Claude Sonnet 4 for best results
- All uploaded files are deleted after analysis
- No data is stored permanently (privacy-first)

## 🐛 Known Issues

- RAR extraction not yet implemented
- Large codebases (1000+ files) may take longer
- Some binary files can't be analyzed

## 📄 License

MIT License - feel free to use and modify!

## 💡 Future Ideas

- GitHub repo direct integration
- Real-time collaboration
- Project templates
- CI/CD pipeline generation
- Multi-language support
- Mobile app version

---

**Built with ❤️ using Claude AI**

Need help? Found a bug? Open an issue!
