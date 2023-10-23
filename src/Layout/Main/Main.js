import { Routes, Route } from "react-router-dom";

import Cars from "../../Pages/Cars/Cars";
import Drivers from "../../Pages/Drivers/Drivers";
import Error from "../../Pages/Error/Error";
import Settelments from "../../Pages/Settelments/Settelments";
import Home from "../../Pages/Home/Home";

import style from "./Main.module.css";

const Main = () => {
  return (
    <main className={style.main}>
      <Routes>
        <Route path="/cars" element={<Cars />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/settelments" element={<Settelments />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
};

export default Main;
