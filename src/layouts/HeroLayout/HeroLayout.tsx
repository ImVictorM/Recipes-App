import RecipeHero from "./components/RecipeHero/RecipeHero";

import { HeroLayoutProps } from "./HeroLayout.types";

import styles from "@/sass/layouts/HeroLayout/HeroLayout.module.scss";

export default function HeroLayout({
  recipe,
  children,
  prefixDataTestId: thisPrefixDataTestId = "HeroLayout",
}: React.PropsWithChildren<HeroLayoutProps>) {
  return (
    <div data-testid={thisPrefixDataTestId}>
      <RecipeHero
        prefixDataTestId={`${thisPrefixDataTestId}.Hero`}
        recipe={recipe}
      />

      <main
        data-testid={`${thisPrefixDataTestId}.Content`}
        className={`${styles.content}`}
      >
        {children}
      </main>
    </div>
  );
}
