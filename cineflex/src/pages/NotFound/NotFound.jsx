import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import Button from "../../components/Button/Button";
import { NOT_FOUND, ROUTE_PATHS } from "../../constants";

const NotFound = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate(ROUTE_PATHS.home);
  };

  return (
    <div className={styles["not-found-container"]}>
      <p>{NOT_FOUND.title}</p>
      <Button clickHandler={redirectToHome}>{NOT_FOUND.button}</Button>
    </div>
  );
};

export default NotFound;
