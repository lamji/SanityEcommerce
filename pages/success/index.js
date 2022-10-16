import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../../context/stateContext';
import { runFireworks } from '../../lib/utils';

const Success = () => {
  const { setCartItems, settotalPrice, settotalQuantities } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    settotalPrice(0);
    settotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p>Our Agent will call to the number you provided for order status</p>
    
        <p className="description">
          If you have any questions, please email
          <span className='email span'>lampagojick5@gmail.com</span>
          <a className="email" href="mailto:order@example.com">
           
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success