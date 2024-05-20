import { Footer, Header } from "@/components";
import { PropsWithChildren } from "react";
import "@/sass/layouts/_basicLayout.scss";

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

      <main className="content">{children}</main>

      <Footer />
    </>
  );
}
