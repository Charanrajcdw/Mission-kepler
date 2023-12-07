import PropTypes from "prop-types";
import OrdersContainer from "../../containers/OrdersContainer/OrdersContainer";
import Home from "../Home/Home";

const Orders = ({ categoriesData, isLoaded }) => {
  return (
    <>
      <OrdersContainer />
      <Home categoriesData={categoriesData} isLoaded={isLoaded} />
    </>
  );
};

Orders.propTypes = {
  categoriesData: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default Orders;
