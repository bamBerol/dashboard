import { auth } from "../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

import style from "./EditEmailList.module.css";

const EditEmailList = ({ list, addEmailData, deleteEmail }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [addEmail, setAddEmail] = useState({
    email: "",
  });
  const [addEmailError, setAddEmailError] = useState({});
  const [emailToDelete, setEmailToDelete] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const location = useLocation();
  const component = location.pathname.split("/")[2];

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

  const handleEmailOptions = (e) => {
    setEmailToDelete(e.currentTarget.id);
    setWidth(e.currentTarget.offsetWidth);
    setHeight(e.currentTarget.offsetHeight);
  };

  const handleDelete = (e) => {
    const fullurl = location.pathname;
    const cutUrl = fullurl.split("/editEmailList");
    const url = cutUrl[0];

    deleteEmail(emailToDelete, url);
  };

  const handleConfirm = () => {
    console.log("ten mail nie bedzie wykasowany", emailToDelete);
    setEmailToDelete("");
  };

  const handleInputChange = (e) => {
    setAddEmail({
      email: e.target.value.toLowerCase(),
    });
    setEmailToDelete("");
  };

  const emailVerification = (addEmail) => {
    console.log("weryfikacja maila");
    const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const error = {};
    if (!addEmail.email) {
      error.email = "Adres e-mail jest wymagany";
    } else if (!emailCheck.test(addEmail.email)) {
      error.email = "Podany e-mail jest błędny";
    }
    return error;
  };

  const handleAddEmail = () => {
    try {
      if (isAuth) {
        setAddEmailError(emailVerification(addEmail));
        setIsAdded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(addEmailError).length === 0 && isAdded) {
      console.log("wysyłam", addEmail);
      addEmailData(addEmail, component);
      setAddEmail({ email: "" });
    } else {
      console.log(addEmailError.email);
    }
  }, [addEmailError]);

  const showList = list.map((email) => {
    return (
      <div
        key={email.id}
        id={email.id}
        className={style.listItem}
        onClick={handleEmailOptions}
        style={
          email.id === emailToDelete
            ? { width: `${width}px`, height: `${height}px` }
            : {}
        }>
        {emailToDelete === email.id ? (
          <div className={style.options}>
            <div className={style.icon} onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </div>
            <div className={style.icon} onClick={handleConfirm}>
              <FontAwesomeIcon icon={faCheck} size="sm" />
            </div>
          </div>
        ) : (
          <p className={style.email}>{email.email}</p>
        )}
      </div>
    );
  });

  return (
    <div className={style.container}>
      <div className={style.addEmail}>
        <div className={style.addEmailInput}>
          <input
            type="email"
            className={
              Object.keys(addEmailError).length === 0
                ? `${style.inputOk}`
                : `${style.inputError}`
            }
            placeholder="Wpisz email"
            value={addEmail.email}
            onChange={handleInputChange}
          />
          {Object.keys(addEmailError).length === 0 ? (
            <p className={style.errorMsgOff}>Error msg</p>
          ) : (
            <p className={style.errorMsg}>{addEmailError.email}</p>
          )}
        </div>
        <div>
          <div className={style.addEmailBtn} onClick={handleAddEmail}>
            <p>Dodaj email</p>
          </div>
        </div>
      </div>
      <div className={style.emailListContainer}>
        <div className={style.subtitle}>
          <h3>Lista adresów email ({list.length})</h3>
        </div>
        <div className={style.emailList}>{showList}</div>
      </div>
    </div>
  );
};

export default EditEmailList;
