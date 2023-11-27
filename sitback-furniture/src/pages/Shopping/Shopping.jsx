import ProductsContainer from "../../containers/ProductsContainer/ProductsContainer";
import CartContainer from "../../containers/CartContainer/CartContainer";
import styles from "./Shopping.module.css";
import { addToCart, addToWishlist } from "../../utils/ProductUtils";
import { CART } from "../../constants/constants";
import { useState, useEffect } from "react";

const Shopping = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(CART.cart);
  const [cartData, setCartData] = useState(() => {
    const storedCartData = localStorage.getItem(CART.cart);
    return JSON.parse(storedCartData) ?? [];
  });
  const [wishlistData, setWishlistData] = useState(() => {
    const storedWishlistData = localStorage.getItem(CART.wishlist);
    return JSON.parse(storedWishlistData) ?? [];
  });

  const wishlistAddHandler = (product) => {
    const wishlistItems = addToWishlist(product);
    setWishlistData(wishlistItems);
    setActiveTab(CART.wishlist);
  };

  const cartAddHandler = (product) => {
    const cartItems = addToCart(product, 1);
    setCartData(cartItems);
    setActiveTab(CART.cart);
  };

  const cartResetHandler = () => {
    setCartData([]);
    localStorage.setItem(CART.cart, JSON.stringify([]));
  };

  useEffect(() => {
    setIsCartVisible(cartData.length > 0 || wishlistData.length > 0);
  }, [cartData, wishlistData]);

  return (
    <div className={styles["shopping-container"]}>
      <ProductsContainer isCartVisible={isCartVisible} addToWishlist={wishlistAddHandler} addToCart={cartAddHandler} />
      {isCartVisible && <CartContainer activeTab={activeTab} cartData={cartData} wishlistData={wishlistData} resetCart={cartResetHandler} />}
    </div>
  );
};

export default Shopping;
