import { useMutation } from '@tanstack/react-query';

const useUploadImage = (state) => {
  const url = 'https://api.cloudinary.com/v1_1/dlax3esau/image/upload';
  const uploadImages = async () => {
    const formData = new FormData();

    state.forEach((item) => {
      formData.append('file', item);
      formData.append('upload_preset', 'luis7g15');
    });
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }
      console.log('response:', response);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationFn: uploadImages,
  });
  return mutation;
};

export default useUploadImage;
