import React from 'react'
import Link from "next/link"

import {urlFor} from "../lib/client"
import {useStateContext} from "../context/stateContext"

function Product({product: {image, name, slug, price}}) {
  const { setqty} = useStateContext();
  return (
    <div>
      <Link href={`/product/${slug?.current}`} >
        <div className='product-card' onClick={() => setqty(1)}>
          <img 
            src={urlFor(image && image[0])} 
            alt={slug?.current} 
            width = {250}
            height = {250}
            className = "product-image"  
          />
          <p className='product-name'>
            {name}
          </p>
          <p className='product-price'>
            ₱ {price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Product