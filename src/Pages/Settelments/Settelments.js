import style from "./Settelments.module.css";

const Settelments = () => {
  const handleFileSelected = (e) => {
    console.log(e.target.files[0]);
  };
  return (
    <div className={style.settelments}>
      <h2 className={style.title}>Zakładka w budowie</h2>
      {/* <div className={style.container}>
        <input type="file" onChange={handleFileSelected} />
      </div> */}
    </div>
  );
};

export default Settelments;
