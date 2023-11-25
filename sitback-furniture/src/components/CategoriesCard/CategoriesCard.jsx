import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Image from "../Image/Image";
import styles from "./CategoriesCard.module.css";
import { BUTTON } from "../../constants/constants";

const CategoriesCard = ({ cardData }) => {
  const navigate = useNavigate();

  const navigateToCategoryPage = () => {
    navigate(`/categories/${cardData.id}`);
  };

  return (
    <div className={styles["category-card"]}>
      <Image className="category-img" src={cardData.photo} alt={cardData.category} />
      <h2 className={styles["category-title"]}>{cardData.category}</h2>
      <p className={styles["category-description"]}>{cardData.description}</p>
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
