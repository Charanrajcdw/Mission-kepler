import { render, screen, cleanup, waitFor, waitForElementToBeRemoved } from "../../utils/test.utils";
import axiosMock from "axios";
import MembersList from "../MembersList/MembersList";
import { MEMBERS_LIST } from "../../constants";

jest.mock("../../components/MembersCard/MembersCard", () => () => <div data-testid="membersCard" />);
jest.mock("../../components/Loader/Loader", () => () => <div data-testid="loader" />);
afterEach(cleanup);

describe("Members list UI", () => {
  it("should render members list if there are members", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [{ id: 1 }, { id: 2 }],
    });
    render(<MembersList />);
    await waitFor(() => expect(screen.getByTestId("loader")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByTestId("loader")).toBeNull());
    const membersElements = await screen.findAllByTestId("membersCard");
    expect(membersElements).toHaveLength(2);
  });

  it("should render no members content if there are no members", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [],
    });
    render(<MembersList />);
    await waitFor(() => expect(screen.getByTestId("loader")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByTestId("loader")).toBeNull());
    const noMembersElement = await screen.findByText(MEMBERS_LIST.noMembers);
    expect(noMembersElement).toBeInTheDocument();
  });
});

describe("Members list snapshots", () => {
  it("should match members list snapshot with members", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [{ id: 1 }, { id: 2 }],
    });
    const { asFragment } = render(<MembersList />);
    await waitForElementToBeRemoved(screen.getByTestId("loader"));
    expect(asFragment()).toMatchSnapshot();
  });

  it("should match members list snapshot with no members", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [],
    });
    const { asFragment } = render(<MembersList />);
    await waitForElementToBeRemoved(screen.getByTestId("loader"));
    expect(asFragment()).toMatchSnapshot();
  });
});
