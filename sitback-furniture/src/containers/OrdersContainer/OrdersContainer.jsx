import ProductCard from "../../components/ProductCard/ProductCard";
import { ORDERS } from "../../constants/constants";
import styles from "./OrdersContainer.module.css";

const OrdersContainer = () => {
  const orders = [];

  const orderedProductsContent =
    orders.length > 0 ? orders.map((product) => <ProductCard key={product.id} product={product} isProductsPage={false} />) : <p>{ORDERS.noOrders}</p>;

  return (
    <div className={styles["orders-container"]}>
      <h2 className={styles["orders-title"]}>{ORDERS.title}</h2>
      {orders.length > 0 && <h5 className={styles["orders-description"]}>{ORDERS.description}</h5>}
      <div className={styles["ordered-products"]}>{orderedProductsContent}</div>
    </div>
  );
};

export default OrdersContainer;
