import { render, screen, createSnapshot, userEvent } from "../../utils/test.utils.jsx";
import { Checkbox } from "..";
import { SIDEBAR } from "../../constants";

describe("Checkbox", () => {
  it("should render Checkbox", () => {
    render(<Checkbox label="local" modalHandler={() => {}} isSelected={true} />);
    const checkboxGroup = screen.getByLabelText(`local ${SIDEBAR.blogs}`);
    expect(checkboxGroup).toBeInTheDocument();
  });

  it("should match checkbox snapshot", () => {
    const checkbox = createSnapshot(<Checkbox label="local" modalHandler={() => {}} isSelected={true} />);
    expect(checkbox).toMatchSnapshot();
  });

  it("should change checked state", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="local" modalHandler={() => {}} isSelected={true} />);
    const checkboxInput = screen.getByRole("checkbox");
    await user.click(checkboxInput);
    expect(checkboxInput).not.toBeChecked();
    await user.click(checkboxInput);
    expect(checkboxInput).toBeChecked();
  });

  it("should show warning modal if editing is true", async () => {
    const user = userEvent.setup();
    const initialBlogsData = { isEditing: true };
    render(<Checkbox label="local" modalHandler={() => {}} isSelected={true} />, { preloadedState: { blogs: initialBlogsData } });
    const checkboxInput = screen.getByRole("checkbox");
    await user.click(checkboxInput);
    expect(checkboxInput).toBeChecked();
  });
});
