import { useEffect, useState } from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

import style from "./Clock.module.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  const date = new Date();
  const dayNumber = format(date, "dd");
  const day = format(date, "EEEE", { locale: pl });
  const month = format(date, "MMMM", { locale: pl });
  const year = format(date, "yyyy");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={style.clock}>
      <p className={style.actualTime}>
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
      <p className={style.actualDay}>{day}</p>
      <p className={style.actualDate}>
        {dayNumber} {month} {year}
      </p>
    </div>
  );
};

export default Clock;
