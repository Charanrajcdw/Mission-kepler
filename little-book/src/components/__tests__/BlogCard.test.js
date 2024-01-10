import { render, screen, userEvent } from "../../utils/test.utils.jsx";
import renderer from "react-test-renderer";
import BlogCard from "../BlogCard/BlogCard";

describe("BlogCard", () => {
  it("should render Blog Card", () => {
    const blogData = {
      title: "Blog title",
      type: "Local",
      details: "Blog details",
    };
    render(<BlogCard blog={blogData} isSelected={true} blogChangeHandler={() => {}} />);
    const titleElement = screen.getByText(blogData.title);
    const detailsElement = screen.getByText(blogData.details);
    const typeElement = screen.getByText(blogData.type);
    expect(titleElement).toBeInTheDocument();
    expect(detailsElement).toBeInTheDocument();
    expect(typeElement).toBeInTheDocument();
  });

  it("should update current blog", async () => {
    const user = userEvent.setup();
    const blogData = {
      title: "Blog title",
      type: "Local",
      details: "Blog details",
    };
    const blogChangeHandler = jest.fn();
    render(<BlogCard blog={blogData} isSelected={true} blogChangeHandler={blogChangeHandler} />);
    const titleElement = screen.getByText(blogData.title);
    const detailsElement = screen.getByText(blogData.details);
    await user.click(titleElement);
    await user.click(detailsElement);
    expect(blogChangeHandler).toHaveBeenCalledTimes(2);
  });
});
