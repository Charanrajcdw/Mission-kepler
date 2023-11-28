import ProductsContainer from "../../containers/ProductsContainer/ProductsContainer";
import CartContainer from "../../containers/CartContainer/CartContainer";
import styles from "./Shopping.module.css";
import { addToCart, addToWishlist, getItemsFromLocalStorage, setItemsToLocalStorage } from "../../utils/ProductUtils";
import { CART } from "../../constants/constants";
import { useState, useEffect } from "react";

const Shopping = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(CART.cart);
  const [cartData, setCartData] = useState(() => getItemsFromLocalStorage(CART.cart));
  const [wishlistData, setWishlistData] = useState(() => getItemsFromLocalStorage(CART.wishlist));

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
    setItemsToLocalStorage(CART.cart, []);
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
