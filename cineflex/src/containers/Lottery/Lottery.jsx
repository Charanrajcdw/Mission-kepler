import { useRef, useState } from "react";
import styles from "./Lottery.module.css";
import Button from "../../components/Button/Button";
import { LOTTERY } from "../../constants";
import { checkLotteryNo } from "../../utils/lottery.utils";

const Lottery = () => {
  const lotteryRef = useRef();
  const [lucky, setLucky] = useState(false);
  const [error, setError] = useState();
  if (error) throw new Error(error);

  const handleKeyUp = () => {
    lotteryRef.current.value = lotteryRef.current.value.replace(/[^0-9]/g, "");
  };

  const handleClick = () => {
    const enteredNo = lotteryRef.current.value;
    const lotteryResult = checkLotteryNo(enteredNo);
    if (lotteryResult) setError(lotteryResult);
    else setLucky(true);
  };

  return (
    <div className={styles["lottery-container"]}>
      <p className={styles["lottery-msg"]}>{lucky ? LOTTERY.luckyMessage : LOTTERY.message}</p>
      {!lucky && (
        <>
          <input
            type="tel"
            ref={lotteryRef}
            placeholder={LOTTERY.placeholder}
            className={styles["lottery-input"]}
            onKeyUp={handleKeyUp}
          />
          <Button className="lottery-btn" clickHandler={handleClick} disabled>
            {LOTTERY.button}
          </Button>
        </>
      )}
    </div>
  );
};

export default Lottery;
