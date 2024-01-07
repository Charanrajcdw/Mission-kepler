import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./BlogList.module.scss";
import Button from "../../components/Button/Button";
import BlogCard from "../../components/BlogCard/BlogCard";
import Loader from "../../components/Loader/Loader";
import { BLOG_LIST, MODAL } from "../../constants";
import { getBlogs } from "../../services/blog.services";
import { blogActions } from "../../store";

const BlogList = ({ modalHandler }) => {
  const { filteredBlogData: blogs, isLoaded, currentBlog, searchTerm, isEditing } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const blogsRef = useRef();

  useEffect(() => {
    getBlogs().then((blogs) => dispatch(blogActions.modifyBlogs(blogs)));
  }, [dispatch]);

  useEffect(() => {
    blogsRef.current.scrollTo(0, 0);
  }, [blogs]);

  const searchHandler = (e) => {
    dispatch(blogActions.modifySearchTerm(e.target.value));
  };

  const newBtnHandler = () => {
    modalHandler(MODAL.newBlog, false);
    dispatch(blogActions.modifyEditStatus(true));
  };

  const blogChangeHandler = useCallback(
    (blog) => {
      if (isEditing) {
        modalHandler(false, true);
        return;
      }
      dispatch(blogActions.modifyCurrentBlog(blog));
    },
    [dispatch, isEditing, modalHandler]
  );

  const getBlogsContent = () => {
    let blogContent = "";
    if (blogs.length > 0) {
      blogContent = blogs.map((blog) => (
        <BlogCard key={blog.title} blog={blog} isSelected={currentBlog.title === blog.title} blogChangeHandler={blogChangeHandler} />
      ));
    } else {
      blogContent = <p className={styles.noBlogs}>{BLOG_LIST.noBlogs}</p>;
    }
    return blogContent;
  };

  return (
    <div className={styles.blogListContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.search}
          placeholder={BLOG_LIST.searchText}
          value={searchTerm}
          onChange={searchHandler}
          disabled={isEditing}
        />
        <Button className="pinkBtn" clickHandler={newBtnHandler} disabled={isEditing}>
          {BLOG_LIST.buttonText}
        </Button>
      </div>
      <div className={styles.blogsContainer} ref={blogsRef}>
        {isLoaded ? getBlogsContent() : <Loader />}
      </div>
    </div>
  );
};

BlogList.propTypes = {
  modalHandler: PropTypes.func.isRequired,
};

export default BlogList;
