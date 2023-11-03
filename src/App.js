import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import {
  LoginContext,
  defaultLoginObject,
} from "./context/LoginContext/LoginContext";
import Login from "./Pages/Login/Login";
import Layout from "./Layout/Layout";

import style from "./App.module.css";

function App() {
  const [isLogged, setIsLogged] = useState(defaultLoginObject.isLogged);

  const handleToggle = () => {
    setIsLogged((prevState) => !prevState);
  };

  const checkedIsLogged = isLogged ? <Layout /> : <Login />;

  return (
    <LoginContext.Provider value={{ isLogged, toggleIsLogged: handleToggle }}>
      <Router>
        <div className={style.app}>{checkedIsLogged}</div>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
