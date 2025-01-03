import "../app/globals.css"; // Import Tailwind CSS styles
import type { AppProps } from "next/app";
import "../app/fonts.css"
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
