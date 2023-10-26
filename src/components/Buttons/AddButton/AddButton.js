import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import style from "./AddButton.module.css";

const AddButton = ({ url }) => {
  const buttonName = url === "/cars" ? "samochód" : "kierowcę";
  const buttonNavigate = url === "/cars" ? "addCar" : "addDriver";
  return (
    <Link to={`${url}/${buttonNavigate}`} className={style.addButton}>
      <FontAwesomeIcon icon={faPlus} size="sm" />
      <p>Dodaj {buttonName}</p>
    </Link>
  );
};

export default AddButton;
