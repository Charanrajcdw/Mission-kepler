import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./BlogList.module.scss";
import { Button, BlogCard, Loader } from "../../components";
import { BLOG_LIST, ENTER, MODAL } from "../../constants";
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

  // handler function to handle search term change submits
  const submitHandler = (e) => {
    if (e.key === ENTER) dispatch(blogActions.modifySearchTerm(e.target.value));
  };

  // handler function for onClick on new blog button
  const newBtnHandler = () => {
    modalHandler(MODAL.newBlog, false);
    dispatch(blogActions.modifyEditStatus(true));
  };

  // handler function for onClick on each blog to change current blog
  const blogChangeHandler = useCallback(
    (blog) => {
      if (isEditing) {
        modalHandler(false, blogActions.modifyCurrentBlog(blog));
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
          defaultValue={searchTerm}
          onKeyDown={submitHandler}
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
