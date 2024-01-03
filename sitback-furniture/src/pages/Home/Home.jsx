import PropTypes from "prop-types";
import CategoriesContainer from "../../containers/CategoriesContainer/CategoriesContainer";
import Footer from "../../components/Footer/Footer";

const Home = ({ categoriesData }) => {
  return (
    <>
      <CategoriesContainer categoriesData={categoriesData} />
      <Footer />
    </>
  );
};

Home.propTypes = {
  categoriesData: PropTypes.array.isRequired,
};

export default Home;
