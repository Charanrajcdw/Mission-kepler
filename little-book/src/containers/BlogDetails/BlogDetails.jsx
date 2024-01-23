import { useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import styles from "./BlogDetails.module.scss";
import { Image, Button, Loader } from "../../components";
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

  // handler function for onClick on edit blog button
  const editHandler = () => {
    dispatch(blogActions.modifyEditStatus(true));
  };

  // handler function for onClick on save edit button
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

  // handler function for onClick on cancel edit button
  const cancelHandler = () => {
    dispatch(blogActions.modifyEditStatus(false));
  };

  // handler function to scroll the blogs list to top
  const heightHandler = (element) => {
    element.style.height = "0px";
    element.style.height = element.scrollHeight + "px";
  };

  const textareaBuilder = (styleName, value, refValue) => {
    return (
      <textarea
        className={styleName}
        value={isEditing ? undefined : value}
        readOnly={!isEditing}
        onChange={(event) => heightHandler(event.target)}
        ref={refValue}
      />
    );
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
            {textareaBuilder(styles.blogTitle, currentBlog.title, blogTitleRef)}
            {textareaBuilder(styles.blogDetails, currentBlog.details, blogDetailsRef)}
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
