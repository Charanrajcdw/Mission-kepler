import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./CartContainer.module.css";
import CartCard from "../../components/CartCard/CartCard";
import Button from "../../components/Button/Button";
import { CART, BUTTON, ROUTES } from "../../constants/constants";
import { calculateTotalPrice, setItemsToLocalStorage } from "../../utils/product.utils";

const CartContainer = ({ cartData, cartItemHandler, addWishlistToCart }) => {
  const { cartItems, wishlistItems, activeTab } = cartData;
  const [activeTabName, setActiveTabName] = useState(activeTab);
  const totalPrice = calculateTotalPrice(cartItems);
  const navigate = useNavigate();

  // move items from cart to orders and redirect to orders page
  const placeOrder = () => {
    setItemsToLocalStorage(CART.orders, cartItems);
    setItemsToLocalStorage(CART.cart, []);
    navigate(ROUTES.order);
  };

  // toogle tabs in cart container
  const toggleTab = (event) => {
    const tabName = event.target.dataset.tab;
    setActiveTabName(tabName);
  };

  useEffect(() => {
    setActiveTabName(cartData.activeTab);
  }, [cartData]);

  let cartContent = "";
  if (activeTabName === CART.cart) {
    cartContent = cartItems.map((product) => <CartCard key={product.id} product={product} isCart={true} cartBtnHandler={cartItemHandler} />);
  } else {
    cartContent = wishlistItems.map((product) => (
      <CartCard key={product.id} product={product} isCart={false} wishlistBtnHandler={addWishlistToCart} />
    ));
  }

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
          <p className={styles["empty-cart"]}>
            {CART.emptyCart}
            {activeTabName}
          </p>
        )}
      </div>
      {activeTabName === CART.cart && cartItems.length > 0 && (
        <div className={styles["cart-footer"]}>
          <div className={styles["order-amount"]}>
            <p className={styles["amount-title"]}>{CART.amount}</p>
            <p>&#8377; {totalPrice}</p>
          </div>
          <Button className="order-btn" clickHandler={placeOrder}>
            {BUTTON.placeOrder}
          </Button>
        </div>
      )}
    </aside>
  );
};

CartContainer.propTypes = {
  cartData: PropTypes.object,
  cartItemHandler: PropTypes.func.isRequired,
  addWishlistToCart: PropTypes.func.isRequired,
};

CartContainer.defaultProps = {
  cartData: {
    activeTab: CART.cart,
    cartItems: [],
    wishlistItems: [],
  },
};

export default CartContainer;
