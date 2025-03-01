/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';
import { useStateContext } from '../context/stateContext';

function Product({ product: { image, name, slug, price } }) {
  const { setqty } = useStateContext();
  const [imageSize, setImageSize] = useState({ width: 250, height: 250 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setImageSize({ width: '100%', height: '100%' });
      } else {
        setImageSize({ width: 250, height: 250 });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex-items">
      <Link href={`/product/${slug?.current}`}>
        <div className="product-card" onClick={() => setqty(1)}>
          <img
            src={urlFor(image && image[0])}
            alt={slug?.current}
            width={imageSize.width}
            height={imageSize.height}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">₱ {price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;
