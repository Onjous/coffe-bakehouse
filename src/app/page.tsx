import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Menu } from "@/components/menu";
import { Interlude } from "@/components/interlude";
import { Space } from "@/components/space";
import { Visit } from "@/components/visit";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Story />
        <Menu />
        <Interlude />
        <Space />
        <Visit />
      </main>
      <SiteFooter />
    </>
  );
}
