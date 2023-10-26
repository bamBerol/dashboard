import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import Input from "../Input/Input";
import DataPicker from "../DataPicker/DataPicker";

import "react-datepicker/dist/react-datepicker.css";
import style from "./AddNewItem.module.css";

const AddCar = (props) => {
  const [carFormData, setCarFormData] = useState({
    id: uuidv4(),
    carName: "",
    plate: "",
    dateCarInspection: "",
    insuranceDate: "",
  });
  const [driverFormData, setDriverFormData] = useState({
    id: uuidv4(),
    driver: "",
    email: "",
    carName: "",
    plate: "",
  });

  const navigate = useNavigate();

  const location = useLocation();
  const component = location.pathname.split("/")[1];

  const title = component === "cars" ? "samochód" : "kierowcę";

  const handleCarNameChange = (e) => {
    setCarFormData({ ...carFormData, carName: e.target.value });
  };

  const handlePlateChange = (e) => {
    setCarFormData({ ...carFormData, plate: e.target.value });
  };

  const handleDateCarInspectionChange = (date) => {
    const inspectionDate = format(date, "dd/MM/RRRR");
    setCarFormData({ ...carFormData, dateCarInspection: inspectionDate });
  };

  const handleInsuranceDateChange = (date) => {
    const dateInsurance = format(date, "dd/MM/RRRR");
    setCarFormData({ ...carFormData, insuranceDate: dateInsurance });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submit(carFormData);
    setCarFormData({
      id: uuidv4(),
      carName: "",
      plate: "",
      dateCarInspection: "",
      insuranceDate: "",
    });
    navigate(`/${component}`);
  };

  return (
    <div className={style.addCar}>
      <h2 className={style.title}>Dodaj {title}</h2>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          {component === "cars" ? (
            <>
              <Input
                component="add"
                id="carName"
                example="Np. Skoda Rapid"
                carFormData={carFormData.carName}
                change={handleCarNameChange}
              />
              <Input
                component="add"
                id="plate"
                example="Np. WY 902398"
                carFormData={carFormData.plate}
                change={handlePlateChange}
              />
              <DataPicker
                component="add"
                id="inspectionDate"
                label="Data wykonania badania technicznego:"
                carFormData={carFormData.dateCarInspection}
                change={handleDateCarInspectionChange}
              />
              <DataPicker
                component="add"
                id="insuranceDate"
                label="Ubezpieczenie ważne do:"
                carFormData={carFormData.insuranceDate}
                change={handleInsuranceDateChange}
              />
            </>
          ) : (
            <>
              <Input
                component="add"
                id="driver"
                example="Np. Jan Kowalski"
                //carFormData={carFormData.carName}
                //change={handleCarNameChange}
              />
              <Input
                component="add"
                id="email"
                type="email"
                example="Np. jan.kowalski@wp.pl"
                //carFormData={carFormData.plate}
                //change={handlePlateChange}
              />
              <Input
                component="add"
                id="carName"
                example="Np. Skoda Rapid"
                //carFormData={carFormData.carName}
                //change={handleCarNameChange}
              />
              <Input
                component="add"
                id="plate"
                example="Np. WY 902398"
                //carFormData={carFormData.plate}
                //change={handlePlateChange}
              />
            </>
          )}

          <button type="submit" className={style.addBtn}>
            Dodaj {title}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
