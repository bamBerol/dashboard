import { differenceInDays, parse } from "date-fns";

import style from "./InsuranceInfo.module.css";

const InsuranceInfo = (props) => {
  const emptyInfo = props.carsData.length ? (
    ""
  ) : (
    <div className={style.emptyInfo}>
      <p>Nie masz jeszcze dodanego samochodu</p>
    </div>
  );
  const compareDates = (dateA, dateB) => {
    const carDate1 = parse(dateA.insuranceDate, "dd/MM/yyyy", new Date());
    const carDate2 = parse(dateB.insuranceDate, "dd/MM/yyyy", new Date());

    return carDate1 - carDate2;
  };

  const sortInsuranceDayLeft = props.carsData.sort(compareDates);

  const nearestToEnd = sortInsuranceDayLeft.slice(0, 5);

  const fullHeight =
    nearestToEnd.length === 5
      ? `${style.tableOfInsurancePeriod} ${style.maxHeight}`
      : style.tableOfInsurancePeriod;

  const insuranceInfo = nearestToEnd.map((car) => {
    const today = new Date();
    const endInsuranceDate = parse(car.insuranceDate, "dd/MM/yyyy", new Date());
    const insuranceDaysLeft = differenceInDays(endInsuranceDate, today);

    const infoColor = () => {
      if (insuranceDaysLeft >= 30) {
        return style.green;
      } else if (insuranceDaysLeft < 30 && insuranceDaysLeft > 7) {
        return style.orange;
      } else if (insuranceDaysLeft <= 7) {
        return style.red;
      }
    };
    return (
      <tr key={car.id}>
        <td data-cell="carMake">{car.carMake}</td>
        <td data-cell="plate">{car.plate}</td>
        <td data-cell="daysLeft" className={infoColor()}>
          {insuranceDaysLeft}
        </td>
        <td data-cell="insuranceExpire">{car.insuranceDate}</td>
      </tr>
    );
  });
  return (
    <div className={style.insuranceInfo}>
      <div className={style.carInsuranceInfo}>
        <table className={fullHeight}>
          <thead>
            <tr>
              <th>Samochód</th>
              <th>Rejestracja</th>
              <th>Koniec ubezpieczenia za (dni)</th>
              <th>Ubezpieczenie ważne do</th>
            </tr>
          </thead>
          <tbody>{insuranceInfo}</tbody>
        </table>
        {emptyInfo}
      </div>
    </div>
  );
};

export default InsuranceInfo;
