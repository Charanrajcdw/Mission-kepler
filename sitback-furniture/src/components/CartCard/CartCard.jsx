import Button from "../Button/Button";
import Image from "../Image/Image";
import PropTypes from "prop-types";
import { BUTTON } from "../../constants/constants";
import { transformToIndianRupee } from "../../utils/ProductUtils";
import styles from "./CartCard.module.css";

const CartCard = ({ product, isCart }) => {
  return (
    <div className={styles["cart-card"]}>
      <Image className="cart-img" src={product.photo} alt={product.name} />
      <div className={styles["content-container"]}>
        <p className={styles["product-name"]}>{product.name}</p>
        <p className={styles["product-price"]}>&#8377; {transformToIndianRupee(product.price)}</p>
      </div>
      {isCart ? (
        <div className={styles["product-buttons"]}>
          <Button className="decrement-btn" clickHandler={() => {}}>
            {BUTTON.decrement}
          </Button>
          <p>{product.quantity}</p>
          <Button className="increment-btn" clickHandler={() => {}}>
            {BUTTON.increment}
          </Button>
        </div>
      ) : (
        <Button className="cart-tab-btn" clickHandler={() => {}}>
          {BUTTON.cart}
        </Button>
      )}
    </div>
  );
};

CartCard.propTypes = {
  product: PropTypes.object.isRequired,
  isCart: PropTypes.bool.isRequired,
};

export default CartCard;
