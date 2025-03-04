/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

const HeroBanner = ({ heroBanner }) => {

  console.log("bannerData2", heroBanner)

  return (
    <div className="hero-banner-container">
      <p className="beats-solo">{heroBanner?.product}</p>
      <h3 className="banner-midText">{heroBanner?.discount} Discount</h3>
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
