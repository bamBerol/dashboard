import axios from "axios";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

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
  const [isAuth, setIsAuth] = useState(false);

  const authContext = useContext(AuthContext);

  // console.log((authContext.isLoading = !authContext.isLoading));
  // console.log(authContext.isLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth((prevState) => !prevState);
        authContext.isLoading = false;
      } else {
        console.log(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const firebaseUrlCars =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/cars.json";

  const firebaseUrlDrivers =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/drivers.json";

  const quantityOfDrivers = driversData.length;

  const getCarsData = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.get(`${firebaseUrlCars}?auth=${token}`).then((res) => {
        const cars = [];
        for (const key in res.data) {
          cars.push({ ...res.data[key], id: key });
        }
        // console.log(cars);
        setCarsData(cars);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDriversData = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.get(`${firebaseUrlDrivers}?auth=${token}`).then((res) => {
        const drivers = [];
        for (const key in res.data) {
          drivers.push({ ...res.data[key], id: key });
        }
        setDriversData(drivers);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarsData();
    getDriversData();
  }, [isAuth]);

  const handleDelete = async (id, url) => {
    const token = await auth.currentUser.getIdToken();
    await axios.delete(
      `https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app${url}/${id}.json?auth=${token}`
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
    const token = await auth.currentUser.getIdToken();
    if (isAuth && component === "cars") {
      formData.userId = user.uid;
      try {
        console.log("samochód dodany");
        await axios.post(`${firebaseUrlCars}?auth=${token}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        getCarsData();
      } catch (error) {
        console.log("blad uzyskiwania tokena", error);
      }
    } else {
      console.error("uzytkownik nieuwierzytelniony");
    }
    if (component === "drivers") {
      formData.userId = user.uid;
      try {
        console.log("kierowca dodany");
        await axios.post(`${firebaseUrlDrivers}?auth=${token}`, formData);
        getDriversData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = async (editData, component, id) => {
    const token = await auth.currentUser.getIdToken();
    try {
      await axios.put(
        `https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/${component}/${id}.json?auth=${token}`,
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
