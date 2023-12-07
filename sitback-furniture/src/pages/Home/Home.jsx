import PropTypes from "prop-types";
import CategoriesContainer from "../../containers/CategoriesContainer/CategoriesContainer";
import Footer from "../../components/Footer/Footer";

const Home = ({ categoriesData, isLoaded }) => {
  return (
    <>
      <CategoriesContainer categoriesData={categoriesData} isLoaded={isLoaded} />
      <Footer />
    </>
  );
};

Home.propTypes = {
  categoriesData: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default Home;
