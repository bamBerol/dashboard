import style from "./Drivers.module.css";

const Drivers = ({ tableData }) => {
  const table = tableData.map((driver) => {
    return (
      <tr key={driver.id}>
        <td data-cell="driver">{driver.driver}</td>
        <td data-cell="email">{driver.email}</td>
        <td data-cell="carName">{driver.carName}</td>
        <td data-cell="plate">{driver.plate}</td>
      </tr>
    );
  });
  return (
    <div className={style.drivers}>
      <h2 className={style.title}>Kierowcy</h2>
      <div className={style.container}>
        <div className={style.options}>
          <button className={style.addCarBtn}>+ Dodaj kierowcę</button>
        </div>
        <div className={style.driversTable}>
          <table className={style.tableOfDrivers}>
            <thead>
              <tr>
                <th>Imię i Nazwisko</th>
                <th>Adres e-mail</th>
                <th>Samochód</th>
                <th>Rejestracja</th>
              </tr>
            </thead>
            <tbody>{table}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
