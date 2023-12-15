import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import style from "./Sumup.module.css";

const Sumup = (props) => {
  const [email, setEmail] = useState([
    {
      email: "",
    },
  ]);
  const [amount, setAmount] = useState("");
  // const [convertedAmount, setConvertedAmount] = useState();
  const [sumupData, setSumupData] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const location = useLocation();
  const component = location.pathname.split("/")[1];

  const firebaseUrlSettelments =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/settelments.json";

  const firebaseUrlSumup =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/settelments/sumup.json";

  const getSettelmentsData = async () => {
    try {
      console.log("pobieranie rozliczenia");
      const token = await auth.currentUser.getIdToken();
      await axios.get(`${firebaseUrlSettelments}?auth=${token}`).then((res) => {
        console.log(res.data.sumup);
        const sumup = [];
        for (const key in res.data.sumup) {
          sumup.push({ ...res.data.sumup[key], id: key });
        }
        setSumupData(sumup);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("zalogowany settelments");
        getSettelmentsData();
        console.log(sumupData);
        setIsAuth(true);
      } else {
        console.log("state changed - logout");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setEmail({ email: e.target.value });
  };

  const emailValidation = (value) => {
    console.log(value.email);
    const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let errorEmail = "";

    if (value.email && emailCheck.test(value.email)) {
      console.log("email jest ok");
      setIsSubmit(true);
    }

    if (!value.email) {
      console.log("pole jest puste");
      errorEmail = "Adres e-mail jest wymagany";
    } else if (!emailCheck.test(value.email)) {
      console.log("email nie spelnia warunkow");
      errorEmail = "Podany e-mail jest błędny";
    }

    return errorEmail;
  };

  const handleAddEmail = () => {
    console.log("weryfikacja maila");
    setEmailError(emailValidation(email));
  };

  const handleAddToDatabase = async () => {
    const token = await auth.currentUser.getIdToken();
    if (isAuth) {
      try {
        console.log("wysylanie");
        await axios.post(`${firebaseUrlSumup}?auth=${token}`, email);
        getSettelmentsData();
        setEmail({ email: "" });
        setIsSubmit(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log("useEffect executed");
    if (emailError.length === 0 && isSubmit) {
      console.log("dodaje email do bazy");
      handleAddToDatabase();
    }
  }, [emailError, isSubmit]);

  // const emailList = sumupData.map((email) => {
  //   console.log(email);
  //   return (
  //     <div id={email.id} className={style.email}>
  //       <p>{email.email}</p>
  //       <input type="number" placeholder="Wpisz kwotę" />
  //     </div>
  //   );
  // });
  const handleConvert = () => {
    const value = Number(amount);
    const percentOfValue = (value * 3) / 100;
    const fee = 30;
    const convertedValue = (value - percentOfValue - fee).toFixed(2);

    return convertedValue;
  };

  const handleAmountInputChange = (e) => {
    setAmount(e.target.value);
    handleConvert();
  };

  const convertedAmount = amount
    ? handleConvert()
    : "Wpisz kwotę do przeliczenia";

  return (
    <div className={style.container}>
      {/* <div className={style.title}>
        <h3>SumUp</h3>
      </div> */}
      <div className={style.settelments}>
        {/* <div className={style.addContainer}>
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
              <p className={style.errorOff}>Błąd</p>
            )}
          </div>
          <div className={style.button}>
            <div className={style.addBtn} onClick={handleAddEmail}>
              <FontAwesomeIcon icon={faPlus} size="sm" />
              <p>Dodaj email</p>
            </div>
          </div>
        </div> */}
        <div className={style.calculatorContainer}>
          <div className={style.calculator}>
            <div className={style.calculatorInput}>
              <input
                type="number"
                placeholder="Wpisz kwotę"
                onChange={handleAmountInputChange}
                value={amount}
              />
            </div>
            <div className={style.convertedAmount}>
              <div className={style.calculatorResult}>
                <p>Kwota uzyskana po przeliczeniu to:</p>
                <h3 className>{convertedAmount}</h3>
              </div>
            </div>
          </div>
          {/* <div className={style.convertBtn} onClick={handleConvertAmount}>
              <p>Przelicz</p>
            </div> */}
        </div>
        {/* <div className={style.mailContainer}>
          <div className={style.emailList}>{emailList}</div>
        </div> */}
      </div>
    </div>
  );
};

export default Sumup;
