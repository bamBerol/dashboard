import style from "./FreeNow.module.css";

const FreeNow = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <h3>FreeNow</h3>
      </div>
      <div className={style.workInProgres}>
        <p>Zakładka w budowie</p>
      </div>
    </div>
  );
};

export default FreeNow;
