import { useState } from "react";

import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";

import style from "./Layout.module.css";

const Layout = (props) => {
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
