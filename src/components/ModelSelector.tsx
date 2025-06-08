import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useOllamaModels } from "../hooks/useOllamaModels";

interface ModelSelectorProps {
  currentModel: string;
  onModelChange: (model: string) => void;
  serverStatus: "checking" | "online" | "offline";
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  currentModel,
  onModelChange,
  serverStatus,
}) => {
  const {
    models,
    isLoading,
    error,
    fetchModels,
    getModelDisplayName,
    getModelSize,
  } = useOllamaModels();

  const getStatusColor = () => {
    switch (serverStatus) {
      case "online":
        return "text-green-500";
      case "offline":
        return "text-red-500";
      case "checking":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case "online":
        return "Online";
      case "offline":
        return "Offline";
      case "checking":
        return "Checking...";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
      {/* Server Status */}
      <div className="flex items-center space-x-1 text-xs">
        <div
          className={`w-2 h-2 rounded-full ${
            serverStatus === "online"
              ? "bg-green-500"
              : serverStatus === "offline"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        />
        <span className={`${getStatusColor()} font-medium`}>
          {getStatusText()}
        </span>
      </div>

      {/* Model Selector */}
      <div className="flex-1">
        {error ? (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-red-500">Failed to load models</span>
            <button
              onClick={fetchModels}
              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              title="Retry loading models"
            >
              <ArrowPathIcon className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <select
            value={currentModel}
            onChange={(e) => onModelChange(e.target.value)}
            disabled={isLoading || serverStatus !== "online"}
            className="w-full text-xs bg-transparent dark:bg-neutral-800 border-0 focus:ring-0 focus:outline-none text-gray-700 dark:text-gray-300 disabled:opacity-50"
          >
            {isLoading ? (
              <option>Loading models...</option>
            ) : models.length === 0 ? (
              <option>No models available</option>
            ) : (
              models.map((model) => (
                <option key={model.name} value={model.name}>
                  {getModelDisplayName(model.name)} ({getModelSize(model)})
                </option>
              ))
            )}
          </select>
        )}
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchModels}
        disabled={isLoading}
        className="p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded transition-colors disabled:opacity-50"
        title="Refresh models"
      >
        <ArrowPathIcon
          className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`}
        />
      </button>
    </div>
  );
};

export default ModelSelector;
