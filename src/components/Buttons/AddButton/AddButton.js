import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import style from "./AddButton.module.css";

const AddButton = ({ url, type }) => {
  let buttonName;
  //  = url === "/cars" ? "samochód" : "kierowcę";
  let buttonNavigate;
  //  = url === "/cars" ? "addCar" : "addDriver";

  switch (url) {
    case "/cars":
      buttonName = "samochód";
      buttonNavigate = "addCar";
      break;
    case "/drivers":
      buttonName = "kierowcę";
      buttonNavigate = "addDriver";
      break;
    case "/settelments/freenow":
      if (type === "email") {
        buttonName = "/ usuń email";
        buttonNavigate = "editEmailList";
      }
      if (type === "settelment") {
        buttonName = "rozliczenie";
        buttonNavigate = "addFreeNowSettelment";
      }
      break;
    default:
      buttonName = "błąd";
      buttonNavigate = "błąd";
  }

  return (
    <Link to={`${url}/${buttonNavigate}`} className={style.addButton}>
      {type === "email" ? (
        <p style={{ marginLeft: "0px" }}>Dodaj {buttonName}</p>
      ) : (
        <>
          <FontAwesomeIcon icon={faPlus} size="sm" />
          <p>Dodaj {buttonName}</p>
        </>
      )}
    </Link>
  );
};

export default AddButton;
