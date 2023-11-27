import PropTypes from "prop-types";
import { useState } from "react";
import CartCard from "../../components/CartCard/CartCard";
import Button from "../../components/Button/Button";
import styles from "./CartContainer.module.css";
import { CART, BUTTON } from "../../constants/constants";
import { transformToIndianRupee } from "../../utils/ProductUtils";

const CartContainer = ({ activeTab, cartData, wishlistData }) => {
  const [activeTabName, setActiveTabName] = useState(activeTab);
  const [price, setPrice] = useState(transformToIndianRupee("51490"));

  let cartContent = "";
  if (activeTabName === "cart") {
    cartContent = cartData.map((product) => <CartCard key={product.id} product={product} isCart={true} />);
  } else {
    cartContent = wishlistData.map((product) => <CartCard key={product.id} product={product} isCart={false} />);
  }

  const toggleTab = (event) => {
    const tabName = event.target.dataset.tab;
    setActiveTabName(tabName);
  };

  return (
    <aside className={styles["cart-container"]}>
      <div className={styles["cart-header"]}>
        <p data-tab={CART.cart} className={activeTabName === CART.cart ? styles.active : ""} onClick={toggleTab}>
          {CART.cartTab}
        </p>
        <p data-tab={CART.wishlist} className={activeTabName === CART.wishlist ? styles.active : ""} onClick={toggleTab}>
          {CART.wishlistTab}
        </p>
      </div>
      <div className={styles["cart-content"]}>
        {cartContent.length > 0 ? (
          cartContent
        ) : (
          <p className={styles["empty-cart-message"]}>
            {CART.emptyCart}
            {activeTabName}
          </p>
        )}
      </div>
      {activeTabName === CART.cart && cartData.length > 0 && (
        <div className={styles["cart-footer"]}>
          <div className={styles["order-amount"]}>
            <p className={styles["amount-title"]}>{CART.amount}</p>
            <p>&#8377; {price}</p>
          </div>
          <Button className="order-btn" clickHandler={() => {}}>
            {BUTTON.placeOrder}
          </Button>
        </div>
      )}
    </aside>
  );
};

CartContainer.propTypes = {
  activeTab: PropTypes.string.isRequired,
  cartData: PropTypes.array,
  wishlistData: PropTypes.array,
};

export default CartContainer;
