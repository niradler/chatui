# Enhanced Ollama Chat UI - Installation & Setup

## 🚀 Quick Start

### 1. Install Dependencies

Run this command to install all the new required packages:

```bash
npm install
# or if you're using pnpm
pnpm install
# or if you're using yarn
yarn install
```

### 2. Start the Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

### 3. Make Sure Ollama is Running

Ensure your Ollama server is running on `http://localhost:11434`:

```bash
# Start Ollama server
ollama serve

# In another terminal, pull some models
ollama pull llama2
ollama pull llava  # For vision capabilities
```

## ✨ New Features Added

### 🎨 Enhanced UI/UX

- **Rich Markdown Rendering**: Full support for GitHub-flavored markdown
- **Syntax Highlighting**: Beautiful code blocks with copy functionality
- **Mermaid Diagrams**: Render flowcharts, diagrams, and more
- **Dark/Light Mode**: Seamless theme switching
- **Responsive Design**: Works perfectly on all devices

### 📸 Vision Model Support

- **Image Upload**: Drag & drop or click to upload images
- **Multi-Image Support**: Upload up to 5 images per message
- **Vision Model Detection**: Automatic detection of vision-capable models
- **Image Preview**: Click to preview images in full size

### 🔧 Technical Improvements

- **Direct Ollama Integration**: No third-party dependencies like CopilotKit
- **Streaming Responses**: Real-time message generation
- **Error Handling**: Comprehensive error management
- **Performance Metrics**: Shows processing time and model info
- **Type Safety**: Full TypeScript support

## 🎯 How to Use

### Text Chat

1. Select a model from the dropdown
2. Type your message in the input area
3. Press Enter or click the send button
4. Enjoy rich markdown responses with syntax highlighting!

### Image Analysis (Vision Models)

1. Make sure you have a vision model installed (e.g., `ollama pull llava`)
2. Select the vision model from the dropdown
3. Click the photo icon in the input area
4. Upload your images (drag & drop or click to browse)
5. Type your question about the images
6. Send and get detailed analysis!

### Code Examples

Try asking for:

- \"Write a Python function to sort a list\"
- \"Explain React hooks with examples\"
- \"Create a mermaid diagram for a user authentication flow\"

### Diagram Examples

Ask for mermaid diagrams like:

- \"Create a flowchart for user registration\"
- \"Show me a database schema diagram\"
- \"Generate a system architecture diagram\"

## 🛠️ Supported Models

### Text Models

- `llama2`, `mistral`, `codellama`, `deepseek-coder`, etc.

### Vision Models

- `llava` - General vision understanding
- `bakllava` - Improved vision model
- `moondream` - Lightweight vision model
- `llava-llama3` - Latest LLaVA version

## 🎨 Customization

The UI is built with Tailwind CSS and supports:

- Custom themes
- Configurable model settings
- Adjustable UI preferences
- Export/import chat history

## 🐛 Troubleshooting

### Common Issues

1. **Server Offline**: Make sure Ollama is running with `ollama serve`
2. **No Models**: Install models with `ollama pull model-name`
3. **Images Not Working**: Ensure you're using a vision-capable model
4. **Markdown Not Rendering**: Check browser console for any errors

### Performance Tips

- Use smaller models for faster responses
- Reduce image sizes for quicker processing
- Enable/disable streaming based on preference

## 📦 Dependencies Added

- `react-markdown` - Markdown rendering
- `remark-gfm` - GitHub flavored markdown
- `react-syntax-highlighter` - Code syntax highlighting
- `mermaid` - Diagram rendering
- `react-dropzone` - File upload functionality

Enjoy your enhanced Ollama Chat experience! 🎉
