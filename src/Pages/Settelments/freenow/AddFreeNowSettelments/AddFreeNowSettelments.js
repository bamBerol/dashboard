import { auth } from "../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ReactDatePicker from "react-datepicker";

import EmptyInfo from "../../../../components/EmptyInfo/EmptyInfo";

import style from "./AddFreeNowSettelment.module.css";

const AddFreeNowSettelment = ({ emailList, addSettelment }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [settelmentList, setSettelmentList] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const location = useLocation();
  const url = location.pathname.split("/")[2];
  const component = location.pathname.split("/")[3];

  const navigate = useNavigate();

  console.log(emailList);

  useEffect(() => {
    setSettelmentList([...emailList]);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth((prevState) => !prevState);
      } else {
        console.log("state changed - logout");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDatePickFrom = (date) => {
    const fromDate = format(date, "dd/MM/RRRR");
    setStartDate(fromDate);
  };

  const handleDatePickTo = (date) => {
    const fromDate = format(date, "dd/MM/RRRR");
    setEndDate(fromDate);
  };

  const handleChange = (e) => {
    const id = e.currentTarget.id;
    const amount = e.target.value;
    console.log(amount, id);
    const updateObj = settelmentList.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          value: amount,
        };
      }
      return obj;
    });
    setSettelmentList(updateObj);
  };

  const handleNavigate = () => {
    navigate("/settelments/freenow/editEmailList");
  };

  const handleAddSettelment = () => {
    if (Object.keys(emailList).length === 0) return;
    console.log("klikniete dodaj rozliczenie");

    if (isAuth) {
      const formData = {
        dateFrom: startDate,
        dateTo: endDate,
        settelment: [...settelmentList],
      };

      addSettelment(formData, component);
      setStartDate("");
      setEndDate("");
      setSettelmentList(emailList);
      navigate("/settelments/freenow");
    }
  };

  const list = emailList.map((email) => {
    return (
      <div key={email.id} className={style.emailItem}>
        <div className={style.detail}>
          <div className={style.detailEmail}>
            <p>{email.email}</p>
          </div>
          <div className={style.detailInput}>
            <input
              id={email.id}
              type="number"
              placeholder="Wpisz kwotę"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={style.containerAddFreeNow}>
      <div className={style.datePicker}>
        <p>Wybierz okres rozliczenia:</p>
        <div className={style.datePickerFrom}>
          <p>od:</p>
          <ReactDatePicker
            className={style.datePickerCalendar}
            value={startDate}
            onChange={handleDatePickFrom}
            placeholderText="Kliknij aby wybrać datę"
            withPortal
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            autoComplete="off"
          />
        </div>
        <div className={style.datePickerTo}>
          <p>do:</p>
          <ReactDatePicker
            className={style.datePickerCalendar}
            value={endDate}
            onChange={handleDatePickTo}
            placeholderText="Kliknij aby wybrać datę"
            withPortal
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            autoComplete="off"
          />
        </div>
      </div>
      {Object.keys(emailList).length === 0 ? (
        <div className={style.info}>
          <EmptyInfo url={url} />
          <div className={style.infoBtn}>
            <div className={style.addSettelmentBtn} onClick={handleNavigate}>
              <p>Dodaj adres email</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={style.email}>
            <div className={style.listOfEmails}>{list}</div>
          </div>
          <div className={style.settelmentBtn}>
            <div
              className={style.addSettelmentBtn}
              onClick={handleAddSettelment}>
              <p>Dodaj rozliczenie</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddFreeNowSettelment;
