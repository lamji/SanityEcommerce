import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const router = useRouter();
  const showFooter = router.pathname === '/admin' ? false : true;
  const showHeader =
    router.pathname === '/admin/login' || router.pathname === '/admin' ? false : true;
  return (
    <div className="layout">
      <Head>
        <title>Store Name</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <header>{showHeader && <Navbar />}</header>
      <main className="main-container">{children}</main>
      <footer>{showFooter && <Footer />}</footer>
    </div>
  );
};

export default Layout;
