import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Login from '../../components/login';
import secureLocalStorage from 'react-secure-storage';

const NoSSR = dynamic(() => import('../../components/dashboard'), { ssr: false });

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const token = secureLocalStorage.getItem('token');

  return <div>{token ? <NoSSR /> : <Login />}</div>;
}
