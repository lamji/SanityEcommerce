import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';

const fetchProducts = async () => {
  const token = secureLocalStorage.getItem('token');
  const res = await fetch('/api/get-products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

const addProduct = async (newProduct) => {
  const token = secureLocalStorage.getItem('token');
  const res = await fetch('/api/add-product', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(newProduct),
  });
  return res.json();
};

const deleteProduct = async (id) => {
  const token = secureLocalStorage.getItem('token');
  await fetch(`/api/delete-product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  });
  return id;
};

const updateProduct = async ({ id, updatedProduct }) => {
  const token = secureLocalStorage.getItem('token');
  const res = await fetch(`/api/update-product/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(updatedProduct),
  });
  return res.json();
};

export const useProducts = () => {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const mutationAdd = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (id) => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  return { products, isLoading, error, mutationAdd, mutationDelete, mutationUpdate };
};
