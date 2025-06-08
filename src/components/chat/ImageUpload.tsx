import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PhotoIcon, XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import type { MessageImage } from "../../types";

interface ImageUploadProps {
  images: MessageImage[];
  onImagesChange: (images: MessageImage[]) => void;
  maxImages?: number;
  acceptedTypes?: string[];
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  className = "",
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages: MessageImage[] = acceptedFiles
        .filter((file) => acceptedTypes.includes(file.type))
        .slice(0, maxImages - images.length)
        .map((file) => ({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          url: URL.createObjectURL(file),
          type: file.type,
        }));

      onImagesChange([...images, ...newImages]);
    },
    [images, onImagesChange, maxImages, acceptedTypes]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: maxImages - images.length,
    disabled: images.length >= maxImages,
  });

  const removeImage = useCallback(
    (imageId: string) => {
      const imageToRemove = images.find((img) => img.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      onImagesChange(images.filter((img) => img.id !== imageId));
    },
    [images, onImagesChange]
  );

  const previewImage = useCallback((image: MessageImage) => {
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head>
            <title>Image Preview - ${image.file.name}</title>
            <style>
              body { margin: 0; padding: 20px; background: #000; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
              img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px; }
              .info { position: fixed; top: 20px; left: 20px; color: white; background: rgba(0,0,0,0.7); padding: 10px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="info">
              <div>Name: ${image.file.name}</div>
              <div>Size: ${(image.file.size / 1024 / 1024).toFixed(2)} MB</div>
              <div>Type: ${image.file.type}</div>
            </div>
            <img src="${image.url}" alt="${image.file.name}" />
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  }, []);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }
            ${images.length >= maxImages ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <input {...getInputProps()} />
          <PhotoIcon className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isDragActive ? (
              "Drop images here..."
            ) : (
              <>
                Drop images here or{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  click to browse
                </span>
                <br />
                <span className="text-xs">
                  Supports JPEG, PNG, GIF, WebP ({maxImages - images.length}{" "}
                  remaining)
                </span>
              </>
            )}
          </p>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Uploaded Images ({images.length}/{maxImages})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              >
                <img
                  src={image.url}
                  alt={image.file.name}
                  className="w-full h-24 object-cover"
                />

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button
                    onClick={() => previewImage(image)}
                    className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                    title="Preview image"
                  >
                    <EyeIcon className="h-4 w-4 text-white" />
                  </button>
                  <button
                    onClick={() => removeImage(image.id)}
                    className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                    title="Remove image"
                  >
                    <XMarkIcon className="h-4 w-4 text-white" />
                  </button>
                </div>

                {/* File info */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
                  <p className="text-xs truncate" title={image.file.name}>
                    {image.file.name}
                  </p>
                  <p className="text-xs text-gray-300">
                    {(image.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vision Model Notice */}
      {images.length > 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          <p className="font-medium text-amber-700 dark:text-amber-300 mb-1">
            📸 Vision Model Required
          </p>
          <p>
            Images will only be processed if you're using a vision-capable model
            (e.g., LLaVA, BakLLaVA, Moondream). Make sure to select an
            appropriate model from the model selector.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
