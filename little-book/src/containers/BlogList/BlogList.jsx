import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./BlogList.module.scss";
import Button from "../../components/Button/Button";
import BlogCard from "../../components/BlogCard/BlogCard";
import Loader from "../../components/Loader/Loader";
import { BLOG_LIST, MODAL } from "../../constants";
import { getBlogs } from "../../services/blog.services";
import { blogActions } from "../../store";

const BlogList = ({ setCurrentModal }) => {
  const { filteredBlogData: blogs, isLoaded, currentBlog, searchTerm } = useSelector((state) => state.blogs);
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

  const getBlogsContent = () => {
    let blogContent = "";
    if (blogs.length > 0) {
      blogContent = blogs.map((blog) => <BlogCard key={blog.title} blog={blog} isSelected={currentBlog.title === blog.title} />);
    } else {
      blogContent = <p className={styles.noBlogs}>{BLOG_LIST.noBlogs}</p>;
    }
    return blogContent;
  };

  return (
    <div className={styles.blogListContainer}>
      <div className={styles.searchBar}>
        <input type="text" className={styles.search} placeholder={BLOG_LIST.searchText} value={searchTerm} onChange={searchHandler} />
        <Button className="pinkBtn" clickHandler={() => setCurrentModal(MODAL.newBlog)}>
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
  setCurrentModal: PropTypes.func.isRequired,
};

export default BlogList;
