import { createSnapshot } from "../../utils/test.utils";
import Loader from "../Loader/Loader";

it("should match loader snapshot", () => {
  const loader = createSnapshot(<Loader />);
  expect(loader).toMatchSnapshot();
});
