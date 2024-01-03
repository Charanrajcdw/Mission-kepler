import styles from "./Footer.module.css";
import { COPYRIGHTS } from "../../constants/constants";

const Copyrights = () => {
  return (
    <footer className={styles.footer}>
      <p>{COPYRIGHTS}</p>
    </footer>
  );
};

export default Copyrights;
