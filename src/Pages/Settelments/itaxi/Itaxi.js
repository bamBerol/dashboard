import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import style from "./Itaxi.module.css";

const Itaxi = () => {
  const [email, setEmail] = useState([
    {
      email: "",
    },
  ]);
  const [emailError, setEmailError] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const location = useLocation();
  const component = location.pathname.split("/")[1];

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

  const firebaseUrlItaxi =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/itaxi.json";

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setEmail({ email: e.target.value });
  };

  const emailValidation = (value) => {
    console.log(value.email);
    const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let errorEmail = "";

    if (!value.email) {
      console.log("pole jest puste");
      errorEmail = "Adres e-mail jest wymagany";
    } else if (!emailCheck.test(value.email)) {
      console.log("email nie spelnia warunkow");
      errorEmail = "Podany e-mail jest błędny";
    }

    return errorEmail;
  };

  const handleAddToDatabase = async () => {
    const token = await auth.currentUser.getIdToken();
    if (isAuth) {
      try {
        console.log("wysylanie");
        await axios.post(`${firebaseUrlItaxi}?auth=${token}`, email);
        setEmail({ email: "" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddEmail = () => {
    setEmailError(emailValidation(email));
  };

  useEffect(() => {
    console.log(emailError);
    console.log(Object.values(email)[0].length);
    console.log(Object.values(email).length);
    if (emailError.length === 0 && Object.values(email)[0].length) {
      console.log("dodaje email do bazy");
      handleAddToDatabase();
      setEmailError("");
    }
  }, [emailError]);

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h3>Itaxi</h3>
      </div>
      <div className={style.settelments}>
        <div className={style.addContainer}>
          <div className={style.addInput}>
            <input
              className={
                emailError ? style.addEmailInputError : style.addEmailInput
              }
              type="email"
              placeholder="Wpisz adres e-mail"
              value={email.email}
              onChange={handleInputChange}
            />
            {emailError ? (
              <p className={style.error}>{emailError}</p>
            ) : (
              <p className={style.errorOff}>tu bedzie blad</p>
            )}
          </div>
          <div className={style.button}>
            <div className={style.addBtn} onClick={handleAddEmail}>
              <FontAwesomeIcon icon={faPlus} size="sm" />
              <p>Dodaj email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itaxi;
