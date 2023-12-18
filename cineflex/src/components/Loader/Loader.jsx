import { FadeLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <FadeLoader color="#bbb" height={50} margin={50} radius={10} width={10} className={styles.loader} />
    </div>
  );
};

export default Loader;