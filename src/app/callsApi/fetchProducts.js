import secureLocalStorage from 'react-secure-storage';

export const fetchProducts = async () => {
  const token = secureLocalStorage.getItem('token'); // Retrieve the token from localStorage
  const res = await fetch('/api/get-products', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch products');
  }

  return res.json();
};
