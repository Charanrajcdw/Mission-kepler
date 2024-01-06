import { useContext, useState } from "react";
import styles from "./Home.module.scss";
import BlogDetails from "../../containers/BlogDetails/BlogDetails";
import BlogList from "../../containers/BlogList/BlogList";
import Sidebar from "../../containers/Sidebar/Sidebar";
import MembersList from "../../containers/MembersList/MembersList";
import Modal from "../../components/Modal/Modal";
import BlogForm from "../../components/BlogForm/BlogForm";
import { ThemeContext } from "../../contexts/theme.context";
import { MODAL } from "../../constants";

const Home = () => {
  const { currentTheme } = useContext(ThemeContext);
  const [currentModal, setCurrentModal] = useState(MODAL.newBlog);

  return (
    <div className={`${styles.homeContainer} ${currentTheme}`}>
      <Sidebar setCurrentModal={setCurrentModal} />
      <BlogList setCurrentModal={setCurrentModal} />
      <BlogDetails />
      {currentModal && (
        <Modal title={currentModal} setCurrentModal={setCurrentModal}>
          {currentModal == MODAL.members && <MembersList />}
          {currentModal == MODAL.newBlog && <BlogForm setCurrentModal={setCurrentModal} />}
        </Modal>
      )}
    </div>
  );
};

export default Home;
