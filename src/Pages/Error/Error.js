import style from "./Error.module.css";

const Error = () => {
  return (
    <div className={style.error}>
      <h2 className={style.title}>
        Strona nie została znaleziona, podaj poprawny adres strony.
      </h2>
    </div>
  );
};

export default Error;
