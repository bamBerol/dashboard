import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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

  const location = useLocation();
  const component = location.pathname.split("/")[1];
  const { id } = useParams();
  const navigate = useNavigate();

  const title = component === "cars" ? "samochód" : "kierowcę";

  useEffect(() => {
    if (component === "cars") {
      const carDetail = props.carsData.filter((car) => car.id === id);

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
        case "carName":
          setEditCarData({ ...editCarData, carName: e.target.value });
          break;
        case "plate":
          setEditCarData({ ...editCarData, plate: e.target.value });
          break;
        default:
          console.log("cos poszlo nie tak w cars");
      }
    }
    switch (e.currentTarget.id) {
      case "driver":
        setEditDriverData({ ...editDriverData, driver: e.target.value });
        break;
      case "email":
        setEditDriverData({ ...editDriverData, email: e.target.value });
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
    const inspectionDate = format(date, "dd/MM/RRRR");
    setEditCarData({ ...editCarData, dateCarInspection: inspectionDate });
  };

  const handleInsuranceDateChange = (date) => {
    const dateInsurance = format(date, "dd/MM/RRRR");
    setEditCarData({ ...editCarData, insuranceDate: dateInsurance });
  };

  const handleSubmit = (component, e) => {
    e.preventDefault();
    if (component === "cars") {
      console.log("edytowano samochód", editCarData, component);
      props.edit(editCarData, component);
      setEditCarData({
        carName: "",
        plate: "",
        dateCarInspection: "",
        insuranceDate: "",
      });
    } else {
      console.log("edytowano kierowce", editDriverData);
      props.edit(editDriverData, component);
      setEditDriverData({
        driver: "",
        email: "",
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
              <Input
                component={component}
                action="edit"
                id="carName"
                change={handleChange}
                editCarData={editCarData.carName}
              />
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
              <Input
                component={component}
                action="edit"
                id="driver"
                editDriverData={editDriverData.driver}
                change={handleChange}
              />
              <Input
                component={component}
                action="edit"
                id="email"
                type="email"
                editDriverData={editDriverData.email}
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
