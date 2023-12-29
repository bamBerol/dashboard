import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addYears, format } from "date-fns";

import Input from "../Input/Input";
import DataPicker from "../DataPicker/DataPicker";

import "react-datepicker/dist/react-datepicker.css";
import style from "./AddNewItem.module.css";

const AddCar = (props) => {
  const [carsList, setCarsList] = useState([]);
  const [carFormData, setCarFormData] = useState({
    carMake: "",
    carModel: "",
    plate: "",
    dateCarInspection: "",
    nextCarInspection: "",
    insuranceDate: "",
    legalizationDate: "",
  });
  const [driverFormData, setDriverFormData] = useState({
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
  console.log(component);

  const title = component === "cars" ? "samochód" : "kierowcę";
  let options;

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

  const handleChangeSelect = (e) => {
    // console.log(e.target.value);
    const car = carsList.filter((carDetail) => carDetail.id === e.target.value);
    // console.log(car[0]);

    setDriverFormData({
      ...driverFormData,
      carMake: car[0].carMake,
      plate: car[0].plate,
    });
  };

  const handleDateCarInspectionChange = (date) => {
    const addYear = addYears(date, 1);
    const inspectionDate = format(date, "dd/MM/RRRR");
    const endInspectionDate = format(addYear, "dd/MM/RRRR");

    setCarFormData({
      ...carFormData,
      dateCarInspection: inspectionDate,
      nextCarInspection: endInspectionDate,
    });
  };

  const handleInsuranceDateChange = (date) => {
    const dateInsurance = format(date, "dd/MM/RRRR");

    setCarFormData({
      ...carFormData,
      insuranceDate: dateInsurance,
    });
  };
  const handleLegalizationDateChange = (date) => {
    const dateLegalization = format(date, "dd/MM/RRRR");

    setCarFormData({
      ...carFormData,
      legalizationDate: dateLegalization,
    });
  };

  const handleSubmit = (component, e) => {
    e.preventDefault();

    // console.log(component, driverFormData);

    if (component === "cars") {
      setCarErrors(validateForm(carFormData, component));
      setIsSubmit(true);
    }
    if (component === "drivers") {
      setDriverErrors(validateForm(driverFormData, component));
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    if (component === "drivers") {
      setCarsList([...props.cars]);
    }
  }, []);

  useEffect(() => {
    if (component === "cars") {
      if (Object.keys(carErrors).length === 0 && isSubmit) {
        props.submit(carFormData, component);
        setCarFormData({
          carMake: "",
          carModel: "",
          plate: "",
          dateCarInspection: "",
          nextCarInspection: "",
          insuranceDate: "",
          legalizationDate: "",
        });
        navigate(`/${component}`);
        // console.log(carFormData);
      }
    }
    if (component === "drivers") {
      if (Object.keys(driverErrors).length === 0 && isSubmit) {
        props.submit(driverFormData, component);
        setCarFormData({
          driverName: "",
          driverSurname: "",
          number: "",
          carMake: "",
          email: "",
          plate: "",
        });
        navigate(`/${component}`);
      }
    }
  }, [carErrors, driverErrors]);

  // console.log(props.cars.length);

  if (carsList.length !== 0) {
    options = carsList.map((car) => {
      const make = car.carMake;
      const capitalize = make.charAt(0).toUpperCase() + make.slice(1);

      return (
        <option
          key={car.id}
          value={car.id}
          // value={`${car.carMake} ${car.plate}`}
        >
          {capitalize} {car.plate.toUpperCase()}
        </option>
      );
    });
  }

  const validateForm = (values, component) => {
    const errors = {};
    const numberCheck = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3}$/g;
    const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
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
          "Poprawny numer rejestracyjny powinien mieć 2-3 znaki, odstęp i 4-5 znaków";
      }
      if (!values.dateCarInspection) {
        errors.dateCarInspection = "Data wykonania przeglądu jest wymagana";
      }
      if (!values.insuranceDate) {
        errors.insuranceDate = "Data końca ubezpieczenia jest wymagana";
      }
      if (!values.legalizationDate) {
        errors.legalizationDate =
          "Data ważności legalizacji taksometru jest wymagana";
      }
      return errors;
    }
    if (component === "drivers") {
      if (!values.driverName) {
        errors.driverName = "Imię jest wymagane";
      }
      if (!values.driverSurname) {
        errors.driverSurname = "Nazwisko jest wymagane";
      }
      if (!values.number) {
        errors.number = "Numer jest wymagany";
      } else if (!numberCheck.test(values.number)) {
        errors.number = "Wprowadź poprawny numer telefonu";
      }
      if (!values.email) {
        errors.email = "Adres e-mail jest wymagany";
      } else if (!emailCheck.test(values.email)) {
        errors.email =
          "Podany e-mail jest błędny. Poprawny adres email to np. google@gmail.com";
      }
      if (!values.carMake) {
        errors.carMake = "Marka jest wymagana";
      }
      if (!values.plate) {
        errors.plate = "Numer rejestracyjny jest wymagany";
      } else if (!plateCheck.test(values.plate)) {
        errors.plate =
          "Poprawny numer rejestracyjny powinien mieć 2-3 znaki, odstęp i 4-5 znaków";
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
              <div className={style.carPlate}>
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
              </div>
              <div className={style.date}>
                <DataPicker
                  component={component}
                  action="add"
                  id="insuranceDate"
                  carFormData={carFormData.insuranceDate}
                  change={handleInsuranceDateChange}
                  errorMsg={carErrors.insuranceDate}
                />
                <DataPicker
                  component={component}
                  action="add"
                  id="legalizationDate"
                  carFormData={carFormData.legalizationDate}
                  change={handleLegalizationDateChange}
                  errorMsg={carErrors.legalizationDate}
                />
              </div>
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
              <div className={style.contactData}>
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
                  id="email"
                  type="email"
                  driverFormData={driverFormData.email}
                  change={handleChange}
                  errorMsg={driverErrors.email}
                />
              </div>
              <div className={style.carSelect}>
                <select
                  id="carsList"
                  className={style.carsList}
                  onChange={handleChangeSelect}>
                  <option value="Wybierz samochód">Wybierz samochód</option>
                  {options}
                </select>
              </div>
              {/* <Input
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
              /> */}
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
