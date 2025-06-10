import type { Message, ChatHistory } from '../types';
import type { ChatState } from '../hooks/useChatUI';

export interface StoredChat {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  createdAt: Date;
  updatedAt: Date;
  lastModified: Date; // For backward compatibility
  timestamp: Date; // For backward compatibility
  messageCount: number;
  metadata?: {
    totalMessages: number;
    lastActivity: Date;
    averageResponseTime?: number;
    tags?: string[];
    starred?: boolean;
  };
}

export interface StoredChatData {
  [chatId: string]: StoredChat;
}

const STORAGE_KEYS = {
  CHAT_HISTORY: 'chatui-history',
  CURRENT_CHAT: 'chatui-current-chat',
  USER_SETTINGS: 'chatui-user-settings',
} as const;

class ChatStorageService {
  // Generate unique chat ID
  private generateChatId(): string {
    return `chat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  // Get all stored chats
  getChatHistory(): ChatHistory[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      if (!stored) return [];

      const chatData: StoredChatData = JSON.parse(stored);

      return Object.values(chatData)
        .map(chat => ({
          id: chat.id,
          title: chat.title,
          lastMessage: chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1].content.substring(0, 100) + '...'
            : 'No messages',
          timestamp: new Date(chat.timestamp),
          messageCount: chat.messageCount,
        }))
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } catch (error) {
      console.error('Error loading chat history:', error);
      return [];
    }
  }

  // Get specific chat by ID
  getChat(chatId: string): StoredChat | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      if (!stored) return null;

      const chatData: StoredChatData = JSON.parse(stored);
      const chat = chatData[chatId];

      if (chat) {
        // Convert timestamp strings back to Date objects
        return {
          ...chat,
          timestamp: new Date(chat.timestamp),
          lastModified: new Date(chat.lastModified),
          messages: chat.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        };
      }

      return null;
    } catch (error) {
      console.error('Error loading chat:', error);
      return null;
    }
  }

  // Save chat state to storage
  saveChatState(chatState: ChatState): string {
    try {
      const chatId = chatState.id || this.generateChatId();
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      const chatData: StoredChatData = stored ? JSON.parse(stored) : {};

      const storedChat: StoredChat = {
        id: chatId,
        title: chatState.title,
        messages: chatState.messages,
        model: chatState.model,
        createdAt: chatState.createdAt,
        updatedAt: chatState.updatedAt,
        // Backward compatibility
        timestamp: chatState.createdAt,
        lastModified: chatState.updatedAt,
        messageCount: chatState.messages.length,
        metadata: chatState.metadata,
      };

      chatData[chatId] = storedChat;
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(chatData));
      localStorage.setItem(STORAGE_KEYS.CURRENT_CHAT, chatId);

      console.log(`💾 Saved chat: ${chatState.title} (${chatState.messages.length} messages)`);
      return chatId;
    } catch (error) {
      console.error('Error saving chat state:', error);
      throw new Error('Failed to save chat');
    }
  }

  // Get chat as ChatState format
  getChatState(chatId: string): ChatState | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      if (!stored) return null;

      const chatData: StoredChatData = JSON.parse(stored);
      const chat = chatData[chatId];

      if (chat) {
        return {
          id: chat.id,
          title: chat.title,
          messages: chat.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
          model: chat.model,
          createdAt: new Date(chat.createdAt || chat.timestamp),
          updatedAt: new Date(chat.updatedAt || chat.lastModified),
          metadata: chat.metadata,
        };
      }

      return null;
    } catch (error) {
      console.error('Error loading chat state:', error);
      return null;
    }
  }

  // Update existing chat with partial data
  updateChat(chatId: string, updates: Partial<StoredChat>): boolean {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      if (!stored) return false;

      const chatData: StoredChatData = JSON.parse(stored);
      const existingChat = chatData[chatId];

      if (existingChat) {
        chatData[chatId] = {
          ...existingChat,
          ...updates,
          id: chatId, // Ensure ID doesn't change
          lastModified: new Date(),
          updatedAt: new Date(),
        };

        localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(chatData));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error updating chat:', error);
      return false;
    }
  }

  // Search chats by title or content
  searchChats(query: string): ChatHistory[] {
    try {
      const allChats = this.getChatHistory();
      const lowerQuery = query.toLowerCase();

      return allChats.filter(chat =>
        chat.title.toLowerCase().includes(lowerQuery) ||
        chat.lastMessage.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Error searching chats:', error);
      return [];
    }
  }

  // Get recent chats (last N chats)
  getRecentChats(limit: number = 10): ChatHistory[] {
    try {
      const allChats = this.getChatHistory();
      return allChats.slice(0, limit);
    } catch (error) {
      console.error('Error getting recent chats:', error);
      return [];
    }
  }

  // Delete a chat
  deleteChat(chatId: string): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      if (!stored) return;

      const chatData: StoredChatData = JSON.parse(stored);
      delete chatData[chatId];

      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(chatData));

      // Clear current chat if it was deleted
      const currentChat = localStorage.getItem(STORAGE_KEYS.CURRENT_CHAT);
      if (currentChat === chatId) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_CHAT);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      throw new Error('Failed to delete chat');
    }
  }

  // Get current chat ID
  getCurrentChatId(): string | null {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_CHAT);
  }

  // Clear current chat
  clearCurrentChat(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_CHAT);
  }

  // Export all chats
  exportAllChats(): string {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      const chatData: StoredChatData = stored ? JSON.parse(stored) : {};

      return JSON.stringify({
        exportDate: new Date().toISOString(),
        version: '1.0',
        chats: Object.values(chatData),
      }, null, 2);
    } catch (error) {
      console.error('Error exporting chats:', error);
      throw new Error('Failed to export chats');
    }
  }

  // Import chats
  importChats(jsonData: string): number {
    try {
      const importData = JSON.parse(jsonData);
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      const chatData: StoredChatData = stored ? JSON.parse(stored) : {};

      let importedCount = 0;

      if (importData.chats && Array.isArray(importData.chats)) {
        for (const chat of importData.chats) {
          // Generate new ID to avoid conflicts
          const newId = this.generateChatId();
          chatData[newId] = {
            ...chat,
            id: newId,
            timestamp: new Date(chat.timestamp),
            lastModified: new Date(),
          };
          importedCount++;
        }
      }

      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(chatData));
      return importedCount;
    } catch (error) {
      console.error('Error importing chats:', error);
      throw new Error('Failed to import chats');
    }
  }

  // Clean up old chats (keep last 100)
  cleanupOldChats(maxChats: number = 100): number {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      if (!stored) return 0;

      const chatData: StoredChatData = JSON.parse(stored);
      const chats = Object.values(chatData);

      if (chats.length <= maxChats) return 0;

      // Sort by last modified date and keep only the most recent
      chats.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

      const chatsToKeep = chats.slice(0, maxChats);
      const newChatData: StoredChatData = {};

      chatsToKeep.forEach(chat => {
        newChatData[chat.id] = chat;
      });

      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(newChatData));

      return chats.length - maxChats;
    } catch (error) {
      console.error('Error cleaning up chats:', error);
      return 0;
    }
  }

  // Get storage usage info
  getStorageInfo(): { used: number; available: number; chatCount: number } {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      const chatData: StoredChatData = stored ? JSON.parse(stored) : {};

      // Estimate storage usage (rough calculation)
      const used = new Blob([stored || '']).size;
      const available = 5 * 1024 * 1024; // Assume 5MB localStorage limit

      return {
        used,
        available: Math.max(0, available - used),
        chatCount: Object.keys(chatData).length,
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { used: 0, available: 0, chatCount: 0 };
    }
  }
}

// Export singleton instance
export const chatStorage = new ChatStorageService();
export default chatStorage;
