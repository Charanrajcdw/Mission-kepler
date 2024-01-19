import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./WarningModal.module.scss";
import Button from "../Button/Button";
import { MODAL, WARNING_MODAL } from "../../constants";
import { blogActions } from "../../store";

const WarningModal = ({ modalHandler, modalAction }) => {
  const dispatch = useDispatch();

  const continueHandler = () => {
    modalHandler(MODAL.remove, false);
    modalAction && dispatch(modalAction);
  };

  const cancelHandler = () => {
    modalHandler(false, false);
  };

  return (
    <div className={styles.warningModalContainer}>
      <div className={styles.warningModalContent}>
        <p className={styles.title}>{WARNING_MODAL.title}</p>
        <div className={styles.buttonsContainer}>
          <Button className="blueBtn" clickHandler={cancelHandler}>
            {WARNING_MODAL.cancel}
          </Button>
          <Button className="pinkBtn" clickHandler={continueHandler}>
            {WARNING_MODAL.continue}
          </Button>
        </div>
      </div>
    </div>
  );
};

WarningModal.propTypes = {
  modalHandler: PropTypes.func.isRequired,
  modalAction: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
};

export default WarningModal;
