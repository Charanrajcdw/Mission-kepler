import { render, userEvent, screen, createSnapshot } from "../../utils/test.utils";
import BlogDetails from "../BlogDetails/BlogDetails";
import { BLOG_DETAILS } from "../../constants";

jest.mock("../../components/Loader/Loader", () => () => <div data-testid="loader" />);
const blogData = {
  title: "Blog title",
  details: "Blog details",
  photo: "https://cdn.mos.cms.futurecdn.net/E3JYf6eJHQawCL2AR5cBv4.jpg",
  type: "Local",
};
const blogsData = [
  { title: "title 1", type: "international" },
  { title: "title 2", type: "regional" },
];
const updateBlogData = {
  title: "New blog title",
  details: "New blog details",
  photo: "https://cdn.mos.cms.futurecdn.net/E3JYf6eJHQawCL2AR5cBv4.jpg",
  type: "Local",
};

describe("Blog details UI", () => {
  it("should render loader component if data is loading", () => {
    const initialBlogsData = { isLoaded: false };
    render(<BlogDetails />, { preloadedState: { blogs: initialBlogsData } });
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("should render no blogs content if there is no current blog", () => {
    const initialBlogsData = { isLoaded: true };
    render(<BlogDetails />, { preloadedState: { blogs: initialBlogsData } });
    const noBlogsElement = screen.getByText(BLOG_DETAILS.noBlog);
    expect(noBlogsElement).toBeInTheDocument();
  });

  it("should render blog content if the blog is loaded and not in editing state", () => {
    const initialBlogsData = { isLoaded: true, isEditing: false, currentBlog: blogData };
    render(<BlogDetails />, { preloadedState: { blogs: initialBlogsData } });
    const titleElement = screen.getByDisplayValue(blogData.title);
    const detailsElement = screen.getByDisplayValue(blogData.details);
    const editButton = screen.getByText(BLOG_DETAILS.editText);
    expect(titleElement).toBeInTheDocument();
    expect(detailsElement).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  it("should render blog content if the blog is loaded and in editing state", () => {
    const initialBlogsData = { isLoaded: true, isEditing: true, currentBlog: blogData };
    render(<BlogDetails />, { preloadedState: { blogs: initialBlogsData } });
    const cancelButton = screen.getByText(BLOG_DETAILS.cancelText);
    const saveButton = screen.getByText(BLOG_DETAILS.saveText);
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
});

describe("Blog details functionalities", () => {
  it("should have same data if cancel button is clicked", async () => {
    const user = userEvent.setup();
    const initialBlogsData = { isLoaded: true, isEditing: false, currentBlog: blogData };
    render(<BlogDetails />, { preloadedState: { blogs: initialBlogsData } });
    const titleElement = screen.getByDisplayValue(blogData.title);
    const detailsElement = screen.getByDisplayValue(blogData.details);
    const editButton = screen.getByText(BLOG_DETAILS.editText);
    await user.click(editButton);
    await user.type(titleElement, updateBlogData.title);
    await user.type(detailsElement, updateBlogData.details);
    const cancelButton = await screen.findByText(BLOG_DETAILS.cancelText);
    await user.click(cancelButton);
    expect(titleElement).toHaveValue(blogData.title);
    expect(detailsElement).toHaveValue(blogData.details);
  });

  it("should have updated data if save button is clicked", async () => {
    const user = userEvent.setup();
    const initialBlogsData = { isLoaded: true, isEditing: false, currentBlog: blogData, blogData: blogsData };
    render(<BlogDetails />, { preloadedState: { blogs: initialBlogsData } });
    const titleElement = screen.getByDisplayValue(blogData.title);
    const detailsElement = screen.getByDisplayValue(blogData.details);
    const editButton = screen.getByText(BLOG_DETAILS.editText);
    await user.click(editButton);
    await user.clear(titleElement);
    await user.type(titleElement, updateBlogData.title);
    await user.clear(detailsElement);
    await user.type(detailsElement, updateBlogData.details);
    const saveButton = await screen.findByText(BLOG_DETAILS.saveText);
    await user.click(saveButton);
    expect(titleElement).toHaveValue(updateBlogData.title);
    expect(detailsElement).toHaveValue(updateBlogData.details);
  });

  it("should show warning if same title is entered or empty values found", async () => {
    const user = userEvent.setup();
    const initialBlogsData = { isLoaded: true, isEditing: false, currentBlog: blogData, blogData: blogsData };
    render(<BlogDetails />, { preloadedState: { blogs: initialBlogsData } });
    const titleElement = screen.getByDisplayValue(blogData.title);
    const detailsElement = screen.getByDisplayValue(blogData.details);
    const editButton = screen.getByText(BLOG_DETAILS.editText);
    // testing for empty values
    await user.click(editButton);
    await user.clear(titleElement);
    await user.clear(detailsElement);
    const saveButton = await screen.findByText(BLOG_DETAILS.saveText);
    await user.click(saveButton);
    const valuesWarningElement = await screen.findByText(BLOG_DETAILS.invalidValues);
    expect(valuesWarningElement).toBeInTheDocument();
    // testing for same title
    await user.type(titleElement, blogsData[0].title);
    await user.type(detailsElement, updateBlogData.details);
    await user.click(saveButton);
    const titleWarningElement = await screen.findByText(BLOG_DETAILS.invalidBlog);
    expect(titleWarningElement).toBeInTheDocument();
  });
});

describe("Blog details snapshots", () => {
  it("should match blog details snapshot in display mode", () => {
    const initialBlogsData = { isLoaded: true, isEditing: false, currentBlog: blogData };
    const blogDetails = createSnapshot(<BlogDetails />, { preloadedState: { blogs: initialBlogsData } });
    expect(blogDetails).toMatchSnapshot();
  });

  it("should match blog details snapshot in editing mode", () => {
    const initialBlogsData = { isLoaded: true, isEditing: true, currentBlog: blogData };
    const blogDetails = createSnapshot(<BlogDetails />, { preloadedState: { blogs: initialBlogsData } });
    expect(blogDetails).toMatchSnapshot();
  });
});
