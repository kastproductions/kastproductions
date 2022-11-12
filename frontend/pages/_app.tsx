import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
// import { Poppins, Cormorant_Infant } from '@next/font/google';

import '@fontsource/cormorant-infant/300.css';
import '@fontsource/cormorant-infant/400.css';
import '@fontsource/cormorant-infant/500.css';
import '@fontsource/cormorant-infant/600.css';
import '@fontsource/cormorant-infant/700.css';

import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
// const poppins = Poppins({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   // variable: '--font-poppins',
// });
// const cormorant_Infant = Cormorant_Infant({
//   weight: ['300', '400', '500', '600', '700'],
//   // variable: '--font-cormorant',
// });

const theme = extendTheme({
  fonts: {
    heading: `"Cormorant Infant", serif`,
    body: `"Poppins", sans-serif`,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
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
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
