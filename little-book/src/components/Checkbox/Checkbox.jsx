import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.scss";
import { SIDEBAR } from "../../constants";
import { blogActions } from "../../store";

const Checkbox = ({ label }) => {
  const [isChecked, setIsChecked] = useState(true);
  const dispatch = useDispatch();

  const changeHandler = () => {
    setIsChecked((prevValue) => !prevValue);
    dispatch(blogActions.modifyTypes(label));
  };

  return (
    <div className={styles.checkBoxGroup}>
      <input type="checkbox" checked={isChecked} id={label} value={label} onChange={changeHandler} />
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
