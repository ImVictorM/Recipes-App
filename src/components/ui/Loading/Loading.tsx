import CocktailIcon from "@/assets/icons/cocktailIcon.svg";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import styles from "@/sass/components/ui/Loading.module.scss";

export default function Loading() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="d-flex flex-column align-items-center">
      <div
        className={`${styles.loading} ${
          prefersReducedMotion
            ? `${styles["loading--static"]}`
            : `${styles["loading--animated"]}`
        }`}
      >
        <CocktailIcon
          role="img"
          aria-label="loading"
          className={`${styles.loading__img}`}
        />
      </div>

      {prefersReducedMotion && (
        <div className={`${styles.loading__text}`}>
          <span>Loading...</span>
        </div>
      )}
    </section>
  );
}
