import Clock from "./Clock/Clock";
import InsuranceInfo from "./InsuranceInfo/InsuranceInfo";

import style from "./HomeInfo.module.css";

const HomeInfo = (props) => {
  return (
    <div className={style.container}>
      <Clock />
      <InsuranceInfo carsData={props.carsData} />
      {/*<div className={style.otherInfo}>jeszcze jakies info</div>*/}
    </div>
  );
};

export default HomeInfo;
