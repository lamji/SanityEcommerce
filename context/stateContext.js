import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment"

import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const router = useRouter()
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalQuantities, settotalQuantities] = useState(0);
  const [qty, setqty] = useState(1);
  const [pay, setPay] = useState(false)
  const [shippingFee, setShippingFee] = useState(100)
  const [loading,  setLoading] = React.useState(false)
  const [isLogin,setIsLogin] = React.useState(null)
  const [trigger,setTrigger] = React.useState(false)

  let foundProduct;
  let index;

  const handleLogin = (name, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name,token)
    } 
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push("/admin/login")
  }
  const handleLocalStorage = () => {
    if (typeof window !== 'undefined') {
       const localItems = localStorage.getItem('itemsQty');
       const localCart = JSON.parse(localStorage.getItem("CartItems"))
       const localTotalPrice = JSON.parse(localStorage.getItem("totalPrice"))
      //  const token = localStorage.getItem("token")
      //  token ? setIsLogin(token): setIsLogin(null) 
       localItems ? settotalQuantities(localItems) : settotalQuantities(0)
       localCart ? setCartItems(localCart): setCartItems([])
       localTotalPrice ? settotalPrice(localTotalPrice): settotalPrice(0)
    }
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    settotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    settotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    localStorage.setItem("itemsQty", parseInt(totalQuantities) - parseInt(foundProduct.quantity))
    localStorage.setItem("CartItems", JSON.stringify(newCartItems))
    localStorage.setItem("totalPrice", parseInt(totalPrice) - parseInt(foundProduct.price ) * parseInt(foundProduct.quantity))
    setCartItems(newCartItems);
  }

  const onAdd = (product, quantity) => {
    localStorage.setItem("itemsQty", parseInt(totalQuantities) + parseInt(quantity))
    localStorage.setItem("totalPrice", totalPrice + product.price * quantity)

    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    settotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    settotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      localStorage.setItem("CartItems", JSON.stringify(updatedCartItems))
    } else {
      product.quantity = quantity;
      product.added= moment(Date.now()).format()
      localStorage.setItem("CartItems", JSON.stringify([...cartItems, { ...product }]))
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
        localStorage.setItem("CartItems", JSON.stringify([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]))
        localStorage.setItem("itemsQty",  parseInt(totalQuantities) + 1)
        localStorage.setItem("totalPrice", parseInt(totalPrice) + parseInt(foundProduct.price))
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
        settotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        settotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
      } else if(value === 'desc') {
        if (foundProduct.quantity > 1) {
          localStorage.setItem("CartItems", JSON.stringify([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]))
          localStorage.setItem("itemsQty",  parseInt(totalQuantities) - 1)
          localStorage.setItem("totalPrice", parseInt(totalPrice) - parseInt(foundProduct.price))
          setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
          settotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
          settotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        }
      }
  }

  const incQty = () => {
    setqty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setqty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const Token = () => {
    if (typeof window !== 'undefined') {
      var verify = localStorage.getItem("token")
      return verify
    }
  }

  React.useEffect(() => {
    handleLocalStorage()
    Token()
  }, [totalQuantities,totalPrice,loading,trigger])


  return (
    <Context.Provider
      value={{
        setTrigger,
        Token,
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuanitity,
        setqty,
        onRemove,
        pay, 
        setPay,
        shippingFee,
        setCartItems,
        settotalPrice, 
        loading,  setLoading,
        settotalQuantities,
        isLogin,setIsLogin,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
