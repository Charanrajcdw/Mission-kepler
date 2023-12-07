import PropTypes from "prop-types";
import styles from "./CartCard.module.css";
import Button from "../Button/Button";
import Image from "../Image/Image";
import { BUTTON } from "../../constants/constants";
import { transformToIndianRupee } from "../../utils/ProductUtils";

const CartCard = ({ product, isCart, wishlistBtnHandler, cartBtnHandler }) => {
  const { photo, name, price, quantity } = product;
  const incrementHandler = () => {
    cartBtnHandler(product, 1);
  };

  const decrementHandler = () => {
    cartBtnHandler(product, -1);
  };

  const wishlistHandler = () => {
    wishlistBtnHandler(product);
  };

  return (
    <div className={styles["cart-card"]}>
      <Image className="cart-img" src={photo} alt={name} />
      <div className={styles["content-container"]}>
        <p className={styles["product-name"]}>{name}</p>
        <p className={styles["product-price"]}>&#8377; {transformToIndianRupee(price)}</p>
      </div>
      {isCart ? (
        <div className={styles["product-buttons"]}>
          <Button className="decrement-btn" clickHandler={decrementHandler}>
            {BUTTON.decrement}
          </Button>
          <p>{quantity}</p>
          <Button className="increment-btn" clickHandler={incrementHandler}>
            {BUTTON.increment}
          </Button>
        </div>
      ) : (
        <Button className="cart-tab-btn" clickHandler={wishlistHandler}>
          {BUTTON.cart}
        </Button>
      )}
    </div>
  );
};

CartCard.propTypes = {
  product: PropTypes.object.isRequired,
  isCart: PropTypes.bool.isRequired,
  cartBtnHandler: PropTypes.func,
  wishlistBtnHandler: PropTypes.func,
};

export default CartCard;
