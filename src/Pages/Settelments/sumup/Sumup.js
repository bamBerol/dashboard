import { useState } from "react";

import style from "./Sumup.module.css";

const Sumup = () => {
  const [amount, setAmount] = useState("");

  const handleConvert = () => {
    const value = Number(amount);
    const percentOfValue = (value * 3) / 100;
    const fee = 30;
    const convertedValue = (value - percentOfValue - fee).toFixed(2);

    return convertedValue;
  };

  const handleAmountInputChange = (e) => {
    setAmount(e.target.value);
    handleConvert();
  };

  const convertedAmount = amount
    ? handleConvert()
    : "Wpisz kwotę do przeliczenia";

  return (
    <div className={style.container}>
      <div className={style.settelments}>
        <div className={style.calculatorContainer}>
          <div className={style.calculator}>
            <div className={style.calculatorInput}>
              <input
                type="number"
                placeholder="Wpisz kwotę"
                onChange={handleAmountInputChange}
                value={amount}
              />
            </div>
            <div className={style.convertedAmount}>
              <div className={style.calculatorResult}>
                <p>Kwota uzyskana po przeliczeniu to:</p>
                <h3>{convertedAmount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sumup;
