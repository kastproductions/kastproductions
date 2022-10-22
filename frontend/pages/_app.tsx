import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Head>
        <title>Kast productions</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Kast Productions is design & frontend web development consultancy based in Lithuania."
        />
        <link rel="icon" href="/favicon.ico" />
        <script src="//code.tidio.co/ogzuurqarhap0hu77ypyxfrvanh8i03p.js" async></script>
      </Head> */}
      <DefaultSeo
        title="KastProductions"
        description="KastProductions is design and frontend web development consultancy based in Lithuania."
        canonical="https://www.kastproductions.com/"
        additionalLinkTags={[
          {
            rel: 'icon',
            href: 'https://www.kastproductions.com/favicon.ico',
          },
        ]}
        openGraph={{
          url: 'https://www.kastproductions.com/',
          title: 'KastProductions',
          description: 'KastProductions is design and frontend web development consultancy based in Lithuania.',
          // images: [
          //   {
          //     url: 'https://www.example.ie/og-image-01.jpg',
          //     width: 800,
          //     height: 600,
          //     alt: 'Og Image Alt',
          //     type: 'image/jpeg',
          //   },
          //   {
          //     url: 'https://www.example.ie/og-image-02.jpg',
          //     width: 900,
          //     height: 800,
          //     alt: 'Og Image Alt Second',
          //     type: 'image/jpeg',
          //   },
          //   { url: 'https://www.example.ie/og-image-03.jpg' },
          //   { url: 'https://www.example.ie/og-image-04.jpg' },
          // ],
          siteName: 'KastProductions',
        }}
      />
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script strategy="lazyOnload" id="ga-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
      </Script>
      {/* <Script strategy="lazyOnload" src="//code.tidio.co/horcjpmh4cyjywzqwtchuceklbfnex9j.js" /> */}
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
