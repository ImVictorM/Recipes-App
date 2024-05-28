import { RecipeHero } from "./components";
import { RecipeWithDetails } from "@/store/slices/menuSlice";
import { PropsWithChildren } from "react";
import styles from "@/sass/layouts/HeroLayout/style.module.scss";

export type HeroLayoutProps = PropsWithChildren & {
  recipe: RecipeWithDetails;
};

export default function HeroLayout({ recipe, children }: HeroLayoutProps) {
  return (
    <>
      <RecipeHero recipe={recipe} />

      <main className={`${styles.content}`}>{children}</main>
    </>
  );
}
