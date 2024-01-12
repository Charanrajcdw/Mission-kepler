import { render, screen, cleanup, waitFor, waitForElementToBeRemoved, userEvent } from "../../utils/test.utils";
import axiosMock from "axios";
import BlogList from "../BlogList/BlogList";
import { BLOG_LIST, MODAL } from "../../constants";

jest.mock("../../components/BlogCard/BlogCard", () => ({ blog, blogChangeHandler, isSelected }) => (
  <div data-testid="blogCard" onClick={() => blogChangeHandler(blog)} data-selected={isSelected} />
));
jest.mock("../../components/Loader/Loader", () => () => <div data-testid="loader" />);
Element.prototype.scrollTo = () => {};
afterEach(cleanup);

describe("Blog List UI", () => {
  it("should render blog list with blogs", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [
        { title: "title1", type: "type1" },
        { title: "title2", type: "type2" },
      ],
    });
    render(<BlogList modalHandler={() => {}} />);
    const searchInput = screen.getByPlaceholderText(BLOG_LIST.searchText);
    const newBlogButton = screen.getByText(BLOG_LIST.buttonText);
    expect(searchInput).toBeInTheDocument();
    expect(newBlogButton).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId("loader")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByTestId("loader")).toBeNull());
    const membersElements = await screen.findAllByTestId("blogCard");
    expect(membersElements).toHaveLength(2);
  });

  it("should render no blogs content with no blogs", async () => {
    axiosMock.get.mockResolvedValueOnce({ data: [] });
    render(<BlogList modalHandler={() => {}} />);
    const searchInput = screen.getByPlaceholderText(BLOG_LIST.searchText);
    const newBlogButton = screen.getByText(BLOG_LIST.buttonText);
    expect(searchInput).toBeInTheDocument();
    expect(newBlogButton).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId("loader")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByTestId("loader")).toBeNull());
    const noBlogsElement = await screen.findByText(BLOG_LIST.noBlogs);
    expect(noBlogsElement).toBeInTheDocument();
  });
});

describe("Blog List UI", () => {
  it("should display the cards that match search text", async () => {
    const user = userEvent.setup();
    axiosMock.get.mockResolvedValueOnce({
      data: [
        { title: "title1", type: "type1" },
        { title: "title2", type: "type2" },
      ],
    });
    render(<BlogList modalHandler={() => {}} />);
    const searchInput = screen.getByPlaceholderText(BLOG_LIST.searchText);
    // search for title
    await user.type(searchInput, "title");
    let blogElements;
    blogElements = await screen.findAllByTestId("blogCard");
    expect(blogElements).toHaveLength(2);
    // search for title1
    await user.type(searchInput, "1");
    blogElements = await screen.findAllByTestId("blogCard");
    expect(blogElements).toHaveLength(1);
  });

  it("should call new blog modal handler when new button is clicked", async () => {
    const user = userEvent.setup();
    const modalFn = jest.fn();
    axiosMock.get.mockResolvedValueOnce({ data: [] });
    render(<BlogList modalHandler={modalFn} />);
    const newBlogButton = screen.getByText(BLOG_LIST.buttonText);
    await user.click(newBlogButton);
    expect(modalFn).toHaveBeenCalledWith(MODAL.newBlog, false);
  });

  it("should call warning modal on blog card click if in editing state", async () => {
    const user = userEvent.setup();
    const modalFn = jest.fn();
    axiosMock.get.mockResolvedValueOnce({
      data: [
        { title: "title1", type: "type1" },
        { title: "title2", type: "type2" },
      ],
    });
    const initialBlogsData = { isEditing: true };
    render(<BlogList modalHandler={modalFn} />, { preloadedState: { blogs: initialBlogsData } });
    const blogElements = await screen.findAllByTestId("blogCard");
    await user.click(blogElements[1]);
    expect(modalFn).toHaveBeenCalledWith(false, true);
  });

  it("should call current blog update handler if not in editing state", async () => {
    const user = userEvent.setup();
    axiosMock.get.mockResolvedValueOnce({
      data: [
        { title: "title1", type: "type1" },
        { title: "title2", type: "type2" },
      ],
    });
    render(<BlogList modalHandler={() => {}} />);
    const blogElements = await screen.findAllByTestId("blogCard");
    expect(blogElements[0]).toHaveAttribute("data-selected", "true");
    expect(blogElements[1]).toHaveAttribute("data-selected", "false");
    await user.click(blogElements[1]);
    expect(blogElements[0]).toHaveAttribute("data-selected", "false");
    expect(blogElements[1]).toHaveAttribute("data-selected", "true");
  });
});

describe("Blog list snapshots", () => {
  it("should match blog list with blogs", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [
        { title: "title1", type: "type1" },
        { title: "title2", type: "type2" },
      ],
    });
    const { asFragment } = render(<BlogList modalHandler={() => {}} />);
    await waitForElementToBeRemoved(screen.getByTestId("loader"));
    expect(asFragment()).toMatchSnapshot();
  });

  it("should match blog list with no blogs", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [],
    });
    const { asFragment } = render(<BlogList modalHandler={() => {}} />);
    await waitForElementToBeRemoved(screen.getByTestId("loader"));
    expect(asFragment()).toMatchSnapshot();
  });
});
