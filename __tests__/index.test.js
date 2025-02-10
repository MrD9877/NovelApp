import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import TestComponent from "../src/components/TestComponent";

describe("Home", () => {
  afterEach(cleanup);
  it("renders a heading", () => {
    const { asFragment } = render(<TestComponent />);

    expect(asFragment(<TestComponent />)).toMatchSnapshot();
  });
});
