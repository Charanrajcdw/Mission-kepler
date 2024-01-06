import { useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PropTypes from "prop-types";
import styles from "./BlogForm.module.scss";
import Button from "../Button/Button";
import { BLOG_FORM } from "../../constants";

const BlogForm = ({ setCurrentModal }) => {
  const titleRef = useRef();
  const detailsRef = useRef();

  const submitHandler = () => {
    console.log(titleRef.current.value, detailsRef.current.value);
    titleRef.current.value = "";
    detailsRef.current.value = "";
    setCurrentModal();
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
