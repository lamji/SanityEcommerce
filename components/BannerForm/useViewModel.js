import { useState, useEffect } from 'react';
import useStyles from './useStyles';
import { useNotification } from '../../hooks/useNotification';
import { useBanner } from '../../hooks/useBanner';
import { useProducts } from '../../hooks/useProducts';

export const useViewModel = () => {
  const { showError } = useNotification();
  const { banner, isLoading, error, mutationAdd, mutationUpdate } = useBanner();
  const { products, isLoading:prductLoading } = useProducts();
  const [isChecked, setIsChecked] = useState(false);
  const [validation, setValidation] = useState({});
  const [validationNavbar, setValidationNavbar] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [bannerData, setBannerData] = useState(banner?.data);
  const [navData, setNavData] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(banner?.data?.index);
  const styles = useStyles();

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const buttonLableDropDown = selectedProduct?.name || bannerData?.product

console.log("index", banner?.data?.index)
  /**
   * Use in drop down to select product in banner
   * @param {*} eventKey
   */
  const handleSelect = (eventKey) => {
    const activeProduct = products?.products[eventKey]
    const newBannerData = {
      ...bannerData,
      discount: activeProduct?.discount + "%",
      images: activeProduct.images,
      product:activeProduct?.name,
      image: activeProduct?.images[activeIndex],
      isDiscount: isChecked,
      before: activeProduct?.priceWithInterest,
      now:activeProduct?.discountedPrice,
      index: activeIndex,
      _id: activeProduct?._id
     }
    setSelectedProduct(activeProduct);
    setBannerData(newBannerData)
  };

  /**
   * use in select image row
   * Select the active image to be featured
   */
  const handleImageClick = (index) => {
    setActiveIndex(index); // Set active index
    console.log(`Image ${index + 1} clicked`);
  };

  /**
   * Handle change for all inputs
   */
  const handleChangeInput = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerData((prev) => ({
            ...prev,
            image: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setBannerData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleChangeInputHeader = (e) => {
    const { name, value } = e.target;

    setNavData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /**
   * Navbar validation
   */
  const validateFormNav = () => {
    const newValidation = {
      header: !navData?.header,
      number: !navData?.number,
      email: !navData?.email,
    };

    setValidation(newValidation);
    return !Object.values(newValidation).some((isInvalid) => isInvalid);
  };

  /**
   * Submit form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bannerData?._id) {
        await mutationUpdate.mutateAsync({
          id: '67d3b1942dd90cd2324f21a8',
          updatedBanner: bannerData,
        });
      } else {
        // await mutationAdd.mutateAsync(bannerData);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  /**
   * Handle submit navbar
   */
  const handleSubmitNav = async (e) => {
    e.preventDefault();

    if (!validateFormNav()) {
      showError('Please fill in all required fields');
      return;
    }

    // try {
    //   if (banner?._id) {
    //     await mutationUpdate.mutateAsync({
    //       id: banner._id,
    //       updatedBanner: bannerData,
    //     });
    //   } else {
    //     await mutationAdd.mutateAsync(bannerData);
    //   }
    // } catch (error) {
    //   console.error('Error in form submission:', error);
    // }
  };

  useEffect(() => {
    if (banner) {
      setBannerData(banner?.data);
      setActiveIndex(banner?.data?.index)
      setIsEditing(true);
    }
  }, [banner]);

  useEffect(() => {
    console.log("selectedProduct", selectedProduct)
      const newBannerData = {
      ...bannerData,
      image: bannerData?.images?.[activeIndex],
      isDiscount: isChecked,
      discount: isChecked ? selectedProduct?.discount + "%": bannerData?.discount,
      index:activeIndex
     }

     setBannerData(newBannerData)
  },[isChecked, activeIndex, selectedProduct])

  return {
    styles,
    isChecked,
    isLoading,
    mutationAdd,
    mutationUpdate,
    validation,
    isEditing,
    bannerData,
    selectedProduct,
    navData,
    activeIndex,
    validationNavbar,
    productsList:products?.products,
    buttonLableDropDown,
    actions: {
      handleChange,
      handleSelect,
      handleImageClick,
      handleChangeInput,
      handleSubmit,
      handleChangeInputHeader,
      handleSubmitNav,
    },
  };
};
