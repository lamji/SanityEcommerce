import React from 'react'
import Link from "next/link"

import {urlFor} from "../lib/client"

function Product({product: {image, name, slug, price}}) {
  console.log(image)
  return (
    <div>
      <Link href={`/product/${slug?.current}`}>
        <div className='product-card'>
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
          ₱ {price}.00
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Product