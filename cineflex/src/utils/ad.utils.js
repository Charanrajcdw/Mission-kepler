import smallAd1 from "../assets/advertisements/small/small-ad1.png";
import smallAd2 from "../assets/advertisements/small/small-ad2.png";
import largeAd1 from "../assets/advertisements/large/big-ad1.png";
import largeAd2 from "../assets/advertisements/large/big-ad2.png";

const smallAds = [smallAd1, smallAd2];
const largeAds = [largeAd1, largeAd2];

export const getRandomSmallAd = () => {
  return smallAds[Math.floor(Math.random() * smallAds.length)];
};

export const getRandomLargeAd = () => {
  return largeAds[Math.floor(Math.random() * largeAds.length)];
};

export const getFormattedTime = (time) => {
  let minutes = Math.floor(time / 60);
  minutes = minutes.toString().padStart(2, "0");
  let seconds = time - minutes * 60;
  seconds = seconds.toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};
