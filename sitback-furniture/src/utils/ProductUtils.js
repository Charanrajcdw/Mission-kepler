import { CART } from "../constants/constants";

export const transformToIndianRupee = (price) => {
  price = parseInt(price);
  return price.toLocaleString("en-IN");
};

export const getGuaranteeMessage = (guarantee) => {
  return guarantee === 1 ? `1 YEAR GUARANTEE` : `${guarantee} YEARS GUARANTEE`;
};

export const addToCart = (product, quantity) => {
  const cartItems = JSON.parse(localStorage.getItem(CART.cart)) ?? [];
  let productIndex = cartItems.findIndex((item) => item.id === product.id);
  if (productIndex >= 0) {
    cartItems[productIndex].quantity += quantity;
    if (cartItems[productIndex].quantity === 0) {
      cartItems.splice(productIndex, 1);
    }
  } else {
    cartItems.push({ ...product, quantity: quantity });
  }
  localStorage.setItem(CART.cart, JSON.stringify(cartItems));
  return cartItems;
};

export const addToWishlist = (product) => {
  const wishlistItems = JSON.parse(localStorage.getItem(CART.wishlist)) ?? [];
  let productIndex = wishlistItems.findIndex((item) => item.id === product.id);
  if (productIndex < 0) {
    wishlistItems.push(product);
  }
  localStorage.setItem(CART.wishlist, JSON.stringify(wishlistItems));
  return wishlistItems;
};

export const removeFromWishlist = (product) => {
  const wishlistItems = JSON.parse(localStorage.getItem(CART.wishlist)) ?? [];
  const newWishlistItems = wishlistItems.filter((item) => item.id !== product.id);
  localStorage.setItem(CART.wishlist, JSON.stringify(newWishlistItems));
  return newWishlistItems;
};
