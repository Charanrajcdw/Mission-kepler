export const transformToIndianRupee = (price) => {
  price = parseInt(price);
  return price.toLocaleString("en-IN");
};

export const getGuaranteeMessage = (guarantee) => {
  return guarantee === 1 ? `1 YEAR GUARANTEE` : `${guarantee} YEARS GUARANTEE`;
};
