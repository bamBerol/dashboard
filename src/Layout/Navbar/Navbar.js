import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCoins,
  faCar,
  faHouse,
  faUsers,
  faXmark,
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

  const navBtn = props.navIsOpen ? (
    <FontAwesomeIcon icon={faXmark} size="lg" />
  ) : (
    <FontAwesomeIcon icon={faBars} size="lg" />
  );

  return (
    <>
      <aside className={style.navbar}>
        <div className={style.navButton} onClick={props.changeNav}>
          {navBtn}
        </div>
        <nav className={style.navigation}>
          <ul className={style.navigationList}>{tabs}</ul>
        </nav>
        <Footer navIsOpen={props.navIsOpen} />
      </aside>
    </>
  );
};

export default Navbar;
