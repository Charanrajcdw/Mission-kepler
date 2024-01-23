import { createSnapshot } from "../../utils/test.utils";
import { Loader } from "..";

it("should match loader snapshot", () => {
  const loader = createSnapshot(<Loader />);
  expect(loader).toMatchSnapshot();
});
