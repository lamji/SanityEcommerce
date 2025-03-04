import React from 'react';
import { FooterBanner, HeroBanner, Product } from '../components';

import 'bootstrap/dist/css/bootstrap.min.css';
import dataDummy from '../src/constants/data.json';
import { useBanner } from '../hooks/useBanner';

// import 'react-datepicker/dist/react-datepicker.css';

function Index() {
  const { banner, isLoading, error, mutationAdd, mutationUpdate } = useBanner();

  console.log("come", banner)
  return (
    <div>
      {!isLoading ? <HeroBanner heroBanner={banner?.data && banner?.data} /> : <></>}
     
      <div className="products-heading">
        <h2>Best selling product</h2>
        <p>speaker of many variation</p>
      </div>
      <div className="flex-container products-container">
        {dataDummy.products?.map((product) => (
          <Product key={product?._id} product={product} />
        ))}
      </div>

       {!isLoading ? <FooterBanner footerBanner={banner?.data && banner?.data} /> : <></>}
   
    </div>
  );
}

export default Index;
