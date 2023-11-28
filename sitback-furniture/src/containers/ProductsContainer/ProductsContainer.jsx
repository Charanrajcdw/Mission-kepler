import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getProducts } from "../../services/furnitures";
import ProductCard from "../../components/ProductCard/ProductCard";
import { PRODUCTS, ROUTES } from "../../constants/constants";
import Loader from "../../components/Loader/Loader";
import styles from "./ProductsContainer.module.css";

const ProductsContainer = ({ isCartVisible, addToWishlist, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    setProducts([]);
    setIsLoaded(false);
    getProducts(category)
      .then((fetchedProducts) => {
        fetchedProducts.length > 0 ? setProducts(fetchedProducts) : navigate(ROUTES.invalid);
        setIsLoaded(true);
      })
      .catch(() => setProducts([]));
  }, [category, navigate]);

  let productsContent = "";
  if (products.length > 0) {
    productsContent = products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        isProductsPage={true}
        isCartVisible={isCartVisible}
        addToWishlist={addToWishlist}
        addToCart={addToCart}
      />
    ));
  } else {
    productsContent = PRODUCTS.noProducts;
  }

  return isLoaded ? <main className={styles["products-container"]}>{productsContent}</main> : <Loader />;
};

ProductsContainer.propTypes = {
  isCartVisible: PropTypes.bool.isRequired,
  addToWishlist: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductsContainer;
