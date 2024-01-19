import { fireEvent, render, screen, createSnapshot } from "../../utils/test.utils.jsx";
import MembersCard from "../MembersCard/MembersCard";
import BrokenImage from "../../assets/blank-image.jpeg";
import { API_URLS } from "../../constants";

describe("MembersCard", () => {
  it("should render members card", () => {
    const cardData = {
      name: "username",
      photo: "images/users/1.jpeg",
      address: { city: "user address" },
    };
    render(<MembersCard {...cardData} />);
    const nameElement = screen.getByText(cardData.name);
    const addressElement = screen.getByText(cardData.address.city);
    const imgElement = screen.getByRole("img");
    expect(nameElement).toBeInTheDocument();
    expect(addressElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", `${API_URLS.images}${cardData.photo}`);
  });

  it("should match members card snapshot", () => {
    const cardData = {
      name: "username",
      photo: "images/users/1.jpeg",
      address: { city: "user address" },
    };
    const membersCard = createSnapshot(<MembersCard {...cardData} />);
    expect(membersCard).toMatchSnapshot();
  });

  it("should render card with broken image if no img src available", () => {
    const cardData = {
      name: "username",
      photo: "",
      address: { city: "user address" },
    };
    render(<MembersCard {...cardData} />);
    const nameElement = screen.getByText(cardData.name);
    const addressElement = screen.getByText(cardData.address.city);
    const imgElement = screen.getByRole("img");
    fireEvent.error(imgElement);
    expect(nameElement).toBeInTheDocument();
    expect(addressElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", BrokenImage);
  });
});
