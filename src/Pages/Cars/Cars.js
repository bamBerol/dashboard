import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { differenceInDays, parse } from "date-fns";

import AddButton from "../../components/Buttons/AddButton/AddButton";
import EditButtons from "../../components/Buttons/EditButtons/EditButtons";
import EmptyInfo from "../../components/EmptyInfo/EmptyInfo";

import style from "./Cars.module.css";

const Cars = (props) => {
  const authContext = useContext(AuthContext);

  const location = useLocation();
  const url = location.pathname;

  const today = new Date();

  const info = props.tableData.length ? "" : <EmptyInfo url={url} />;

  const table = props.tableData.map((car) => {
    const periodInspection = () => {
      const nextCarInspection = parse(
        car.nextCarInspection,
        "dd/MM/yyyy",
        new Date()
      );
      const inspectionDaysLeft = differenceInDays(nextCarInspection, today);

      if (inspectionDaysLeft >= 30) {
        return style.green;
      } else if (inspectionDaysLeft < 30 && inspectionDaysLeft > 7) {
        return style.orange;
      } else if (inspectionDaysLeft <= 7) {
        return style.red;
      }
    };

    const periodInsurance = () => {
      const endInsuranceDate = parse(
        car.insuranceDate,
        "dd/MM/yyyy",
        new Date()
      );
      const insuranceDaysLeft = differenceInDays(endInsuranceDate, today);

      if (insuranceDaysLeft >= 30) {
        return style.green;
      } else if (insuranceDaysLeft < 30 && insuranceDaysLeft > 7) {
        return style.orange;
      } else if (insuranceDaysLeft <= 7) {
        return style.red;
      }
    };
    const periodLegalization = () => {
      const endLegalizationDate = parse(
        car.legalizationDate,
        "dd/MM/yyyy",
        new Date()
      );
      const legalizationDaysLeft = differenceInDays(endLegalizationDate, today);

      if (legalizationDaysLeft >= 30) {
        return style.green;
      } else if (legalizationDaysLeft < 30 && legalizationDaysLeft > 7) {
        return style.orange;
      } else if (legalizationDaysLeft <= 7) {
        return style.red;
      }
    };

    return (
      <tr key={car.id}>
        <td data-cell="carMake">{car.carMake}</td>
        <td data-cell="carModel">{car.carModel}</td>
        <td data-cell="plate">{car.plate}</td>
        <td data-cell="dateCarInspection">{car.dateCarInspection}</td>
        <td data-cell="dateNextCarInspection" className={periodInspection()}>
          {car.nextCarInspection}
        </td>
        <td data-cell="insuranceDate" className={periodInsurance()}>
          {car.insuranceDate}
        </td>
        <td data-cell="legalization" className={periodLegalization()}>
          {car.legalizationDate}
        </td>
        <td data-cell="buttons">
          <EditButtons id={car.id} delete={props.delete} url={url} />
        </td>
      </tr>
    );
  });

  return (
    <div className={style.cars}>
      <h2 className={style.title}>Samochody</h2>
      <div className={style.options}>
        <div className="addBtn">
          <AddButton url={url} />
        </div>
        <div className={style.legend}>
          <div className={style.legendColor}>
            <div className={style.colorGreen}></div>
            <p>powyżej 30 dni</p>
          </div>
          <div className={style.legendColor}>
            <div className={style.colorOrange}></div>
            <p>między 30-7 dni</p>
          </div>
          <div className={style.legendColor}>
            <div className={style.colorRed}></div>
            <p>poniżej 7 dni</p>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.carTable}>
          <table className={style.tableOfCars}>
            <thead>
              <tr>
                <th>Marka</th>
                <th>Model</th>
                <th>Rejestracja</th>
                <th>Data przeglądu</th>
                <th>Następny przegląd</th>
                <th>Koniec ubezpieczenia</th>
                <th>Legalizacja taksometru</th>
                <th></th>
              </tr>
            </thead>
            {props.tableData.length ? <tbody>{table}</tbody> : ""}
          </table>
          {info}
        </div>
      </div>
    </div>
  );
};

export default Cars;
