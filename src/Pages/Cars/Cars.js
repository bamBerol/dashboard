import { Link, useLocation } from "react-router-dom";
import { parse, format, addYears, differenceInDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EditButtons from "../../components/Buttons/EditButtons/EditButtons";

import style from "./Cars.module.css";

const Cars = (props) => {
  const location = useLocation();
  const url = location.pathname;

  const emptyInfo =
    props.tableData.length === 0 ? (
      <div className={style.empty}>
        <h3>Brak samochodów do wyświetlenia</h3>
      </div>
    ) : (
      <div className={style.legend}>
        <div className={style.legendColor}>
          <div className={style.colorGreen}></div>powyżej 30 dni
        </div>
        <div className={style.legendColor}>
          <div className={style.colorOrange}></div>między 30-7 dni
        </div>
        <div className={style.legendColor}>
          <div className={style.colorRed}></div>poniżej 7 dni
        </div>
      </div>
    );

  const table = props.tableData.map((car) => {
    const todayDate = new Date();

    const dateCarInspection = car.dateCarInspection;
    const objDateCarInspection = parse(
      dateCarInspection,
      "dd/MM/yyyy",
      new Date()
    );
    const addYear = addYears(objDateCarInspection, 1);
    const expirationDate = format(addYear, "dd/MM/RRRR");
    const timeLeft = differenceInDays(addYear, todayDate);

    const insuranceDate = car.insuranceDate;
    const endOfInsurance = parse(insuranceDate, "dd/MM/yyyy", new Date());
    const insuranceLeft = differenceInDays(endOfInsurance, todayDate);

    const periodInspection = () => {
      if (timeLeft >= 30) {
        return style.green;
      } else if (timeLeft < 30 && timeLeft > 7) {
        return style.orange;
      } else if (timeLeft <= 7) {
        return style.red;
      }
    };

    const periodInsurance = () => {
      if (insuranceLeft >= 30) {
        return style.green;
      } else if (insuranceLeft < 30 && insuranceLeft > 7) {
        return style.orange;
      } else if (insuranceLeft <= 7) {
        return style.red;
      }
    };

    return (
      <tr key={car.id}>
        <td data-cell="carName">{car.carName}</td>
        <td data-cell="plate">{car.plate}</td>
        <td data-cell="dateCarInspection">{car.dateCarInspection}</td>
        <td data-cell="dateNextCarInspection" className={periodInspection()}>
          {expirationDate}
        </td>
        <td data-cell="insuranceDate" className={periodInsurance()}>
          {car.insuranceDate}
        </td>
        <td data-cell="buttons">
          <EditButtons id={car.id} delete={props.delete} />
        </td>
      </tr>
    );
  });

  return (
    <div className={style.cars}>
      <h2 className={style.title}>Samochody</h2>
      <div className={style.container}>
        <div className={style.options}>
          <Link to={`${url}/addCar`} className={style.addCarBtn}>
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <p>Dodaj samochód</p>
          </Link>
        </div>
        <div className={style.carTable}>
          <table className={style.tableOfCars}>
            <thead>
              <tr>
                <th>Samochód</th>
                <th>Rejestracja</th>
                <th>Data badania</th>
                <th>Data kolejnego badania</th>
                <th>Koniec ubezpieczenia</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{table}</tbody>
          </table>
          {emptyInfo}
        </div>
      </div>
    </div>
  );
};

export default Cars;
