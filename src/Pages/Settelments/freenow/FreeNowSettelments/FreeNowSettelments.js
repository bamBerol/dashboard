import { Link, useLocation } from "react-router-dom";

import AddButton from "../../../../components/Buttons/AddButton/AddButton";

import style from "./FreeNowSettelments.module.css";

const FreeNowSettelments = ({ settelments }) => {
  const location = useLocation();
  const url = location.pathname;

  const settelmentsList = settelments.map((settelment) => {
    console.log(settelment);

    return (
      <Link to={settelment.id} key={settelment.id} className={style.settelment}>
        <p>Rozliczenie za:</p>
        <p>{settelment.dateFrom}</p>
        <p>{settelment.dateTo}</p>
      </Link>
    );
  });

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
