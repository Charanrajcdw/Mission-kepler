import PropTypes from "prop-types";
import styles from "./Modal.module.scss";

const Modal = ({ setCurrentModal, children }) => {
  const removeModal = () => {
    setCurrentModal();
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
};

export default Modal;
