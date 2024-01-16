import { userEvent, render, screen, createSnapshot } from "../../utils/test.utils.jsx";
import WarningModal from "../WarningModal/WarningModal";
import { MODAL, WARNING_MODAL } from "../../constants";
import { blogActions } from "../../store";

describe("Modal", () => {
  it("should render Warning Modal", () => {
    render(<WarningModal modalHandler={() => {}} modalAction={false} />);
    const modalElement = screen.getByText(WARNING_MODAL.title);
    const cancelButton = screen.getByText(WARNING_MODAL.cancel);
    const continueButton = screen.getByText(WARNING_MODAL.continue);
    expect(modalElement).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
  });

  it("should match modal snapshot", () => {
    const warningModal = createSnapshot(<WarningModal modalHandler={() => {}} modalAction={false} />);
    expect(warningModal).toMatchSnapshot();
  });

  it("should call modal close handler", async () => {
    const user = userEvent.setup();
    const modalHandler = jest.fn();
    render(<WarningModal modalHandler={modalHandler} modalAction={true} />);
    const cancelButton = screen.getByText(WARNING_MODAL.cancel);
    await user.click(cancelButton);
    expect(modalHandler).toHaveBeenCalledWith(false, false);
  });

  it("should call modal continue handler", async () => {
    const user = userEvent.setup();
    const modalHandler = jest.fn();
    render(<WarningModal modalHandler={modalHandler} modalAction={blogActions.modifyEditStatus(false)} />);
    const continueButton = screen.getByText(WARNING_MODAL.continue);
    await user.click(continueButton);
    expect(modalHandler).toHaveBeenCalledWith(MODAL.remove, false);
  });
});
