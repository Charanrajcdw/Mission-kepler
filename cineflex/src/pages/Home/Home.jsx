import sindel from "../../assets/sindel.png";
import Lottery from "../../containers/Lottery/Lottery";
import Image from "../../components/Image/Image";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

const Home = () => {
  return (
    <>
      <Image src={sindel} alt="banner-image" className="banner-img" />
      <ErrorBoundary>
        <Lottery />
      </ErrorBoundary>
    </>
  );
};

export default Home;
