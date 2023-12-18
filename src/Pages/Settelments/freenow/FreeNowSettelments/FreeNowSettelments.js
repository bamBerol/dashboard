import { useLocation } from "react-router-dom";

import AddButton from "../../../../components/Buttons/AddButton/AddButton";

import style from "./FreeNowSettelments.module.css";

const FreeNowSettelments = () => {
  const location = useLocation();
  const url = location.pathname;

  console.log(url);

  return (
    <>
      <div className={style.container}>
        <nav className={style.options}>
          <AddButton url={url} type="email" />
          <AddButton url={url} type="settelment" />
        </nav>
        <div>tu bedzie tabela z rozliczeniami na biezaco</div>
      </div>
    </>
  );
};

export default FreeNowSettelments;
