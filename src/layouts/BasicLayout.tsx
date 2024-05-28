import { Footer, Header } from "@/components";
import { PropsWithChildren } from "react";
import styles from "@/sass/layouts/BasicLayout.module.scss";

export type BasicLayoutProps = PropsWithChildren & {
  containHeaderSearchBar?: boolean;
};

export default function BasicLayout({
  children,
  containHeaderSearchBar,
}: BasicLayoutProps) {
  return (
    <>
      <Header containSearchBar={containHeaderSearchBar} />

      <main className={`${styles.content}`}>{children}</main>

      <Footer />
    </>
  );
}
