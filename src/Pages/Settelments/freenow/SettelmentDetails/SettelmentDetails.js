import { useParams } from "react-router-dom";

import style from "./SettelmentsDetails.module.css";

const SettelmentDetails = ({ settelments }) => {
  const { id } = useParams();

  const settelment = settelments.filter((elmt) => elmt.id === id);
  // console.log(details);
  const dateFrom = settelment[0].dateFrom;
  const dateTo = settelment[0].dateTo;

  const details = settelment[0].settelment.map((obj) => {
    return (
      <div className={style.info}>
        <div className={style.email}>{obj.email}</div>
        <div className={style.amount}>{obj.value} PLN</div>
      </div>
    );
  });

  return (
    <div className={style.container}>
      <div className={style.settelmentInfo}>
        <h3>
          Rozliczenie za: {dateFrom} - {dateTo}
        </h3>
        <div className={style.detail}>{details}</div>
      </div>
    </div>
  );
};

export default SettelmentDetails;
