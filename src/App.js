import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  AuthContext,
  defaultLoginObject,
} from "./context/AuthContext/AuthContext";

import Layout from "./Layout/Layout";
import Login from "./Pages/Login/Login";

import style from "./App.module.css";

function App() {
  const [isLogged, setIsLogged] = useState(defaultLoginObject.isLogged);

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("userData"));
    if (userData) {
      setIsLogged(true);
    }
  }, []);

  const handleToggle = () => {
    setIsLogged((prevState) => !prevState);
  };

  const checkedIsLogged = isLogged ? <Layout /> : <Login />;

  return (
    <AuthContext.Provider value={{ isLogged, toggleIsLogged: handleToggle }}>
      <Router>
        <div className={style.app}>{checkedIsLogged}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
