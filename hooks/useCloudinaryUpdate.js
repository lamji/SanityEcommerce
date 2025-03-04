import { useMutation } from '@tanstack/react-query';

const useCloudinaryUpdate = (imageFile, existingUrl) => {
  const cloudName = 'dlax3esau';
  const uploadPreset = 'luis7g15';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  // Extract public_id from existing Cloudinary URL
  const getPublicIdFromUrl = (url) => {
    try {
      const urlParts = url.split('/');
      const versionIndex = urlParts.findIndex(part => part.startsWith('v'));
      if (versionIndex !== -1 && urlParts.length > versionIndex + 1) {
        return urlParts[versionIndex + 1].split('.')[0];
      }
      return null;
    } catch (error) {
      console.error('Error extracting public_id:', error);
      return null;
    }
  };

  const updateImage = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', uploadPreset);

    // If we have an existing image, use its public_id
    if (existingUrl) {
      const publicId = getPublicIdFromUrl(existingUrl);
      if (publicId) {
        formData.append('public_id', publicId);
      }
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update image');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating image:', error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: updateImage,
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });

  return mutation;
};

export default useCloudinaryUpdate; 