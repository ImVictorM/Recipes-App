import styles from "@/sass/components/ui/CenteredTitleWithIcon.module.scss";

import { CenteredTitleWithIconProps } from "./CenteredTitleWithIcon.types";

export default function CenteredTitleWithIcon({
  icon: { element: Icon, alt },
  title,
  prefixDataTestId = "CenteredTitleWithIcon",
}: CenteredTitleWithIconProps) {
  return (
    <div className={`${styles.title}`} data-testid={prefixDataTestId}>
      <Icon className={`${styles.title__img}`} role="img" aria-label={alt} />

      <h1 className={`${styles.title__text}`}>{title}</h1>
    </div>
  );
}
