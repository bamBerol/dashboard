import { useLocation } from "react-router-dom";

import EditButtons from "../../components/Buttons/EditButtons/EditButtons";
import EmptyInfo from "../../components/EmptyInfo/EmptyInfo";

import style from "./ArchivePage.module.css";

const ArchivePage = ({ archive, deleteArchive }) => {
  console.log(archive);

  const location = useLocation();
  const url = location.pathname;

  const info = archive.length ? "" : <EmptyInfo url={url} />;

  const table = archive.map((elmt) => {
    return (
      <tr key={elmt.id}>
        <td data-cell="driverName">{elmt.driverName}</td>
        <td data-cell="driverSurname">{elmt.driverSurname}</td>
        <td data-cell="number">{elmt.number}</td>
        <td data-cell="email">{elmt.email}</td>
        <td data-cell="carMake">{elmt.carMake}</td>
        <td data-cell="plate">{elmt.plate}</td>
        <td data-cell="buttons">
          <EditButtons id={elmt.id} url={url} delete={deleteArchive} />
        </td>
      </tr>
    );
  });
  return (
    <div className={style.archive}>
      <h2 className={style.title}>Archiwum</h2>
      <div className={style.container}>
        <div className={style.archiveDriversTable}>
          <table className={style.tableOfArchiveDrivers}>
            <thead>
              <tr>
                <th>Imię </th>
                <th>Nazwisko</th>
                <th>Numer tel.</th>
                <th>Adres e-mail</th>
                <th>Samochód</th>
                <th>Rejestracja</th>
                <th></th>
              </tr>
            </thead>
            {archive.length ? <tbody>{table}</tbody> : ""}
          </table>
          {info}
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
