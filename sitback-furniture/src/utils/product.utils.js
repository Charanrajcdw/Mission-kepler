import { CART, TOAST_MESSAGES } from "../constants/constants";
import { showSuccessToast, showWarningToast } from "./toast.utils";

export const transformToIndianRupee = (price) => {
  price = +price;
  return price ? price.toLocaleString("en-IN", { maximumFractionDigits: 2 }) : 0;
};

export const getGuaranteeMessage = (guarantee) => {
  return guarantee === 1 ? `1 YEAR GUARANTEE` : `${guarantee} YEARS GUARANTEE`;
};

export const calculateTotalPrice = (items) => {
  const price = items.reduce((total, product) => total + parseInt(product.price) * product.quantity, 0);
  return transformToIndianRupee(price);
};

export const getItemsFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) ?? [];
};

export const setItemsToLocalStorage = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const addToCart = (product, quantity, fromProductsContainer) => {
  const cartItems = getItemsFromLocalStorage(CART.cart);
  const productIndex = cartItems.findIndex((item) => item.id === product.id);
  if (productIndex >= 0) {
    cartItems[productIndex].quantity += quantity;
    if (cartItems[productIndex].quantity === 0) {
      cartItems.splice(productIndex, 1);
    }
  } else {
    cartItems.push({ ...product, quantity: quantity });
  }
  setItemsToLocalStorage(CART.cart, cartItems);
  fromProductsContainer && showSuccessToast(TOAST_MESSAGES.addToCart);
  return cartItems;
};

export const addToWishlist = (product) => {
  const wishlistItems = getItemsFromLocalStorage(CART.wishlist);
  const productIndex = wishlistItems.findIndex((item) => item.id === product.id);
  if (productIndex < 0) {
    wishlistItems.push(product);
    showSuccessToast(TOAST_MESSAGES.addToWishlist);
  } else {
    showWarningToast(TOAST_MESSAGES.warnInWishlist);
  }
  setItemsToLocalStorage(CART.wishlist, wishlistItems);
  return wishlistItems;
};

export const removeFromWishlist = (product) => {
  const wishlistItems = getItemsFromLocalStorage(CART.wishlist);
  const newWishlistItems = wishlistItems.filter((item) => item.id !== product.id);
  setItemsToLocalStorage(CART.wishlist, newWishlistItems);
  return newWishlistItems;
};
