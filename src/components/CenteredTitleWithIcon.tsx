import styles from "@/sass/components/CenteredTitleWithIcon.module.scss";

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
    <div className={`${styles.title}`}>
      <img className={`${styles.title__img}`} src={icon.src} alt={icon.alt} />
      <h1 className={`${styles.title__text}`} data-testid="page-title">
        {title}
      </h1>
    </div>
  );
}
