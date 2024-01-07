import { useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PropTypes from "prop-types";
import styles from "./BlogForm.module.scss";
import Button from "../Button/Button";
import { ThemeContext } from "../../contexts/theme.context";
import { showSuccessToast, showWarningToast } from "../../utils/toast.utils";
import { BLOG_FORM } from "../../constants";
import { blogActions } from "../../store";

const BlogForm = ({ setCurrentModal }) => {
  const titleRef = useRef();
  const detailsRef = useRef();
  const { currentTheme } = useContext(ThemeContext);
  const { blogData } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const submitHandler = () => {
    const title = titleRef.current.value.trim();
    const details = detailsRef.current.value.trim();
    if (title.length <= 0 || details.length <= 0) {
      showWarningToast(BLOG_FORM.invalidValues, currentTheme);
    } else if (blogData.some((blog) => blog.title.toLowerCase() === title.toLowerCase())) {
      showWarningToast(BLOG_FORM.invalidBlog, currentTheme);
    } else {
      showSuccessToast(BLOG_FORM.blogAdded, currentTheme);
      dispatch(blogActions.addNewBlog({ title, details, type: BLOG_FORM.localBlog }));
      setCurrentModal();
    }
  };

  return (
    <div className={styles.blogFormContainer}>
      <ToastContainer />
      <p className={styles.formTitle}>{BLOG_FORM.title}</p>
      <div className={styles.inputContainer}>
        <input type="text" className={styles.titleInput} placeholder={BLOG_FORM.titlePlaceholder} ref={titleRef} />
        <textarea className={styles.detailsInput} placeholder={BLOG_FORM.detailsPlaceholder} ref={detailsRef} />
      </div>
      <div className={styles.buttonContainer}>
        <Button className="pinkBtn" clickHandler={submitHandler}>
          {BLOG_FORM.button}
        </Button>
      </div>
    </div>
  );
};

BlogForm.propTypes = {
  setCurrentModal: PropTypes.func.isRequired,
};

export default BlogForm;
