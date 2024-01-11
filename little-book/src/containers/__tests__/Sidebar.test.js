import { render, userEvent, screen, createSnapshot } from "../../utils/test.utils";
import Sidebar from "../Sidebar/Sidebar";
import { SIDEBAR, THEME } from "../../constants";

const blogTypes = ["type1", "type2", "type3"];
jest.mock("../../components/Checkbox/Checkbox", () => () => <div data-testid="checkbox" />);

describe("Sidebar UI", () => {
  it("render sidebar with filter values", () => {
    const initialBlogsData = { blogTypes: blogTypes };
    render(<Sidebar modalHandler={() => {}} />, { preloadedState: { blogs: initialBlogsData } });
    const logoElement = screen.getByRole("heading");
    const filterTitleElement = screen.getByText(SIDEBAR.filter);
    const checkboxElements = screen.getAllByTestId("checkbox");
    const membersElement = screen.getByText(SIDEBAR.viewMembers);
    const themeElement = screen.getByText(SIDEBAR.switchToDark);
    expect(logoElement).toHaveTextContent(SIDEBAR.logo);
    expect(checkboxElements).toHaveLength(3);
    expect(filterTitleElement).toBeInTheDocument();
    expect(membersElement).toBeInTheDocument();
    expect(themeElement).toBeInTheDocument();
  });

  it("render sidebar with no filter values", () => {
    render(<Sidebar modalHandler={() => {}} />);
    const logoElement = screen.getByRole("heading");
    const filterTitleElement = screen.getByText(SIDEBAR.filter);
    const membersElement = screen.getByText(SIDEBAR.viewMembers);
    const themeElement = screen.getByText(SIDEBAR.switchToDark);
    const noFilter = screen.getByText(SIDEBAR.noFilter);
    expect(logoElement).toHaveTextContent(SIDEBAR.logo);
    expect(noFilter).toBeInTheDocument();
    expect(filterTitleElement).toBeInTheDocument();
    expect(membersElement).toBeInTheDocument();
    expect(themeElement).toBeInTheDocument();
  });
});

describe("Sidebar functionalities", () => {
  it("should change theme on switch theme button click", async () => {
    const user = userEvent.setup();
    render(<Sidebar modalHandler={() => {}} />);
    const darkThemeElement = screen.getByText(SIDEBAR.switchToDark);
    expect(darkThemeElement).toBeInTheDocument();
    await user.click(darkThemeElement);
    const lightThemeElement = screen.getByText(SIDEBAR.switchToLight);
    expect(lightThemeElement).toBeInTheDocument();
  });

  it("should call modalHandler on view members button click", async () => {
    const user = userEvent.setup();
    const modalFn = jest.fn();
    render(<Sidebar modalHandler={modalFn} />);
    const darkThemeElement = screen.getByText(SIDEBAR.viewMembers);
    expect(darkThemeElement).toBeInTheDocument();
    await user.click(darkThemeElement);
    expect(modalFn).toHaveBeenCalled();
  });
});

describe("Sidebar snapshots", () => {
  it("should match sidebar snapshot with no filters", () => {
    const sidebar = createSnapshot(<Sidebar modalHandler={() => {}} />);
    expect(sidebar).toMatchSnapshot();
  });

  it("should match sidebar snapshot with filters", () => {
    const initialBlogsData = { blogTypes: blogTypes };
    const sidebar = createSnapshot(<Sidebar modalHandler={() => {}} />, { preloadedState: { blogs: initialBlogsData } });
    expect(sidebar).toMatchSnapshot();
  });
});
