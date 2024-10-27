import { useState, useCallback } from 'react';

interface UseImageUploadOptions {
  maxSize?: number; // in bytes
  maxFiles?: number;
  acceptedTypes?: string[];
}

interface ImageUploadResult {
  url: string;
  file: File;
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const validateFile = useCallback((file: File) => {
    if (options.maxSize && file.size > options.maxSize) {
      throw new Error(`File size exceeds ${options.maxSize / 1024 / 1024}MB limit`);
    }

    if (
      options.acceptedTypes &&
      !options.acceptedTypes.includes(file.type)
    ) {
      throw new Error('File type not supported');
    }
  }, [options.maxSize, options.acceptedTypes]);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    // TODO: Implement actual image upload to backend/CDN
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleImageUpload = useCallback(async (
    files: FileList | File[]
  ): Promise<ImageUploadResult[]> => {
    try {
      setUploading(true);
      setError(null);

      const fileArray = Array.from(files);
      
      if (options.maxFiles && fileArray.length > options.maxFiles) {
        throw new Error(`Maximum ${options.maxFiles} files allowed`);
      }

      // Validate all files first
      fileArray.forEach(validateFile);

      // Upload all files
      const uploads = await Promise.all(
        fileArray.map(async (file) => ({
          url: await uploadImage(file),
          file,
        }))
      );

      return uploads;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Upload failed');
      setError(error);
      throw error;
    } finally {
      setUploading(false);
    }
  }, [options.maxFiles, validateFile, uploadImage]);

  return {
    handleImageUpload,
    uploading,
    error,
  };
}