import React from "react";
import { Button, Form } from "react-bootstrap";
import ModalCustom from "../components/Modal";
import ProductList from "./ProductList";
import ModalEdit from "./ModalEdit";
import data from "../dataProps/data";
import {FaFilter} from "react-icons/fa"

function ProductAdmin() {
  const model = data();
  const [modal, setModal] = React.useState(false);

  return (
    <div>
      <div className="productAdminHeader">
        <Button className="addProduct" onClick={() => setModal(true)}>
          Add Product
        </Button>
        <div className="search">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className="filterButtton">
              <FaFilter />
            </Button>
          </Form>
        </div>
      </div>

      <div className="">
        <div className="border-bottom border-3 my-4 border-100"></div>
        <div className="product-wrapper">
          <ProductList
            dataIn={{ data: model?.data }}
            dataOut={(i) => model?.handleDataOut(i)}
          />
        </div>

        <ModalCustom status={modal} dataOutStatus={(i) => setModal(i)} />
        <ModalEdit
          data={model?.editProduct}
          status={model?.modalEdit}
          dataOutStatus={(i) => model?.setModalEdit(i)}
        />
      </div>
    </div>
  );
}

export default ProductAdmin;
