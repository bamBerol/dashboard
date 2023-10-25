import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Layout from "./Layout/Layout";

import style from "./App.module.css";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    console.log("zaloguj kliknięto");
    setIsLogged(true);
  };

  const checkedIsLogged = isLogged ? <Layout /> : <Login login={handleLogin} />;

  return (
    <Router>
      <div className={style.app}>{checkedIsLogged}</div>
    </Router>
  );
}

export default App;
