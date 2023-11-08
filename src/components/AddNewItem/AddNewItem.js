import { useEffect, useState } from "react";
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
  const [isSubmit, setIsSubmit] = useState(false);

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
      // console.log(carFormData);
      setCarErrors(validateForm(carFormData, component));
      setIsSubmit(true);
    }
    if (component === "drivers") {
      console.log("kierowca add");
      // console.log(driverFormData);
      setDriverErrors(validateForm(driverFormData, component));
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    if (component === "cars") {
      if (Object.keys(carErrors).length === 0 && isSubmit) {
        props.submit(carFormData, component);
        setCarFormData({
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
        navigate(`/${component}`);
        console.log(carFormData);
      }
    }
    if (component === "drivers") {
      if (Object.keys(driverErrors).length === 0 && isSubmit) {
        props.submit(driverFormData, component);
        setCarFormData({
          id: uuidv4(),
          driverName: "",
          driverSurname: "",
          number: "",
          carMake: "",
          plate: "",
        });
        navigate(`/${component}`);
      }
    }
  }, [carErrors, driverErrors]);

  const validateForm = (values, component) => {
    const errors = {};
    const numberCheck = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3}$/g;
    const plateCheck = /^([a-z0-9]{2,3})[ ]([a-z0-9]{4,5})/g;
    if (component === "cars") {
      if (!values.carMake) {
        errors.carMake = "Marka jest wymagana";
      }
      if (!values.carModel) {
        errors.carModel = "Model jest wymagany";
      }
      if (!values.plate) {
        errors.plate = "Numer rejestracyjny jest wymagany";
      } else if (!plateCheck.test(values.plate)) {
        errors.plate =
          "Poprawny numer rejestracyjny powinien mieć 2-3 znaki, spacja, 4-5 znaków";
      }
      if (!values.dateCarInspection) {
        errors.dateCarInspection = "Data wykonania przeglądu jest wymagana";
      }
      if (!values.insuranceDate) {
        errors.insuranceDate = "Data końca ubezpieczenia jest wymagana";
      }
      return errors;
    }
    if (component === "drivers") {
      if (!values.carMake) {
        errors.carMake = "Marka jest wymagana";
      }
      if (!values.number) {
        errors.number = "Numer jest wymagany";
      } else if (!numberCheck.test(values.number)) {
        errors.number = "Wprowadź poprawny numer telefonu";
      }
      if (!values.driverName) {
        errors.driverName = "Imię jest wymagane";
      }
      if (!values.driverSurname) {
        errors.driverSurname = "Nazwisko jest wymagane";
      }
      if (!values.plate) {
        errors.plate = "Numer rejestracyjny jest wymagany";
      } else if (!plateCheck.test(values.plate)) {
        errors.plate =
          "Poprawny numer rejestracyjny powinien mieć 2-3 znaki, spacja, 4-5 znaków";
      }
    }
    return errors;
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
              <div className={style.carName}>
                <Input
                  component={component}
                  action="add"
                  id="carMake"
                  carFormData={carFormData.carMake}
                  change={handleChange}
                  errorMsg={carErrors.carMake}
                />
                <Input
                  component={component}
                  action="add"
                  id="carModel"
                  carFormData={carFormData.carModel}
                  change={handleChange}
                  errorMsg={carErrors.carModel}
                />
              </div>
              <Input
                component={component}
                action="add"
                id="plate"
                carFormData={carFormData.plate}
                change={handleChange}
                errorMsg={carErrors.plate}
              />
              <DataPicker
                component={component}
                action="add"
                id="inspectionDate"
                carFormData={carFormData.dateCarInspection}
                change={handleDateCarInspectionChange}
                errorMsg={carErrors.dateCarInspection}
              />
              <DataPicker
                component={component}
                action="add"
                id="insuranceDate"
                carFormData={carFormData.insuranceDate}
                change={handleInsuranceDateChange}
                errorMsg={carErrors.insuranceDate}
              />
            </>
          ) : (
            <>
              <div className={style.driverFullName}>
                <Input
                  component={component}
                  action="add"
                  id="driverName"
                  driverFormData={driverFormData.driverName}
                  change={handleChange}
                  errorMsg={driverErrors.driverName}
                />
                <Input
                  component={component}
                  action="add"
                  id="driverSurname"
                  driverFormData={driverFormData.driverSurname}
                  change={handleChange}
                  errorMsg={driverErrors.driverSurname}
                />
              </div>
              <Input
                component={component}
                action="add"
                id="number"
                type="number"
                driverFormData={driverFormData.number}
                change={handleChange}
                errorMsg={driverErrors.number}
              />
              <Input
                component={component}
                action="add"
                id="carMake"
                driverFormData={driverFormData.carMake}
                change={handleChange}
                errorMsg={driverErrors.carMake}
              />
              <Input
                component={component}
                action="add"
                id="plate"
                driverFormData={driverFormData.plate}
                change={handleChange}
                errorMsg={driverErrors.plate}
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
