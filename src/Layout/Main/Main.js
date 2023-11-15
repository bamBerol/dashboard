import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import AddNewItem from "../../components/AddNewItem/AddNewItem";
import Cars from "../../Pages/Cars/Cars";
import Drivers from "../../Pages/Drivers/Drivers";
import EditItem from "../../components/EditItem/EditItem";
import Error from "../../Pages/Error/Error";
import Home from "../../Pages/Home/Home";
import Settelments from "../../Pages/Settelments/Settelments";

import style from "./Main.module.css";

const Main = () => {
  const [carsData, setCarsData] = useState([]);
  const [driversData, setDriversData] = useState([]);

  const firebaseUrlCars =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/cars.json";

  const firebaseUrlDrivers =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/drivers.json";

  const quantityOfDrivers = driversData.length;

  const getCarsData = async () => {
    try {
      await axios.get(firebaseUrlCars).then((res) => {
        const cars = [];
        for (const key in res.data) {
          cars.push({ ...res.data[key], id: key });
        }
        console.log(cars);
        setCarsData(cars);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDriversData = async () => {
    try {
      await axios.get(firebaseUrlDrivers).then((res) => {
        const drivers = [];
        for (const key in res.data) {
          drivers.push({ ...res.data[key], id: key });
        }
        console.log(drivers);
        setDriversData(drivers);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarsData();
    getDriversData();
  }, []);

  const handleDelete = async (id, url) => {
    await axios.delete(
      `https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app${url}/${id}.json`
    );
    if (url === "/cars") {
      const newCarsData = carsData.filter((car) => car.id !== id);
      setCarsData(newCarsData);
    }
    if (url === "/drivers") {
      const newDriversData = driversData.filter((driver) => driver.id !== id);
      setDriversData(newDriversData);
    }
  };

  const handleAddItem = async (formData, component) => {
    const user = auth.currentUser;
    console.log(user);
    console.log(auth.currentUser.getIdToken(true));

    if (user && component === "cars") {
      // console.log(user.getIdToken());
      let token = auth.currentUser.getIdToken(true);

      formData.userId = user.uid;
      try {
        console.log("samochód dodany");
        await axios.post(
          // firebaseUrlCars,
          `https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/cars.json?auth=${token}`,
          formData
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     "Content-Type": "application/json",
          //   },
          // }
          //   {
          //   id: formData.id,
          //   carMake: formData.carMake,
          //   carModel: formData.carModel,
          //   plate: formData.plate,
          //   dateCarInspection: formData.dateCarInspection,
          //   nextCarInspection: formData.nextCarInspection,
          //   daysLeft: formData.daysLeft,
          //   insuranceDate: formData.insuranceDate,
          //   insuranceDaysLeft: formData.insuranceDaysLeft,
          // }
        );
        getCarsData();
      } catch (error) {
        console.log(error);
      }
    }
    if (component === "drivers") {
      formData.userId = user.uid;
      try {
        console.log("kierowca dodany");
        await axios.post(firebaseUrlDrivers, formData);
        getDriversData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = async (editData, component, id) => {
    console.log(editData);
    console.log(id);
    try {
      await axios.put(
        `https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/${component}/${id}.json`,
        editData
      );

      if (component === "cars") {
        getCarsData();
      }
      if (component === "drivers") {
        getDriversData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={style.main}>
      <Routes>
        <Route
          path="/"
          element={
            <Home carsData={carsData} quantityOfDrivers={quantityOfDrivers} />
          }
        />
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
              edit={(editData, component, id) =>
                handleEdit(editData, component, id)
              }
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
              edit={(editData, component, id) =>
                handleEdit(editData, component, id)
              }
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
