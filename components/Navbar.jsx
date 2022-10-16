import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineMail } from 'react-icons/ai'
import {BsFillTelephoneOutboundFill} from "react-icons/bs"
import { useStateContext } from '../context/stateContext';

import { Cart } from './';

const Navbar = () => {
  const {showCart, setShowCart, totalQuantities, pay} = useStateContext()
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JILAM Headphones</Link>
      </p>
      <div className='flexBs align-items-center'>
        <p className='p-0 mx-3 border-end px-2'><span className='span'><BsFillTelephoneOutboundFill /></span>09206502183</p>
        <p className='p-0 mx-3 border-end px-2'><span className='span mx-1'><AiOutlineMail /></span>lampagojick5@gmail.com</p>
        <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>
     
      { showCart && <Cart />}
    </div>
  )
}

export default Navbar