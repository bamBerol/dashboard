import { Link } from "react-router-dom";
import HomeInfo from "./HomeInfo/HomeInfo";

import style from "./Home.module.css";

const Home = (props) => {
  return (
    <div className={style.home}>
      <h2 className={style.title}>Witaj w panelu!</h2>
      <div className={style.container}>
        <div className={style.containerBox}>
          <HomeInfo carsData={props.carsData} />
        </div>
        <div className={style.containerBox}>
          <Link to="/cars" className={style.smallBox}>
            <div className={style.smallBoxInfo}>
              <h3>Samochody</h3>
              <p>Zakładka zawiera informację o samochodach </p>
            </div>
          </Link>
          <Link to="/settelments" className={style.smallBox}>
            <div className={style.smallBoxInfo}>
              <h3>Rozliczenia</h3>
              <p>W tej zakładce możesz dokonywać rozliczeń kierowców </p>
            </div>
          </Link>
          <Link to="/drivers" className={style.smallBox}>
            <div className={style.smallBoxInfo}>
              <h3>Kierowcy</h3>
              <p>Zakładka zawiera informację o kierowcach</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
