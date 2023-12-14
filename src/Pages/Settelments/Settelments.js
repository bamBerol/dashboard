import { Link, Outlet, useLocation } from "react-router-dom";

import style from "./Settelments.module.css";
import { useEffect, useState } from "react";

const Settelments = () => {
  const [currentComponent, setCurrentComponent] = useState("");

  const location = useLocation();
  const component = location.pathname;

  console.log(component);

  useEffect(() => {
    console.log(component);
    if (component !== currentComponent) {
      setCurrentComponent(component);
    }
  }, [component]);

  console.log("wartosc component ", component);

  return (
    <div className={style.settelments}>
      <h2 className={style.title}>Rozliczenia</h2>
      <div className={style.container}>
        <nav className={style.nav}>
          <Link
            to="/settelments"
            className={
              component === "/settelments" ? style.active : style.inactive
            }>
            SumUp
          </Link>
          <Link
            to="bolt"
            className={
              component === "/settelments/bolt" ? style.active : style.inactive
            }>
            Bolt
          </Link>
          <Link
            to="freenow"
            className={
              component === "/settelments/freenow"
                ? style.active
                : style.inactive
            }>
            FreeNow
          </Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Settelments;
