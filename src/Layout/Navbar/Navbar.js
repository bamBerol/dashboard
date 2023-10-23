import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faCoins,
  faCar,
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

const Navbar = () => {
  const tabs = panelTabs.map((tab) => (
    <NavLink
      key={tab.name}
      to={tab.path}
      exact={tab.exact}
      className={(state) =>
        state.isActive ? `${style.active}` : `${style.inactive}`
      }>
      <FontAwesomeIcon icon={tab.icon} className={style.icon} />
      {tab.name}
    </NavLink>
  ));
  return (
    <>
      <aside className={style.navbar}>
        <div className={style.profile}>
          <div className={style.avatar}>
            <FontAwesomeIcon icon={faUser} size="lg" />
          </div>
          <h3>Viki Transcar</h3>
        </div>
        <nav className={style.navigation}>
          <ul className={style.navigationList}>{tabs}</ul>
        </nav>
        <Footer />
      </aside>
    </>
  );
};

export default Navbar;
