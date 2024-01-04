import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ clickHandler, className, children, ...props }) => {
  return (
    <button className={`${styles.btn} ${styles[className]}`} onClick={clickHandler} {...props}>
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
