import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from './Navbar';
import Footer from './Footer';
import GlobalSpinner from './GlobalSpinner';
import Toast from './Toast';

const Layout = ({ children }) => {
  const router = useRouter();
  const showFooter = router.pathname === '/admin' ? false : true;
  const showHeader =
    router.pathname === '/admin/login' || router.pathname === '/admin' ? false : true;
  return (
    <div className="layout">
      <Head>
        <title>Store Name</title>
      </Head>
      <GlobalSpinner />
      <Toast />
      <header>{showHeader && <Navbar />}</header>
      <main className="main-container">{children}</main>
      <footer>{showFooter && <Footer />}</footer>
    </div>
  );
};

export default Layout;
