import { useState, useEffect, useCallback } from 'react';
import { ollamaApi, type OllamaModel } from '../services/ollamaApi';

export const useOllamaModels = () => {
  const [models, setModels] = useState<OllamaModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModels = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedModels = await ollamaApi.getModels();
      setModels(fetchedModels);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch models';
      setError(errorMessage);
      console.error('Failed to fetch models:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const getModelDisplayName = useCallback((modelName: string) => {
    // Clean up model names for display
    return modelName.split(':')[0].replace(/-/g, ' ').toUpperCase();
  }, []);

  const getModelSize = useCallback((model: OllamaModel) => {
    // Convert bytes to human readable format
    const bytes = model.size;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }, []);

  return {
    models,
    isLoading,
    error,
    fetchModels,
    getModelDisplayName,
    getModelSize,
  };
};
