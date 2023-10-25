import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AddCar from "../../Pages/Cars/AddCar/AddCar";
import Cars from "../../Pages/Cars/Cars";
import Drivers from "../../Pages/Drivers/Drivers";
import Error from "../../Pages/Error/Error";
import Home from "../../Pages/Home/Home";
import Settelments from "../../Pages/Settelments/Settelments";

import style from "./Main.module.css";

const carsInfo = [
  {
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
];

const driversInfo = [
  {
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
  },
];

const Main = () => {
  const [carsData, setCarsData] = useState(carsInfo);
  const [driversData, setDriversData] = useState(driversInfo);
  const [isAdd, setIsAdd] = useState(false);

  const handleDeleteBtn = (id) => {
    console.log("delete is clicked", id);
    const newCarsData = carsData.filter((car) => car.id !== id);
    console.log(carsInfo);
    console.log(newCarsData);
    setCarsData(newCarsData);
  };

  const handleAddCar = (formData) => {
    setCarsData([...carsData, formData]);
  };

  return (
    <main className={style.main}>
      <Routes>
        <Route
          path="/cars"
          element={<Cars tableData={carsData} delete={handleDeleteBtn} />}
        />
        <Route
          path="/cars/:id"
          element={<AddCar submit={(formData) => handleAddCar(formData)} />}
        />
        <Route path="/drivers" element={<Drivers tableData={driversData} />} />
        <Route path="/settelments" element={<Settelments />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
};

export default Main;
