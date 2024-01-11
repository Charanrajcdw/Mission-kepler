import { render, screen, createSnapshot, userEvent } from "../../utils/test.utils.jsx";
import BlogForm from "../BlogForm/BlogForm";
import { BLOG_FORM } from "../../constants";

describe("BlogForm", () => {
  it("should render blog form", () => {
    render(<BlogForm modalHandler={() => {}} />);
    const titleInput = screen.getByPlaceholderText(BLOG_FORM.titlePlaceholder);
    const detailsInput = screen.getByPlaceholderText(BLOG_FORM.detailsPlaceholder);
    const submitButton = screen.getByRole("button");
    expect(titleInput).toBeInTheDocument();
    expect(detailsInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should match blog form snapshot", () => {
    const blogForm = createSnapshot(<BlogForm modalHandler={() => {}} />);
    expect(blogForm).toMatchSnapshot();
  });

  it("should show invalid values warning toast", async () => {
    const user = userEvent.setup();
    render(<BlogForm modalHandler={() => {}} />);
    const submitButton = screen.getByRole("button");
    await user.click(submitButton);
    const warningToast = await screen.findByText(BLOG_FORM.invalidValues);
    expect(warningToast).toBeInTheDocument();
  });

  it("should show invalid title warning toast", async () => {
    const user = userEvent.setup();
    const initialBlogsData = {
      blogData: [{ title: "title1" }, { title: "title2" }],
    };
    render(<BlogForm modalHandler={() => {}} />, { preloadedState: { blogs: initialBlogsData } });
    const titleInput = screen.getByPlaceholderText(BLOG_FORM.titlePlaceholder);
    const detailsInput = screen.getByPlaceholderText(BLOG_FORM.detailsPlaceholder);
    const submitButton = screen.getByRole("button");
    await user.type(titleInput, "title1");
    await user.type(detailsInput, "details");
    await user.click(submitButton);
    const warningToast = await screen.findByText(BLOG_FORM.invalidBlog);
    expect(warningToast).toBeInTheDocument();
  });

  it("should show success messsage on submitting correct details", async () => {
    const user = userEvent.setup();
    render(<BlogForm modalHandler={() => {}} />);
    const titleInput = screen.getByPlaceholderText(BLOG_FORM.titlePlaceholder);
    const detailsInput = screen.getByPlaceholderText(BLOG_FORM.detailsPlaceholder);
    const submitButton = screen.getByRole("button");
    await user.type(titleInput, "blog title");
    await user.type(detailsInput, "blog details");
    await user.click(submitButton);
    const successToast = await screen.findByText(BLOG_FORM.blogAdded);
    expect(successToast).toBeInTheDocument();
  });
});
