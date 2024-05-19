import { Footer, Header } from "@/components";
import { PropsWithChildren } from "react";

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

      <section>{children}</section>

      <Footer />
    </>
  );
}
