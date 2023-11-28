import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect } from "react";
import { ORDERS } from "../../constants/constants";
import styles from "./OrdersContainer.module.css";
import { getItemsFromLocalStorage, setItemsToLocalStorage } from "../../utils/ProductUtils";

const OrdersContainer = () => {
  const orders = getItemsFromLocalStorage(ORDERS.orders);

  const orderedProductsContent =
    orders.length > 0 ? orders.map((product) => <ProductCard key={product.id} product={product} isProductsPage={false} />) : <p>{ORDERS.noOrders}</p>;

  useEffect(() => {
    setItemsToLocalStorage(ORDERS.orders, []);
  }, []);

  return (
    <div className={styles["orders-container"]}>
      <h2 className={styles["orders-title"]}>{ORDERS.title}</h2>
      {orders.length > 0 && <h5 className={styles["orders-description"]}>{ORDERS.description}</h5>}
      <div className={styles["ordered-products"]}>{orderedProductsContent}</div>
    </div>
  );
};

export default OrdersContainer;
