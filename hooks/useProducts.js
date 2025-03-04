import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import { useSpinner } from './useSpinner';
import { useNotification } from './useNotification';

const calculatePrices = (product) => {
  const priceWithInterest = product.regularPrice * (1 + product.interest / 100);
  const discountedPrice = product.isDiscounted 
    ? priceWithInterest * (1 - product.discount / 100)
    : priceWithInterest;

  return {
    ...product,
    priceWithInterest,
    discountedPrice
  };
};

const fetchProducts = async () => {
  const token = secureLocalStorage.getItem('token');
  const res = await fetch('/api/get-products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch products');
  }
  return res.json();
};

const addProduct = async (newProduct) => {
  const token = secureLocalStorage.getItem('token');
  const res = await fetch('/api/add-product', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(newProduct),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to add product');
  }
  return res.json();
};

const deleteProduct = async (id) => {
  const token = secureLocalStorage.getItem('token');
  const res = await fetch(`/api/delete-product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete product');
  }
  return id;
};

const updateProduct = async ({ id, updatedProduct }) => {
  const token = secureLocalStorage.getItem('token');
  const res = await fetch(`/api/update-product/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(updatedProduct),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update product');
  }
  return res.json();
};

export const useProducts = () => {
  const queryClient = useQueryClient();
  const { withSpinner } = useSpinner();
  const { showError, showSuccess } = useNotification();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => withSpinner(fetchProducts, 'Loading products...'),
    onError: (error) => {
      showError(
        error.message || 'Failed to fetch products',
        'Products Error',
        { duration: 6000, autoHide: true }
      );
    },
  });

  const mutationAdd = useMutation({
    mutationFn: (newProduct) => withSpinner(() => addProduct(newProduct), 'Adding product...'),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products']);
      showSuccess(
        `Product "${data.name}" added successfully`,
        'Product Added',
        { duration: 4000, autoHide: true }
      );
    },
    onError: (error) => {
      showError(
        error.message || 'Failed to add product. Please try again.',
        'Add Product Error',
        { duration: 6000, autoHide: true }
      );
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id) => withSpinner(() => deleteProduct(id), 'Deleting product...'),
    onSuccess: (id) => {
      queryClient.invalidateQueries(['products']);
      showSuccess(
        'Product deleted successfully',
        'Product Deleted',
        { duration: 4000, autoHide: true }
      );
    },
    onError: (error) => {
      showError(
        error.message || 'Failed to delete product. Please try again.',
        'Delete Error',
        { duration: 6000, autoHide: true }
      );
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, updatedProduct }) => 
      withSpinner(() => updateProduct({ id, updatedProduct }), 'Updating product...'),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products']);
      showSuccess(
        `Product "${data.name}" updated successfully`,
        'Product Updated',
        { duration: 4000, autoHide: true }
      );
    },
    onError: (error) => {
      showError(
        error.message || 'Failed to update product. Please try again.',
        'Update Error',
        { duration: 6000, autoHide: true }
      );
    },
  });

  return { products, isLoading, error, mutationAdd, mutationDelete, mutationUpdate };
};
