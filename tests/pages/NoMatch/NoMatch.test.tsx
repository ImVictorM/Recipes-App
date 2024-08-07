import { screen, waitFor } from "@testing-library/react";

import renderRoute from "../../helpers/render/renderRoute";

const invalidRoute = "/not-found";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const lazyRenderNoMatch = async () => {
  const render = renderRoute([invalidRoute]);

  await waitFor(() => screen.getByTestId("NoMatch"), { timeout: 5000 });

  return render;
};

describe("page: NoMatch - path: *", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders correctly", async () => {
    await lazyRenderNoMatch();

    screen.getByRole("img", { name: /broken wine glass/ });
    screen.getByRole("heading", {
      level: 1,
      name: /something's missing here/i,
    });
    screen.getByRole("button", { name: /go back/i });

    expect(screen.getByTestId("NoMatch.404")).toHaveTextContent("404");
    expect(screen.getByTestId("NoMatch.Text")).toHaveTextContent(
      /i think someone stole the page you are looking for/i
    );
  });

  it('navigates to previous page when clicking the "go back" button', async () => {
    const { user } = renderRoute([invalidRoute]);
    await waitFor(() => screen.getByTestId("NoMatch"));

    const goBackButton = screen.getByRole("button", { name: /go back/i });

    await user.click(goBackButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
