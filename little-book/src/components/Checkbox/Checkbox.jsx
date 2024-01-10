import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.scss";
import { SIDEBAR } from "../../constants";
import { blogActions } from "../../store";

const Checkbox = ({ label, modalHandler }) => {
  const [isChecked, setIsChecked] = useState(true);
  const isEditing = useSelector((state) => state.blogs.isEditing);
  const dispatch = useDispatch();

  const changeHandler = () => {
    if (isEditing) {
      modalHandler(false, true);
      return;
    }
    setIsChecked((prevValue) => !prevValue);
    dispatch(blogActions.modifyTypes(label));
  };

  return (
    <div className={styles.checkBoxGroup}>
      <input type="checkbox" checked={isChecked} id={label} value={label} onChange={changeHandler} />
      <label htmlFor={label}>
        {label} {SIDEBAR.blogs}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export const memoizedCheckbox = memo(Checkbox);

export default memoizedCheckbox;
