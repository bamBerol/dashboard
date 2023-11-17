import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

import AddButton from "../../components/Buttons/AddButton/AddButton";
import EditButtons from "../../components/Buttons/EditButtons/EditButtons";
import EmptyInfo from "../../components/EmptyInfo/EmptyInfo";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import style from "./Drivers.module.css";

const Drivers = (props) => {
  const location = useLocation();
  const url = location.pathname;

  const authContext = useContext(AuthContext);

  const table = props.tableData.map((driver) => {
    return (
      <tr key={driver.id}>
        <td data-cell="driverName">{driver.driverName}</td>
        <td data-cell="driverSurname">{driver.driverSurname}</td>
        <td data-cell="number">{driver.number}</td>
        <td data-cell="carMake">{driver.carMake}</td>
        <td data-cell="plate">{driver.plate}</td>
        <td data-cell="buttons">
          <EditButtons id={driver.id} url={url} delete={props.delete} />
        </td>
      </tr>
    );
  });

  return (
    <div className={style.drivers}>
      <h2 className={style.title}>Kierowcy</h2>
      <div className={style.options}>
        <AddButton url={url} />
      </div>
      <div className={style.container}>
        <div className={style.driversTable}>
          {authContext.isLoading ? (
            <LoadingSpinner />
          ) : props.tableData.length ? (
            <>
              <table className={style.tableOfDrivers}>
                <thead>
                  <tr>
                    <th>Imię </th>
                    <th>Nazwisko</th>
                    <th>Numer tel.</th>
                    <th>Samochód</th>
                    <th>Rejestracja</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{table}</tbody>
              </table>
            </>
          ) : (
            <EmptyInfo url={url} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Drivers;
