import React, { useState } from "react";
import {
  PaperAirplaneIcon,
  MicrophoneIcon,
  PaperClipIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ImageUpload from "./ImageUpload";
import type { MessageImage } from "../../types";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent, images?: MessageImage[]) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onFileUpload?: () => void;
  onVoiceInput?: () => void;
  maxLength?: number;
  currentModel?: string;
  showCharacterCount?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  isLoading,
  textareaRef,
  onFileUpload,
  onVoiceInput,
  maxLength = 4000,
  currentModel = "",
  showCharacterCount = false,
  placeholder = "Ask me anything... (Shift+Enter for new line)",
}) => {
  const [images, setImages] = useState<MessageImage[]>([]);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const isVisionModel = React.useMemo(() => {
    const visionModels = [
      "llava",
      "bakllava",
      "moondream",
      "llava-llama3",
      "llava-phi3",
      "minicpm-v",
      "cogvlm",
      "yi-vl",
      "qwen-vl",
      "internvl",
      "vila",
      "ferret",
      "lynx",
      "vision",
      "multimodal",
      "mm",
    ];
    const modelLower = currentModel.toLowerCase();
    return (
      visionModels.some((vm) => modelLower.includes(vm)) ||
      modelLower.includes("vision") ||
      modelLower.includes("visual") ||
      modelLower.includes("image")
    );
  }, [currentModel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() && images.length === 0) return;

    onSubmit(e, images.length > 0 ? images : undefined);
    setImages([]);
    setShowImageUpload(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    } else {
      onKeyDown(e);
    }
  };

  const toggleImageUpload = () => {
    setShowImageUpload(!showImageUpload);
  };

  const clearImages = () => {
    images.forEach((img) => URL.revokeObjectURL(img.url));
    setImages([]);
    setShowImageUpload(false);
  };

  return (
    <div className="border-t border-gray-200 dark:border-neutral-700 p-4 bg-white dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto">
        {/* Image Upload Section */}
        {showImageUpload && (
          <div className="mb-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <PhotoIcon className="w-5 h-5" />
                Image Upload
              </h3>
              <button
                onClick={() => setShowImageUpload(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                title="Close image upload"
              >
                <XMarkIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {!isVisionModel && (
              <div className="mb-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  ⚠️ Current model "{currentModel}" may not support image
                  analysis. Consider switching to a vision model like LLaVA for
                  better results.
                </p>
              </div>
            )}

            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={5}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative">
          <div className="relative bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 focus-within:border-blue-500 dark:focus-within:border-blue-400 shadow-sm">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full p-4 bg-transparent resize-none border-0 focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 leading-relaxed"
              rows={1}
              style={{
                minHeight: "24px",
                maxHeight: "200px",
              }}
              disabled={isLoading}
              maxLength={maxLength}
            />

            {/* Image Preview in Input */}
            {images.length > 0 && (
              <div className="px-4 pb-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <PhotoIcon className="w-4 h-4" />
                  <span>
                    {images.length} image{images.length > 1 ? "s" : ""} attached
                  </span>
                  <button
                    type="button"
                    onClick={clearImages}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    title="Remove all images"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Toolbar */}
            <div className="flex items-center justify-between p-3 border-t border-gray-200 dark:border-neutral-700">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={toggleImageUpload}
                  className={`p-2 rounded-lg transition-colors ${
                    showImageUpload || images.length > 0
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-gray-500 hover:bg-white dark:text-neutral-400 dark:hover:bg-neutral-700"
                  }`}
                  title="Upload images"
                  disabled={isLoading}
                >
                  <PhotoIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onFileUpload}
                  className="p-2 rounded-lg text-gray-500 hover:bg-white dark:text-neutral-400 dark:hover:bg-neutral-700 transition-colors"
                  title="Attach file"
                  disabled={isLoading}
                >
                  <PaperClipIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onVoiceInput}
                  className="p-2 rounded-lg text-gray-500 hover:bg-white dark:text-neutral-400 dark:hover:bg-neutral-700 transition-colors"
                  title="Voice input"
                  disabled={isLoading}
                >
                  <MicrophoneIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {showCharacterCount && (
                  <span className="text-xs text-gray-400 dark:text-neutral-500">
                    {value.length}/{maxLength}
                  </span>
                )}
                <button
                  type="submit"
                  disabled={(!value.trim() && images.length === 0) || isLoading}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-neutral-600 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                  title="Send message"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </form>

        <p className="text-xs text-gray-500 dark:text-neutral-400 text-center mt-3">
          AI responses may contain errors. Please verify important information.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
