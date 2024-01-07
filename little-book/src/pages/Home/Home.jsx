import { useContext, useState } from "react";
import styles from "./Home.module.scss";
import BlogDetails from "../../containers/BlogDetails/BlogDetails";
import BlogList from "../../containers/BlogList/BlogList";
import Sidebar from "../../containers/Sidebar/Sidebar";
import MembersList from "../../containers/MembersList/MembersList";
import Modal from "../../components/Modal/Modal";
import BlogForm from "../../components/BlogForm/BlogForm";
import WarningModal from "../../components/WarningModal/WarningModal";
import { ThemeContext } from "../../contexts/theme.context";
import { MODAL } from "../../constants";

const Home = () => {
  const { currentTheme } = useContext(ThemeContext);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState();

  const modalHandler = (modalValue, isWarning) => {
    if (modalValue) modalValue === MODAL.remove ? setCurrentModal() : setCurrentModal(modalValue);
    setIsWarningVisible(isWarning);
  };

  return (
    <div className={`${styles.homeContainer} ${currentTheme}`}>
      <Sidebar modalHandler={modalHandler} />
      <BlogList modalHandler={modalHandler} />
      <BlogDetails />
      {currentModal && (
        <Modal title={currentModal} modalHandler={modalHandler}>
          {currentModal == MODAL.members && <MembersList />}
          {currentModal == MODAL.newBlog && <BlogForm modalHandler={modalHandler} />}
        </Modal>
      )}
      {isWarningVisible && <WarningModal modalHandler={modalHandler} />}
    </div>
  );
};

export default Home;
