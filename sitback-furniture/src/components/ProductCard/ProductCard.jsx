import PropTypes from "prop-types";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import styles from "./ProductCard.module.css";
import Button from "../Button/Button";
import Image from "../Image/Image";
import { BUTTON, PRODUCTS } from "../../constants/constants";
import { getGuaranteeMessage, transformToIndianRupee } from "../../utils/product.utils";

const ProductCard = ({ product, isProductsPage, isCartVisible, addToWishlist, addToCart }) => {
  const { photo, name, price, quantity, description, guarantee } = product;
  const displayPrice = transformToIndianRupee(isProductsPage ? price : price * quantity);
  const wishlistAddHandler = () => {
    addToWishlist(product);
  };
  
  const cartAddHandler = () => {
    addToCart(product, 1);
  };

  return (
    <div className={`${styles.card} ${isProductsPage ? "" : styles["order-card"]} ${isCartVisible ? styles["big-product-card"] : ""}`}>
      <Image src={photo} alt={name} className="product-img" />
      <div className={styles["product-title-container"]}>
        <h5>{name}</h5>
        <p>&#8377; {displayPrice}</p>
      </div>
      {quantity && <p className={styles["product-quantity"]}>{`${PRODUCTS.quantity} ${quantity}`}</p>}
      <p className={styles["product-description"]}>{description}</p>
      {isProductsPage && (
        <>
          <div className={styles["product-guarantee"]}>
            <span>
              <IoShieldCheckmarkSharp />
            </span>
            <p>{getGuaranteeMessage(guarantee)}</p>
          </div>
          <div className={styles["product-buttons"]}>
            <Button className="wishlist-btn" clickHandler={wishlistAddHandler}>
              {BUTTON.wishlist}
            </Button>
            <Button className="cart-btn" clickHandler={cartAddHandler}>
              {BUTTON.cart}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isProductsPage: PropTypes.bool.isRequired,
  isCartVisible: PropTypes.bool,
  addToWishlist: PropTypes.func,
  addToCart: PropTypes.func,
};

export default ProductCard;
