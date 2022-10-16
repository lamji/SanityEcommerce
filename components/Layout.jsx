import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const router = useRouter();
  const showFooter = router.pathname === "/admin/xyz" ? false : true
  const showHeader =
    router.pathname === "/admin/login" || router.pathname === "/admin/xyz"
      ? false
      : true;
  return (
    <div className="layout">
      <Head>
        <title>JS Mastery Store</title>
      </Head>
      <header>{showHeader && <Navbar />}</header>
      <main className="main-container">{children}</main>
      <footer>
        {showFooter && <Footer />}
        
      </footer>
    </div>
  );
};

export default Layout;
