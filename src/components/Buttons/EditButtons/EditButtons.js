import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheck,
  faPencil,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import style from "./EditButtons.module.css";

const EditButtons = (props) => {
  const [editIsClicked, setEditIsClicked] = useState(false);

  const handleClickMainEditButton = (e) => {
    console.log(props.id);
    setEditIsClicked(true);
  };

  const handleEditBtn = () => console.log("edit is clicked", props.id);
  const handleConfirmBtn = () => {
    console.log("confirm is clicked", props.id);
    setEditIsClicked((prevState) => !prevState);
  };

  const button = editIsClicked ? (
    <>
      <div className={style.editButtons}>
        <div
          className={`${style.icon} ${style.delete}`}
          onClick={() => props.delete(props.id)}>
          <FontAwesomeIcon icon={faTrash} size="sm" />
        </div>
        <div className={`${style.icon} ${style.edit}`} onClick={handleEditBtn}>
          <FontAwesomeIcon icon={faPencil} />
        </div>
        <div
          className={`${style.icon} ${style.confirm}`}
          onClick={handleConfirmBtn}>
          <FontAwesomeIcon icon={faCheck} size="sm" />
        </div>
      </div>
    </>
  ) : (
    <div className={style.editButtons} onClick={handleClickMainEditButton}>
      <div className={`${style.icon} ${style.main}`}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
    </div>
  );

  return <>{button}</>;
};

export default EditButtons;