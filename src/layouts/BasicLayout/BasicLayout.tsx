import Header from "./components/Header";
import Footer from "./components/Footer";

import { BasicLayoutProps } from "./BasicLayout.types";

import styles from "@/sass/layouts/BasicLayout/BasicLayout.module.scss";

export default function BasicLayout({
  children,
  containHeaderSearchBar,
}: React.PropsWithChildren<BasicLayoutProps>) {
  return (
    <>
      <Header containSearchBar={containHeaderSearchBar} />

      <main className={`${styles.content}`}>{children}</main>

      <Footer />
    </>
  );
}
