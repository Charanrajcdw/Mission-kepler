import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.scss";
import { SIDEBAR } from "../../constants";

const Checkbox = ({ label }) => {
  const [isChecked, setIsChecked] = useState(true);

  const changeHandler = () => {
    setIsChecked((prevValue) => !prevValue);
  };

  return (
    <div className={styles.checkBoxGroup}>
      <input type="checkbox" defaultChecked={isChecked} id={label} value={label} onChange={changeHandler} />
      <span className={styles.checkmark}></span>
      <label htmlFor={label}>
        {label} {SIDEBAR.blogs}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Checkbox;
