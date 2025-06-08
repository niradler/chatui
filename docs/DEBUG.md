## 🐛 **DEBUGGING GUIDE**

### Test Message Flow

1. **Open Browser Console** (F12 → Console tab)

2. **Add temporary debug logs** to trace message flow:

In `useOllamaChat.ts`, add these console logs temporarily:

```typescript
// In addMessage function:
console.log('🔵 Adding message:', { type: newMessage.type, id: newMessage.id, content: newMessage.content.substring(0, 30) + '...' });

// In updateMessage function:  
console.log('🟡 Updating message:', { messageId, content: updates.content?.substring(0, 30) + '...' });
```

3. **Test Steps:**
   - Type a message: "Hello, how are you?"
   - Press Enter
   - Watch console for message flow

4. **Expected Console Output:**
```
🔵 Adding message: { type: 'user', id: '1703123456789-1', content: 'Hello, how are you?...' }
🔵 Adding message: { type: 'assistant', id: '1703123456790-2', content: '...' }
🟡 Updating message: { messageId: '1703123456790-2', content: 'Hello! I'm doing well...' }
```

5. **Check UI:**
   - User message should show: "Hello, how are you?"  
   - Assistant message should show the AI response
   - User message should have green "U" avatar on the right
   - Assistant message should have blue AI avatar on the left

If user message shows AI content, the IDs are colliding!

### Stream Buffer Test

Watch for smooth, readable streaming:
- Text should appear in small chunks (every ~50ms)
- Should be readable while typing
- Should have blinking cursor during streaming
- Stop button should appear and work during streaming

### Fixes Applied

✅ **Unique Message IDs** - Added counter to prevent collisions
✅ **Buffered Streaming** - 50ms delay for readable chunks  
✅ **Better UX** - Stop button, cursor indicator, smooth updates
✅ **Debug Logging** - Trace message creation and updates

Remove console.log lines after testing!
