import Clock from "./Clock/Clock";
import HomeButtons from "./HomeButtons/HomeButtons";
import InspectionInfo from "./InspectionInfo/InspectionInfo";
import InsuranceInfo from "./InsuranceInfo/InsuranceInfo";

import style from "./Home.module.css";

const Home = (props) => {
  return (
    <div className={style.home}>
      <h2 className={style.title}>Witaj w panelu!</h2>
      <div className={style.container}>
        <div className={style.containerBox}>
          <Clock />
          <InspectionInfo carsData={props.carsData} />
        </div>
        <div className={style.containerBox}>
          <div className={style.smallBox}>
            <InsuranceInfo carsData={props.carsData} />
          </div>
          <div className={style.smallBox}>
            <HomeButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
