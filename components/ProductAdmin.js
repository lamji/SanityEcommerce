import React from 'react'
import { Button } from 'react-bootstrap'
import ModalCustom from "../components/Modal"
import ProductList from './ProductList'

function ProductAdmin() {
    const [modal, setModal]= React.useState(false)
  return (
    <div>
        <Button className='addProduct' onClick={() => setModal(true)}>Add Product</Button>

        <div>
            <div className='border-bottom border-3 my-4 border-100'></div>
            <ProductList />
            <ModalCustom status={modal} dataOutStatus={(i) => setModal(i)}/>
        </div>
     
    </div>
  )
}

export default ProductAdmin