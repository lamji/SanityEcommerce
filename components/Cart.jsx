import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/stateContext';
import { urlFor } from '../lib/client';

const Cart = () => {
  const router = useRouter();
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } =
    useStateContext();

  cartItems.sort(function (a, b) {
    return new Date(a.added).getTime() - new Date(b.added).getTime();
  });

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button type="button" onClick={() => setShowCart(false)} className="btnPay">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => (
              <div className="product" key={item._id}>
                <img src={urlFor(item?.image?.[0])} className="cart-product-image" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item?.name}</h5>
                    <h4>₱{item?.price.toFixed(2)}</h4>
                  </div>
                  <div className=" color-primary container">
                    <Row className="p-0 align-items-center">
                      <Col xs lg="4" className="border-end f12 border-red ">
                        44 Stocks
                      </Col>
                      <Col xs lg={3} className="f12">
                        59 Sold
                      </Col>
                    </Row>
                    <Row className="p-0 align-items-center mt-1">
                      <Col xs lg="4" className="border-end f12">
                        Quantity
                      </Col>
                      <Col lg="2" className="f12 border-end">
                        {item.quantity}x
                      </Col>
                      <Col xs lg={4} className="f12 fw-bold">
                        Total: ₱{(item.quantity * item.price).toFixed(2)}
                      </Col>
                    </Row>
                    <Row className="p-0 align-items-center mt-1">
                      <Col xs lg="4" className="border-end f12">
                        Shipping Fee
                      </Col>
                      <Col md="auto" className="f12">
                        ₱{item?.shippingFee.toFixed(2)}
                      </Col>
                    </Row>
                  </div>

                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => toggleCartItemQuanitity(item._id, 'desc')}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => toggleCartItemQuanitity(item._id, 'inc')}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="btn-container">
              <button
                type="button"
                className="btnPay"
                onClick={() => {
                  setShowCart(false);
                  router.push('/billing');
                }}
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
