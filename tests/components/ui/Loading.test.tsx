import { within } from "@testing-library/dom";

import Loading from "@/components/ui/Loading";

import renderElement from "../../utils/render/renderElement";
import { createMatchMedia } from "../../utils/matchMedia";

const LoadingDefault = () => <Loading />;

describe("component: Loading", () => {
  afterEach(() => {});

  it("renders correctly", () => {
    const { container } = renderElement(<LoadingDefault />);

    expect(within(container).getByTestId("Loading.Img")).toHaveRole("img");
    expect(within(container).getByTestId("Loading")).toHaveClass(
      /loading--animated/
    );
    expect(
      within(container).queryByTestId("Loading.Text")
    ).not.toBeInTheDocument();
  });

  it("renders correctly when user prefers reduced motion", () => {
    /** Doesn't match no-preference query */
    vi.spyOn(window, "matchMedia").mockImplementation(createMatchMedia(false));

    const { container } = renderElement(<LoadingDefault />);

    within(container).getByTestId("Loading.Text");
    expect(within(container).getByTestId("Loading")).toHaveClass(
      /loading--static/
    );
  });
});
