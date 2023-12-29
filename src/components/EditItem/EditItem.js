import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { addYears, format } from "date-fns";
import axios from "axios";

import DataPicker from "../DataPicker/DataPicker";
import Input from "../Input/Input";

import style from "./EditItem.module.css";

const EditItem = (props) => {
  const [editCarData, setEditCarData] = useState({});
  const [carEditErrors, setCarEditErrors] = useState({});
  const [editDriverData, setEditDriverData] = useState({});
  const [driverEditErrors, setDriverEditErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const location = useLocation();
  const component = location.pathname.split("/")[1];

  const title = component === "cars" ? "samochód" : "kierowcę";

  const handleGetDetails = async () => {
    try {
      const token = await auth.currentUser.getIdToken();

      await axios
        .get(
          `https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/${component}/${id}.json?auth=${token}`
        )
        .then((res) => {
          if (component === "cars") {
            setEditCarData(res.data);
          }
          if (component === "drivers") {
            setEditDriverData(res.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetDetails();
  }, [props.carsDate, props.driversData]);

  const handleChange = (e) => {
    if (component === "cars") {
      setEditCarData({
        ...editCarData,
        [e.currentTarget.id]: e.target.value.toLowerCase(),
      });
    }
    if (component === "drivers") {
      setEditDriverData({
        ...editDriverData,
        [e.currentTarget.id]: e.target.value.toLowerCase(),
      });
    }
  };

  const handleDateCarInspectionChange = (date) => {
    console.log(date);
    const addYear = addYears(date, 1);
    const inspectionDate = format(date, "dd/MM/RRRR");
    const endInspectionDate = format(addYear, "dd/MM/RRRR");

    setEditCarData({
      ...editCarData,
      dateCarInspection: inspectionDate,
      nextCarInspection: endInspectionDate,
    });
  };

  const handleInsuranceDateChange = (date) => {
    // console.log(date);
    const dateInsurance = format(date, "dd/MM/RRRR");

    setEditCarData({
      ...editCarData,
      insuranceDate: dateInsurance,
    });
  };
  const handlelegalizationDateChange = (date) => {
    // console.log(date);
    const legalizationDate = format(date, "dd/MM/RRRR");

    setEditCarData({
      ...editCarData,
      legalizationDate: legalizationDate,
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
        props.edit(editCarData, component, id);
        navigate(`/${component}`);
      }
    }
    if (component === "drivers") {
      if (Object.keys(driverEditErrors).length === 0 && isEdit) {
        props.edit(editDriverData, component, id);
        navigate(`/${component}`);
      }
    }
  }, [carEditErrors, driverEditErrors]);

  const validateEditForm = (values, component) => {
    const errors = {};
    const numberCheck = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3}$/g;
    const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const plateCheck = /^([a-z0-9]{2,3})[ ]([a-z0-9]{4,5})/g;

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
      } else if (!plateCheck.test(values.plate)) {
        errors.plate =
          "Poprawny numer rejestracyjny powinien mieć 2-3 znaki, odstęp i 4-5 znaków";
      }
      if (!values.dateCarInspection) {
        errors.dateCarInspection = "Wypełnij pole";
      }
      if (!values.insuranceDate) {
        errors.insuranceDate = "Wypełnij pole";
      }
      if (!values.legalizationDate) {
        errors.legalizationDate = "Wypełnij pole";
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
        errors.carMake = "Wypełnij pole";
      }
      if (!values.plate) {
        errors.plate = "Wypełnij pole";
      } else if (!plateCheck.test(values.plate)) {
        errors.plate =
          "Poprawny numer rejestracyjny powinien mieć 2-3 znaki, odstęp i 4-5 znaków";
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
              <div className={style.date}>
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
              </div>
              <DataPicker
                component={component}
                action="edit"
                id="legalizationDate"
                editCarData={editCarData.legalizationDate}
                change={handlelegalizationDateChange}
                errorMsg={carEditErrors.legalizationDate}
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
              <div className={style.contactData}>
                <Input
                  component={component}
                  action="add"
                  id="number"
                  type="number"
                  driverFormData={editDriverData.number}
                  change={handleChange}
                  errorMsg={driverEditErrors.number}
                />
                <Input
                  component={component}
                  action="add"
                  id="email"
                  type="email"
                  driverFormData={editDriverData.email}
                  change={handleChange}
                  errorMsg={driverEditErrors.email}
                />
              </div>
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
