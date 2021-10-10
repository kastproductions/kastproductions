import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kastproductions</title>
        <meta name="description" content="Kast Productions is design & frontend web development consultancy based in Lithuania." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&display=swap" rel="stylesheet" />
        <script src="//code.tidio.co/ogzuurqarhap0hu77ypyxfrvanh8i03p.js" async></script>
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
