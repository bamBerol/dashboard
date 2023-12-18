import { auth } from "../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import axios from "axios";

import style from "./EditEmailList.module.css";
import { useLocation } from "react-router-dom";

const EditEmailList = ({ list, getList }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [addEmail, setAddEmail] = useState({
    email: "",
  });
  const [addEmailError, setAddEmailError] = useState({});

  const location = useLocation();
  const component = location.pathname;

  console.log(component);

  const firebaseUrlFreeNowEmails =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/settelments/freenow.json";

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

  console.log(list);

  const showList = list.map((email) => {
    return (
      <li key={email.id} id={email.id} className={style.listItem}>
        {email.email}
      </li>
    );
  });

  const handleInputChange = (e) => {
    setAddEmail({
      email: e.target.value.toLowerCase(),
    });
  };

  const emailVerification = (addEmail) => {
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
        getList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postEmail = async () => {
    const token = await auth.currentUser.getIdToken();
    axios.post(`${firebaseUrlFreeNowEmails}?auth=${token}`, addEmail);
  };

  useEffect(() => {
    if (Object.keys(addEmailError).length === 0 && isAdded) {
      postEmail();
      setAddEmail({ email: "" });
    } else {
      console.log(addEmailError.email);
    }
  }, [addEmailError]);

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
          <h3>Lista adresów email</h3>
        </div>
        <div className={style.emailList}>
          <ol className={style.list}>{showList}</ol>
        </div>
      </div>
    </div>
  );
};

export default EditEmailList;
