import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import style from "./AddCar.module.css";

const AddCar = (props) => {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    carName: "",
    plate: "",
    dateCarInspection: "",
    insuranceDate: "",
  });
  const navigate = useNavigate();

  const handleCarNameChange = (e) => {
    setFormData({ ...formData, carName: e.target.value });
  };

  const handlePlateChange = (e) => {
    setFormData({ ...formData, plate: e.target.value });
  };

  const handleDateCarInspectionChange = (date) => {
    const inspectionDate = format(date, "dd/MM/RRRR");
    setFormData({ ...formData, dateCarInspection: inspectionDate });
  };

  const handleInsuranceDateChange = (date) => {
    const dateInsurance = format(date, "dd/MM/RRRR");
    setFormData({ ...formData, insuranceDate: dateInsurance });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submit(formData);
    setFormData({
      id: uuidv4(),
      carName: "",
      plate: "",
      dateCarInspection: "",
      insuranceDate: "",
    });
    navigate("/cars");
  };

  return (
    <div className={style.addCar}>
      <h2 className={style.title}>Dodaj samochód</h2>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formInput}>
            <label htmlFor="carName">Marka i model samochodu:</label>
            <input
              id="carName"
              type="text"
              placeholder="Np. Skoda Rapid"
              value={formData.carName}
              onChange={handleCarNameChange}
            />
          </div>
          <div className={style.formInput}>
            <label htmlFor="plate">Numer rejestracyjny:</label>
            <input
              id="plate"
              type="text"
              placeholder="Np. WY 902398"
              value={formData.plate}
              onChange={handlePlateChange}
            />
          </div>

          <div className={style.formInput}>
            <label htmlFor="inspectionDate">Data badania technicznego:</label>
            <ReactDatePicker
              id="inspectionDate"
              value={formData.dateCarInspection}
              onChange={handleDateCarInspectionChange}
              placeholderText="Kliknij aby wybrać datę"
              withPortal
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          <div className={style.formInput}>
            <label htmlFor="insuranceDate">Data ważności ubezpieczenia:</label>
            <ReactDatePicker
              id="insuranceDate"
              value={formData.insuranceDate}
              onChange={handleInsuranceDateChange}
              placeholderText="Kliknij aby wybrać datę"
              withPortal
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <button type="submit" className={style.addBtn}>
            Dodaj samochód
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
