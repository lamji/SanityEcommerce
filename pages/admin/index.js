import React from 'react';
import Dashboard from '../../components/dashboard';
import Login from '../../components/login';

export default function index() {
  const token = true;
  return <div>{token ? <Dashboard /> : <Login />}</div>;
}
