import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import DataPicker from "../DataPicker/DataPicker";
import Input from "../Input/Input";

import style from "./EditItem.module.css";

const EditItem = (props) => {
  const [editCarData, setEditCarData] = useState({
    carName: "",
    plate: "",
    dateCarInspection: "",
    insuranceDate: "",
  });
  const [editDriverData, setEditDriverData] = useState({
    driver: "",
    email: "",
    carName: "",
    plate: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const carDetail = props.carsData.filter((car) => car.id === id);

    if (carDetail.length !== 0) {
      setEditCarData(carDetail[0]);
    }
  }, [props.carsDate]);

  const handleCarNameChange = (e) => {
    setEditCarData({ ...editCarData, carName: e.target.value });
  };

  const handlePlateChange = (e) => {
    setEditCarData({ ...editCarData, plate: e.target.value });
  };

  const handleDateCarInspectionChange = (date) => {
    const inspectionDate = format(date, "dd/MM/RRRR");
    setEditCarData({ ...editCarData, dateCarInspection: inspectionDate });
  };

  const handleInsuranceDateChange = (date) => {
    const dateInsurance = format(date, "dd/MM/RRRR");
    setEditCarData({ ...editCarData, insuranceDate: dateInsurance });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.edit(editCarData);
    setEditCarData({
      carName: "",
      plate: "",
      dateCarInspection: "",
      insuranceDate: "",
    });
    navigate("/cars");
  };

  return (
    <div className={style.editCar}>
      <h2 className={style.title}>Edytuj samochód</h2>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <Input
            component="edit"
            id="carName"
            label="Marka i model samochodu:"
            type="text"
            example="Np. Skoda Rapid"
            editCarData={editCarData.carName}
            change={handleCarNameChange}
          />
          <Input
            component="edit"
            id="plate"
            label="Numer rejestracyjny pojazdu:"
            type="text"
            example="Np. WY 902398"
            editCarData={editCarData.plate}
            change={handlePlateChange}
          />
          <DataPicker
            component="edit"
            id="inspectionDate"
            label="Data wykonania badania technicznego:"
            change={handleDateCarInspectionChange}
            editCarData={editCarData.dateCarInspection}
          />

          <DataPicker
            component="edit"
            id="insuranceDate"
            label="Ubezpieczenie ważne do:"
            change={handleInsuranceDateChange}
            editCarData={editCarData.insuranceDate}
          />
          <button type="submit" className={style.editBtn}>
            Zapisz
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
