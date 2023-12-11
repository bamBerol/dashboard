import { Link, Outlet } from "react-router-dom";

import style from "./Settelments.module.css";

const Settelments = () => {
  return (
    <div className={style.settelments}>
      <h2 className={style.title}>Rozliczenia</h2>
      <div className={style.container}>
        <nav className={style.nav}>
          <Link to="sumup">SumUp</Link>
          <Link to="bolt">Bolt</Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Settelments;
