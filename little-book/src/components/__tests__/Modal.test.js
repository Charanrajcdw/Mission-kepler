import { userEvent, render, screen, createSnapshot } from "../../utils/test.utils.jsx";
import { Modal } from "..";
import { MODAL } from "../../constants";

describe("Modal", () => {
  it("should render Modal", () => {
    render(<Modal modalHandler={() => {}}>Modal Content</Modal>);
    const modalElement = screen.getByText("Modal Content");
    const modalContainerElement = modalElement.parentElement;
    expect(modalElement).toBeInTheDocument();
    expect(modalContainerElement).toBeInTheDocument();
  });

  it("should match modal snapshot", () => {
    const modal = createSnapshot(<Modal modalHandler={() => {}}>Modal Content</Modal>);
    expect(modal).toMatchSnapshot();
  });

  it("should call modal close handler on click events if there is no editing", async () => {
    const user = userEvent.setup();
    const modalFn = jest.fn();
    render(<Modal modalHandler={modalFn}>Modal Content</Modal>);
    const modalElement = screen.getByText("Modal Content");
    const modalContainerElement = modalElement.parentElement;
    await user.click(modalElement);
    expect(modalFn).toHaveBeenCalledTimes(0);
    await user.click(modalContainerElement);
    expect(modalFn).toHaveBeenCalledWith(MODAL.remove, false);
  });

  it("should call warning modal handler on click events if there is editing", async () => {
    const user = userEvent.setup();
    const modalFn = jest.fn();
    const initialBlogsData = { isEditing: true };
    render(<Modal modalHandler={modalFn}>Modal Content</Modal>, { preloadedState: { blogs: initialBlogsData } });
    const modalElement = screen.getByText("Modal Content");
    const modalContainerElement = modalElement.parentElement;
    await user.click(modalElement);
    expect(modalFn).toHaveBeenCalledTimes(0);
    await user.click(modalContainerElement);
    expect(modalFn).toHaveBeenCalled();
  });
});
