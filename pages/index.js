import React from 'react'
import {product, FooterBanner, HeroBanner, Product} from "../components"
import {client} from "../lib/client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateContext } from '../context/stateContext';

function index({products, bannerData}) {
  const {qty,setqty} = useStateContext()
  React.useEffect(() => {
    setqty(1)
  })
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      <div className='products-heading'>
        <h2 >Best selling product</h2>
        <p>speaker of many variation</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => <Product key={product?._id} product={product}/>)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData?.[0]}/>
    </div>
  )
}
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData= await client.fetch(bannerQuery)

  return {
    props: {
      products,
      bannerData
    }
  }
}


export default index