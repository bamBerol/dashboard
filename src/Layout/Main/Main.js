import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AddNewItem from "../../components/AddNewItem/AddNewItem";
import Cars from "../../Pages/Cars/Cars";
import Drivers from "../../Pages/Drivers/Drivers";
import EditItem from "../../components/EditItem/EditItem";
import Error from "../../Pages/Error/Error";
import Home from "../../Pages/Home/Home";
import Settelments from "../../Pages/Settelments/Settelments";

import style from "./Main.module.css";

const carsInfo = [
  /*{
    id: 0,
    carName: "Skoda Rapid",
    plate: "WZ 86DA23",
    dateCarInspection: "15/11/2022",
    insuranceDate: "22/05/2024",
  },
  {
    id: 1,
    carName: "Toyota Corolla",
    plate: "WZ 9040DY",
    dateCarInspection: "24/03/2021",
    insuranceDate: "22/05/2024",
  },
  {
    id: 2,
    carName: "Toyota Camry",
    plate: "WY 4080AA",
    dateCarInspection: "24/05/2021",
    insuranceDate: "22/07/2024",
  },
  {
    id: 3,
    carName: "Skoda Superb",
    plate: "WZ 1500BD",
    dateCarInspection: "24/08/2019",
    insuranceDate: "03/11/2023",
  },
  {
    id: 4,
    carName: "Lexus ES300h",
    plate: "WZ 9000D",
    dateCarInspection: "24/10/2023",
    insuranceDate: "22/12/2024",
  },
  {
    id: 5,
    carName: "Skoda Octavia",
    plate: "WZ 0040D",
    dateCarInspection: "24/12/2022",
    insuranceDate: "22/09/2023",
  },
  */
];

const driversInfo = [
  /*{
    id: 0,
    driver: "Jan Hel",
    email: "acad@gmail.com",
    carName: "Skoda Rapid",
    plate: "WZ 86DA23",
  },
  {
    id: 1,
    driver: "Jan Kowalski",
    email: "acad@gmail.com",
    carName: "Toyota Corolla",
    plate: "WZ 9040DY",
  },
  {
    id: 2,
    driver: "Jakub Jeż",
    email: "acad@gmail.com",
    carName: "Toyota Camry",
    plate: "WY 4080AA",
  },
  {
    id: 3,
    driver: "Szymon Bańka",
    email: "acad@gmail.com",
    carName: "Skoda Superb",
    plate: "WZ 1500BD",
  },
  {
    id: 4,
    driver: "Olaf Chudy",
    email: "acad@gmail.com",
    carName: "Lexus ES300h",
    plate: "WZ 9000D",
  },
  {
    id: 5,
    driver: "Piotr Dostojewski",
    email: "acad@gmail.com",
    carName: "Skoda Octavia",
    plate: "WZ 0040D",
  },*/
];

const Main = () => {
  const [carsData, setCarsData] = useState(carsInfo);
  const [driversData, setDriversData] = useState(driversInfo);

  const handleDelete = (id, url) => {
    if (url === "/cars") {
      const newCarsData = carsData.filter((car) => car.id !== id);
      setCarsData(newCarsData);
    } else {
      const newDriversData = driversData.filter((driver) => driver.id !== id);
      setDriversData(newDriversData);
    }
  };

  const handleAddItem = (formData, component) => {
    component === "cars"
      ? setCarsData([...carsData, formData])
      : setDriversData([...driversData, formData]);
  };

  const handleEditCar = (editData, component) => {
    switch (component) {
      case "cars":
        const updateCarData = carsData.map((car) => {
          if (car.id === editData.id) {
            return editData;
          }
          return car;
        });
        setCarsData(updateCarData);
        break;
      case "drivers":
        const updateDriverData = driversData.map((driver) => {
          if ((driver.id = editData.id)) {
            return editData;
          }
          return driver;
        });
        setDriversData(updateDriverData);
        break;
      default:
        console.log("aktualizacja nie powiodła się");
    }
  };

  return (
    <main className={style.main}>
      <Routes>
        <Route path="/" element={<Home carsData={carsData} />} />
        <Route
          path="/cars"
          element={<Cars tableData={carsData} delete={handleDelete} />}
        />
        <Route
          path="/cars/addCar"
          element={
            <AddNewItem
              submit={(formData, component) =>
                handleAddItem(formData, component)
              }
            />
          }
        />
        <Route
          path="/cars/editCar/:id"
          element={
            <EditItem
              carsData={carsData}
              edit={(editData, component) => handleEditCar(editData, component)}
            />
          }
        />
        <Route
          path="/drivers"
          element={<Drivers tableData={driversData} delete={handleDelete} />}
        />
        <Route
          path="/drivers/addDriver"
          element={
            <AddNewItem
              submit={(formData, component) =>
                handleAddItem(formData, component)
              }
            />
          }
        />
        <Route
          path="/drivers/editDriver/:id"
          element={
            <EditItem
              driversData={driversData}
              edit={(editData, component) => handleEditCar(editData, component)}
            />
          }
        />
        <Route path="/settelments" element={<Settelments />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
};

export default Main;
