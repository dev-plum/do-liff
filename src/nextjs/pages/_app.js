import "../styles/globals.css";
import { useState, useEffect } from "react";
import { env } from 'process';

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    
    import("@line/liff").then((liff) => {
      console.log("start liff.init()...", process.env.LIFF_ID);
      liff
        .init({ liffId: process.env.LIFF_ID })
        .then(() => {
          console.log("liff.init() done");
          setLiffObject(liff);
        })
        .catch((error) => {
          console.log(`liff.init() failed: ${error}`);
          if (!process.env.liffId) {
            console.info(
              "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
            );
          }
          setLiffError(error.toString());
        });
        liff
        .init({
          liffId: "1657680615-z871Zkk4", // Use own liffId
        })
        .then(() => {
          const idToken = liff.getIDToken();
          console.log(idToken); // print raw idToken object
        });
        
    });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
