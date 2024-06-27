import Header from "./components/Header";
import Footer from "./components/Footer";

import { BasicLayoutProps } from "./BasicLayout.types";

import styles from "@/sass/layouts/BasicLayout/BasicLayout.module.scss";

export default function BasicLayout({
  children,
  containHeaderSearchBar,
  prefixDataTestId: thisPrefixDataTestId = "BasicLayout",
}: React.PropsWithChildren<BasicLayoutProps>) {
  return (
    <div data-testid={thisPrefixDataTestId}>
      <Header
        prefixDataTestId={`${thisPrefixDataTestId}.Header`}
        containSearchBar={containHeaderSearchBar}
      />

      <main
        data-testid={`${thisPrefixDataTestId}.Content`}
        className={`${styles.content}`}
      >
        {children}
      </main>

      <Footer prefixDataTestId={`${thisPrefixDataTestId}.Footer`} />
    </div>
  );
}
