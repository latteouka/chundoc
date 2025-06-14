import "../styles/global.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window.gtag) {
        window.gtag("config", "G-593N6RCCF2", {
          page_path: url,
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* 載入 gtag 程式碼 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-593N6RCCF2"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'G-593N6RCCF2', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
