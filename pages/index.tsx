import Head from "next/head"
import Image from "next/image"
import React from "react"
import styles from "../styles/Home.module.css"
import { Box, Stack, Text, Icon, Button, Link } from "@chakra-ui/react"
import { FiAlertCircle, FiMenu } from "react-icons/fi"

export default function Home() {
  return (
    <Stack bg="gray.900" color="white" width="full" minH="100vh" className="area" spacing={0}>
      <Head>
        <title>Kastproductions</title>
        <meta name="description" content="Kast Productions is design & frontend web development consultancy." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <Stack
        as="nav"
        height={[20, 28]}
        width="full"
        spacing={0}
        position="fixed"
        zIndex={10}
        sx={{ backdropFilter: "blur(20px)" }}
        // bg=" rgba(10, 25, 41, 0.72)"
      >
        {/* <Stack width="full" bg="blue.500" height={12} isInline justifyContent="center" alignItems="center" px={4}>
          <Icon as={FiAlertCircle} fontSize="xl" />
          <Text textAlign="center" pl={0.5}>{`I'm currently  on a contract project but I'm happy to hearing from people`}</Text>
        </Stack> */}
        <Stack isInline alignItems="center" height="full" px={4}>
          <Stack isInline alignItems="center" maxW="7xl" width="full" mx="auto">
            <Stack flex={1} isInline alignItems="center">
              <Stack justifyContent="center" alignItems="center" rounded="full" borderColor="blue.500" borderWidth="3px" boxSize={10}>
                <Box>
                  <Text m={0} fontWeight="bold">
                    kp
                  </Text>
                </Box>
              </Stack>
              <Box pl={1}>
                <Text fontSize={["2xl", "3xl"]} fontWeight="black">
                  Kastproductions
                </Text>
              </Box>
            </Stack>
            <Stack flex={1}></Stack>
            <Stack flex={1} display={["flex", "none"]}>
              <Button bg="transparent" _hover={{}} _active={{}} variant="unstyled">
                <Icon as={FiMenu} fontSize="3xl" />
              </Button>
            </Stack>
            <Stack display={["none", "flex"]} isInline flex={1} justifyContent="flex-end" spacing={4}>
              <Box>
                <Button
                  bg="transparent"
                  _hover={{
                    bg: "gray.800",
                  }}
                  _active={{}}
                >
                  About
                </Button>
              </Box>
              <Box>
                <Button
                  bg="transparent"
                  _hover={{
                    bg: "gray.800",
                  }}
                  _active={{}}
                >
                  Work
                </Button>
              </Box>
              <Box>
                <Button
                  bg="transparent"
                  _hover={{
                    bg: "gray.800",
                  }}
                  _active={{}}
                >
                  Contact
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Box pt={[20, 28]} as="header">
        <Stack mx="auto" width="full" maxW="7xl" px={4} pt={[10, 40]}>
          <Text fontSize={["5xl", "8xl"]} lineHeight={["short", "normal"]} fontWeight="black" fontFamily="Inter" as="h1">
            <Box as="span" color="blue.400">
              Kast Productions
            </Box>{" "}
            is design & frontend web development consultancy.
          </Text>
        </Stack>
      </Box>
      <Box as="main" flex={1}>
        <Stack mx="auto" width="full" maxW="7xl" px={4}>
          {/* <Box>
            <Text fontSize="3xl" fontWeight="bold">
              Here what clients has to say...
            </Text>
          </Box> */}

          {/* <Box className={styles.grid} px={0}>
          <Box href="https://nextjs.org/docs" className={styles.card} bg="blue.800" color="gray.100" boxShadow="md">
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </Box>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </Box> */}
        </Stack>
      </Box>

      <Stack
        zIndex={10}
        isInline
        alignItems="center"
        justifyContent="center"
        as="footer"
        // sx={{ backdropFilter: "blur(5px)", bg: "rgba(10, 25, 41, 0.3)" }}
        // height={10}
        width="full"
      >
        <Stack spacing={0} fontSize="sm" pb={1}>
          <Text>
            Made with 💙 by <Link href="https://kastproductions.com">Kastproductions</Link> in 🇱🇹
          </Text>
          {/* <Text>Contributed to around the 🌏</Text> */}
        </Stack>
      </Stack>
      <Box as="ul" className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </Box>
    </Stack>
  )
}
