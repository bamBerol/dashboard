import style from "./Settelments.module.css";

const Settelments = () => {
  return (
    <div className={style.settelments}>
      <h2 className={style.title}>Rozliczenia</h2>
      <div className={style.container}>
        <input type="file" />
      </div>
    </div>
  );
};

export default Settelments;
