import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import style from "./Login.module.css";

const Login = () => {
  const authContext = useContext(AuthContext);

  const [login, setLogin] = useState({
    login: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});

  const navigate = useNavigate();

  let errorMsg =
    Object.keys(loginErrors).length !== 0 ? (
      <div className={style.errorMsg}>
        <p>Błędne dane logowania</p>
      </div>
    ) : (
      ""
    );

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, login.login, login.password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (userCredential.operationType === "signIn") {
          console.log("zalogowano");
          console.log(auth.currentUser);
          const userData = {
            email: user.email,
          };
          window.localStorage.setItem("userData", JSON.stringify(userData));
          authContext.toggleIsLogged();
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error, auth);
        setLoginErrors(error);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.login}>
        <h2>Zaloguj się</h2>
        <form className={style.form} onSubmit={(e) => handleLogin(e)}>
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
