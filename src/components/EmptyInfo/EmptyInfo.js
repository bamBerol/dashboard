import style from "./EmptyInfo.module.css";

const EmptyInfo = (props) => {
  console.log(props);
  let title;
  let subtitle;

  switch (props.url) {
    case "/cars":
      title = "samochodów";
      subtitle = "samochód";
      break;
    case "/drivers":
      title = "kierowców";
      subtitle = "kierowcę";
      break;
    case "freenow":
      title = "email";
      subtitle = "email";
      break;
    default:
      title = "błąd";
      subtitle = "błąd";
  }
  return (
    <>
      {props.url === "freenow" ? (
        <div className={style.empty}>
          <h3>Brak adresów {title} do wyświetlenia.</h3>
          <h3 className={style.subtitle}>
            Dodaj adres {subtitle}, aby dodać rozliczenie.
          </h3>
        </div>
      ) : (
        <div className={style.empty}>
          <h3>Brak {title} do wyświetlenia.</h3>
          <h3 className={style.subtitle}>Dodaj {subtitle}.</h3>
        </div>
      )}
    </>
  );
};

export default EmptyInfo;
