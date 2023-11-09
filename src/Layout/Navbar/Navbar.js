import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext/LoginContext";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faCar,
  faHouse,
  faPowerOff,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import Footer from "../Footer/Footer";

import style from "./Navbar.module.css";

const panelTabs = [
  { name: "Strona Główna", icon: faHouse, path: "/", exact: "true" },
  { name: "Samochody", icon: faCar, path: "/cars", exact: "false" },
  { name: "Rozliczenia", icon: faCoins, path: "/settelments", exact: "false" },
  { name: "Kierowcy", icon: faUsers, path: "/drivers", exact: "false" },
];

const Navbar = (props) => {
  const loginContext = useContext(LoginContext);

  const tabs = panelTabs.map((tab) => {
    return (
      <NavLink
        key={tab.name}
        to={tab.path}
        exact={tab.exact}
        className={(state) =>
          state.isActive ? `${style.active}` : `${style.inactive}`
        }>
        <FontAwesomeIcon icon={tab.icon} className={style.icon} size="lg" />
        <p className={props.navIsOpen ? style.nameOn : style.nameOff}>
          {props.navIsOpen ? tab.name : ""}
        </p>
      </NavLink>
    );
  });

  return (
    <>
      <aside className={style.navbar}>
        <div
          className={props.navIsOpen ? style.xmarkBtn : style.hamburgerBtn}
          onClick={props.changeNav}>
          <div className={style.topBar}></div>
          <div className={style.middleBar}></div>
          <div className={style.bottomBar}></div>
        </div>
        {/* </div> */}
        <nav className={style.navigation}>
          <ul className={style.navigationList}>{tabs}</ul>
        </nav>
        <div className={style.logout} onClick={loginContext.toggleIsLogged}>
          <FontAwesomeIcon icon={faPowerOff} className={style.icon} size="lg" />
          <p className={props.navIsOpen ? style.nameOn : style.nameOff}>
            {props.navIsOpen ? "Wyloguj" : ""}
          </p>
        </div>
        <Footer navIsOpen={props.navIsOpen} />
      </aside>
    </>
  );
};

export default Navbar;
