import style from "./Input.module.css";

const Input = (props) => {
  const type = props.type === undefined ? "text" : props.type;

  console.log(props.id);

  let example;
  let label;
  let value;
  let maxLength;

  switch (props.id) {
    case "carMake":
      label = "Marka samochodu:";
      example = "Np. Skoda";
      maxLength = "20";
      break;
    case "carModel":
      label = "Model samochodu:";
      example = "Np. Octavia";
      maxLength = "20";
      break;
    case "plate":
      label = "Numer rejestracyjny pojazdu:";
      example = "Np. WY 902398";
      maxLength = "9";
      break;
    case "driverName":
      label = "Imię  kierowcy";
      example = "Np. Jan";
      maxLength = "20";
      break;
    case "driverSurname":
      label = "Nazwisko kierowcy";
      example = "Np. Kowalski";
      maxLength = "20";
      break;
    case "number":
      label = "Numer tel.";
      example = "Np. 666 777 000";
      maxLength = "9";
      break;
    case "email":
      label = "Adres e-mail";
      example = "Np. przykladowy@gmail.com";

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
          className={!props.errorMsg ? style.inputOk : style.inputError}
          type={type}
          placeholder={example}
          value={value}
          onChange={props.change}
          autoComplete="off"
          maxLength={maxLength}
        />
        <p className={style.errorMsg}>{props.errorMsg}</p>
      </div>
    </>
  );
};

export default Input;
