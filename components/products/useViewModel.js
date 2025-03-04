import { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import productsJson from '../../src/constants/products.json';
import {  useDispatch } from 'react-redux';
import { showSpinner, hideSpinner } from '../../store/features/spinnerSlice';

export default function useViewModel() {
  const { products, isLoading, error, mutationAdd, mutationDelete, mutationUpdate } = useProducts();
  const [imagePreviews, setImagePreviews] = useState([]);
  const[hasFeaturedImage, setHasFeaturedImage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sorting, setSorting] = useState({ field: 'name', direction: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');
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
  const dispatch = useDispatch();
  const itemsPerPage = 10;

  const handleShowModal = (index = null, data = {}) => {
    setDeleteProductId(data._id);
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

  function calculateFinalPrice(basePrice, increaseRate, discountRate, isDiscounted) {
   
    // Convert percentage values from whole numbers (e.g., 1 -> 1%) 
    let increaseAmount = Number(basePrice) * (Number(increaseRate) / 100);
    let increasedPrice = Number(basePrice) + increaseAmount;
    // Convert discount rate and apply
    let discountAmount = Number(increasedPrice) * (Number(discountRate) / 100);
    let finalPrice = Number(increasedPrice) - discountAmount;
  
    return isDiscounted ? finalPrice.toFixed(2) : Number(increasedPrice).toFixed(2); // Return price rounded to 2 decimal places
}

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setHasFeaturedImage(true)
      const fileArray = Array.from(files).slice(0, 4);
      if(editIndex !== null) {
        const newImages = [...currentProduct.images, ...fileArray];
        setCurrentProduct((prevState) => ({
          ...prevState,
          [name]: newImages,
        }));
  
      }else {
        setCurrentProduct((prevState) => ({
          ...prevState,
          [name]: fileArray,
        }));
      }
      

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
          featuredImageIndex: currentProduct.featuredImageIndex || 0,
          priceWithInterest: currentProduct.priceWithInterest,
          discountedPrice:calculateFinalPrice(currentProduct.regularPrice,currentProduct.interest, currentProduct.discount, currentProduct.isDiscounted)
        };

        if (editIndex === null) {
          mutationAdd.mutate(payload);
        } else {
          const prevImages = currentProduct.images.filter(item => typeof item === "string")
          const newPayload = {
            ...payload,
            images: hasFeaturedImage? [...payload.images, ...prevImages] : prevImages ,
          }
          console.log("test", { id: deleteProductId, updatedProduct: newPayload } )
          mutationUpdate.mutate({ id: deleteProductId, updatedProduct: newPayload });
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    handleCloseModal();
    setHasFeaturedImage(false)
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

  const handleSort = (field) => {
    setSorting(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortedItems = (items) => {
    if (!items) return [];
    
    // Filter items based on product name search
    const filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return filteredItems.sort((a, b) => {
      let aValue = a[sorting.field];
      let bValue = b[sorting.field];

      // Handle numeric fields
      if (['regularPrice', 'interest', 'priceWithInterest', 'discount', 'discountedPrice', 'stock'].includes(sorting.field)) {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else if (sorting.field === 'name') {
        // Case-insensitive string comparison for name
        aValue = aValue?.toLowerCase() || '';
        bValue = bValue?.toLowerCase() || '';
      }

      if (sorting.direction === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedItems = getSortedItems(products?.products);
  const currentItems = sortedItems?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems?.length / itemsPerPage);

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

  useEffect(() => {
    if (isLoading || mutationAdd.isPending || mutationDelete.isPending || mutationUpdate.isPending) {
      dispatch(showSpinner("Loading..."))
    }else {
      dispatch(hideSpinner())
    }
  },[isLoading, mutationAdd.isPending, mutationDelete.isPending, mutationUpdate.isPending])

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
    mutationUpdate,
    handleSort,
    sorting,
    searchQuery,
    setSearchQuery
  };
}
