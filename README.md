# ChatUI

A beautiful, modern chat interface for interacting with your local Ollama server. This is a clean alternative to ChatGPT that runs entirely on your local machine.

![demo](docs/demo.gif)

## Features

- 🎨 **Beautiful UI** - Dark/light mode with smooth animations
- 🔄 **Real-time Streaming** - See responses as they're generated
- 🤖 **Model Selection** - Switch between different Ollama models
- 📱 **Responsive Design** - Works on desktop and mobile
- 💾 **Export Chats** - Save your conversations as JSON
- 🚀 **Fast & Local** - No external dependencies, runs on your machine

## Prerequisites

1. **Install Ollama**: Download and install from [ollama.ai](https://ollama.ai)
2. **Download a Model**: Run `ollama pull llama2` (or any model you prefer)
3. **Start Ollama Server**: The server should auto-start, or run `ollama serve`

## Quick Start (GitHub Pages)

You can use the hosted version directly without installation:

**🌐 [Use ChatUI on GitHub Pages](https://niradler.github.io/chatui/)**

Just make sure your Ollama API has CORS configured (see [CORS Configuration](#cors-configuration) below).

## Local Installation

1. Clone this repository:

```bash
git clone <your-repo-url>
cd chatui
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Configuration

### Ollama Server URL

By default, the app connects to `http://localhost:11434`. If your Ollama server runs on a different port or host, you can modify the `baseUrl` in `src/services/ollamaApi.ts`:

```typescript
const ollamaApi = new OllamaApiService("http://your-ollama-host:port");
```

### Default Model

You can set a default model in `src/hooks/useChatUI.ts`:

```typescript
export const useChatUI = (defaultModel: string = 'your-preferred-model') => {
```

## CORS Configuration

To use the GitHub Pages version or any browser-based tool with Ollama, you need to enable CORS on your Ollama server.

### Check if CORS is enabled

```bash
curl -X OPTIONS http://localhost:11434 -H "Origin: http://example.com" -H "Access-Control-Request-Method: GET" -I
```

If you get `HTTP/1.1 403 Forbidden`, CORS is not enabled.

### Enable CORS

**On Windows:**

1. Go to System Properties → Environment Variables
2. Add `OLLAMA_ORIGINS` with value `*` (or specific domains)
3. Restart Ollama

**On macOS:**

```bash
launchctl setenv OLLAMA_ORIGINS "*"
```

**On Linux:**

```bash
sudo systemctl edit ollama.service
```

Add:

```ini
[Service]
Environment="OLLAMA_ORIGINS=*"
```

Then restart:

```bash
sudo service ollama restart
```

### Verify CORS is working

After configuration, you should see:

```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
```
