import { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';

export default function useViewModel() {
  const { products, isLoading, error, mutationAdd, mutationDelete, mutationUpdate } = useProducts();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    regularPrice: '',
    interest: '',
    discount: '',
    isDiscounted: false,
    description: '',
    images: [],
    stock: '',
    featuredImageIndex: null,
    priceWithInterest: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [validation, setValidation] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const handleShowModal = (index = null, data = {}) => {
    console.log('index', index, data);
    setEditIndex(index);
    if (index !== null) {
      setCurrentProduct(data);
    } else {
      setCurrentProduct({
        name: '',
        regularPrice: '',
        interest: '',
        discount: '',
        isDiscounted: false,
        description: '',
        images: [],
        stock: '',
        featuredImageIndex: null,
        priceWithInterest: '',
      });
    }
    setValidation({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      const fileArray = Array.from(files).slice(0, 4);
      setCurrentProduct((prevState) => ({
        ...prevState,
        [name]: fileArray,
      }));

      const previews = [];
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          previews.push(result);
          if (previews.length === fileArray.length) {
            setImagePreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    } else if (type === 'checkbox' && name === 'featuredImageIndex') {
      setCurrentProduct((prevState) => ({
        ...prevState,
        [name]: checked ? parseInt(value) : null,
      }));
    } else {
      setCurrentProduct((prevState) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    currentProduct.priceWithInterest = calculatePriceWithInterest(
      currentProduct.regularPrice,
      currentProduct.interest
    );
    currentProduct.discountedPrice = calculateDiscountedPrice(
      currentProduct.priceWithInterest,
      currentProduct.discount
    );
    const { name, regularPrice, interest, discount, images, stock } = currentProduct;
    const newValidation = {
      name: !name,
      regularPrice: !regularPrice,
      interest: !interest,
      discount: !discount,
      images: images.length === 0,
      stock: !stock,
    };
    setValidation(newValidation);

    if (Object.values(newValidation).some((isInvalid) => isInvalid)) {
      setLoading(false);
      return;
    }

    const url = 'https://api.cloudinary.com/v1_1/dlax3esau/image/upload';
    const uploadPromises = imagePreviews.map((item, index) => {
      const formData = new FormData();
      formData.append('file', item);
      formData.append('upload_preset', 'luis7g15');

      return fetch(url, {
        method: 'POST',
        body: formData,
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload images');
        }
        return response.json();
      });
    });

    try {
      const uploadResults = await Promise.all(uploadPromises);
      const images = uploadResults.map((data) => data.url);

      if (images.length >= 0) {
        const payload = {
          name: currentProduct.name,
          regularPrice: currentProduct.regularPrice,
          interest: currentProduct.interest,
          discount: currentProduct.discount,
          isDiscounted: currentProduct.isDiscounted,
          description: currentProduct.description,
          images: images,
          stock: currentProduct.stock,
          featuredImageIndex: currentProduct.featuredImageIndex,
          priceWithInterest: currentProduct.priceWithInterest,
        };

        if (editIndex === null) {
          /**
           * New product
           */
          mutationAdd.mutate(payload);
        } else {
          /**
           * update product
           */
          console.log('index2', payload);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    handleCloseModal();
  };

  const handleDelete = (index) => {
    mutationDelete.mutate(index);
  };

  const handleRemoveImage = (index) => {
    setCurrentProduct((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
      featuredImageIndex:
        prevState.featuredImageIndex === index ? null : prevState.featuredImageIndex,
    }));
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const calculatePriceWithInterest = (price, interest) => {
    const interestDecimal = interest / 100; // Convert percentage to decimal
    return Number(price) + Number(price) * interestDecimal;
  };

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return `₱${
      !isNaN(numericPrice) ? numericPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0.00'
    }`;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products?.products?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products?.products?.length / itemsPerPage);

  const handleShowDeleteModal = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(deleteProductId);
  };

  useEffect(() => {
    if (mutationDelete.isSuccess) {
      setShowDeleteModal(false);
    }
  }, [mutationDelete.isSuccess]);

  return {
    handleShowModal,
    showModal,
    products,
    isLoading,
    error,
    mutationAdd,
    mutationDelete,
    currentItems,
    currentPage,
    totalPages,
    showModal,
    currentProduct,
    validation,
    loading,
    handleDelete,
    handleShowModal,
    formatPrice,
    handlePageChange,
    calculatePriceWithInterest,
    handleCloseModal,
    handleSave,
    editIndex,
    handleChange,
    handleConfirmDelete,
    handleShowDeleteModal,
    setShowDeleteModal,
    handleRemoveImage,
    showDeleteModal,
  };
}
