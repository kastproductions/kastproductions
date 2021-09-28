import Head from "next/head"
// import Image from "next/image"
import React from "react"
import styles from "../styles/Home.module.css"
import { Box, Stack, Text, Icon, Button, Link, Image } from "@chakra-ui/react"
import { FiAlertCircle, FiMenu } from "react-icons/fi"

export default function Home() {
  return (
    <Stack bg="gray.900" color="white" width="full" minH="100vh" className="area" spacing={0}>
      <Head>
        <title>Kastproductions</title>
        <meta name="description" content="Kast Productions is design & frontend web development consultancy based in Lithuania." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <Stack
        as="nav"
        height={[16, 20]}
        width="full"
        spacing={0}
        position="fixed"
        zIndex={20}
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
              <Stack
                justifyContent="center"
                alignItems="center"
                rounded="full"
                borderColor="blue.500"
                borderWidth="3px"
                boxSize={10}
                bg="gray.900"
              >
                <Box>
                  <Text m={0} fontWeight="bold">
                    KP
                  </Text>
                </Box>
              </Stack>
              <Stack spacing={0} fontSize={["2xl", "2xl"]} fontWeight="black">
                <Box mb="-5px">
                  <Text lineHeight="none" m={0}>
                    Kast
                  </Text>
                </Box>
                <Box>
                  <Text lineHeight="none" m={0}>
                    Productions
                  </Text>
                </Box>
              </Stack>
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
      <Box pt={[16, 20]} as="header" zIndex={10} height="100vh">
        <Stack mx="auto" width="full" maxW="7xl" px={4} pt={[20, 40]}>
          <Text fontSize={["5xl", "8xl"]} lineHeight={["short", "normal"]} fontWeight="black" fontFamily="Inter" as="h1">
            <Box as="span" color="blue.400">
              Kast Productions
            </Box>{" "}
            is design & frontend web development consultancy.
          </Text>
        </Stack>
      </Box>
      <Box as="main" flex={1} zIndex={10} px={4}>
        <Stack mx="auto" width="full" maxW="7xl" pb={[40, 64]} fontFamily="Inter" alignItems="center">
          <Box pb={12}>
            <Text textAlign="center" fontSize={["2xl", "4xl"]} fontWeight={["black"]}>
              Trusted by industry leading brands
            </Text>
          </Box>
          <Box>
            <CompanyLogos />
          </Box>
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
        <Stack spacing={0} fontSize="sm" pb={2}>
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

const companyList = [
  {
    name: "zipmex",
    companyUrl: "https://zipmex.com/",
    iconUrl:
      "https://media-exp1.licdn.com/dms/image/C560BAQHngLGnK79K0A/company-logo_200_200/0/1630634430189?e=1640822400&v=beta&t=e0ZqytWDlP0r_dz3q_OVJQW_Cm5jsVtpvmNh3fKdu24",
  },
  {
    name: "usercentric",
    companyUrl: "https://www.usercentric.com.au/",
    iconUrl:
      "https://media-exp1.licdn.com/dms/image/C560BAQGfhA99SK3mQQ/company-logo_200_200/0/1527735335142?e=1640822400&v=beta&t=4b1mDku_YStCJo1Tg3duxMUxjEmvXydRe3JdEZWkvG8",
  },
  {
    name: "trustpilot",
    companyUrl: "https://www.trustpilot.com/",
    iconUrl:
      "https://media-exp1.licdn.com/dms/image/C4D0BAQG9UEQhbr04qg/company-logo_200_200/0/1528790384860?e=1640822400&v=beta&t=xPFVRkzWV9YjtorB-6Lknb8sSBXMYc1yeXS7tPRJfSA",
  },
  {
    name: "rocket",
    companyUrl: "https://www.rocketsoftware.com/",
    iconUrl:
      "https://media-exp1.licdn.com/dms/image/C4E0BAQEvZIPtNRIRjg/company-logo_200_200/0/1569934947546?e=1640822400&v=beta&t=lBOjg48-sUE9k2NGS0XvRHHhcDrOPZvXAKLNqdPCsU0",
  },
  // {
  //   name: "netfront",
  //   companyUrl: "https://www.rocketsoftware.com/",
  //   iconUrl:
  //     "https://media-exp1.licdn.com/dms/image/C560BAQGuwEuCPMZAAw/company-logo_200_200/0/1531722161731?e=1640822400&v=beta&t=6dYOM8KSPAP1o3MS3lBHYRNUOPUt9zaaNI-xDk8CfNI",
  // },
]

function CompanyLogos() {
  return (
    <Stack isInline spacing={[5, 10]}>
      {companyList.map((item) => (
        <Box key={item.iconUrl}>
          <Link href={item.companyUrl} isExternal>
            <Image src={item.iconUrl} alt="client logo" objectFit="contain" boxSize={[16, 20]} rounded={["md", "xl"]} />
          </Link>
        </Box>
      ))}
    </Stack>
  )
}
