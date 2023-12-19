import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import axios from "axios";

import AddNewItem from "../../components/AddNewItem/AddNewItem";
import Bolt from "../../Pages/Settelments/bolt/Bolt";
import Cars from "../../Pages/Cars/Cars";
import Drivers from "../../Pages/Drivers/Drivers";
import EditItem from "../../components/EditItem/EditItem";
import Error from "../../Pages/Error/Error";
import FreeNow from "../../Pages/Settelments/freenow/FreeNow";
import Home from "../../Pages/Home/Home";
import Sumup from "../../Pages/Settelments/sumup/Sumup";
import Settelments from "../../Pages/Settelments/Settelments";

import style from "./Main.module.css";
import EditEmailList from "../../Pages/Settelments/freenow/EditEmailList/EditEmailList";
import FreeNowSettelments from "../../Pages/Settelments/freenow/FreeNowSettelments/FreeNowSettelments";
import AddFreeNowSettelment from "../../Pages/Settelments/freenow/AddFreeNowSettelments/AddFreeNowSettelments";

const Main = () => {
  const [carsData, setCarsData] = useState([]);
  const [driversData, setDriversData] = useState([]);
  const [freeNowData, setFreeNowData] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const firebaseUrlCars =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/cars.json";

  const firebaseUrlDrivers =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/drivers.json";

  const firebaseUrlSettelments =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/settelments.json";

  const firebaseUrlFreeNowEmails =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/settelments/freenow.json";

  const quantityOfDrivers = driversData.length;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth((prevState) => !prevState);
      } else {
        console.log("state changed - logout");
      }
    });

    return () => unsubscribe();
  }, []);

  const getCarsData = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.get(`${firebaseUrlCars}?auth=${token}`).then((res) => {
        const cars = [];
        for (const key in res.data) {
          cars.push({ ...res.data[key], id: key });
        }
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

  const getSettelmentsData = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.get(`${firebaseUrlSettelments}?auth=${token}`).then((res) => {
        console.log(res.data.freenow);
        const freeNow = [];
        for (const key in res.data.freenow) {
          freeNow.push({ ...res.data.freenow[key], id: key });
        }
        setFreeNowData(freeNow);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarsData();
    getDriversData();
    getSettelmentsData();
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
    if (url === "/settelments/freenow") {
      const newEmailData = freeNowData.filter((email) => email.id !== id);
      setFreeNowData(newEmailData);
    }
  };

  const handleAddItem = async (formData, component) => {
    const user = auth.currentUser;
    const token = await auth.currentUser.getIdToken();

    if (isAuth) {
      if (component === "cars") {
        formData.userId = user.uid;
        try {
          console.log("samochód dodany");
          console.log(formData);
          await axios.post(`${firebaseUrlCars}?auth=${token}`, formData);
          getCarsData();
        } catch (error) {
          console.log("blad uzyskiwania tokena", error);
        }
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
      if (component === "freenow") {
        try {
          console.log("komponent", component, formData);
          if (formData.email !== "") {
            await axios.post(
              `${firebaseUrlFreeNowEmails}?auth=${token}`,
              formData
            );
            console.log("mail w main dodany");
            getSettelmentsData();
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      console.log("użytkownik nie jest zalogowany");
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
          index
          element={
            <Home carsData={carsData} quantityOfDrivers={quantityOfDrivers} />
          }
        />
        <Route
          path="cars"
          element={<Cars tableData={carsData} delete={handleDelete} />}
        />
        <Route
          path="cars/addCar"
          element={
            <AddNewItem
              submit={(formData, component) =>
                handleAddItem(formData, component)
              }
            />
          }
        />
        <Route
          path="cars/editCar/:id"
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
          path="drivers"
          element={<Drivers tableData={driversData} delete={handleDelete} />}
        />
        <Route
          path="drivers/addDriver"
          element={
            <AddNewItem
              submit={(formData, component) =>
                handleAddItem(formData, component)
              }
            />
          }
        />
        <Route
          path="drivers/editDriver/:id"
          element={
            <EditItem
              driversData={driversData}
              edit={(editData, component, id) =>
                handleEdit(editData, component, id)
              }
            />
          }
        />
        <Route path="settelments" element={<Settelments />}>
          <Route index element={<Sumup />} />
          <Route path="bolt" element={<Bolt />} />
          <Route path="freenow" element={<FreeNow />}>
            <Route index path="" element={<FreeNowSettelments />} />
            <Route
              path="editEmailList"
              element={
                <EditEmailList
                  list={freeNowData}
                  addEmailData={(formData, component) =>
                    handleAddItem(formData, component)
                  }
                  deleteEmail={handleDelete}
                />
              }
            />
            <Route
              path="addFreeNowSettelment"
              element={<AddFreeNowSettelment emailList={freeNowData} />}
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
};

export default Main;
