import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
        {/* <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Nabla&display=swap" rel="stylesheet"></link> */}
        {/* Poppins */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
