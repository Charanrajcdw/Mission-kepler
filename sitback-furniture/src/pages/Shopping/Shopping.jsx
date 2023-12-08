import { useState } from "react";
import styles from "./Shopping.module.css";
import CartContainer from "../../containers/CartContainer/CartContainer";
import ProductsContainer from "../../containers/ProductsContainer/ProductsContainer";
import { CART } from "../../constants/constants";
import { addToCart, addToWishlist, getItemsFromLocalStorage, removeFromWishlist } from "../../utils/product.utils";

const Shopping = () => {
  const storedCartItems = getItemsFromLocalStorage(CART.cart);
  const storedWishlistItems = getItemsFromLocalStorage(CART.wishlist);
  const [cartData, setCartData] = useState({
    cartItems: storedCartItems,
    wishlistItems: storedWishlistItems,
    activeTab: storedCartItems.length > 0 ? CART.cart : storedWishlistItems.length > 0 ? CART.wishlist : null,
  });

  // add to wishlist on click from product card
  const wishlistAddHandler = (product) => {
    const wishlistItems = addToWishlist(product);
    setCartData((prevCartData) => {
      return { ...prevCartData, wishlistItems: wishlistItems, activeTab: CART.wishlist };
    });
  };

  // add to cart on click from product card, and handle buttons in cart card
  const cartItemHandler = (product, quantity) => {
    const cartItems = addToCart(product, quantity);
    setCartData((prevCartData) => {
      return {
        ...prevCartData,
        cartItems: cartItems,
        activeTab: cartItems.length > 0 ? CART.cart : prevCartData.wishlistItems.length > 0 ? CART.wishlist : null,
      };
    });
  };

  // move item from wishlist to cart
  const wishlistToCartAddHandler = (product) => {
    const modifiedCartItems = addToCart(product, 1);
    const modifiedWishlistItems = removeFromWishlist(product);
    setCartData(() => {
      return { cartItems: modifiedCartItems, wishlistItems: modifiedWishlistItems, activeTab: CART.cart };
    });
  };

  return (
    <div className={styles["shopping-container"]}>
      <ProductsContainer isCartVisible={!!cartData.activeTab} addToWishlist={wishlistAddHandler} addToCart={cartItemHandler} />
      {!!cartData.activeTab && <CartContainer cartData={cartData} cartItemHandler={cartItemHandler} addWishlistToCart={wishlistToCartAddHandler} />}
    </div>
  );
};

export default Shopping;
