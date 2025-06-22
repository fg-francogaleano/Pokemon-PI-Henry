import React from "react";
import NavBar from "../NavBar1/NavBar";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>{children}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
