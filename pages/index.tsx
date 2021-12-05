// import Image from "next/image"
import React from "react"
import styles from "../styles/Home.module.css"
import {
  Box,
  Stack,
  Text,
  Icon,
  Button,
  Link,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react"
import { FiAlertCircle, FiMenu } from "react-icons/fi"
import { VscQuote } from "react-icons/vsc"

import NextLink from "next/link"
import { Router, useRouter } from "next/dist/client/router"

export default function Home() {
  const router = useRouter()
  return (
    <Stack bg="gray.900" color="white" width="full" minH="100vh" className="area" spacing={0}>
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
              <Logo />
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
              <DrawerExample />
            </Stack>
            <Stack display={["none", "flex"]} isInline flex={1} justifyContent="flex-end" spacing={4}>
              <Box>
                <Button
                  bg="transparent"
                  _hover={{
                    bg: "gray.800",
                  }}
                  _active={{}}
                  onClick={() => router.push("/about")}
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
                  onClick={() => router.push("/work")}
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
                  onClick={() => router.push("/contact")}
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
              Trusted by industry leading companies
            </Text>
          </Box>
          <Box>
            <CompanyLogos />
          </Box>
        </Stack>

        <Stack mx="auto" width="full" maxW="7xl" pb={[40, 64]} fontFamily="Inter">
          <RecomendationList />
        </Stack>
        {/* <Stack mx="auto" width="full" maxW="7xl" pb={[40, 64]} fontFamily="Inter">
          <ProjectList />
        </Stack> */}
      </Box>

      {/* <Stack
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
        </Stack>
      </Stack> */}
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

function Logo() {
  return (
    <Stack justifyContent="center" alignItems="center" borderColor="blue.500" borderWidth="3px" boxSize={10} bg="gray.900">
      <Box>
        <Text m={0} fontWeight="black" fontSize="2xl">
          K
        </Text>
      </Box>
    </Stack>
  )
}

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} bg="transparent" _hover={{}} _active={{}} variant="unstyled">
        <Icon as={FiMenu} fontSize="3xl" />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900" color="white">
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <Stack>
              <Box>
                <NextLink href="/about" passHref>
                  <Link fontSize="4xl" fontWeight="semibold">
                    About
                  </Link>
                </NextLink>
              </Box>
              <Box>
                <NextLink href="/work" passHref>
                  <Link fontSize="4xl" fontWeight="semibold">
                    Work
                  </Link>
                </NextLink>
              </Box>
              <Box>
                <NextLink href="/contact" passHref>
                  <Link fontSize="4xl" fontWeight="semibold">
                    Contact
                  </Link>
                </NextLink>
              </Box>
              <Box>
                <Link isExternal href="mailto:hello@kastproductions.com">
                  hello@kastproductions.com
                </Link>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Stack width="full"></Stack>

            {/* <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
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

const recomendations = [
  {
    linkedinUrl: "",
    name: "Kristian Tasevski",
    position: "Head of Engineering at UserCentric",
    imageUrl:`/reviewers/1554286352901.jpeg`,
    id: 1,
    message:
      "Karolis is one of those rare developers who has an exceptional eye for detail, everything that he works on has a certain visual aesthetic to it. I was directly managing Karolis on a number of different projects at UserCentric for high profile enterprise clients of ours and all of the front-end work that Karolis did on those projects just looked great. He also has a strong self driven motivation to continue to learn and to stay up to date with whatever is topical in the dev community, and contributed a lot to our Engineering culture at UserCentric by always sharing with us what was the latest and greatest in the scene.",
  },
  {
    linkedinUrl: "",
    name: "Greg Stephenson",
    position: "Founder at Netfront",
    imageUrl:`/reviewers/1516274019938.jpeg`,
    id: 2,
    message:
      "I have had the pleasure of working with Karolis across a few projects. Karolis has a very keen eye for detail and a great analytical approach to programming. I was impressed with the polished UI and UX considerations Karolis made while working with him. In addition to his solid programming skills, Karolis is a great communicator and easy to work with. I would recommend Karolis to anyone who is looking for a good react developer, he would be a true asset to your team.",
  },
  {
    linkedinUrl: "",
    name: "Povilas Nanevičius",
    position: "Mainframe Engineer at Rocket Software",
    imageUrl:`/reviewers/1578655726413.jpeg`,
    id: 3,
    message: `I know Karolis was in his element in Reactjs: researching, delivering latest and greatest Reactjs UI in his work, spending free time rewriting Three.js games with React components, building web apps.
    Full of energy, efficient, right on the point. Looking forward to working (and having lunch time IT discussions) with you again!`,
  },
]

function RecomendationList() {
  return (
    <Stack spacing={[10, 20]}>
      {recomendations.map((item) => (
        <Stack key={item.id} isInline spacing={[5, 10]}>
          <Stack direction={["column", "row"]}>
            <Box pr={[0, 20]} flex={[1, 0.8]}>
              <Box pb={4}>
                <Icon as={VscQuote} fontSize={["6xl", "6xl"]} />
              </Box>
              <Box>
                <Text fontSize={["md", "xl"]} fontWeight="light" fontFamily="Inter">
                  {item.message}
                </Text>
              </Box>
            </Box>
            <Stack flex={[1, 0.2]} pt={[5, 1]}>
              <Box alignSelf={["center", "flex-start"]} boxSize={28} borderColor="white" borderWidth="4px" rounded="full" overflow="hidden">
                <Image src={item.imageUrl} boxSize={28} objectFit="cover" alt="picture of reviewer" />
              </Box>
              <Box pt={2}>
                <Box>
                  <Text textAlign={["center", "left"]} fontSize="xl" fontWeight="bold">
                    {item.name}
                  </Text>
                </Box>
                <Box>
                  <Text textAlign={["center", "left"]} fontSize="sm">
                    {item.position}
                  </Text>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}

function CompanyLogos() {
  return (
    <Stack isInline spacing={[5, 10]}>
      {companyList.map((item) => (
        <Box key={item.iconUrl} borderColor="white" borderWidth={["1px", "2px"]} rounded={["md", "xl"]} overflow="hidden">
          <Link href={item.companyUrl} isExternal>
            <Image src={item.iconUrl} alt="client logo" objectFit="contain" boxSize={[16, 20]} />
          </Link>
        </Box>
      ))}
    </Stack>
  )
}

const projectList = [
  {
    id: 1,
    title: "POC Binary Options Trading Web App",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C5603AQEmAjRMGwzMUw/profile-displayphoto-shrink_200_200/0/1554286352901?e=1637193600&v=beta&t=zbmO_2cV9vPnALWpx4Cdw7ecAHyuSzi6110Mzp7s58g",
  },
  {
    id: 1,
    title: "POC Binary Options Trading Web App",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C5603AQEmAjRMGwzMUw/profile-displayphoto-shrink_200_200/0/1554286352901?e=1637193600&v=beta&t=zbmO_2cV9vPnALWpx4Cdw7ecAHyuSzi6110Mzp7s58g",
  },
]

function ProjectList() {
  return (
    <Stack isInline spacing={[5, 10]}>
      {projectList.map((item) => (
        <Box key={item.id} p={10} bg="gray.700" rounded="md">
          <Text fontWeight="bold">{item.title}</Text>
        </Box>
      ))}
    </Stack>
  )
}
