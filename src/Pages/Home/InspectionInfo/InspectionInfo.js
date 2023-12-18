import { differenceInDays, parse } from "date-fns";

import style from "./InspectionInfo.module.css";

const InspectionInfo = (props) => {
  const emptyInfo = props.carsData.length ? (
    ""
  ) : (
    <div className={style.emptyInfo}>
      <p>Nie masz jeszcze dodanego samochodu</p>
    </div>
  );
  const compareDates = (dateA, dateB) => {
    const carDate1 = parse(dateA.nextCarInspection, "dd/MM/yyyy", new Date());
    const carDate2 = parse(dateB.nextCarInspection, "dd/MM/yyyy", new Date());

    return carDate1 - carDate2;
  };

  const sortInspectionDay = props.carsData.sort(compareDates);

  const nearestToEnd = sortInspectionDay.slice(0, 5);

  const fullHeight =
    nearestToEnd.length === 5
      ? `${style.tableOfInspectionPeriod} ${style.maxHeight}`
      : style.tableOfInspectionPeriod;

  const inspectionInfo = nearestToEnd.map((car) => {
    const today = new Date();
    const nextCarInspection = parse(
      car.nextCarInspection,
      "dd/MM/yyyy",
      new Date()
    );
    const inspectionDaysLeft = differenceInDays(nextCarInspection, today);

    const infoColor = () => {
      if (inspectionDaysLeft >= 30) {
        return style.green;
      } else if (inspectionDaysLeft < 30 && inspectionDaysLeft > 7) {
        return style.orange;
      } else if (inspectionDaysLeft <= 7) {
        return style.red;
      }
    };

    return (
      <tr key={car.id}>
        <td data-cell="carMake">{car.carMake}</td>
        <td data-cell="plate">{car.plate}</td>
        <td data-cell="daysLeft" className={infoColor()}>
          {inspectionDaysLeft === 0
            ? "Kończy się przegląd!"
            : inspectionDaysLeft < 0
            ? "Przegląd nieważny!"
            : inspectionDaysLeft}
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
