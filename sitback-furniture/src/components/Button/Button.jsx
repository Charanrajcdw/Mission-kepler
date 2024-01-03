import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ clickHandler, className, children }) => {
  return (
    <button className={`${styles.btn} ${styles[className]}`} onClick={clickHandler}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  clickHandler: PropTypes.func,
  children: PropTypes.string.isRequired,
};

export default Button;
