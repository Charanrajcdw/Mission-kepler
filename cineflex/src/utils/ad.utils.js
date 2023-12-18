import ad1 from "../assets/advertisements/small/small-ad1.png";
import ad2 from "../assets/advertisements/small/small-ad2.png";

const ads = [ad1, ad2];

export const getRandomAd = () => {
  return ads[Math.floor(Math.random() * ads.length)];
};
