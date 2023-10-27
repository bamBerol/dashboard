import style from "./Input.module.css";

const Input = (props) => {
  const type = props.type === undefined ? "text" : props.type;

  let example;
  let label;
  let value;

  switch (props.id) {
    case "carName":
      label = "Marka i model samochodu:";
      example = "Np. Skoda Rapid";
      break;
    case "plate":
      label = "Numer rejestracyjny pojazdu:";
      example = "Np. WY 902398";
      break;
    case "driver":
      label = "Imię i nazwisko kierowcy";
      example = "Np. Jan Kowalski";
      break;
    case "email":
      label = "Adres e-mail";
      example = "Np. jan.kowalski@wp.pl";
      break;
    default:
      label = "Popraw nazwę";
  }

  if (props.action === "add") {
    if (props.component === "cars") {
      value = props.carFormData;
    } else {
      value = props.driverFormData;
    }
  } else if (props.action === "edit") {
    if (props.component === "cars") {
      value = props.editCarData;
    } else {
      value = props.editDriverData;
    }
  }

  return (
    <>
      <div className={style.formInput}>
        <label htmlFor={props.id}>{label}</label>
        <input
          id={props.id}
          type={type}
          placeholder={example}
          value={value}
          onChange={props.change}
        />
      </div>
    </>
  );
};

export default Input;
