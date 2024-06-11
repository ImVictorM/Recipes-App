import RecipeHero from "./components/RecipeHero/RecipeHero";

import { HeroLayoutProps } from "./HeroLayout.types";

import styles from "@/sass/layouts/HeroLayout/HeroLayout.module.scss";

export default function HeroLayout({
  recipe,
  children,
}: React.PropsWithChildren<HeroLayoutProps>) {
  return (
    <>
      <RecipeHero recipe={recipe} />

      <main className={`${styles.content}`}>{children}</main>
    </>
  );
}
