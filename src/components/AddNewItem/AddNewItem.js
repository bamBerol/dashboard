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
    carMake: "",
    carModel: "",
    plate: "",
    dateCarInspection: "",
    nextCarInspection: "",
    daysLeft: "",
    insuranceDate: "",
    insuranceDaysLeft: "",
  });
  const [driverFormData, setDriverFormData] = useState({
    id: uuidv4(),
    driverName: "",
    driverSurname: "",
    number: "",
    carMake: "",
    plate: "",
  });
  const [carErrors, setCarErrors] = useState({});
  const [driverErrors, setDriverErrors] = useState({});

  const navigate = useNavigate();

  const location = useLocation();
  const component = location.pathname.split("/")[1];

  const todayDate = new Date();

  const title = component === "cars" ? "samochód" : "kierowcę";

  const handleChange = (e) => {
    console.log(component, e.currentTarget.id);
    if (component === "cars") {
      setCarFormData({
        ...carFormData,
        [e.currentTarget.id]: e.target.value.toLowerCase(),
      });
    }
    if (component === "drivers") {
      setDriverFormData({
        ...driverFormData,
        [e.currentTarget.id]: e.target.value.toLowerCase(),
      });
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
      setCarErrors(validateForm(carFormData, component));
      // props.submit(carFormData, component);
      // setCarFormData({
      //   id: uuidv4(),
      //   carMake: "",
      //   carModel: "",
      //   plate: "",
      //   dateCarInspection: "",
      //   nextCarInspection: "",
      //   daysLeft: "",
      //   insuranceDate: "",
      //   insuranceDaysLeft: "",
      // });
    } else {
      console.log("kierowca add");
      console.log(driverFormData);
      setDriverErrors(validateForm(driverFormData, component));
      // props.submit(driverFormData, component);
      // setCarFormData({
      //   id: uuidv4(),
      //   driverName: "",
      //   driverSurname: "",
      //   number: "",
      //   carMake: "",
      //   plate: "",
      // });
    }

    navigate(`/${component}`);
  };

  const validateForm = (values, component) => {
    const errors = {};
    if (component === "cars") {
      //console.log(values.carMake);
      if (!values.carMake) {
        console.log("marka jest wymagana");
      }
      if (!values.carModel) {
        console.log("model jest wymagana");
      }
      if (!values.plate) {
        console.log("numer rej. jest wymagana");
      }
      if (!values.dateCarInspection) {
        console.log("data przeglądu jest wymagana");
      }
      if (!values.insuranceDate) {
        console.log("data ubezpieczenia jest wymagana");
      }
    }
    if (component === "drivers") {
      //console.log(values.carMake);
      if (!values.carMake) {
        console.log("marka jest wymagana");
      }
      if (!values.number) {
        console.log("numer jest wymagana");
      }
      if (!values.driverName) {
        console.log("imie  jest wymagana");
      }
      if (!values.driverSurname) {
        console.log("nazwisko  jest wymagana");
      }
      if (!values.plate) {
        console.log("nr rej  jest wymagana");
      }
    }
    return errors;
  };

  return (
    <div className={style.addCar}>
      <h2 className={style.title}>Dodaj {title}</h2>
      <div className={style.container}>
        {/* <pre>{JSON.stringify(carFormData, undefined, 2)}</pre> */}
        <form
          className={style.form}
          onSubmit={(e) => handleSubmit(component, e)}>
          {component === "cars" ? (
            <>
              <div className={style.carName}>
                <Input
                  component={component}
                  action="add"
                  id="carMake"
                  carFormData={carFormData.carName}
                  change={handleChange}
                />
                <Input
                  component={component}
                  action="add"
                  id="carModel"
                  carFormData={carFormData.carName}
                  change={handleChange}
                />
              </div>
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
              <div className={style.driverFullName}>
                <Input
                  component={component}
                  action="add"
                  id="driverName"
                  driverFormData={driverFormData.driver}
                  change={handleChange}
                />
                <Input
                  component={component}
                  action="add"
                  id="driverSurname"
                  driverFormData={driverFormData.driver}
                  change={handleChange}
                />
              </div>
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
                id="carMake"
                driverFormData={driverFormData.carMake}
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
