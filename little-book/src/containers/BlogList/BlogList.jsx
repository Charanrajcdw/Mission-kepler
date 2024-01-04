import { useEffect, useState } from "react";
import styles from "./BlogList.module.scss";
import Button from "../../components/Button/Button";
import BlogCard from "../../components/BlogCard/BlogCard";
import Loader from "../../components/Loader/Loader";
import { BLOG_LIST } from "../../constants";
import { getBlogs } from "../../services/blog.services";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getBlogs().then((blogs) => {
      setBlogs(blogs);
      setIsLoaded(true);
    });
  }, []);

  const getBlogsContent = () => {
    let blogContent = "";
    if (blogs.length > 0) {
      blogContent = blogs.map((blog) => <BlogCard key={blog.title} {...blog} />);
    } else {
      blogContent = <p className={styles.noBlogs}>{BLOG_LIST.noBlogs}</p>;
    }
    return blogContent;
  };

  return (
    <div className={styles.blogListContainer}>
      <div className={styles.searchBar}>
        <input type="text" className={styles.search} placeholder={BLOG_LIST.searchText} />
        <Button className="pinkBtn">{BLOG_LIST.buttonText}</Button>
      </div>
      <div className={styles.blogsContainer}>{isLoaded ? getBlogsContent() : <Loader />}</div>
    </div>
  );
};

export default BlogList;
