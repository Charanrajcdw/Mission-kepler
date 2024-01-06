import { useEffect, useState, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import styles from "./BlogDetails.module.scss";
import Image from "../../components/Image/Image";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { showSuccessToast } from "../../utils/toast.utils";
import { ThemeContext } from "../../contexts/theme.context";
import { BLOG_DETAILS } from "../../constants";

const BlogDetails = () => {
  const blogTitleRef = useRef();
  const blogDetailsRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const { currentTheme } = useContext(ThemeContext);
  const { currentBlog, isLoaded } = useSelector((state) => state.blogs);

  useEffect(() => {
    blogTitleRef.current && heightHandler(blogTitleRef.current);
    blogDetailsRef.current && heightHandler(blogDetailsRef.current);
  }, [currentBlog]);

  const editHandler = () => {
    setIsEditing(true);
  };

  const saveHandler = () => {
    showSuccessToast(BLOG_DETAILS.saveSuccess, currentTheme);
    setIsEditing(false);
  };

  const cancelHandler = () => {
    setIsEditing(false);
  };

  const heightHandler = (element) => {
    element.style.height = "0px";
    element.style.height = element.scrollHeight + "px";
  };

  return (
    <article className={styles.blogDetailsContainer}>
      <ToastContainer />
      {isLoaded ? (
        !currentBlog ? (
          <p className={styles.noBlog}>{BLOG_DETAILS.noBlog}</p>
        ) : (
          <>
            <Image className="blogImg" src={currentBlog.photo} alt={currentBlog.title} />
            <textarea
              className={styles.blogTitle}
              value={isEditing ? undefined : currentBlog.title}
              readOnly={!isEditing}
              onChange={(event) => heightHandler(event.target)}
              ref={blogTitleRef}
            />
            <textarea
              className={styles.blogDetails}
              value={isEditing ? undefined : currentBlog.details}
              readOnly={!isEditing}
              onChange={(event) => heightHandler(event.target)}
              ref={blogDetailsRef}
            />
            <div className={styles.buttonsContainer}>
              {isEditing ? (
                <>
                  <Button className="blueBtn smallBtn" clickHandler={cancelHandler}>
                    {BLOG_DETAILS.cancelText}
                  </Button>
                  <Button className="pinkBtn smallBtn" clickHandler={saveHandler}>
                    {BLOG_DETAILS.saveText}
                  </Button>
                </>
              ) : (
                <Button className="blueBtn smallBtn" clickHandler={editHandler}>
                  {BLOG_DETAILS.editText}
                </Button>
              )}
            </div>
          </>
        )
      ) : (
        <Loader />
      )}
    </article>
  );
};

export default BlogDetails;
