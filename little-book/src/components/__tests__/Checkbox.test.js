import { render, screen, createSnapshot, userEvent } from "../../utils/test.utils.jsx";
import Checkbox from "../Checkbox/Checkbox";
import { SIDEBAR, WARNING_MODAL } from "../../constants";

describe("Checkbox", () => {
  it("should render Checkbox", () => {
    render(<Checkbox label="local" modalHandler={() => {}} />);
    const checkboxGroup = screen.getByLabelText(`local ${SIDEBAR.blogs}`);
    expect(checkboxGroup).toBeInTheDocument();
  });

  it("should match checkbox snapshot", () => {
    const checkbox = createSnapshot(<Checkbox label="local" modalHandler={() => {}} />);
    expect(checkbox).toMatchSnapshot();
  });

  it("should change checked state", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="local" modalHandler={() => {}} />);
    const checkboxInput = screen.getByRole("checkbox");
    await user.click(checkboxInput);
    expect(checkboxInput).not.toBeChecked();
    await user.click(checkboxInput);
    expect(checkboxInput).toBeChecked();
  });

  it("should show warning modal if editing is true", async () => {
    const user = userEvent.setup();
    const initialBlogsData = { isEditing: true };
    render(<Checkbox label="local" modalHandler={() => {}} />, { preloadedState: { blogs: initialBlogsData } });
    const checkboxInput = screen.getByRole("checkbox");
    await user.click(checkboxInput);
    expect(checkboxInput).toBeChecked();
  });
});
