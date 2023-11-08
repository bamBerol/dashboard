import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { addYears, differenceInDays, format } from "date-fns";

import DataPicker from "../DataPicker/DataPicker";
import Input from "../Input/Input";

import style from "./EditItem.module.css";

const EditItem = (props) => {
  const [editCarData, setEditCarData] = useState({
    carMake: "",
    carModel: "",
    plate: "",
    dateCarInspection: "",
    insuranceDate: "",
  });
  const [editDriverData, setEditDriverData] = useState({
    driverName: "",
    driverSurname: "",
    number: "",
    carName: "",
    plate: "",
  });
  const [carEditErrors, setCarEditErrors] = useState({});
  const [driverEditErrors, setDriverEditErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const todayDate = new Date();

  const location = useLocation();
  const component = location.pathname.split("/")[1];

  const title = component === "cars" ? "samochód" : "kierowcę";

  useEffect(() => {
    if (component === "cars") {
      const carDetail = props.carsData.filter((car) => car.id === id);
      console.log(carDetail[0]);
      if (carDetail.length !== 0) {
        setEditCarData(carDetail[0]);
      }
    } else {
      const driverDetail = props.driversData.filter(
        (driver) => driver.id === id
      );
      if (driverDetail.length !== 0) {
        setEditDriverData(driverDetail[0]);
      }
    }
  }, [props.carsDate, props.driversData]);

  const handleChange = (e) => {
    if (component === "cars") {
      setEditCarData({ ...editCarData, [e.currentTarget.id]: e.target.value });
    }
    if (component === "drivers") {
      setEditDriverData({
        ...editDriverData,
        [e.currentTarget.id]: e.target.value,
      });
    }
  };

  const handleDateCarInspectionChange = (date) => {
    console.log(date);
    const addYear = addYears(date, 1);
    const inspectionDate = format(date, "dd/MM/RRRR");
    const endInspectionDate = format(addYear, "dd/MM/RRRR");
    const daysLeft = differenceInDays(addYear, todayDate);

    setEditCarData({
      ...editCarData,
      dateCarInspection: inspectionDate,
      nextCarInspection: endInspectionDate,
      daysLeft: daysLeft,
    });
  };

  const handleInsuranceDateChange = (date) => {
    console.log(date);
    const dateInsurance = format(date, "dd/MM/RRRR");
    const insuranceDaysLeft = differenceInDays(date, todayDate);
    setEditCarData({
      ...editCarData,
      insuranceDate: dateInsurance,
      insuranceDaysLeft: insuranceDaysLeft,
    });
  };

  const handleSubmit = (component, e) => {
    e.preventDefault();
    if (component === "cars") {
      console.log(props);
      console.log("edytowano samochód", editCarData, component);
      setCarEditErrors(validateEditForm(editCarData, component));
      setIsEdit(true);
    }
    if (component === "drivers") {
      console.log("edytowano kierowce", editDriverData);
      setDriverEditErrors(validateEditForm(editDriverData, component));
      setIsEdit(true);
    }
  };

  useEffect(() => {
    if (component === "cars") {
      if (Object.keys(carEditErrors).length === 0 && isEdit) {
        props.edit(editCarData, component);
        navigate(`/${component}`);
      }
    }
    if (component === "drivers") {
      if (Object.keys(driverEditErrors).length === 0 && isEdit) {
        props.edit(editDriverData, component);
        navigate(`/${component}`);
      }
    }
  }, [carEditErrors, driverEditErrors]);

  const validateEditForm = (values, component) => {
    const errors = {};

    if (component === "cars") {
      console.log(values.carMake);
      if (!values.carMake) {
        errors.carMake = "Wypełnij pole";
      }
      if (!values.carModel) {
        errors.carModel = "Wypełnij pole";
      }
      if (!values.plate) {
        errors.plate = "Wypełnij pole";
      }
      if (!values.dateCarInspection) {
        errors.dateCarInspection = "Wypełnij pole";
      }
      if (!values.insuranceDate) {
        errors.insuranceDate = "Wypełnij pole";
      }
      return errors;
    }
    if (component === "drivers") {
      if (!values.driverName) {
        errors.driverName = "Wypełnij pole";
      }
      if (!values.driverSurname) {
        errors.driverSurname = "Wypełnij pole";
      }
      if (!values.number) {
        errors.number = "Wypełnij pole";
      }
      if (!values.carMake) {
        errors.carMake = "Wypełnij pole";
      }
      if (!values.plate) {
        errors.plate = "Wypełnij pole";
      }
      return errors;
    }
  };

  return (
    <div className={style.editCar}>
      <h2 className={style.title}>Edytuj {title}</h2>
      <div className={style.container}>
        <form
          className={style.form}
          onSubmit={(e) => handleSubmit(component, e)}>
          {component === "cars" ? (
            <>
              <div className={style.carName}>
                <Input
                  component={component}
                  action="edit"
                  id="carMake"
                  change={handleChange}
                  editCarData={editCarData.carMake}
                  errorMsg={carEditErrors.carMake}
                />
                <Input
                  component={component}
                  action="edit"
                  id="carModel"
                  change={handleChange}
                  editCarData={editCarData.carModel}
                  errorMsg={carEditErrors.carModel}
                />
              </div>
              <Input
                component={component}
                action="edit"
                id="plate"
                change={handleChange}
                editCarData={editCarData.plate}
                errorMsg={carEditErrors.plate}
              />
              <DataPicker
                component={component}
                action="edit"
                id="inspectionDate"
                editCarData={editCarData.dateCarInspection}
                change={handleDateCarInspectionChange}
                errorMsg={carEditErrors.inspectionDate}
              />
              <DataPicker
                component={component}
                action="edit"
                id="insuranceDate"
                editCarData={editCarData.insuranceDate}
                change={handleInsuranceDateChange}
                errorMsg={carEditErrors.insuranceDate}
              />
            </>
          ) : (
            <>
              <div className={style.driverFullName}>
                <Input
                  component={component}
                  action="edit"
                  id="driverName"
                  editDriverData={editDriverData.driverName}
                  change={handleChange}
                  errorMsg={driverEditErrors.driverName}
                />
                <Input
                  component={component}
                  action="edit"
                  id="driverSurname"
                  editDriverData={editDriverData.driverSurname}
                  change={handleChange}
                  errorMsg={driverEditErrors.driverSurname}
                />
              </div>
              <Input
                component={component}
                action="edit"
                id="number"
                type="number"
                editDriverData={editDriverData.number}
                change={handleChange}
                errorMsg={driverEditErrors.number}
              />
              <Input
                component={component}
                action="edit"
                id="carMake"
                editDriverData={editDriverData.carMake}
                change={handleChange}
                errorMsg={driverEditErrors.carMake}
              />
              <Input
                component={component}
                action="edit"
                id="plate"
                editDriverData={editDriverData.plate}
                change={handleChange}
                errorMsg={driverEditErrors.plate}
              />
            </>
          )}
          <button type="submit" className={style.editBtn}>
            Zapisz
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
