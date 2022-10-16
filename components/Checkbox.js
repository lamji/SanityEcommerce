import React from "react";
import Form from "react-bootstrap/Form";
import {BsCashCoin} from "react-icons/bs"

function CheckInlineExample(props) {
    const {dataOut} = props
    const [checkBoxCod, setCheckBoxCod] = React.useState(true)
    const [checkBoxGcash, setCheckBoxGcash] = React.useState(false)
    const [method, setMethod] = React.useState("cod")

    const CashOnDelivery = () => {
        setCheckBoxGcash(false)
        setCheckBoxCod(true)
        dataOut("cod")
    }

    const gcash = () => {
        setCheckBoxGcash(true)
        setCheckBoxCod(false)
        dataOut("gcash")
    }

  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          checked = {checkBoxCod}
          onClick={() => CashOnDelivery()}
        />
        
        <label className="form-check-label mx-4" for="flexCheckDefault">
            Cash On Delivery
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          checked = {checkBoxGcash}
          onClick={() => gcash()}
        />
        <label className="form-check-label span mx-4" for="flexCheckChecked">
          Gcash
        </label>
      </div>
    </>
  );
}

export default CheckInlineExample;
