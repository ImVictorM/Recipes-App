export type CenteredTitleWithIconProps = {
  title: string;
  icon: {
    src: string;
    alt: string;
  };
};

export default function CenteredTitleWithIcon({
  icon,
  title,
}: CenteredTitleWithIconProps) {
  return (
    <div className="centered-title">
      <img src={icon.src} alt={icon.alt} />
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}
