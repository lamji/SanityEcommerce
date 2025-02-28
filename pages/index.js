import React from 'react';
import { FooterBanner, HeroBanner, Product } from '../components';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateContext } from '../context/stateContext';
import dataDummy from '../src/constants/data.json';
// import 'react-datepicker/dist/react-datepicker.css';

function index({ products, bannerData }) {
  const { qty, setqty } = useStateContext();

  React.useEffect(() => {
    setqty(1);
  });

  return (
    <div>
      <HeroBanner heroBanner={dataDummy.bannerData.length && dataDummy.bannerData[0]} />
      <div className="products-heading">
        <h2>Best selling product</h2>
        <p>speaker of many variation</p>
      </div>
      <div className="products-container">
        {dataDummy.products?.map((product) => (
          <Product key={product?._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={dataDummy.bannerData && dataDummy.bannerData?.[0]} />
    </div>
  );
}

export default index;
