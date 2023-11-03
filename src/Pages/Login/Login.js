import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext/LoginContext";
import { Link } from "react-router-dom";
import style from "./Login.module.css";

const Login = (props) => {
  const loginContext = useContext(LoginContext);

  return (
    <div className={style.container}>
      <div className={style.login}>
        <h2>Zaloguj się</h2>
        <div className={style.inputContainer}>
          <input type="text" placeholder="Login" className={style.inputLogin} />
          <input
            type="password"
            placeholder="Hasło"
            className={style.inputLogin}
          />
        </div>
        <Link
          to="/"
          className={style.loginBtn}
          onClick={loginContext.toggleIsLogged}>
          Zaloguj
        </Link>
      </div>
    </div>
  );
};

export default Login;
