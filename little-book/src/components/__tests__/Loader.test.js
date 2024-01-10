import renderer from "react-test-renderer";
import Loader from "../Loader/Loader";

it("loader renders correctly", () => {
  const loader = renderer.create(<Loader />).toJSON();
  expect(loader).toMatchSnapshot();
});
