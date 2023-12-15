import ReactDatePicker from "react-datepicker";

import style from "./DataPicker.module.css";

const DataPicker = (props) => {
  let value;

  if (props.action === "add") {
    value = props.carFormData;
  } else {
    value = props.editCarData;
  }

  let label;

  switch (props.id) {
    case "inspectionDate":
      label = "Data wykonania przeglądu:";
      break;
    case "insuranceDate":
      label = "Ubezpieczenie ważne do:";
      break;
    case "legalizationDate":
      label = "Data ważności legalizacji taksometru:";
      break;
    default:
      label = "Popraw nazwę";
  }

  return (
    <>
      <div className={style.formInput}>
        <label htmlFor={props.id}>{label}</label>
        <ReactDatePicker
          id={props.id}
          className={!props.errorMsg ? style.inputOk : style.inputError}
          value={value}
          onChange={props.change}
          placeholderText="Kliknij aby wybrać datę"
          withPortal
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          autoComplete="off"
        />
        <p className={style.errorMsg}>{props.errorMsg}</p>
      </div>
    </>
  );
};

export default DataPicker;
