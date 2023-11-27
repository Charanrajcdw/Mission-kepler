import PropTypes from "prop-types";
import Button from "../Button/Button";
import Image from "../Image/Image";
import styles from "./ProductCard.module.css";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { getGuaranteeMessage, transformToIndianRupee } from "../../utils/ProductUtils";
import { BUTTON, PRODUCTS } from "../../constants/constants";

const ProductCard = ({ product, isProductsPage, isCartVisible }) => {
  return (
    <div className={`${styles.card} ${isProductsPage ? "" : styles["order-card"]} ${isCartVisible ? styles["big-product-card"] : ""}`}>
      <Image src={product.photo} alt={product.name} className="product-img" />
      <div className={styles["product-title-container"]}>
        <h5>{product.name}</h5>
        <p>&#8377; {transformToIndianRupee(product.price)}</p>
      </div>
      {product.quantity && <p className={styles["product-quantity"]}>{`${PRODUCTS.quantity} ${product.quantity}`}</p>}
      <p className={styles["product-description"]}>{product.description}</p>
      {isProductsPage && (
        <>
          <div className={styles["product-guarantee"]}>
            <span>
              <IoShieldCheckmarkSharp />
            </span>
            <p>{getGuaranteeMessage(product.guarantee)}</p>
          </div>
          <div className={styles["product-buttons"]}>
            <Button className="wishlist-btn" clickHandler={() => {}}>
              {BUTTON.wishlist}
            </Button>
            <Button className="cart-btn" clickHandler={() => {}}>
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
};

export default ProductCard;
