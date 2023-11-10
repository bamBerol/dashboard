import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext/LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import style from "./Login.module.css";

const Login = (props) => {
  const loginContext = useContext(LoginContext);
  const [login, setLogin] = useState({
    login: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});

  const navigate = useNavigate();

  let errorMsg =
    Object.keys(loginErrors).length !== 0 ? (
      <div className={style.errorMsg}>
        <p>Błędny login lub hasło. Spróbuj jeszcze raz.</p>
      </div>
    ) : (
      ""
    );

  const handleChange = (e) => {
    console.log(e.target.value);
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhjsw9JhMcnbv7Ia-cURfBCxXoiXmnzYg",
        {
          email: login.login,
          password: login.password,
          returnSecureToken: true,
        }
      );

      if (res.status === 200) {
        console.log("status ok");
        loginContext.toggleIsLogged();
        navigate("/");
      }

      console.log(res);
    } catch (error) {
      console.log(error.response);
      setLoginErrors(error.response.data.error.message);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.login}>
        <h2>Zaloguj się</h2>
        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={style.formContainer}>
            <input
              type="email"
              id="login"
              placeholder="Login"
              className={style.inputLogin}
              onChange={handleChange}
              maxLength="20"
            />
            <input
              type="password"
              id="password"
              placeholder="Hasło"
              className={style.inputLogin}
              onChange={handleChange}
            />
            {errorMsg}
            <button type="submit" className={style.loginBtn}>
              Zaloguj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
