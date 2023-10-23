import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import style from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={style.layout}>
      <Navbar />
      <Main />
    </div>
  );
};

export default Layout;
