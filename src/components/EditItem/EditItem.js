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

  const location = useLocation();
  const component = location.pathname.split("/")[1];
  const { id } = useParams();
  const navigate = useNavigate();

  const todayDate = new Date();

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
      switch (e.currentTarget.id) {
        case "carMake":
          setEditCarData({ ...editCarData, carMake: e.target.value });
          break;
        case "carModel":
          setEditCarData({ ...editCarData, carModel: e.target.value });
          break;
        case "plate":
          setEditCarData({ ...editCarData, plate: e.target.value });
          break;
        default:
          console.log("cos poszlo nie tak w cars");
      }
    }
    switch (e.currentTarget.id) {
      case "driverName":
        setEditDriverData({ ...editDriverData, driverName: e.target.value });
        break;
      case "driverSurname":
        setEditDriverData({ ...editDriverData, driverSurname: e.target.value });
        break;
      case "number":
        setEditDriverData({ ...editDriverData, number: e.target.value });
        break;
      case "carName":
        setEditDriverData({ ...editDriverData, carName: e.target.value });
        break;
      case "plate":
        setEditDriverData({ ...editDriverData, plate: e.target.value });
        break;
      default:
        console.log("cos poszlo nie tak w drivers");
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
      console.log("edytowano samochód", editCarData, component);
      props.edit(editCarData, component);
      setEditCarData({
        carMake: "",
        carModel: "",
        plate: "",
        dateCarInspection: "",
        insuranceDate: "",
      });
    } else {
      console.log("edytowano kierowce", editDriverData);
      props.edit(editDriverData, component);
      setEditDriverData({
        driverName: "",
        driverSurname: "",
        number: "",
        carName: "",
        plate: "",
      });
    }
    navigate(`/${component}`);
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
                />
                <Input
                  component={component}
                  action="edit"
                  id="carModel"
                  change={handleChange}
                  editCarData={editCarData.carModel}
                />
              </div>
              <Input
                component={component}
                action="edit"
                id="plate"
                change={handleChange}
                editCarData={editCarData.plate}
              />
              <DataPicker
                component={component}
                action="edit"
                id="inspectionDate"
                editCarData={editCarData.dateCarInspection}
                change={handleDateCarInspectionChange}
              />
              <DataPicker
                component={component}
                action="edit"
                id="insuranceDate"
                editCarData={editCarData.insuranceDate}
                change={handleInsuranceDateChange}
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
                />
                <Input
                  component={component}
                  action="edit"
                  id="driverSurname"
                  editDriverData={editDriverData.driverSurname}
                  change={handleChange}
                />
              </div>
              <Input
                component={component}
                action="edit"
                id="number"
                type="number"
                editDriverData={editDriverData.number}
                change={handleChange}
              />
              <Input
                component={component}
                action="edit"
                id="carName"
                editDriverData={editDriverData.carName}
                change={handleChange}
              />
              <Input
                component={component}
                action="edit"
                id="plate"
                editDriverData={editDriverData.plate}
                change={handleChange}
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
