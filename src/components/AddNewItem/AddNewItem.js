import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { differenceInDays, addYears, format } from "date-fns";
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
    nextCarInspection: "",
    daysLeft: "",
    insuranceDate: "",
    insuranceDaysLeft: "",
  });
  const [driverFormData, setDriverFormData] = useState({
    id: uuidv4(),
    driver: "",
    number: "",
    carName: "",
    plate: "",
  });

  const navigate = useNavigate();

  const location = useLocation();
  const component = location.pathname.split("/")[1];

  const todayDate = new Date();

  const title = component === "cars" ? "samochód" : "kierowcę";

  const handleChange = (e) => {
    console.log(component, e.currentTarget.id);
    if (component === "cars") {
      switch (e.currentTarget.id) {
        case "carName":
          console.log("carName zmiana");
          setCarFormData({ ...carFormData, carName: e.target.value });
          break;
        case "plate":
          setCarFormData({ ...carFormData, plate: e.target.value });
          break;
        default:
          console.log("cos poszlo nie tak");
      }
    }
    switch (e.currentTarget.id) {
      case "driver":
        setDriverFormData({ ...driverFormData, driver: e.target.value });
        break;
      case "number":
        console.log(e.target.value);
        setDriverFormData({ ...driverFormData, number: e.target.value });
        break;
      case "carName":
        setDriverFormData({ ...driverFormData, carName: e.target.value });
        break;
      case "plate":
        setDriverFormData({ ...driverFormData, plate: e.target.value });
        break;
      default:
        console.log("cos poszlo nie tak");
    }
  };

  const handleDateCarInspectionChange = (date) => {
    const addYear = addYears(date, 1);
    const inspectionDate = format(date, "dd/MM/RRRR");
    const endInspectionDate = format(addYear, "dd/MM/RRRR");
    const daysLeft = differenceInDays(addYear, todayDate);

    setCarFormData({
      ...carFormData,
      dateCarInspection: inspectionDate,
      nextCarInspection: endInspectionDate,
      daysLeft: daysLeft,
    });
  };

  const handleInsuranceDateChange = (date) => {
    const dateInsurance = format(date, "dd/MM/RRRR");
    const insuranceDaysLeft = differenceInDays(date, todayDate);

    setCarFormData({
      ...carFormData,
      insuranceDate: dateInsurance,
      insuranceDaysLeft: insuranceDaysLeft,
    });
  };

  const handleSubmit = (component, e) => {
    e.preventDefault();

    if (component === "cars") {
      console.log("samochód add");
      console.log(carFormData);
      props.submit(carFormData, component);
      setCarFormData({
        id: uuidv4(),
        carName: "",
        plate: "",
        dateCarInspection: "",
        nextCarInspection: "",
        daysLeft: "",
        insuranceDate: "",
        insuranceDaysLeft: "",
      });
    } else {
      console.log("kierowca add");
      console.log(driverFormData);
      props.submit(driverFormData, component);
      setCarFormData({
        id: uuidv4(),
        driver: "",
        number: "",
        carName: "",
        plate: "",
      });
    }

    navigate(`/${component}`);
  };

  return (
    <div className={style.addCar}>
      <h2 className={style.title}>Dodaj {title}</h2>
      <div className={style.container}>
        <form
          className={style.form}
          onSubmit={(e) => handleSubmit(component, e)}>
          {component === "cars" ? (
            <>
              <Input
                component={component}
                action="add"
                id="carName"
                carFormData={carFormData.carName}
                change={handleChange}
              />
              <Input
                component={component}
                action="add"
                id="plate"
                carFormData={carFormData.plate}
                change={handleChange}
              />
              <DataPicker
                component={component}
                action="add"
                id="inspectionDate"
                carFormData={carFormData.dateCarInspection}
                change={handleDateCarInspectionChange}
              />
              <DataPicker
                component={component}
                action="add"
                id="insuranceDate"
                carFormData={carFormData.insuranceDate}
                change={handleInsuranceDateChange}
              />
            </>
          ) : (
            <>
              <Input
                component={component}
                action="add"
                id="driver"
                driverFormData={driverFormData.driver}
                change={handleChange}
              />
              <Input
                component={component}
                action="add"
                id="number"
                type="number"
                driverFormData={driverFormData.email}
                change={handleChange}
              />
              <Input
                component={component}
                action="add"
                id="carName"
                driverFormData={driverFormData.carName}
                change={handleChange}
              />
              <Input
                component={component}
                action="add"
                id="plate"
                driverFormData={driverFormData.plate}
                change={handleChange}
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
