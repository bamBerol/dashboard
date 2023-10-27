import style from "./Settelments.module.css";

const Settelments = () => {
  const handleFileSelected = (e) => {
    console.log(e.target.files);
  };
  return (
    <div className={style.settelments}>
      <h2 className={style.title}>Rozliczenia</h2>
      <div className={style.container}>
        <input type="file" onChange={handleFileSelected} />
      </div>
    </div>
  );
};

export default Settelments;
