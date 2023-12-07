import { useState } from "react";
import styles from "./Shopping.module.css";
import CartContainer from "../../containers/CartContainer/CartContainer";
import ProductsContainer from "../../containers/ProductsContainer/ProductsContainer";
import { CART } from "../../constants/constants";
import { addToCart, addToWishlist, getItemsFromLocalStorage } from "../../utils/ProductUtils";

const Shopping = () => {
  const [cartData, setCartData] = useState(() => getItemsFromLocalStorage(CART.cart));
  const [wishlistData, setWishlistData] = useState(() => getItemsFromLocalStorage(CART.wishlist));
  const [activeTab, setActiveTab] = useState(cartData.length > 0 ? CART.cart : wishlistData.length > 0 ? CART.wishlist : null);

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

  const cartVisibilityHandler = () => {
    setActiveTab(null);
  };

  return (
    <div className={styles["shopping-container"]}>
      <ProductsContainer isCartVisible={!!activeTab} addToWishlist={wishlistAddHandler} addToCart={cartAddHandler} />
      {!!activeTab && (
        <CartContainer activeTab={activeTab} cartData={cartData} wishlistData={wishlistData} cartVisibilityHandler={cartVisibilityHandler} />
      )}
    </div>
  );
};

export default Shopping;
