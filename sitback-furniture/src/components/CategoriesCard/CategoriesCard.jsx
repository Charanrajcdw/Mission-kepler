import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./CategoriesCard.module.css";
import Button from "../Button/Button";
import Image from "../Image/Image";
import { NAVBAR, BUTTON } from "../../constants/constants";

const CategoriesCard = ({ cardData }) => {
  const { photo, category, description } = cardData;
  const navigate = useNavigate();

  const navigateToCategoryPage = () => {
    navigate(`${NAVBAR.route}${cardData.id}`);
  };

  return (
    <div className={styles["category-card"]}>
      <Image className="category-img" src={photo} alt={category} />
      <h2 className={styles["category-title"]}>{category}</h2>
      <p className={styles["category-description"]}>{description}</p>
      <Button clickHandler={navigateToCategoryPage} className="category-btn">
        {BUTTON.shopNow}
      </Button>
    </div>
  );
};

CategoriesCard.propTypes = {
  cardData: PropTypes.object.isRequired,
};

export default CategoriesCard;
