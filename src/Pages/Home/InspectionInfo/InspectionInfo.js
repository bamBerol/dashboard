import style from "./InspectionInfo.module.css";

const InspectionInfo = (props) => {
  const emptyInfo =
    props.carsData.length === 0 ? (
      <div className={style.emptyInfo}>
        <p>Nie masz jeszcze dodanego samochodu</p>
      </div>
    ) : (
      ""
    );
  const sortInspectionDay = props.carsData.sort(
    (a, b) => a.daysLeft - b.daysLeft
  );

  const nearestToEnd = sortInspectionDay.slice(0, 4);

  const inspectionInfo = nearestToEnd.map((car) => {
    const infoColor = () => {
      console.log(car.daysLeft);
      if (car.daysLeft >= 30) {
        console.log("zielony");
        return style.green;
      } else if (car.daysLeft < 30 && car.daysLeft > 7) {
        console.log("orange");
        return style.orange;
      } else if (car.daysLeft <= 7) {
        console.log("red");
        return style.red;
      }
    };
    return (
      <tr key={car.id}>
        <td data-cell="carName">{car.carName}</td>
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
        <table className={style.tableOfInspectionPeriod}>
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
