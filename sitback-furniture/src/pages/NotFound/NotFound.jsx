import { PAGE_NOT_FOUND } from "../../constants/constants";
import Button from "../../components/Button/Button";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles["not-found-container"]}>
      <p>{PAGE_NOT_FOUND.message}</p>
      <Button />
    </div>
  );
};

export default NotFound;
