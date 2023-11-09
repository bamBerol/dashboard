import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";

const Login = (props) => {
  const loginContext = useContext(LoginContext);
  const [login, setLogin] = useState({
    login: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [btnClicked, setBtnClicked] = useState(false);

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

  useEffect(() => {
    if (Object.keys(loginErrors).length === 0 && btnClicked) {
      console.log("brak błędów");
      loginContext.toggleIsLogged();
      navigate("/");
    }
    if (Object.keys(loginErrors).length !== 0) {
    }
  }, [loginErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoginErrors(loginValidation(login));
    setBtnClicked(true);
  };

  const loginValidation = (values) => {
    const errors = {};
    const emailCheck =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordCheck =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (!values.login) {
      errors.login = "Wpisz login";
    } else if (!emailCheck.test(values.login)) {
      errors.login = "Błędny format adresu email";
    }

    if (!values.password) {
      errors.password = "Podaj hasło";
    } else if (!passwordCheck.test(values.password)) {
      errors.password = "Błędne hasło";
    }
    return errors;
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
              {/* <Link
                // to="/"
                // type="submit"
                className={style.loginBtn}
                // onClick={() => console.log("działam")}
                // onClick={loginContext.toggleIsLogged}
              >
                Zaloguj
              </Link> */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
