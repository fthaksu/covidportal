import React, { useEffect, memo } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="container my-3 min-vh-100">{children}</main>
      <Footer />
    </>
  );
};

export default memo(Layout);