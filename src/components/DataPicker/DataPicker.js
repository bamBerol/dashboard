import ReactDatePicker from "react-datepicker";

import style from "./DataPicker.module.css";

const DataPicker = (props) => {
  let value;

  if (props.action === "add") {
    value = props.carFormData;
  } else {
    value = props.editCarData;
  }

  const label =
    props.id === "inspectionDate"
      ? "Data wykonania badania technicznego:"
      : "Ubezpieczenie ważne do:";

  return (
    <>
      <div className={style.formInput}>
        <label htmlFor={props.id}>{label}</label>
        <ReactDatePicker
          id={props.id}
          value={value}
          onChange={props.change}
          placeholderText="Kliknij aby wybrać datę"
          withPortal
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          autoComplete="off"
        />
      </div>
    </>
  );
};

export default DataPicker;
