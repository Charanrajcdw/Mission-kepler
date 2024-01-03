import PropTypes from "prop-types";
import styles from "./CategoriesContainer.module.css";
import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import { CATEGORIES } from "../../constants/constants";

const CategoriesContainer = ({ categoriesData }) => {
  let categoriesContent = "";
  if (categoriesData.length > 0) {
    categoriesContent = categoriesData.map((category) => <CategoriesCard cardData={category} key={category.id} />);
  } else {
    categoriesContent = CATEGORIES.noCategories;
  }

  return (
    <main className={styles["home-container"]}>
      <h2 className={styles.title}>{CATEGORIES.title}</h2>
      <h3 className={styles.description}>{CATEGORIES.description}</h3>
      <div className={categoriesData.length > 0 ? styles["categories-container"] : styles["no-categories-container"]}>{categoriesContent}</div>
    </main>
  );
};

CategoriesContainer.propTypes = {
  categoriesData: PropTypes.array.isRequired,
};

export default CategoriesContainer;
