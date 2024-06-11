export type CenteredTitleWithIconProps = {
  title: string;
  icon: {
    element: React.FC<React.SVGProps<SVGElement>>;
    alt: string;
  };
};
