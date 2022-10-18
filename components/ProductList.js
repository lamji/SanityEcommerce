import React from 'react'
import { Row,Col, Button } from 'react-bootstrap'
import {BiEditAlt} from "react-icons/bi"

function ProductList() {
  return (
    <div className='my-1'>
        <div className='p-2 container'>
            <Row className='border p-2 rounded-3'>
                <Col md={2} className="border-end product-list-flex">
                    <img 
                        src='https://www.pngall.com/wp-content/uploads/10/Beats-Wireless-Headphone-PNG-Image-File.png'
                        className='product-details-image'
                    />
                </Col>
                <Col md={2} className="border-end product-list-flex">
                   <h6 className='color-primary mb-0'>Headphones</h6>
                </Col>
                <Col md={2} className="border-end product-list-flex">
                   <p className='color-primary p-0 mb-0'>20 Stocks</p>
                </Col>
                <Col md={2} className="border-end product-list-flex">
                   <p className='color-primary p-0 mb-0'>Price</p>
                </Col>
                <Col md={2} className="border-end product-list-flex">
                   <p className='color-primary p-0 mb-0'>Description</p>
                </Col>
                <Col md={2} className=" product-list-flex">
                   <Button>
                        <BiEditAlt />
                   </Button>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default ProductList