import { auth } from "../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

import style from "./EditFullNameList.module.css";

const EditFullNameList = ({ list, addFullNameData, deleteEmail }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [addFullName, setAddFullName] = useState({
    fullName: "",
  });
  const [addFullNameError, setAddFullNameError] = useState({});
  const [fullNameToDelete, setFullNameToDelete] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const location = useLocation();
  const component = location.pathname;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth((prevState) => !prevState);
      } else {
        console.log("state changed - logout");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleNameOptions = (e) => {
    setIsClicked(true);
    setFullNameToDelete(e.currentTarget.id);
    setWidth(e.currentTarget.offsetWidth);
    setHeight(e.currentTarget.offsetHeight);
  };

  const handleDelete = () => {
    deleteEmail(fullNameToDelete, component);
  };

  const handleConfirm = () => {
    console.log("nie bedzie usuniety");
    setIsClicked(false);
    // setFullNameToDelete("");
  };

  const handleInputChange = (e) => {
    setAddFullName({
      fullName: e.target.value,
    });
    setFullNameToDelete("");
  };

  const handleVerification = (addFullName) => {
    console.log("weryfikacja danych osobowych");
    const error = {};
    if (!addFullName.fullName) {
      error.fullName = "Wpisz imię i nazwisko";
    }
    return error;
  };

  const handleAddFullName = () => {
    try {
      if (isAuth) {
        console.log("weryfikacja");
        setAddFullNameError(handleVerification(addFullName));
        setIsAdded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(addFullNameError).length === 0 && isAdded) {
      console.log("wysyłam", addFullName);
      addFullNameData(addFullName, component);
      setAddFullName({ fullName: "" });
    } else {
      console.log(addFullNameError.fullName);
    }
  }, [addFullNameError]);

  const showList = list.map((name) => {
    return (
      <div
        key={name.id}
        id={name.id}
        className={style.listItem}
        onClick={handleNameOptions}
        style={
          name.id === fullNameToDelete
            ? { width: `${width}px`, height: `${height}px` }
            : {}
        }>
        {isClicked && fullNameToDelete === name.id ? (
          <div className={style.options}>
            <div className={style.icon} onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </div>
            <div className={style.icon} onClick={handleConfirm}>
              <FontAwesomeIcon icon={faCheck} size="sm" />
            </div>
          </div>
        ) : (
          <p className={style.name}>{name.fullName}</p>
        )}
      </div>
    );
  });

  return (
    <div className={style.container}>
      <div className={style.addName}>
        <div className={style.addNameInput}>
          <input
            type="text"
            className={
              Object.keys(addFullNameError).length === 0
                ? `${style.inputOk}`
                : `${style.inputError}`
            }
            placeholder="Wpisz imię i nazwisko"
            value={addFullName.fullName}
            onChange={handleInputChange}
          />
          {Object.keys(addFullNameError).length === 0 ? (
            <p className={style.errorMsgOff}>Error msg</p>
          ) : (
            <p className={style.errorMsg}>{addFullNameError.fullName}</p>
          )}
        </div>
        <div>
          <div className={style.addNameBtn} onClick={handleAddFullName}>
            <p>Dodaj do listy</p>
          </div>
        </div>
      </div>
      <div className={style.nameListContainer}>
        <div className={style.subtitle}>
          <h3>Lista kierowców Free Now ({list.length})</h3>
        </div>
        <div className={style.nameList}>{showList}</div>
      </div>
    </div>
  );
};

export default EditFullNameList;
