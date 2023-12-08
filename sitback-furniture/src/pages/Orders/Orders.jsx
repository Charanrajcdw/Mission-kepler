import PropTypes from "prop-types";
import OrdersContainer from "../../containers/OrdersContainer/OrdersContainer";
import Home from "../Home/Home";

const Orders = ({ categoriesData }) => {
  return (
    <>
      <OrdersContainer />
      <Home categoriesData={categoriesData} />
    </>
  );
};

Orders.propTypes = {
  categoriesData: PropTypes.array.isRequired,
};

export default Orders;
