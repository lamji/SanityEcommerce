import React, { useState } from "react";
import { useRouter } from 'next/router'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { BiHide, BiShow } from "react-icons/bi";
import InputGroup from "react-bootstrap/InputGroup";
import { auth } from "../../lib/firebase";
import Row from "react-bootstrap/Row";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useStateContext } from "../../context/stateContext";
import Spinner from "../../components/Spinner";

const Index = () => {
  const router = useRouter()
  const { loading, setLoading, handleLogin, setTrigger, Token } = useStateContext();
  const token = Token()
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    console.log(token)
    token != null ? router.replace("/admin/xyz") : null;
  });


  const handleSubmit = (event) => {
    setLoading(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setLoading(false);
    } else {
      event.preventDefault();
      event.stopPropagation();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          handleLogin("token",user?.accessToken)
          setTrigger(true)
          router.push("/admin/xyz")
          {
            user && setLoading(false);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErr(true);
          {
            errorCode && setLoading(false);
          }
        });
    }
    setValidated(true);
  };

  return (
    <div className="container">
      <div className="login-container">
        <Link href="/">
          <h6 className="color-primary linkNext">
            Shop{" "}
            <span className="span">
              <AiOutlineArrowRight />
            </span>
          </h6>
        </Link>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="john@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoading(false);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Invalid Email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                required
                type={show ? "text" : "password"}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoading(false);
                }}
              />
              {show ? (
                <Button
                  variant=""
                  className="border"
                  onClick={() => {
                    setShow(false);
                    console.log("hhh")
                  }}
                >
                  <BiShow />
                </Button>
              ) : (
                <Button
                  variant=""
                  className="border"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <BiHide />
                </Button>
              )}
            </InputGroup>
          </Row>
          {err && <span className="errorLogin">Wrong password or email</span>}

          <div>
            <Button type="submit" className="btnPay">
              Login {loading && <Spinner />}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Index;
