import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { useContext } from "react";

import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

import style from "./InspectionInfo.module.css";

const InspectionInfo = (props) => {
  const authContext = useContext(AuthContext);

  console.log(authContext.isLoading);

  const emptyInfo =
    props.carsData.length === 0 && authContext.isLoading ? (
      <LoadingSpinner />
    ) : props.carsData.length === 0 && authContext.isLoading === false ? (
      <div className={style.emptyInfo}>
        <p>Nie masz jeszcze dodanego samochodu</p>
      </div>
    ) : (
      ""
    );
  const sortInspectionDay = props.carsData.sort(
    (a, b) => a.daysLeft - b.daysLeft
  );

  const nearestToEnd = sortInspectionDay.slice(0, 5);
  const fullHeight =
    nearestToEnd.length === 5
      ? `${style.tableOfInspectionPeriod} ${style.maxHeight}`
      : style.tableOfInspectionPeriod;

  const inspectionInfo = nearestToEnd.map((car) => {
    const infoColor = () => {
      if (car.daysLeft >= 30) {
        return style.green;
      } else if (car.daysLeft < 30 && car.daysLeft > 7) {
        return style.orange;
      } else if (car.daysLeft <= 7) {
        return style.red;
      }
    };
    return (
      <tr key={car.id}>
        <td data-cell="carMake">{car.carMake}</td>
        <td data-cell="plate">{car.plate}</td>
        <td data-cell="daysLeft" className={infoColor()}>
          {car.daysLeft}
        </td>
        <td data-cell="nextCarInspection">{car.nextCarInspection}</td>
      </tr>
    );
  });

  return (
    <div className={style.inspectionInfo}>
      <div className={style.carInspectionInfo}>
        <table className={fullHeight}>
          <thead>
            <tr>
              <th>Samochód</th>
              <th>Rejestracja</th>
              <th>Kolejny przegląd za (dni)</th>
              <th>Data kolejnego badania</th>
            </tr>
          </thead>
          <tbody>{inspectionInfo}</tbody>
        </table>
        {emptyInfo}
      </div>
    </div>
  );
};

export default InspectionInfo;
