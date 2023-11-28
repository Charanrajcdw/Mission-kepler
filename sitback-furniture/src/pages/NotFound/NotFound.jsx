import { PAGE_NOT_FOUND, ROUTES } from "../../constants/constants";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate(ROUTES.home);
  };

  return (
    <div className={styles["not-found-container"]}>
      <p>{PAGE_NOT_FOUND.title}</p>
      <Button className="category-btn" clickHandler={redirectToHome}>
        {PAGE_NOT_FOUND.button}
      </Button>
    </div>
  );
};

export default NotFound;
