import ProductsContainer from "../../containers/ProductsContainer/ProductsContainer";
import CartContainer from "../../containers/CartContainer/CartContainer";
import styles from "./Shopping.module.css";
import { useState } from "react";

const Shopping = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  return (
    <div className={styles["shopping-container"]}>
      <ProductsContainer isCartVisible={isCartVisible} />
      {isCartVisible && <CartContainer isCartVisible={isCartVisible} />}
    </div>
  );
};

export default Shopping;
