import style from "./Input.module.css";

const Input = (props) => {
  const type = props.type === undefined ? "text" : props.type;

  let example;
  let label;
  let value;

  switch (props.id) {
    case "carMake":
      label = "Marka samochodu:";
      example = "Np. Skoda";
      break;
    case "carModel":
      label = "Model samochodu:";
      example = "Np. Octavia";
      break;
    case "plate":
      label = "Numer rejestracyjny pojazdu:";
      example = "Np. WY 902398";
      break;
    case "driverName":
      label = "Imię  kierowcy";
      example = "Np. Jan";
      break;
    case "driverSurname":
      label = "Nazwisko kierowcy";
      example = "Np. Kowalski";
      break;
    case "number":
      label = "Numer tel.";
      example = "666 777 000";
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
          autocomplete="off"
        />
      </div>
    </>
  );
};

export default Input;
