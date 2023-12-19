import style from "./AddFreeNowSettelment.module.css";

const AddFreeNowSettelment = ({ emailList }) => {
  console.log(emailList);
  const list = emailList.map((email) => {
    return (
      <div key={email.id} className={style.detail}>
        <p>{email.email}</p>
        <input type="number" />
      </div>
    );
  });
  return (
    <div className={style.container}>
      <div className={style.datePicker}>
        <input type="date" />
      </div>
      <div className={style.email}>{list}</div>
      <div className={style.settelmentBtn}>
        <div className={style.addSettelmentBtn}>
          <p>Dodaj rozliczenie</p>
        </div>
      </div>
    </div>
  );
};

export default AddFreeNowSettelment;
