import style from "./Input.module.css";

const Input = (props) => {
  const type = props.type === undefined ? "text" : props.type;

  let label;

  switch (props.id) {
    case "carName":
      label = "Marka i model samochodu:";
      break;
    case "plate":
      label = "Numer rejestracyjny pojazdu:";
      break;
    case "driver":
      label = "Imię i nazwisko kierowcy";
      break;
    case "email":
      label = "Adres e-mail";
      break;
    default:
      label = "Popraw nazwę";
  }

  const value =
    props.component === "add" ? props.carFormData : props.editCarData;

  return (
    <>
      <div className={style.formInput}>
        <label htmlFor={props.id}>{label}</label>
        <input
          id={props.id}
          type={type}
          placeholder={props.example}
          value={value}
          onChange={props.change}
        />
      </div>
    </>
  );
};

export default Input;
