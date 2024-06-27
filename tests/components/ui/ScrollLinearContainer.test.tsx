import { within, act } from "@testing-library/react";

import ScrollLinearContainer from "@/components/ui/ScrollLinearContainer";

import renderElement from "../../helpers/render/renderElement";

vi.mock(
  "@/hooks/useOverflow",
  async (importOriginal): Promise<typeof import("@/hooks/useOverflow")> => {
    return {
      ...(await importOriginal<typeof import("@/hooks/useOverflow")>()),
      default: () => ({ isOverflow: true }),
    };
  }
);

const ScrollLinearContainerDefault = (
  props: Partial<React.ComponentProps<typeof ScrollLinearContainer>>
) => <ScrollLinearContainer {...props}>{props.children}</ScrollLinearContainer>;

describe("component: ScrollLinearContainer", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the correct element and its children", () => {
    const { container } = renderElement(
      <ScrollLinearContainerDefault as="h2">
        <div>inner</div>
      </ScrollLinearContainerDefault>
    );

    within(container).getByRole("heading", { name: "inner" });
  });

  it("handles mouse down and drag correctly", async () => {
    const { container, user } = renderElement(
      <ScrollLinearContainerDefault as="button">
        <div>content</div>
      </ScrollLinearContainerDefault>
    );

    const scrollContainer = within(container).getByTestId(
      "ScrollLinearContainer"
    );

    const scrollLeftSpy = vi.spyOn(scrollContainer, "scrollLeft", "set");

    /** Press and hold MLB */
    await act(async () => {
      await user.pointer([{ keys: "[MouseLeft>]", target: scrollContainer }]);
    });

    expect(scrollContainer).toHaveClass("active-dragging");

    await act(async () => {
      await user.pointer([{ coords: { x: 100, y: 0 } }]);
    });

    expect(scrollLeftSpy).toHaveBeenCalled();
    expect(scrollContainer).toHaveClass("active-dragging");

    /** Releases MLB */
    await act(async () => {
      await user.pointer("[/MouseLeft]");
    });

    expect(scrollContainer).not.toHaveClass("active-dragging");
    expect(scrollContainer).toHaveClass("snaps-inline");
  });
});
