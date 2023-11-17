import style from "./EmptyInfo.module.css";

const EmptyInfo = (props) => {
  console.log(props.url);
  const title = props.url === "/cars" ? "samochodów" : "kierowców";
  const subtitle = props.url === "/cars" ? "samochód" : "kierowcę";
  return (
    <>
      <div className={style.empty}>
        <h3>Brak {title} do wyświetlenia.</h3>
        <h3 className={style.subtitle}>Dodaj {subtitle}.</h3>
      </div>
    </>
  );
};

export default EmptyInfo;
