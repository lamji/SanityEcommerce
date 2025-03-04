/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

const HeroBanner = ({ heroBanner }) => {

  return (
    <div className="hero-banner-container">
      <h5 className="beats-solo">{heroBanner?.product}</h5>
      <h3 className="banner-midText">{heroBanner?.discount} {heroBanner?.isDiscount ?'Discount' : ''} </h3>
      {heroBanner?.isDiscount ? <h5>Before <del className='mx-2'>{`₱${heroBanner.before.toFixed(2)}`}</del><span className='px-2'>Now {`₱${heroBanner.now.toFixed(2)}`}</span></h5> : <h5></h5>}
      <h1 className="banner-largeText">{heroBanner?.largeText1}</h1>
      {heroBanner?.image && (
        <img src={typeof heroBanner?.image === 'string' ? heroBanner?.image :  URL.createObjectURL(heroBanner?.image)} alt="headphones" className="hero-banner-image" />
      )}
      <div className="shop-now-button-top">
        <Link href={`/product/${heroBanner?.product}`}>
          <button type="button">{heroBanner?.buttonText}</button>
        </Link>
        <div className="desc">
          <h5>Description</h5>
          <p>{heroBanner?.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
