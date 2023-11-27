import { useState, useEffect } from "react";
import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import { CATEGORIES } from "../../constants/constants";
import styles from "./CategoriesContainer.module.css";
import { getCategories } from "../../services/furnitures";

const CategoriesContainer = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    getCategories()
      .then((categories) => setCategoriesData(categories))
      .catch(() => setCategoriesData([]));
  }, []);

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
      <div className={categoriesData.length > 0 ? styles["categories-container"] : styles["categories-container"]}>{categoriesContent}</div>
    </main>
  );
};

export default CategoriesContainer;
