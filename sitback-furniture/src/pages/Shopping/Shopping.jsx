import ProductsContainer from "../../containers/ProductsContainer/ProductsContainer";
import CartContainer from "../../containers/CartContainer/CartContainer";
import styles from "./Shopping.module.css";
import { useState } from "react";

const Shopping = () => {
  const [isCartVisible, setIsCartVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("cart");
  const cartData = [];
  const wishlistData = [];

  return (
    <div className={styles["shopping-container"]}>
      <ProductsContainer isCartVisible={isCartVisible} />
      {isCartVisible && <CartContainer activeTab={activeTab} cartData={cartData} wishlistData={wishlistData} />}
    </div>
  );
};

export default Shopping;
