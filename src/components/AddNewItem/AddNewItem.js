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

  const navigate = useNavigate();

  const location = useLocation();
  const component = location.pathname.split("/")[1];

  const todayDate = new Date();

  const title = component === "cars" ? "samochód" : "kierowcę";

  const handleChange = (e) => {
    console.log(component, e.currentTarget.id);
    if (component === "cars") {
      switch (e.currentTarget.id) {
        case "carMake":
          console.log("zmiana marki");
          setCarFormData({
            ...carFormData,
            carMake: e.target.value.toLowerCase(),
          });
          break;
        case "carModel":
          console.log("zmiana modelu");
          setCarFormData({
            ...carFormData,
            carModel: e.target.value.toLowerCase(),
          });
          break;
        case "plate":
          setCarFormData({
            ...carFormData,
            plate: e.target.value.toUpperCase(),
          });
          break;
        default:
          console.log("cos poszlo nie tak");
      }
    }
    switch (e.currentTarget.id) {
      case "driverName":
        setDriverFormData({
          ...driverFormData,
          driverName: e.target.value.toLowerCase(),
        });
        break;
      case "driverSurname":
        setDriverFormData({
          ...driverFormData,
          driverSurname: e.target.value.toLowerCase(),
        });
        break;
      case "number":
        console.log(e.target.value);
        setDriverFormData({ ...driverFormData, number: e.target.value });
        break;
      case "carMake":
        setDriverFormData({
          ...driverFormData,
          carMake: e.target.value.toLowerCase(),
        });
        break;
      case "plate":
        setDriverFormData({
          ...driverFormData,
          plate: e.target.value.toUpperCase(),
        });
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
        carMake: "",
        carModel: "",
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
        driverName: "",
        driverSurname: "",
        number: "",
        carMake: "",
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
