import sindel from "../../assets/sindel.png";
import Lottery from "../../containers/Lottery/Lottery";
import Image from "../../components/Image/Image";
import Trailer from "../../components/Trailer/Trailer";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import OtherLanguages from "../../components/OtherLanguages/OtherLanguages";

const Home = () => {
  return (
    <>
      <Image src={sindel} alt="banner-image" className="banner-img" />
      <ErrorBoundary>
        <Lottery />
      </ErrorBoundary>
      <Trailer />
      <OtherLanguages />
    </>
  );
};

export default Home;
