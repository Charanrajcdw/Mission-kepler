import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ clickHandler, className, children, ...props }) => {
  const styleNames = className.split(" ").map((style) => styles[style]).join(" ");
  
  return (
    <button className={`${styles.btn} ${styleNames}`} onClick={clickHandler} {...props}>
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
