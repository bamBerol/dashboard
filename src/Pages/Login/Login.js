import { Link } from "react-router-dom";
import style from "./Login.module.css";

const Login = (props) => {
  return (
    <>
      <div className={style.login}>
        <h2>Zaloguj się</h2>
        <input type="text" placeholder="Login" className={style.inputLogin} />
        <input type="password" placeholder="Hasło" />
        <Link to="/" className={style.loginBtn} onClick={props.login}>
          Zaloguj
        </Link>
      </div>
    </>
  );
};

export default Login;
