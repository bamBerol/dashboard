import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import style from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={style.spinerContainer}>
      <FontAwesomeIcon
        icon={faSpinner}
        spinPulse
        className={style.loadingIcon}
        size="2xl"
      />
    </div>
  );
};

export default LoadingSpinner;
