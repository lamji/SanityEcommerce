import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import { useSpinner } from './useSpinner';
import { useNotification } from './useNotification';

const fetchBanner = async () => {
  const token = secureLocalStorage.getItem('token');
  const res = await fetch('/api/banner', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

 
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch banner');
  }

  return res.json();
};

const addBanner = async (newBanner) => {
  const token = secureLocalStorage.getItem('token');
  const res = await fetch('/api/banner', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(newBanner),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to add banner');
  }
  return res.json();
};

const updateBanner = async ({ id, updatedBanner }) => {
  const token = secureLocalStorage.getItem('token');
  const res = await fetch(`/api/banner/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(updatedBanner),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update banner');
  }
  return res.json();
};

export const useBanner = () => {
  const queryClient = useQueryClient();
  const { withSpinner } = useSpinner();
  const { showError, showSuccess } = useNotification();

  const {
    data: banner,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['banner'],
    queryFn: () => withSpinner(fetchBanner, 'Loading banner...'),
    onError: (error) => {
      showError(
        error.message || 'Failed to fetch banner',
        'Banner Error',
        { duration: 6000, autoHide: true }
      );
    },
  });

  const mutationAdd = useMutation({
    mutationFn: (newBanner) => 
      withSpinner(() => addBanner(newBanner), 'Adding banner...'),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['banner']);
      showSuccess(
        'Banner added successfully',
        'Banner Added',
        { duration: 4000, autoHide: true }
      );
    },
    onError: (error) => {
      showError(
        error.message || 'Failed to add banner. Please try again.',
        'Add Banner Error',
        { duration: 6000, autoHide: true }
      );
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, updatedBanner }) => 
      withSpinner(() => updateBanner({ id, updatedBanner }), 'Updating banner...'),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['banner']);
      showSuccess(
        'Banner updated successfully',
        'Banner Updated',
        { duration: 4000, autoHide: true }
      );
    },
    onError: (error) => {
      showError(
        error.message || 'Failed to update banner. Please try again.',
        'Update Error',
        { duration: 6000, autoHide: true }
      );
    },
  });

  return { 
    banner: banner, 
    isLoading, 
    error, 
    mutationAdd, 
    mutationUpdate 
  };
};

// Example usage in component:
/*
const BannerForm = () => {
  const { banner, isLoading, error, mutationAdd, mutationUpdate } = useBanner();

  useEffect(() => {
    if (banner) {
      // Pre-fill form with existing banner data
      setBannerData(banner);
    }
  }, [banner]);

  const handleSubmit = async (bannerData) => {
    if (banner?._id) {
      await mutationUpdate.mutateAsync({
        id: banner._id,
        updatedBanner: bannerData
      });
    } else {
      await mutationAdd.mutateAsync(bannerData);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    // ... form JSX
  );
};
*/ 