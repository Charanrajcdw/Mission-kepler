import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";
import { MODAL } from "../../constants";
import { blogActions } from "../../store";

const Modal = ({ modalHandler, children }) => {
  const { isEditing } = useSelector((state) => state.blogs);

  const removeModal = () => {
    if (isEditing) {
      modalHandler(false, blogActions.modifyEditStatus(false));
      return;
    }
    modalHandler(MODAL.remove, false);
  };

  return (
    <div className={styles.modalContainer} onClick={removeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default Modal;
