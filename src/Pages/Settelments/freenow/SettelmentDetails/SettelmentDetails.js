import { useNavigate, useParams } from "react-router-dom";

import style from "./SettelmentsDetails.module.css";

const SettelmentDetails = ({ settelments }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(settelments);

  const handleBack = () => {
    navigate("/settelments/freenow");
  };

  const settelment = settelments.filter((elmt) => elmt.id === id);
  console.log(settelments);
  const dateFrom = settelment[0].dateFrom;
  const dateTo = settelment[0].dateTo;

  const details = settelment[0].settelment.map((obj) => {
    return (
      <div key={obj.id} id={obj.id} className={style.info}>
        <div className={style.email}>{obj.fullName}</div>
        <div className={style.amount}>{obj.value} PLN</div>
      </div>
    );
  });

  return (
    <div className={style.container}>
      <div className={style.settelmentInfo}>
        <h3>
          Rozliczenie za okres: {dateFrom} - {dateTo}
        </h3>
        <div className={style.detail}>{details}</div>
        <div className={style.backBtn} onClick={handleBack}>
          <p>Powrót</p>
        </div>
      </div>
    </div>
  );
};

export default SettelmentDetails;
