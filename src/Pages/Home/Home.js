import Clock from "./Clock/Clock";
import HomeButtons from "./HomeButtons/HomeButtons";
import InspectionInfo from "./InspectionInfo/InspectionInfo";
import InsuranceInfo from "./InsuranceInfo/InsuranceInfo";

import style from "./Home.module.css";

const Home = (props) => {
  const quantityOfCars = props.carsData.length;

  return (
    <div className={style.home}>
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
            <HomeButtons
              quantityOfDrivers={props.quantityOfDrivers}
              quantityOfCars={quantityOfCars}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
