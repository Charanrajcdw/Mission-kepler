import { useState, useEffect } from "react";
import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import { CATEGORIES } from "../../constants/constants";
import styles from "./CategoriesContainer.module.css";
import Loader from "../../components/Loader/Loader";
import { getCategories } from "../../services/furnitures";

const CategoriesContainer = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setCategoriesData(categories);
        setIsLoaded(true);
      })
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
      {isLoaded && (
        <div className={categoriesData.length > 0 ? styles["categories-container"] : styles["no-categories-container"]}>{categoriesContent}</div>
      )}
      {!isLoaded && <Loader />}
    </main>
  );
};

export default CategoriesContainer;
