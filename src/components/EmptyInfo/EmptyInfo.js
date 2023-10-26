import style from "./EmptyInfo.module.css";

const EmptyInfo = (props) => {
  const title =
    props.component === "/cars"
      ? "Brak samochodów do wyświetlenia"
      : "Brak kierowców do wyświetlenia";
  return (
    <>
      <div className={style.empty}>
        <h3>{title}</h3>
      </div>
    </>
  );
};

export default EmptyInfo;
