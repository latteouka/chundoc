import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import Logo from "./components/logo";

const config: DocsThemeConfig = {
  logo: <Logo />,
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      "https://doc.chundev.com" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);
    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || "Yi Chun"} />
        <meta property="og:description" content={frontMatter.description} />
        <title>Yi Chun</title>
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
      </>
    );
  },
  project: {
    link: "https://github.com/latteouka/",
  },
  // chat: {
  //   link: "https://discord.com",
  // },
  docsRepositoryBase: "https://github.com/latteouka",
  footer: {
    component: <div />,
  },
};

export default config;
