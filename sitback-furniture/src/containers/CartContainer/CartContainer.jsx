import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./CartContainer.module.css";
import CartCard from "../../components/CartCard/CartCard";
import Button from "../../components/Button/Button";
import { CART, BUTTON, ROUTES } from "../../constants/constants";
import { addToCart, calculateTotalPrice, removeFromWishlist, setItemsToLocalStorage } from "../../utils/ProductUtils";

const CartContainer = ({ activeTab, cartData, wishlistData, cartVisibilityHandler }) => {
  const [activeTabName, setActiveTabName] = useState(activeTab);
  const [cartItems, setCartItems] = useState(cartData);
  const [wishlistItems, setWishlistItems] = useState(wishlistData);
  const totalPrice = calculateTotalPrice(cartItems);
  const navigate = useNavigate();

  // move items from cart to orders and redirect to orders page
  const placeOrder = () => {
    setItemsToLocalStorage(CART.orders, cartItems);
    setItemsToLocalStorage(CART.cart, []);
    navigate(ROUTES.order);
  };

  // move item from wishlist to cart
  const wishlistToCartAddHandler = (product) => {
    const modifiedCartItems = addToCart(product, 1);
    const modifiedWishlistItems = removeFromWishlist(product);
    setCartItems(modifiedCartItems);
    setWishlistItems(modifiedWishlistItems);
    setActiveTabName(CART.cart);
  };

  // handle increment and decrement in cart tab
  const cartTabButtonHandler = (product, quantity) => {
    const modifiedCartItems = addToCart(product, quantity);
    setCartItems(modifiedCartItems);
  };

  // toogle tabs in cart container
  const toggleTab = (event) => {
    const tabName = event.target.dataset.tab;
    setActiveTabName(tabName);
  };

  useEffect(() => {
    setCartItems(cartData);
    setWishlistItems(wishlistData);
    setActiveTabName(activeTab);
  }, [cartData, wishlistData, activeTab]);

  useEffect(() => {
    cartItems.length == 0 && wishlistItems.length == 0 && cartVisibilityHandler(false);
  }, [cartItems, wishlistItems, cartVisibilityHandler]);

  let cartContent = "";
  if (activeTabName === CART.cart) {
    cartContent = cartItems.map((product) => <CartCard key={product.id} product={product} isCart={true} cartBtnHandler={cartTabButtonHandler} />);
  } else {
    cartContent = wishlistItems.map((product) => (
      <CartCard key={product.id} product={product} isCart={false} wishlistBtnHandler={wishlistToCartAddHandler} />
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
          <p>
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
  activeTab: PropTypes.string.isRequired,
  cartData: PropTypes.array,
  wishlistData: PropTypes.array,
  cartVisibilityHandler: PropTypes.func.isRequired,
};

export default CartContainer;
