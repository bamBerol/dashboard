import { useLocation } from "react-router-dom";

import style from "./Bolt.module.css";

const Bolt = () => {
  const location = useLocation();
  const component = location.pathname.split("/")[2];

  console.log(component);
  return (
    <div className={style.container}>
      <div className={style.title}>
        <h3>Bolt</h3>
      </div>
    </div>
  );
};

export default Bolt;
