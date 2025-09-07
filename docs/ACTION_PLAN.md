# ChatUI Migration to AI SDK Plan

## Migration Strategy

**Primary Approach**: Direct Ollama API integration with custom transport
**Backup Plan**: Server-side API route if direct integration fails

## Migration Phases

### Phase 1: Setup ✅ Pending

**Goal**: Install AI SDK packages

```bash
pnpm add @ai-sdk/react ai
```

### Phase 2: Transport Implementation ✅ Pending

**Goal**: Create transport layer for Ollama API

**Primary Approach - Direct Integration:**

- **CREATE**: `src/services/ollamaTransport.ts`
  - Implement AI SDK `Transport` interface
  - Direct Ollama API communication
  - Handle streaming responses
  - Support image attachments

**Backup Approach - Server Route:**

- **CREATE**: `src/api/chat/route.ts` (if direct fails)
  - AI SDK server-side handler
  - Proxy to Ollama API

### Phase 3: Hook Migration ✅ Pending

**Goal**: Create AI SDK wrapper hook

- **CREATE**: `src/hooks/useAIChat.ts`
  - Wrap AI SDK's `useChat`
  - Configure transport (Ollama or server)
  - Maintain existing API compatibility
  - Handle chat history integration

### Phase 4: Type & Component Updates ✅ Pending

**Goal**: Update for AI SDK message format

- **EDIT**: `src/types/index.ts`

  - Add AI SDK `UIMessage` types
  - Message parts structure (`text`, `file`)

- **EDIT**: `src/components/chat/ChatInput.tsx`

  - Use AI SDK `sendMessage`
  - Handle file attachments in AI SDK format

- **EDIT**: `src/components/chat/ChatMessages.tsx`
  - Render `message.parts` instead of `message.content`
  - Handle different part types

### Phase 5: Integration & Testing ✅ Pending

**Goal**: Replace current hook with feature flag

- **EDIT**: `src/App.tsx`

  - Add feature flag for AI SDK vs current implementation
  - Replace `useChatUI` with `useAIChat`

- **EDIT**: `src/config/app.config.ts` (if exists)
  - Add `useAISDK` feature flag

## Backup Plan

If direct Ollama integration fails:

1. Create `/api/chat` route using AI SDK server utilities
2. Use `DefaultChatTransport` instead of custom transport
3. Proxy requests through server to Ollama API

## Success Criteria

- [ ] All existing functionality preserved
- [ ] No performance regression
- [ ] Fallback to current implementation works
