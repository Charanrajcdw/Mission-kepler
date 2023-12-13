import { LOTTERY } from "../constants";

export const checkLotteryNo = (enteredNumber) => {
  const mobileRegex = /^[6-9]{1}[0-9]{9}/;
  const number = +enteredNumber;
  if (isNaN(number) || enteredNumber.length != 10 || !mobileRegex.test(number)) return LOTTERY.invalidNumber;
  const lastDigit = +enteredNumber.slice(-1);
  if (lastDigit % 2 !== 0) return LOTTERY.unluckyMessage;
};
