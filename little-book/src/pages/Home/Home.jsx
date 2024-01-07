import { useContext, useState, useCallback, lazy, Suspense } from "react";
import styles from "./Home.module.scss";
const BlogDetails = lazy(() => import("../../containers/BlogDetails/BlogDetails"));
const BlogList = lazy(() => import("../../containers/BlogList/BlogList"));
const Sidebar = lazy(() => import("../../containers/Sidebar/Sidebar"));
const MembersList = lazy(() => import("../../containers/MembersList/MembersList"));
const Modal = lazy(() => import("../../components/Modal/Modal"));
const BlogForm = lazy(() => import("../../components/BlogForm/BlogForm"));
const WarningModal = lazy(() => import("../../components/WarningModal/WarningModal"));
import Loader from "../../components/Loader/Loader";
import { ThemeContext } from "../../contexts/theme.context";
import { MODAL } from "../../constants";

const Home = () => {
  const { currentTheme } = useContext(ThemeContext);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState();

  const modalHandler = useCallback((modalValue, isWarning) => {
    if (modalValue) modalValue === MODAL.remove ? setCurrentModal() : setCurrentModal(modalValue);
    setIsWarningVisible(isWarning);
  }, []);

  return (
    <div className={`${styles.homeContainer} ${currentTheme}`}>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </div>
  );
};

export default Home;
