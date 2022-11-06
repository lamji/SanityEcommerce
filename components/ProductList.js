import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BiEditAlt } from "react-icons/bi";
import data from "../dataProps/data";

function ProductList(props) {
  const model = data();
  const { dataOut, dataIn } = props;
  return (
    <div className="my-1">
      {dataIn?.data.map((product) => {
        return (
          <div className="p-2 container" key={product?.id}>
            <Row className="border p-2 rounded-3">
              <Col md={2} className="border-end product-list-flex">
                <img src={product?.image} className="product-details-image" />
              </Col>
              <Col md={2} className="border-end product-list-flex">
                <h6 className="color-primary mb-0">{product?.product || ""}</h6>
              </Col>
              <Col md={2} className="border-end product-list-flex">
                {product?.stocks < 5 ? (
                  <p className="color-red p-0 mb-0">{product?.stocks} Stocks</p>
                ) : (
                  <p className="color-primary p-0 mb-0">
                    {product?.stocks} Stocks
                  </p>
                )}
              </Col>
              <Col md={2} className="border-end product-list-flex">
                <p className="color-primary p-0 mb-0">₱{model?.numberWithCommas(product?.price.toFixed(2))}</p>
              </Col>
              <Col md={3} className="border-end product-list-flex">
                <p className="color-primary text-left p-0 mb-0">{model?.truncateString(product?.description,30)}</p>
              </Col>
              <Col md={1} className=" product-list-flex">
                <Button
                  className="editButton"
                  onClick={() =>
                    dataOut({
                      status: true,
                      product_id: product?.id,
                    })
                  }
                >
                  <BiEditAlt />
                </Button>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
