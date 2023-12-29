import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import axios from "axios";

import AddNewItem from "../../components/AddNewItem/AddNewItem";
import AddFreeNowSettelment from "../../Pages/Settelments/freenow/AddFreeNowSettelments/AddFreeNowSettelments";
import ArchivePage from "../../Pages/ArchivePage/ArchivePage";
import Bolt from "../../Pages/Settelments/bolt/Bolt";
import Cars from "../../Pages/Cars/Cars";
import Drivers from "../../Pages/Drivers/Drivers";
import EditFullNameList from "../../Pages/Settelments/freenow/EditFullNameList/EditFullNameList";
import EditItem from "../../components/EditItem/EditItem";
import Error from "../../Pages/Error/Error";
import FreeNow from "../../Pages/Settelments/freenow/FreeNow";
import FreeNowSettelments from "../../Pages/Settelments/freenow/FreeNowSettelments/FreeNowSettelments";
import Home from "../../Pages/Home/Home";
import Sumup from "../../Pages/Settelments/sumup/Sumup";
import Settelments from "../../Pages/Settelments/Settelments";
import SettelmentDetails from "../../Pages/Settelments/freenow/SettelmentDetails/SettelmentDetails";

import style from "./Main.module.css";

const Main = () => {
  const [archiveData, setArchiveData] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [driversData, setDriversData] = useState([]);
  const [freeNowData, setFreeNowData] = useState([]);
  const [freeNowSettelments, setFreeNowSettelments] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const firebaseUrlCars =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/cars.json";

  const firebaseUrlDrivers =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/drivers.json";

  const firebaseUrlArchive =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/archive.json";

  const firebaseUrlFreeNowFullNames =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/settelments/freenow/listOfNames.json";

  const firebaseUrlFreeNowSettelments =
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app/settelments/freenow/freenowSettelments.json";

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

  const getFullNamesFreeNowData = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios
        .get(`${firebaseUrlFreeNowFullNames}?auth=${token}`)
        .then((res) => {
          const freeNow = [];
          for (const key in res.data) {
            freeNow.push({ ...res.data[key], id: key });
          }
          setFreeNowData(freeNow);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getFreeNowSettelments = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      axios
        .get(`${firebaseUrlFreeNowSettelments}?auth=${token}`)
        .then((res) => {
          const settelments = [];
          for (const key in res.data) {
            settelments.push({ ...res.data[key], id: key });
            setFreeNowSettelments(settelments);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getArchiveData = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      axios.get(`${firebaseUrlArchive}?auth=${token}`).then((res) => {
        const archive = [];
        for (const key in res.data) {
          archive.push({ ...res.data[key], id: key });
          setArchiveData(archive);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarsData();
    getDriversData();
    getFullNamesFreeNowData();
    getFreeNowSettelments();
    getArchiveData();
  }, [isAuth]);

  const handleDelete = async (id, url) => {
    const token = await auth.currentUser.getIdToken();
    // console.log(id, url);
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
    if (url === "/settelments/freenow/listOfNames") {
      const newFullNameData = freeNowData.filter(
        (fullName) => fullName.id !== id
      );
      setFreeNowData(newFullNameData);
    }
    if (url === "/archive") {
      const newArchiveData = archiveData.filter((archive) => archive.id !== id);
      setArchiveData(newArchiveData);
    }
  };

  const handleAddItem = async (formData, component) => {
    const user = auth.currentUser;
    const token = await auth.currentUser.getIdToken();
    // console.log(formData, component);
    // console.log(isAuth);

    if (isAuth) {
      if (component === "cars") {
        formData.userId = user.uid;
        try {
          console.log("samochód dodany");
          // console.log(formData);
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
      if (component === "/settelments/freenow/listOfNames") {
        try {
          console.log("dodano do listy");
          if (formData.fullName !== "") {
            await axios.post(
              `${firebaseUrlFreeNowFullNames}?auth=${token}`,
              formData
            );
            console.log("Imię i nazwisko w main dodany");
            getFullNamesFreeNowData();
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (component === "addFreeNowSettelment") {
        try {
          console.log("dodano rozliczenie");
          await axios.post(
            `${firebaseUrlFreeNowSettelments}?auth=${token}`,
            formData
          );
          getFreeNowSettelments();
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

  const handleArchive = async (id, url) => {
    const token = await auth.currentUser.getIdToken();
    await axios
      .get(
        `https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app${url}/${id}.json?auth=${token}`
      )
      .then((res) =>
        axios.post(`${firebaseUrlArchive}?auth=${token}`, res.data)
      );
    await axios.delete(
      `https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app${url}/${id}.json?auth=${token}`
    );
    if (url === "/drivers") {
      const newDriversData = driversData.filter((driver) => driver.id !== id);
      setDriversData(newDriversData);
      getArchiveData();
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
          element={
            <Drivers
              tableData={driversData}
              delete={handleDelete}
              archive={handleArchive}
            />
          }
        />
        <Route
          path="drivers/addDriver"
          element={
            <AddNewItem
              submit={(formData, component) =>
                handleAddItem(formData, component)
              }
              cars={carsData}
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
            <Route
              index
              path=""
              element={
                <FreeNowSettelments settelments={freeNowSettelments} />
              }></Route>
            <Route
              path=":id"
              element={<SettelmentDetails settelments={freeNowSettelments} />}
            />
            <Route
              path="listOfNames"
              element={
                <EditFullNameList
                  list={freeNowData}
                  addFullNameData={(formData, component) =>
                    handleAddItem(formData, component)
                  }
                  deleteEmail={handleDelete}
                />
              }
            />
            <Route
              path="addFreeNowSettelment"
              element={
                <AddFreeNowSettelment
                  fullNamesList={freeNowData}
                  addSettelment={(formData, component) =>
                    handleAddItem(formData, component)
                  }
                />
              }
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
        <Route
          path="archive"
          element={
            <ArchivePage archive={archiveData} deleteArchive={handleDelete} />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
};

export default Main;
