import styles from "@/sass/layouts/HeroLayout/style.module.scss";

import RecipeHero from "./components/RecipeHero";

import { HeroLayoutProps } from "./index.types";

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
