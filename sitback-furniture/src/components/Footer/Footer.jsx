import { COPYRIGHTS } from "../../constants/constants";
import styles from "./Footer.module.css";

const Copyrights = () => {
  return (
    <footer className={styles.footer}>
      <p>{COPYRIGHTS}</p>
    </footer>
  );
};

export default Copyrights;
