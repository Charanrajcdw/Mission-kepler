import PropTypes from "prop-types";
import styles from "./WarningModal.module.scss";
import Button from "../Button/Button";
import { WARNING_MODAL } from "../../constants";

const WarningModal = ({ continueHandler, cancelHandler }) => {
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
  continueHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};

export default WarningModal;
