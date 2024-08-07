import { within } from "@testing-library/react";

import Loading from "@/components/ui/Loading";

import renderElement from "../../helpers/render/renderElement";
import { createMatchMedia } from "../../helpers/matchMedia";

const LoadingDefault = () => <Loading />;

describe("component: Loading", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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
