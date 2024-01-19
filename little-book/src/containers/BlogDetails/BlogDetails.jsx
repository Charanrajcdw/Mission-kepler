import { useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import styles from "./BlogDetails.module.scss";
import Image from "../../components/Image/Image";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { showSuccessToast, showWarningToast } from "../../utils/toast.utils";
import { ThemeContext } from "../../contexts/theme.context";
import { BLOG_DETAILS } from "../../constants";
import { blogActions } from "../../store";

const BlogDetails = () => {
  const blogTitleRef = useRef();
  const blogDetailsRef = useRef();
  const { currentTheme } = useContext(ThemeContext);
  const { blogData, currentBlog, isLoaded, isEditing } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    blogTitleRef.current && heightHandler(blogTitleRef.current);
    blogDetailsRef.current && heightHandler(blogDetailsRef.current);
  }, [currentBlog]);

  const editHandler = () => {
    dispatch(blogActions.modifyEditStatus(true));
  };

  const saveHandler = () => {
    const title = blogTitleRef.current.value.trim();
    const details = blogDetailsRef.current.value.trim();
    const filteredBlogData = blogData.filter((blog) => blog.title !== currentBlog.title);
    if (title.length <= 0 || details.length <= 0) {
      showWarningToast(BLOG_DETAILS.invalidValues, currentTheme);
    } else if (filteredBlogData.some((blog) => blog.title.toLowerCase() === title.toLowerCase())) {
      showWarningToast(BLOG_DETAILS.invalidBlog, currentTheme);
    } else {
      showSuccessToast(BLOG_DETAILS.saveSuccess, currentTheme);
      dispatch(blogActions.editExistingBlog({ title, details }));
    }
  };

  const cancelHandler = () => {
    dispatch(blogActions.modifyEditStatus(false));
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
