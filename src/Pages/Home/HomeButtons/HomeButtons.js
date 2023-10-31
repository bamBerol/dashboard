import { Link } from "react-router-dom";

import style from "./HomeButtons.module.css";

const HomeButtons = () => {
  return (
    <>
      <div className={style.buttons}>
        <div className={style.smallButtons}>
          <div className={style.leftButtons}>
            <Link to="/cars" className={style.cars}>
              <h3>Samochody</h3>
              <p>Zakładka zawiera informację o samochodach </p>
            </Link>
          </div>
          <div className={style.leftButtons}>
            <Link to="/settelments" className={style.settelments}>
              <h3>Rozliczenia</h3>
              <p>W tej zakładce możesz dokonywać rozliczeń kierowców </p>
            </Link>
          </div>
        </div>
        <div className={style.smallButtons}>
          <Link to="/drivers" className={style.drivers}>
            <h3>Kierowcy</h3>
            <p>Zakładka zawiera informację o kierowcach</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeButtons;
