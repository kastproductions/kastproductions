"use client";

import { useState, useEffect, useRef, cloneElement } from "react";
import {
  Box,
  Stack,
  Text,
  Icon,
  Button,
  Link,
  Image,
  HStack,
  SimpleGrid,
  Container,
  VStack,
  Center,
  IconButton,
  Heading,
  Drawer,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { VscQuote } from "react-icons/vsc";
import { HiBars3BottomRight } from "react-icons/hi2";
import NextLink from "next/link";

function scrollIntoView(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

function EmailUs({
  children,
}: {
  children: React.ReactElement<{ onClick?: () => void }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    if (isOpen) {
      id = setTimeout(() => {
        setIsOpen(false);
      }, 4000);
    }
    return () => {
      if (typeof id !== "undefined") clearTimeout(id);
      if (isOpen) setIsOpen(false);
    };
  }, [isOpen]);

  const element = cloneElement(children, { onClick: () => setIsOpen(true) } as {
    onClick: () => void;
  });

  return (
    <>
      {element}
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        zIndex={10}
        transform={isOpen ? "translateY(0)" : "translateY(100%)"}
        transition="transform 0.3s ease-in-out"
        bg="purple.600"
      >
        <Container maxW="8xl" py={{ base: 7, md: 14 }} color="white">
          <VStack>
            <Heading
              as="h3"
              textAlign="center"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="semibold"
              lineHeight="none"
            >
              Get In Touch
            </Heading>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:hello@kastproductions.com"
              textDecor="underline"
              textAlign="center"
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="light"
            >
              hello@kastproductions.com
            </Link>
          </VStack>
        </Container>
      </Box>
    </>
  );
}

function Navigation() {
  const [bg, setBg] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      setBg(window.scrollY > 100 ? "#1E1E1E" : "transparent");
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="full"
      zIndex={100}
      bg={bg}
      transition="all 0.25s ease-in-out"
    >
      <Container py={5} maxW="8xl" display={{ base: "none", md: "flex" }}>
        <HStack fontWeight="light" fontSize="sm" w="full">
          <Box flex={1}>
            <Link asChild fontSize="xl" fontWeight="semibold" _hover={{}}>
              <NextLink href="/">KastProductions.</NextLink>
            </Link>
          </Box>
          <HStack gap={10}>
            {["what we do", "services", "clients", "testimonials"].map(
              (item) => (
                <Button
                  onClick={() => scrollIntoView(item)}
                  key={item}
                  textTransform="capitalize"
                  variant="ghost"
                  fontWeight="light"
                  fontSize="sm"
                >
                  {item}
                </Button>
              ),
            )}
          </HStack>
          <HStack flex={1} justifyContent="flex-end">
            <EmailUs>
              <Button
                rounded="none"
                h={14}
                w={40}
                fontWeight="semibold"
                fontSize="sm"
                color="gray.900"
              >
                Work With Us
              </Button>
            </EmailUs>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}

function MobileNavigation() {
  const [bg, setBg] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      setBg(window.scrollY > 25 ? "#1E1E1E" : "transparent");
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="full"
      zIndex={100}
      bg={bg}
      transition="all 0.25s ease-in-out"
    >
      <HStack px={4} py={3}>
        <Box flex={1}>
          <Link asChild fontSize="xl" fontWeight="semibold" _hover={{}}>
            <NextLink href="/">KastProductions.</NextLink>
          </Link>
        </Box>
        <HStack flex={1} justify="flex-end">
          <MenuDrawer />
        </HStack>
      </HStack>
    </Box>
  );
}

export default function Home() {
  return (
    <Box
      bgGradient="to-br"
      gradientFrom="#3D3A49"
      gradientTo="#1E1E1E"
      color="white"
    >
      <Stack gap={0} pt={{ base: 0, md: 24 }}>
        <Box display={{ base: "none", md: "block" }}>
          <Navigation />
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <MobileNavigation />
        </Box>
        <Box borderTopColor="gray.600" borderTopWidth="0.5px" h="full">
          <Container height="full" maxW="8xl">
            <Stack
              gap={0}
              borderLeftColor="gray.600"
              borderLeftWidth="0.5px"
              borderRightColor="gray.600"
              borderRightWidth="0.5px"
              h="full"
              pb={16}
            >
              <Box
                px={{ base: 2, md: 8 }}
                pb={{ base: 10, md: 16 }}
                pt={{ base: 24, md: 16 }}
              >
                <Heading
                  as="h1"
                  fontSize={{ base: "5xl", md: "8xl" }}
                  fontWeight="semibold"
                  maxW="4xl"
                  lineHeight="shorter"
                >
                  We Design & Create High Quality Digital Products.
                </Heading>
              </Box>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 4, md: 8 }}>
                <Stack>
                  <Image
                    alt="Api Development"
                    rounded="sm"
                    objectFit="cover"
                    height={{ base: "200px", md: "325px" }}
                    w="full"
                    objectPosition="0%"
                    src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                  />
                  <Heading as="h4" fontSize="xl">
                    Api Development
                  </Heading>
                </Stack>
                <Stack mt={{ base: 0, md: "-8" }}>
                  <Image
                    alt="Website Development"
                    rounded="sm"
                    objectFit="cover"
                    objectPosition="100%"
                    height={{ base: "200px", md: "325px" }}
                    w="full"
                    src="https://images.unsplash.com/photo-1558174685-430919a96c8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  />
                  <Heading as="h4" fontSize="xl">
                    Website Development
                  </Heading>
                </Stack>
                <Stack mt={{ base: 0, md: "-16" }}>
                  <Image
                    alt=" Mobile Development"
                    rounded="sm"
                    objectFit="cover"
                    objectPosition="0% 60%"
                    height={{ base: "200px", md: "325px" }}
                    w="full"
                    src="https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  />
                  <Heading as="h4" fontSize="xl">
                    Mobile Development
                  </Heading>
                </Stack>
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>
      </Stack>
      <Box
        borderBottomColor="gray.600"
        borderBottomWidth="0.5px"
        borderTopColor="gray.600"
        borderTopWidth="0.5px"
      >
        <Container maxW="8xl" py={{ base: 7, md: 14 }}>
          <Stack
            direction={{ base: "column", md: "row" }}
            alignItems="center"
            gap={{ base: 10, md: 20 }}
          >
            <Box w={{ base: "full", md: "40%" }}>
              <Heading
                as="h2"
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight="semibold"
                lineHeight="shorter"
                textAlign={{ base: "center", md: "left" }}
              >
                Start Your Successful Project With Us
              </Heading>
            </Box>
            <Stack gap={6} w={{ base: "full", md: "60%" }}>
              <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="light">
                <b>Kast Productions</b> is web design and development
                consultancy. We develop the highest quality unconventional
                websites and mobile products with unique design.
              </Text>
              <Stack
                direction={{ base: "column", md: "row" }}
                gap={{ base: 3, md: 6 }}
              >
                <Box>
                  <EmailUs>
                    <Button
                      colorPalette="purple"
                      rounded="none"
                      h={{ base: 14, md: 16 }}
                      w={{ base: "full", md: 48 }}
                      fontWeight="normal"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      Start A Project
                    </Button>
                  </EmailUs>
                </Box>
                <Box>
                  <Button
                    rounded="none"
                    variant="outline"
                    h={{ base: 14, md: 16 }}
                    w={{ base: "full", md: 48 }}
                    fontWeight="normal"
                    fontSize={{ base: "sm", md: "md" }}
                    _hover={{}}
                    onClick={() => scrollIntoView("what we do")}
                  >
                    Learn More
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container maxW="8xl" py={20} id="what we do">
        <Stack
          direction={{ base: "column-reverse", md: "row" }}
          alignItems="center"
          gap={{ base: 10, md: 20 }}
        >
          <Box w={{ base: "full", md: "50%" }}>
            <Image
              alt="solve problems"
              objectFit="cover"
              objectPosition={{ base: "0% 80%", md: "10% 90%" }}
              height={{ base: "200px", md: "450px" }}
              w="full"
              src="https://images.unsplash.com/photo-1589340786362-6b77c6489489?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
            />
          </Box>
          <Box w={{ base: "full", md: "50%" }}>
            <Heading
              as="h3"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="semibold"
              lineHeight="shorter"
            >
              We connect brands with users through designs that are unique,
              elegant, easy to use and centered on user needs.
            </Heading>
          </Box>
        </Stack>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: 2, md: 8 }}
          pt={10}
        >
          {["Design", "Development", "Strategic"].map((item, index) => {
            return (
              <Stack
                as="fieldset"
                key={item}
                borderWidth="0.5px"
                borderColor="gray.600"
                px={10}
                pb={10}
              >
                <Box as="legend" pl={4} pr={2}>
                  <Text
                    fontSize={{ base: "5xl", md: "7xl" }}
                    fontWeight="semibold"
                  >
                    0{index + 1}
                  </Text>
                </Box>
                <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="medium">
                  {item}
                </Text>
              </Stack>
            );
          })}
        </SimpleGrid>
      </Container>
      <Box borderTopColor="gray.600" borderTopWidth="0.5px" id="services">
        <Container maxW="8xl">
          <Stack direction={{ base: "column", md: "row" }} gap={0}>
            <Box
              w={{ base: "full", md: "50%" }}
              borderRightColor="gray.600"
              borderRightWidth="0.5px"
            >
              <Stack
                p={14}
                pt={{ base: 20, md: 14 }}
                pl={0}
                gap={{ base: 6, md: 12 }}
              >
                <Heading
                  as="h3"
                  fontSize={{ base: "4xl", md: "6xl" }}
                  fontWeight="semibold"
                  lineHeight="none"
                >
                  Services We Provide
                </Heading>
                <Stack gap={4}>
                  <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="light">
                    UI/UX Designs
                  </Text>
                  <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="light">
                    API development
                  </Text>
                  <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="light">
                    Website development
                  </Text>
                  <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="light">
                    Mobile development
                  </Text>
                  <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="light">
                    End to end (E2E) testing
                  </Text>
                </Stack>
              </Stack>
            </Box>
            <Box w={{ base: "full", md: "50%" }} p={{ base: 0, md: 14 }}>
              <Image
                h={{ base: "250px", md: "400px" }}
                w="full"
                objectFit="cover"
                src="/image-1.png"
                alt="design and implement"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box borderTopColor="gray.600" borderTopWidth="0.5px" id="clients">
        <Container maxW="8xl">
          <Stack direction={{ base: "column", md: "row" }} gap={0}>
            <Box
              w={{ base: "full", md: "50%" }}
              borderRightColor="gray.600"
              borderRightWidth="0.5px"
            >
              <Stack
                p={14}
                pt={{ base: 20, md: 14 }}
                pl={0}
                pr={{ base: 0, md: 28 }}
                gap={{ base: 4, md: 10 }}
              >
                <Heading
                  as="h3"
                  maxW="md"
                  fontSize={{ base: "4xl", md: "6xl" }}
                  fontWeight="semibold"
                  lineHeight="shorter"
                >
                  Take A Look At Our Clients
                </Heading>
                <Text fontWeight="light" fontSize={{ base: "sm", md: "lg" }}>
                  Products and platforms that combine craft, empathy and
                  inclusive technology will conquer the world. Here&apos;s who
                  we&apos;ve partnered with to go further.
                </Text>
              </Stack>
            </Box>
            <Box w={{ base: "full", md: "50%" }} p={{ base: 0, md: 14 }}>
              <SimpleGrid columns={4} gap={0}>
                {companyList.map(({ iconUrl, companyUrl, name }) => (
                  <Link
                    key={iconUrl}
                    href={companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box>
                      <Image src={iconUrl} objectFit="cover" alt={name} />
                    </Box>
                  </Link>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box borderTopColor="gray.600" borderTopWidth="0.5px" id="testimonials">
        <Container
          maxW="8xl"
          borderColor="gray.600"
          borderLeftWidth="0.5px"
          borderRightWidth="0.5px"
        >
          <VStack
            p={14}
            pt={{ base: 20, md: 14 }}
            px={{ base: 0, md: 14 }}
            gap={{ base: 6, md: 12 }}
          >
            <Heading
              as="h3"
              textAlign="center"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="semibold"
              lineHeight="none"
            >
              What Our Clients Say About Us
            </Heading>
            <Text
              fontWeight="light"
              fontSize={{ base: "sm", md: "lg" }}
              maxW="3xl"
              textAlign="center"
            >
              Know what people say about us. Every review on this page has been
              written by a real client. It is neither filtered or edited by us.
            </Text>
          </VStack>
        </Container>
      </Box>
      <Box borderTopColor="gray.600" borderTopWidth="0.5px">
        <Container maxW="8xl">
          <RecommendationList />
        </Container>
      </Box>
      <Box borderTopColor="gray.600" borderTopWidth="0.5px" bg="purple.600">
        <Container maxW="8xl" py={{ base: 7, md: 14 }}>
          <VStack>
            <Text
              textAlign="center"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="semibold"
              lineHeight="none"
            >
              Get In Touch
            </Text>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:hello@kastproductions.com"
              textDecor="underline"
              textAlign="center"
              fontSize={{ base: "md", md: "2xl" }}
              fontWeight="light"
            >
              hello@kastproductions.com
            </Link>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

function MenuDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="full">
      <Drawer.Trigger asChild>
        <IconButton variant="ghost" aria-label="open-close-menu">
          <HiBars3BottomRight />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="#1E1E1E">
            <Drawer.Header mt={0.5} color="white">
              <Link
                asChild
                fontSize="xl"
                fontWeight="bold"
                _hover={{}}
                onClick={() => setOpen(false)}
              >
                <NextLink href="/">KastProductions.</NextLink>
              </Link>
            </Drawer.Header>
            <Drawer.Body p={4}>
              <Stack pt={8} color="white">
                {["what we do", "services", "clients", "testimonials"].map(
                  (item) => (
                    <Button
                      onClick={() => {
                        setOpen(false);
                        scrollIntoView(item);
                      }}
                      key={item}
                      textTransform="capitalize"
                      variant="ghost"
                      h={20}
                    >
                      <Heading as="h4" fontSize="3xl" fontWeight="normal">
                        {item}
                      </Heading>
                    </Button>
                  ),
                )}
              </Stack>
            </Drawer.Body>
            <Drawer.Footer position="fixed" bottom={0} left={0} w="full" mb={4}>
              <EmailUs>
                <Button
                  fontWeight="medium"
                  fontSize="sm"
                  h={16}
                  w="full"
                  rounded="sm"
                  colorPalette="purple"
                >
                  Work With Us
                </Button>
              </EmailUs>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton
                size="sm"
                color="white"
                position="absolute"
                top={4}
                right={4}
              />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

const companyList = [
  {
    name: "Zipmex",
    companyUrl: "https://zipmex.com/",
    iconUrl: "/logos/zipmex.svg",
  },
  {
    name: "Trustpilot",
    companyUrl: "https://www.trustpilot.com/",
    iconUrl: "/logos/trustpilot.svg",
  },
  {
    name: "Bound Interactive",
    companyUrl: "https://boundinteractive.com/",
    iconUrl: "/logos/bound.svg",
  },
  {
    name: "Rocket Software",
    companyUrl: "https://www.rocketsoftware.com/",
    iconUrl: "/logos/rocket-software.svg",
  },
  {
    name: "Netfront",
    companyUrl: "https://netfront.com.au/",
    iconUrl: "/logos/netfront.svg",
  },
  {
    name: "All Human",
    companyUrl: "https://allhuman.com/",
    iconUrl: "/logos/allhuman.svg",
  },
  {
    name: "Central Innovation",
    companyUrl: "https://centralinnovation.com/",
    iconUrl: "/logos/central-innovation.svg",
  },
  {
    name: "Irish Life",
    companyUrl: "https://www.irishlife.ie/",
    iconUrl: "/logos/irish-life.svg",
  },
];

const recomendations = [
  {
    linkedinUrl: "",
    name: "Kristian Tasevski",
    position: "Head of Mobile | Bound",
    imageUrl: `/reviewers/1554286352901.jpeg`,
    id: 1,
    message:
      "Karolis is one of those rare developers who has an exceptional eye for detail, everything that he works on has a certain visual aesthetic to it. I was directly managing Karolis on a number of different projects at UserCentric for high profile enterprise clients of ours and all of the front-end work that Karolis did on those projects just looked great. He also has a strong self driven motivation to continue to learn and to stay up to date with whatever is topical in the dev community, and contributed a lot to our Engineering culture at UserCentric by always sharing with us what was the latest and greatest in the scene.",
  },
  {
    linkedinUrl: "",
    name: "Greg Stephenson",
    position: "Founder at Netfront",
    imageUrl: `/reviewers/1516274019938.jpeg`,
    id: 2,
    message:
      "I have had the pleasure of working with Karolis across a few projects. Karolis has a very keen eye for detail and a great analytical approach to programming. I was impressed with the polished UI and UX considerations Karolis made while working with him. In addition to his solid programming skills, Karolis is a great communicator and easy to work with. I would recommend Karolis to anyone who is looking for a good react developer, he would be a true asset to your team.",
  },
  {
    linkedinUrl: "",
    name: "Povilas Nanevičius",
    position: "Mainframe Engineer at Rocket Software",
    imageUrl: `/reviewers/1578655726413.jpeg`,
    id: 3,
    message: `I know Karolis was in his element in Reactjs: researching, delivering latest and greatest Reactjs UI in his work, spending free time rewriting Three.js games with React components, building web apps.
    Full of energy, efficient, right on the point. Looking forward to working (and having lunch time IT discussions) with you again!`,
  },
  {
    linkedinUrl: "",
    name: "Nando Mogollon",
    position: "Founder and Director at BuilDigital",
    imageUrl: `/reviewers/1600770423042.jpeg`,
    id: 4,
    message: `I had the opportunity to work with Karolis from 2016 to 2019 while he was in Australia. I can attest he is a highly motivated, committed and responsible individual. Working with him gives you the confidence that work is going to be done and to the best standard.
    He would be a tremendous asset for you to hire or to get his services as a highly qualified professional.`,
  },
  {
    linkedinUrl: "",
    name: "Cathal McAliskey",
    position: "Lead IT Consultant at GemPool Recruitment",
    imageUrl: `/reviewers/1631633235263.jpeg`,
    id: 5,
    message: `Karolis is the consummate professional. Highly personable, excellent communication skills, dedicated and technically astute. Along with all that he is a nice guy.`,
  },
  {
    linkedinUrl: "",
    name: "Orla Lewis",
    position: "Product Design Manager at Irish Life",
    imageUrl: `/reviewers/1645312108470.jpeg`,
    id: 6,
    message: `Karolis worked as a react developer with my UX team. He was instrumental in building and developing our design system, a first for the company. I found him to be highly skilled and knowledgeable and an expert in his field. He is a strong communicator and diligent in his work. I highly recommend Karolis and hope to work with him again in the future. `,
  },
];

function RecommendationList() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} pb={{ base: 7, md: 0 }}>
      {recomendations.map((item, index) => {
        const showBorder = index % 2 === 0;
        const isLast = recomendations.length - 1 === index;
        return (
          <HStack
            key={item.id}
            gap={5}
            borderRightWidth="0.5px"
            borderBottomWidth={isLast ? 0 : "0.5px"}
            borderRightColor={showBorder ? "gray.600" : "transparent"}
            borderBottomColor={"gray.600"}
            pr={{ base: 2, md: showBorder ? 14 : 0 }}
            pl={{ base: 0, md: !showBorder ? 14 : 0 }}
            pb={{ base: 7, md: 14 }}
            pt={{ base: 7, md: 14 }}
          >
            <Stack gap={10}>
              <Box>
                <Box pb={4}>
                  <Icon as={VscQuote} fontSize={{ base: "4xl", md: "6xl" }} />
                </Box>
                <Box>
                  <Text fontSize={{ base: "sm", md: "md" }} fontWeight="light">
                    {item.message}
                  </Text>
                </Box>
              </Box>
              <HStack gap={4}>
                <Center
                  maxW="20"
                  w="full"
                  borderColor="white"
                  borderWidth="4px"
                  rounded="full"
                  overflow="hidden"
                >
                  <Image
                    src={item.imageUrl}
                    objectFit="cover"
                    alt="picture of reviewer"
                  />
                </Center>
                <Box w="auto">
                  <Box>
                    <Text fontSize="md" fontWeight="bold">
                      {item.name}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm">{item.position}</Text>
                  </Box>
                </Box>
              </HStack>
            </Stack>
          </HStack>
        );
      })}
    </SimpleGrid>
  );
}
