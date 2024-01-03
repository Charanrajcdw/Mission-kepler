import { useContext } from "react";
import styles from "./Home.module.scss";
import BlogDetails from "../../containers/BlogDetails/BlogDetails";
import BlogList from "../../containers/BlogList/BlogList";
import Sidebar from "../../containers/Sidebar/Sidebar";
import { ThemeContext } from "../../contexts/theme.context";

const Home = () => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <div className={`${styles.homeContainer} ${currentTheme}`}>
      <Sidebar />
      <BlogList />
      <BlogDetails />
    </div>
  );
};

export default Home;
