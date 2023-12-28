import { Link, useLocation } from "react-router-dom";

import AddButton from "../../../../components/Buttons/AddButton/AddButton";

import style from "./FreeNowSettelments.module.css";

const FreeNowSettelments = ({ settelments }) => {
  const location = useLocation();
  const url = location.pathname;
  console.log(settelments.length);

  let settelmentsList;

  if (settelments.length === 0) {
    console.log("dodaj rozliczenie");
    settelmentsList = (
      <div className={style.info}>
        <p>W chwili obecnej nie masz rozliczeń do wyświetlenia</p>
      </div>
    );
  }
  if (settelments.length !== 0) {
    settelmentsList = settelments.map((settelment) => {
      // console.log(settelment);
      return (
        <Link
          to={settelment.id}
          key={settelment.id}
          className={style.settelment}>
          <p>Rozliczenie za:</p>
          <h4>{settelment.dateFrom}</h4>
          <h4>{settelment.dateTo}</h4>
        </Link>
      );
    });
  }

  return (
    <>
      <nav className={style.options}>
        <AddButton url={url} type="email" />
        <AddButton url={url} type="settelment" />
      </nav>
      <div className={style.container}>
        <div className={style.settelmentsList}>{settelmentsList}</div>
      </div>
    </>
  );
};

export default FreeNowSettelments;
