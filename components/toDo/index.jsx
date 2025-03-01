import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';

const ProductList = () => {
  const { products, isLoading, error, mutationAdd, mutationDelete } = useProducts();
  const [newProduct, setNewProduct] = useState({
    name: '',
    regularPrice: '',
    interest: '',
    discount: '',
    isDiscounted: false,
    description: '',
    images: [],
    stock: '',
    featuredImageIndex: 0,
    priceWithInterest: '',
  });

  const paylod = {
    name: 'Sample Product test',
    regularPrice: '1000',
    interest: '5',
    discount: '10',
    isDiscounted: true,
    description: 'This is a test product',
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    stock: '50',
    featuredImageIndex: 1,
    priceWithInterest: '1050',
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {Array.isArray(products?.products) &&
          products.products.map((product) => (
            <li key={product.id}>
              {product.name}
              <button onClick={() => mutationDelete.mutate(product.id)}>❌</button>
            </li>
          ))}
      </ul>
      <input
        type="text"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder="Product name"
      />
      <input
        type="text"
        value={newProduct.regularPrice}
        onChange={(e) => setNewProduct({ ...newProduct, regularPrice: e.target.value })}
        placeholder="Regular Price"
      />
      <input
        type="text"
        value={newProduct.interest}
        onChange={(e) => setNewProduct({ ...newProduct, interest: e.target.value })}
        placeholder="Interest"
      />
      <input
        type="text"
        value={newProduct.discount}
        onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
        placeholder="Discount"
      />
      <input
        type="checkbox"
        checked={newProduct.isDiscounted}
        onChange={(e) => setNewProduct({ ...newProduct, isDiscounted: e.target.checked })}
      />
      <label>Is Discounted</label>
      <textarea
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        placeholder="Description"
      />
      <input
        type="text"
        value={newProduct.stock}
        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        placeholder="Stock"
      />
      <input
        type="number"
        value={newProduct.featuredImageIndex}
        onChange={(e) => setNewProduct({ ...newProduct, featuredImageIndex: e.target.value })}
        placeholder="Featured Image Index"
      />
      <input
        type="text"
        value={newProduct.priceWithInterest}
        onChange={(e) => setNewProduct({ ...newProduct, priceWithInterest: e.target.value })}
        placeholder="Price with Interest"
      />
      <button onClick={() => mutationAdd.mutate(paylod)}>Add Product</button>
    </div>
  );
};

export default ProductList;
