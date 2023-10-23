import style from "./Cars.module.css";

const carsInfo = [
  {
    /*
    carName: "Samochód",
    plate: "Rejestracja",
    date: "Data badania",
    expirationDate: "Data kolejnego badania",
*/
  },
  { id: 1, carName: "Toyota Corolla", plate: "WZ 9040D", date: "24.03.2021" },
  { id: 2, carName: "Toyota Camry", plate: "WY 4080A", date: "24.05.2021" },
  { id: 3, carName: "Skoda Superb", plate: "WZ 9040D", date: "24.08.2019" },
  { id: 4, carName: "Lexus ES300h", plate: "WZ 9040D", date: "24.10.2023" },
  { id: 5, carName: "Skoda Octavia", plate: "WZ 9040D", date: "24.12.2022" },
];

const Cars = () => {
  const table = carsInfo.map((car) => (
    <tr>
      <th>{car.id}</th>
      <td>{car.carName}</td>
      <td>{car.plate}</td>
      <td>{car.date}</td>
    </tr>
  ));

  return (
    <div className={style.cars}>
      <h2 className={style.title}>Samochody</h2>
      <div className={style.container}>
        <div className={style.options}>
          <button className={style.addCarBtn}>+ Dodaj samochód</button>
        </div>
        <div className={style.tableOfCars}>
          <table>
            <thead>
              <th>Lp.</th>
              <th>Samochód</th>
              <th>Rejestracja</th>
              <th>Data badania</th>
              <th>Data kolejnego badania</th>
            </thead>
            <tbody>{table}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cars;
