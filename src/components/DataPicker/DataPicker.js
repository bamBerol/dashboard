import ReactDatePicker from "react-datepicker";

import style from "./DataPicker.module.css";

const DataPicker = (props) => {
  const component =
    props.component === "add" ? props.carFormData : props.editCarData;

  return (
    <>
      <div className={style.formInput}>
        <label htmlFor={props.id}>{props.label}</label>
        <ReactDatePicker
          id={props.id}
          value={component}
          onChange={props.change}
          placeholderText="Kliknij aby wybrać datę"
          withPortal
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
    </>
  );
};

export default DataPicker;
