import { useMutation, useQueryClient } from '@tanstack/react-query';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BiHide, BiShow } from 'react-icons/bi';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useStateContext } from '../../context/stateContext';
import Spinner from '../Spinner';
import secureLocalStorage from 'react-secure-storage';
import useStyles from './useStyles';

const Index = () => {
  //   {
  //   "username": "jickTestUser2",
  //   "password": "1234567890"
  // }
  const classes = useStyles();
  const router = useRouter();
  const { loading, setLoading, handleLogin, setTrigger, Token } = useStateContext();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const [show, setShow] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }) => {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'jickTestUser2', password: '1234567890' }),
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      secureLocalStorage.setItem('token', data.token);
      setLoading(false);
      router.push('/admin');
    },
    onError: (err) => {
      console.log(err);
      setLoading(false);
      setErr(err.message || 'Login failed');
    },
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
      loginMutation.mutate({ username: email, password });
    }
    setValidated(true);
  };

  return (
    <div className="container-login-wrapper" style={classes.root}>
      <div className="login-container">
        <Link href="/">
          <h6 className="color-primary linkNext">
            Shop{' '}
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
                type="text"
                placeholder="john@gmail.com"
                value="jickTestUser2"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoading(false);
                }}
              />
              <Form.Control.Feedback type="invalid">Invalid Email</Form.Control.Feedback>
            </Form.Group>

            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                required
                value="1234567890"
                type={show ? 'text' : 'password'}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoading(false);
                }}
              />
              <Button variant="" className="border" onClick={() => setShow(!show)}>
                {show ? <BiShow /> : <BiHide />}
              </Button>
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
