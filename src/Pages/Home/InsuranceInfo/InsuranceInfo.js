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

  const nearestToEnd = sortInsuranceDayLeft.slice(0, 4);

  const insuranceInfo = nearestToEnd.map((car) => {
    console.log(car.insuranceDaysLeft);
    const infoColor = () => {
      console.log(car.insuranceDaysLeft);
      if (car.insuranceDaysLeft >= 30) {
        console.log("zielony");
        return style.green;
      } else if (car.insuranceDaysLeft < 30 && car.insuranceDaysLeft > 7) {
        console.log("orange");
        return style.orange;
      } else if (car.insuranceDaysLeft <= 7) {
        console.log("red");
        return style.red;
      }
    };
    return (
      <tr key={car.id}>
        <td data-cell="carName">{car.carName}</td>
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
        <table className={style.tableOfInsurancePeriod}>
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
