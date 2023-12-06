import { useState } from "react";

import Main from "./Main/Main";
import Navbar from "./Navbar/Navbar";

import style from "./Layout.module.css";

const Layout = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavOn = () => {
    setNavOpen((prevState) => !prevState);
  };

  return (
    <div className={style.layout}>
      <Navbar navIsOpen={navOpen} changeNav={handleNavOn} />
      <Main />
    </div>
  );
};

export default Layout;
