import { TestableComponent } from "@/types/testableComponent";

export type CenteredTitleWithIconProps = TestableComponent & {
  title: string;
  icon: {
    element: React.FC<React.SVGProps<SVGElement>>;
    alt: string;
  };
};
