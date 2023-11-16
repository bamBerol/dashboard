import style from "./InsuranceInfo.module.css";

const InsuranceInfo = (props) => {
  const emptyInfo =
    props.carsData.length === 0 ? (
      <div className={style.emptyInfo}>
        <p>Nie masz jeszcze dodanego samochodu</p>
      </div>
    ) : (
      ""
    );

  const sortInsuranceDayLeft = props.carsData.sort(
    (a, b) => a.insuranceDaysLeft - b.insuranceDaysLeft
  );

  const nearestToEnd = sortInsuranceDayLeft.slice(0, 5);
  const fullHeight =
    nearestToEnd.length === 5
      ? `${style.tableOfInsurancePeriod} ${style.maxHeight}`
      : style.tableOfInsurancePeriod;

  const insuranceInfo = nearestToEnd.map((car) => {
    const infoColor = () => {
      if (car.insuranceDaysLeft >= 30) {
        return style.green;
      } else if (car.insuranceDaysLeft < 30 && car.insuranceDaysLeft > 7) {
        return style.orange;
      } else if (car.insuranceDaysLeft <= 7) {
        return style.red;
      }
    };
    return (
      <tr key={car.id}>
        <td data-cell="carMake">{car.carMake}</td>
        <td data-cell="plate">{car.plate}</td>
        <td data-cell="daysLeft" className={infoColor()}>
          {car.insuranceDaysLeft}
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
