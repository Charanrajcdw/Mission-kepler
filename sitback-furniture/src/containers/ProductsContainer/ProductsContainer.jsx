import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getProducts } from "../../services/furnitures";
import ProductCard from "../../components/ProductCard/ProductCard";
import { PRODUCTS } from "../../constants/constants";
import styles from "./ProductsContainer.module.css";

const ProductsContainer = ({ isCartVisible }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    getProducts(category)
      .then((fetchedProducts) => {
        fetchedProducts.length > 0 ? setProducts(fetchedProducts) : navigate("/invalidCategory");
      })
      .catch(() => setProducts([]));
  }, [category, navigate]);

  let productsContent = "";
  if (products.length > 0) {
    productsContent = products.map((product) => (
      <ProductCard key={product.id} product={product} isProductsPage={true} isCartVisible={isCartVisible} />
    ));
  } else {
    productsContent = PRODUCTS.noProducts;
  }

  return <main className={styles["products-container"]}>{productsContent}</main>;
};

ProductsContainer.propTypes = {
  isCartVisible: PropTypes.bool.isRequired,
};

export default ProductsContainer;
