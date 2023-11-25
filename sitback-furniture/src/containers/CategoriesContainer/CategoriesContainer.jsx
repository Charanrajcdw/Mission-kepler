import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import { CATEGORIES } from "../../constants/constants";
import styles from "./CategoriesContainer.module.css";

const CategoriesContainer = () => {
  const categoriesData = [
    {
      id: "couches",
      photo: "https://images.unsplash.com/photo-1550254478-ead40cc54513?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=911&q=80",
      category: "Couches",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.",
    },
    {
      id: "chairs",
      photo: "https://images.unsplash.com/photo-1520940115356-52e16be4351a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      category: "Chairs",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: "dining",
      photo: "https://images.unsplash.com/photo-1590498790880-f8049fe41aa5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1329&q=80",
      category: "Dining",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.",
    },
  ];

  return (
    <main className={styles["home-container"]}>
      <h2 className={styles.title}>{CATEGORIES.title}</h2>
      <h3 className={styles.description}>{CATEGORIES.description}</h3>
      <div className={styles["categories-container"]}>
        {categoriesData.map((category) => (
          <CategoriesCard cardData={category} key={category.id} />
        ))}
      </div>
    </main>
  );
};

export default CategoriesContainer;
