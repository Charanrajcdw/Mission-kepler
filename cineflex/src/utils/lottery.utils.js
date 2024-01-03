import { LOTTERY } from "../constants";

export const checkLotteryNo = (enteredNumber) => {
  const number = +enteredNumber;
  if (isNaN(number) || enteredNumber.length != 10) return LOTTERY.invalidNumber;
  const lastDigit = +enteredNumber.slice(-1);
  if (lastDigit % 2 !== 0) return LOTTERY.unluckyMessage;
};
