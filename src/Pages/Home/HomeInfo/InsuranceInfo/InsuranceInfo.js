import style from "./InsuranceInfo.module.css";

const InsuranceInfo = (props) => {
  console.log(props.carsData);
  return <div className={style.insuranceInfo}>info o ubezpieczeniu</div>;
};

export default InsuranceInfo;
