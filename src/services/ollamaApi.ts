import { OLLAMA_CONFIG } from '../config';

export interface OllamaMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  images?: string[]; // Base64 encoded images for vision models
}

export interface OllamaResponse {
  model: string;
  message: OllamaMessage;
  done: boolean;
  response?: string;
}

export interface OllamaModel {
  name: string;
  size: number;
  digest: string;
  modified_at: string;
}

export class OllamaApiService {
  private baseUrl: string;

  constructor(baseUrl: string = OLLAMA_CONFIG.baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getModels(): Promise<OllamaModel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }
      const data = await response.json();
      return data.models || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }

  async chat(
    model: string,
    messages: OllamaMessage[],
    onStreamResponse?: (token: string) => void,
    onComplete?: () => void,
    abortSignal?: AbortSignal
  ): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          stream: !!onStreamResponse,
        }),
        signal: abortSignal,
      });

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.statusText}`);
      }

      if (onStreamResponse && response.body) {
        return this.handleStreamResponse(response.body, onStreamResponse, onComplete);
      } else {
        const data = await response.json();
        return data.message?.content || '';
      }
    } catch (error) {
      console.error('Error in chat request:', error);
      throw error;
    }
  }

  private async handleStreamResponse(
    body: ReadableStream<Uint8Array>,
    onStreamResponse: (token: string) => void,
    onComplete?: () => void
  ): Promise<string> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    let buffer = '';
    let isCompleted = false;

    const callCompletionOnce = () => {
      if (!isCompleted) {
        isCompleted = true;
        console.log('🔚 Stream completion called');
        onComplete?.();
      }
    };

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          // Process any remaining buffer content
          if (buffer.trim()) {
            const lines = buffer.split('\n').filter(line => line.trim());
            for (const line of lines) {
              try {
                const data: OllamaResponse = JSON.parse(line);
                if (data.message?.content) {
                  fullResponse += data.message.content;
                  onStreamResponse(data.message.content);
                }
                if (data.done) {
                  callCompletionOnce();
                  return fullResponse;
                }
              } catch (e) {
                // Skip invalid JSON lines
                continue;
              }
            }
          }
          // If we reach here without finding done:true, call completion anyway
          callCompletionOnce();
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        
        // Process complete lines from buffer
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer
        
        for (const line of lines) {
          if (!line.trim()) continue;
          
          try {
            const data: OllamaResponse = JSON.parse(line);
            
            if (data.message?.content) {
              fullResponse += data.message.content;
              // Stream each token immediately for smooth experience
              onStreamResponse(data.message.content);
            }

            if (data.done) {
              callCompletionOnce();
              return fullResponse;
            }
          } catch (e) {
            // Skip invalid JSON lines - they might be incomplete
            continue;
          }
        }
      }
    } catch (error) {
      console.error('Stream processing error:', error);
      callCompletionOnce();
      throw error;
    } finally {
      reader.releaseLock();
    }

    return fullResponse;
  }

  async isServerRunning(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/version`, {
        method: 'GET',
        signal: AbortSignal.timeout(OLLAMA_CONFIG.serverCheckTimeout),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Convert file to base64 for vision models
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        // Remove data URL prefix to get pure base64
        const base64Data = base64.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Check if model supports vision
  isVisionModel(modelName: string): boolean {
    const visionModels = [
      'llava', 'bakllava', 'moondream', 'llava-llama3', 'llava-phi3',
      'minicpm-v', 'cogvlm', 'yi-vl', 'qwen-vl', 'internvl',
      'vila', 'ferret', 'lynx', 'vision', 'multimodal', 'mm'
    ];
    const modelLower = modelName.toLowerCase();
    return visionModels.some(vm => modelLower.includes(vm)) || 
           modelLower.includes('vision') || 
           modelLower.includes('visual') ||
           modelLower.includes('image');
  }

  // Enhanced chat method with image support
  async chatWithImages(
    model: string,
    messages: OllamaMessage[],
    images: File[] = [],
    onStreamResponse?: (token: string) => void,
    onComplete?: () => void,
    abortSignal?: AbortSignal
  ): Promise<string> {
    try {
      // Convert images to base64 if provided
      let imageData: string[] = [];
      if (images.length > 0 && this.isVisionModel(model)) {
        imageData = await Promise.all(images.map(img => this.fileToBase64(img)));
      }

      // Add images to the last user message if it's a vision model
      const enhancedMessages = [...messages];
      if (imageData.length > 0 && enhancedMessages.length > 0) {
        const lastMessage = enhancedMessages[enhancedMessages.length - 1];
        if (lastMessage.role === 'user') {
          lastMessage.images = imageData;
        }
      }

      return this.chat(model, enhancedMessages, onStreamResponse, onComplete, abortSignal);
    } catch (error) {
      console.error('Error in chat with images:', error);
      throw error;
    }
  }
}

export const ollamaApi = new OllamaApiService();
