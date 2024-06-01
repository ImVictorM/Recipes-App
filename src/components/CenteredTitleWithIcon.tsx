import styles from "@/sass/components/CenteredTitleWithIcon.module.scss";

export type CenteredTitleWithIconProps = {
  title: string;
  icon: {
    element: React.FC<React.SVGProps<SVGElement>>;
    alt: string;
  };
};

export default function CenteredTitleWithIcon({
  icon: { element: Icon, alt },
  title,
}: CenteredTitleWithIconProps) {
  return (
    <div className={`${styles.title}`}>
      <Icon className={`${styles.title__img}`} role="img" aria-label={alt} />

      <h1 className={`${styles.title__text}`} data-testid="page-title">
        {title}
      </h1>
    </div>
  );
}
