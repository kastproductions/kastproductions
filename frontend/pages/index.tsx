// import Image from "next/image"
import React from 'react';
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
  HStack,
  Img,
  SimpleGrid,
  Container,
  VStack,
  Center,
  Slide,
  IconButton,
} from '@chakra-ui/react';
import { VscQuote } from 'react-icons/vsc';
import { HiBars3BottomRight } from 'react-icons/hi2';
import NextLink from 'next/link';

function scrollIntoView(id) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
}

function EmailUs({ children }) {
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();

  React.useEffect(() => {
    let id;
    if (isOpen) {
      id = setTimeout(() => {
        onClose();
      }, 4000);
    }
    return () => {
      if (typeof id !== 'undefined') clearTimeout(id);
      if (isOpen) onClose();
    };
  }, [isOpen, onClose]);

  const element = React.cloneElement(children, { onClick: onOpen });

  return (
    <>
      {element}
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box bg="purple.600">
          <Container maxW="8xl" py={[7, 14]} color="white">
            <VStack>
              <Text
                textAlign="center"
                fontSize={['4xl', '5xl']}
                fontFamily="Cormorant Infant"
                fontWeight="semibold"
                lineHeight="none"
              >
                Get In Touch
              </Text>
              <Link
                isExternal
                href="mailto:hello@kastproductions.com"
                textDecor="underline"
                textAlign="center"
                fontSize={['md', 'xl']}
                fontWeight="light"
              >
                hello@kastproductions.com
              </Link>
            </VStack>
          </Container>
        </Box>
      </Slide>
    </>
  );
}

function Navigation() {
  const [bg, setBg] = React.useState('transparent');

  React.useEffect(() => {
    const handleScroll = () => {
      setBg(window.scrollY > 100 ? '#1E1E1E' : 'transparent');
    };
    document.addEventListener('scroll', (e) => {
      handleScroll();
    });
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      document.removeEventListener('scroll', (e) => {
        handleScroll();
      });
    };
  }, []);

  return (
    <Box position="fixed" top={0} left={0} w="full" zIndex={100} bg={bg} transition="all 0.2s ease-in-out">
      <Container py={5} maxW="8xl" display={['none', 'flex']}>
        <HStack fontWeight="light" fontSize="sm" w="full">
          <Box flex={1}>
            <NextLink href="/" passHref>
              <Link fontSize="xl" fontWeight="semibold" _hover={{}}>
                KastProductions.
              </Link>
            </NextLink>
          </Box>
          <HStack spacing={10}>
            {['what we do', 'services', 'clients', 'testimonials'].map((item) => (
              <Button
                onClick={() => scrollIntoView(item)}
                key={item}
                textTransform="capitalize"
                variant="unstyled"
                fontWeight="light"
                fontSize="sm"
              >
                {item}
              </Button>
            ))}
          </HStack>
          <HStack flex={1} justifyContent="flex-end">
            <EmailUs>
              <Button rounded="none" h={14} w={40} fontWeight="semibold" fontSize="sm" color="gray.900">
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
  const [bg, setBg] = React.useState('transparent');

  React.useEffect(() => {
    const handleScroll = () => {
      setBg(window.scrollY > 100 ? '#1E1E1E' : 'transparent');
    };
    document.addEventListener('scroll', (e) => {
      handleScroll();
    });
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      document.removeEventListener('scroll', (e) => {
        handleScroll();
      });
    };
  }, []);
  return (
    <Box position="fixed" top={0} left={0} w="full" zIndex={100} bg={bg} transition="all 0.2s ease-in-out">
      <HStack px={4} py={3}>
        <Box flex={1}>
          <NextLink href="/" passHref>
            <Link fontSize="xl" fontWeight="semibold" _hover={{}}>
              KastProductions.
            </Link>
          </NextLink>
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
    <Box fontFamily="Poppins" bgGradient="linear(to-br, #3D3A49, #1E1E1E)" color="white">
      <Stack spacing={0} pt={[0, 24]}>
        <Box display={['none', 'block']}>
          <Navigation />
        </Box>
        <Box display={['block', 'none']}>
          <MobileNavigation />
        </Box>
        <Box borderTopColor="gray.600" borderTopWidth="0.5px" h="full">
          <Container height="full" maxW="8xl">
            <Stack
              spacing={0}
              borderLeftColor="gray.600"
              borderLeftWidth="0.5px"
              borderRightColor="gray.600"
              borderRightWidth="0.5px"
              h="full"
              pb={16}
            >
              <Box px={[2, 8]} py={16}>
                <Text
                  as="h1"
                  fontSize={['5xl', '8xl']}
                  fontFamily="Cormorant Infant"
                  fontWeight="bold"
                  maxW="4xl"
                  lineHeight="shorter"
                >
                  We Design & Create High Quality Digital Products.
                </Text>
              </Box>
              <SimpleGrid columns={[1, 3]} spacing={[4, 8]}>
                <Stack>
                  <Img
                    alt="Api Development"
                    rounded="sm"
                    objectFit="cover"
                    height={['200px', '325px']}
                    w="full"
                    objectPosition="0%"
                    src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                  />
                  <Text fontSize="xl" fontFamily="Cormorant Infant">
                    Api Development
                  </Text>
                </Stack>
                <Stack mt={[0, '-8']}>
                  <Img
                    alt="Website Development"
                    rounded="sm"
                    objectFit="cover"
                    objectPosition="100%"
                    height={['200px', '325px']}
                    w="full"
                    src="https://images.unsplash.com/photo-1558174685-430919a96c8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  />
                  <Text fontSize="xl" fontFamily="Cormorant Infant">
                    Website Development
                  </Text>
                </Stack>
                <Stack mt={[0, '-16']}>
                  <Img
                    alt=" Mobile Development"
                    rounded="sm"
                    objectFit="cover"
                    objectPosition="0% 60%"
                    height={['200px', '325px']}
                    w="full"
                    src="https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  />
                  <Text fontSize="xl" fontFamily="Cormorant Infant">
                    Mobile Development
                  </Text>
                </Stack>
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>
      </Stack>
      <Box borderBottomColor="gray.600" borderBottomWidth="0.5px" borderTopColor="gray.600" borderTopWidth="0.5px">
        <Container maxW="8xl" py={[7, 14]}>
          <Stack direction={['column', 'row']} alignItems="center" spacing={[10, 20]}>
            <Box w={['full', '40%']}>
              <Text
                as="h2"
                fontSize={['4xl', '6xl']}
                fontFamily="Cormorant Infant"
                fontWeight="semibold"
                lineHeight="shorter"
                textAlign={['center', 'left']}
              >
                Start Your Successful Project With Us
              </Text>
            </Box>
            <Stack spacing={6} w={['full', '60%']}>
              <Text fontSize={['sm', 'lg']} fontWeight="light">
                <b>Kast Productions</b> is web design and development consultancy. We develop the highest quality
                unconventional websites and mobile products with unique design.
              </Text>
              <Stack direction={['column', 'row']} spacing={[3, 6]}>
                <Box>
                  <EmailUs>
                    <Button
                      colorScheme="purple"
                      rounded="none"
                      h={[14, 16]}
                      w={['full', 48]}
                      fontWeight="normal"
                      fontSize={['sm', 'md']}
                    >
                      Start A Project
                    </Button>
                  </EmailUs>
                </Box>
                <Box>
                  <Button
                    rounded="none"
                    variant="outline"
                    h={[14, 16]}
                    w={['full', 48]}
                    fontWeight="normal"
                    fontSize={['sm', 'md']}
                    _hover={{}}
                    onClick={() => scrollIntoView('what we do')}
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
        <Stack direction={['column-reverse', 'row']} alignItems="center" spacing={[10, 20]}>
          <Box w={['full', '50%']}>
            <Img
              alt="solve problems"
              objectFit="cover"
              objectPosition={['0% 80%', '10% 90%']}
              height={['200px', '450px']}
              w="full"
              src="https://images.unsplash.com/photo-1589340786362-6b77c6489489?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
            />
          </Box>
          <Box w={['full', '50%']}>
            <Text fontSize={['4xl', '6xl']} fontFamily="Cormorant Infant" fontWeight="semibold" lineHeight="shorter">
              We connect brands with users through designs that are unique, elegant, easy to use and centered on user
              needs.
            </Text>
          </Box>
        </Stack>
        <SimpleGrid columns={[1, 3]} spacing={[2, 8]} pt={10}>
          {['Design', 'Development', 'Strategic'].map((item, index) => {
            return (
              <Stack as="fieldset" key={item} borderWidth="0.5px" borderColor="gray.600" px={10} pb={10}>
                <Box as="legend" pl={4} pr={2}>
                  <Text fontSize={['5xl', '7xl']} fontFamily="Cormorant Infant" fontWeight="semibold">
                    0{index + 1}
                  </Text>
                </Box>
                <Text fontSize={['xl', '3xl']} fontWeight="medium">
                  {item}
                </Text>
              </Stack>
            );
          })}
        </SimpleGrid>
      </Container>
      <Box borderTopColor="gray.600" borderTopWidth="0.5px" id="services">
        <Container maxW="8xl">
          <Stack direction={['column', 'row']} spacing={0}>
            <Box w={['full', '50%']} borderRightColor="gray.600" borderRightWidth="0.5px">
              <Stack p={[14]} pt={[20, 14]} pl={0} spacing={[6, 12]}>
                <Text fontSize={['4xl', '6xl']} fontFamily="Cormorant Infant" fontWeight="semibold" lineHeight="none">
                  Services We Provide
                </Text>
                <Stack spacing={4}>
                  <Text fontSize={['md', '2xl']} fontWeight="normal">
                    UI/UX Designs
                  </Text>
                  <Text fontSize={['md', '2xl']} fontWeight="normal">
                    API development
                  </Text>
                  <Text fontSize={['md', '2xl']} fontWeight="normal">
                    Website development
                  </Text>
                  <Text fontSize={['md', '2xl']} fontWeight="normal">
                    Mobile development
                  </Text>
                  <Text fontSize={['md', '2xl']} fontWeight="normal">
                    End to end (E2E) testing
                  </Text>
                </Stack>
              </Stack>
            </Box>
            <Box w={['full', '50%']} p={[0, 14]}>
              <Img h={['250px', '400px']} w="full" objectFit="cover" src="/image-1.png" alt="design and implement" />
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box borderTopColor="gray.600" borderTopWidth="0.5px" id="clients">
        <Container maxW="8xl">
          <Stack direction={['column', 'row']} spacing={0}>
            <Box w={['full', '50%']} borderRightColor="gray.600" borderRightWidth="0.5px">
              <Stack p={14} pt={[20, 14]} pl={0} pr={[0, 28]} spacing={[4, 10]}>
                <Text
                  maxW="md"
                  fontSize={['4xl', '6xl']}
                  fontFamily="Cormorant Infant"
                  fontWeight="semibold"
                  lineHeight="shorter"
                >
                  Take A Look At Our Clients
                </Text>
                <Text fontWeight="light" fontSize={['sm', 'lg']}>
                  Products and platforms that combine craft, empathy and inclusive technology will conquer the world.
                  Here's who we've partnered with to go further.
                </Text>
              </Stack>
            </Box>
            <Box w={['full', '50%']} p={[0, 14]}>
              <SimpleGrid columns={4} spacing={0}>
                {companyList.map(({ iconUrl, companyUrl, name }) => (
                  <Link key={iconUrl} href={companyUrl} isExternal>
                    <Box>
                      <Img src={iconUrl} objectFit="cover" alt={name} />
                    </Box>
                  </Link>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box borderTopColor="gray.600" borderTopWidth="0.5px" id="testimonials">
        <Container maxW="8xl" borderColor="gray.600" borderLeftWidth="0.5px" borderRightWidth="0.5px">
          <VStack p={14} pt={[20, 14]} px={[0, 14]} spacing={[6, 12]}>
            <Text
              textAlign="center"
              fontSize={['4xl', '6xl']}
              fontFamily="Cormorant Infant"
              fontWeight="semibold"
              lineHeight="none"
            >
              What Our Clients Say About Us
            </Text>
            <Text fontWeight="light" fontSize={['sm', 'lg']} maxW="3xl" textAlign="center">
              Know what people say about us. Every review on this page has been written by a real client. It is neither
              filtered or edited by us.
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
        <Container maxW="8xl" py={[7, 14]}>
          <VStack>
            <Text
              textAlign="center"
              fontSize={['4xl', '6xl']}
              fontFamily="Cormorant Infant"
              fontWeight="semibold"
              lineHeight="none"
            >
              Get In Touch
            </Text>
            <Link
              isExternal
              href="mailto:hello@kastproductions.com"
              textDecor="underline"
              textAlign="center"
              fontSize={['md', '2xl']}
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton
        variant="unstyled"
        aria-label="open-close-menu"
        as={HiBars3BottomRight}
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer size="full" isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent bg="#1E1E1E">
          <DrawerCloseButton color="white" fontSize={16} m={2} />
          <DrawerHeader mt={0.5} color="white">
            <NextLink href="/" passHref>
              <Link fontSize="xl" fontWeight="bold" _hover={{}} onClick={onClose}>
                KastProductions.
              </Link>
            </NextLink>
          </DrawerHeader>
          <DrawerBody p={4}>
            <Stack pt={8} color="white">
              {['what we do', 'services', 'clients', 'testimonials'].map((item) => (
                <Button
                  onClick={() => {
                    onClose();
                    scrollIntoView(item);
                  }}
                  key={item}
                  textTransform="capitalize"
                  variant="unstyled"
                  fontWeight="semibold"
                  fontSize="4xl"
                  fontFamily="Cormorant Infant"
                  h={20}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </DrawerBody>
          <DrawerFooter p={4}>
            <EmailUs>
              <Button fontWeight="medium" fontSize="sm" h={16} w="full" rounded="sm" colorScheme="purple">
                Work With Us
              </Button>
            </EmailUs>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const companyList = [
  {
    name: 'zipmex',
    companyUrl: 'https://zipmex.com/',
    iconUrl:
      'https://media-exp1.licdn.com/dms/image/C560BAQEZFbVB701LiQ/company-logo_200_200/0/1650870418499?e=1674086400&v=beta&t=9Bnk8PVN19nASToPp7ldGeLtqN-I_njxgVxKwVg6JI4',
  },

  {
    name: 'trustpilot',
    companyUrl: 'https://www.trustpilot.com/',
    iconUrl:
      'https://media-exp1.licdn.com/dms/image/C4D0BAQEcsYTuxD0gdA/company-logo_200_200/0/1647966817956?e=1674086400&v=beta&t=mKVb1pUy_jcpNM0geMyu-hPKE-WFtSrFrbgBxh3YeY8',
  },
  {
    name: 'bound',
    companyUrl: 'https://boundinteractive.com/',
    iconUrl:
      'https://media-exp1.licdn.com/dms/image/C4E0BAQHMu66kuMajIQ/company-logo_200_200/0/1658885766023?e=1674086400&v=beta&t=mahudunBUlzFyFHDOVt9vV6sZTfuK-emnCGesoA6qa0',
  },
  {
    name: 'rocket',
    companyUrl: 'https://www.rocketsoftware.com/',
    iconUrl:
      'https://media-exp1.licdn.com/dms/image/C4E0BAQHQyp9sUmbUtw/company-logo_200_200/0/1645040294049?e=1674086400&v=beta&t=BbBS5qKN3Hdo1G9kEd1mjImpdG0oMSQ5Y82-QCaxE6Q',
  },
  {
    name: 'netfront',
    companyUrl: 'https://netfront.com.au/',
    iconUrl:
      'https://media-exp1.licdn.com/dms/image/C560BAQGuwEuCPMZAAw/company-logo_200_200/0/1531722161731?e=1674086400&v=beta&t=yqu0i9rtBizAYaJgAL6SZxWk5yiA6AemflSPPHJcszg',
  },
  {
    name: 'allhuman',
    companyUrl: 'https://allhuman.com/',
    iconUrl:
      'https://media-exp1.licdn.com/dms/image/C4E0BAQESlCtevJJggw/company-logo_200_200/0/1626685744946?e=1674086400&v=beta&t=Cti9fboAjYCBGzRHDd1sujT9QwL02pzjDgxPpUXOibM',
  },
  {
    name: 'Central Innovation',
    companyUrl: 'https://centralinnovation.com/',
    iconUrl:
      'https://media-exp1.licdn.com/dms/image/C4E0BAQEE3Bubi5E0yQ/company-logo_200_200/0/1521168247082?e=1674086400&v=beta&t=Hzz6qytoC1BixcoFZzMAYCuQ98F3muMEOnLK9pvZZIk',
  },
  {
    name: 'irishlife',
    companyUrl: 'https://www.irishlife.ie/',
    iconUrl:
      'https://media-exp1.licdn.com/dms/image/C560BAQGRsICZqVa9Iw/company-logo_200_200/0/1656595564144?e=1674086400&v=beta&t=19zDpIP_WG0olF5Bane6d7-1mCN8DLMK1ZjoSzqdhkc',
  },
];

const recomendations = [
  {
    linkedinUrl: '',
    name: 'Kristian Tasevski',
    position: 'Head of Mobile | Bound',
    imageUrl: `/reviewers/1554286352901.jpeg`,
    id: 1,
    message:
      'Karolis is one of those rare developers who has an exceptional eye for detail, everything that he works on has a certain visual aesthetic to it. I was directly managing Karolis on a number of different projects at UserCentric for high profile enterprise clients of ours and all of the front-end work that Karolis did on those projects just looked great. He also has a strong self driven motivation to continue to learn and to stay up to date with whatever is topical in the dev community, and contributed a lot to our Engineering culture at UserCentric by always sharing with us what was the latest and greatest in the scene.',
  },
  {
    linkedinUrl: '',
    name: 'Greg Stephenson',
    position: 'Founder at Netfront',
    imageUrl: `/reviewers/1516274019938.jpeg`,
    id: 2,
    message:
      'I have had the pleasure of working with Karolis across a few projects. Karolis has a very keen eye for detail and a great analytical approach to programming. I was impressed with the polished UI and UX considerations Karolis made while working with him. In addition to his solid programming skills, Karolis is a great communicator and easy to work with. I would recommend Karolis to anyone who is looking for a good react developer, he would be a true asset to your team.',
  },
  {
    linkedinUrl: '',
    name: 'Povilas Nanevičius',
    position: 'Mainframe Engineer at Rocket Software',
    imageUrl: `/reviewers/1578655726413.jpeg`,
    id: 3,
    message: `I know Karolis was in his element in Reactjs: researching, delivering latest and greatest Reactjs UI in his work, spending free time rewriting Three.js games with React components, building web apps.
    Full of energy, efficient, right on the point. Looking forward to working (and having lunch time IT discussions) with you again!`,
  },
  {
    linkedinUrl: '',
    name: 'Nando Mogollon',
    position: 'Founder and Director at BuilDigital',
    imageUrl: `/reviewers/1600770423042.jpeg`,
    id: 4,
    message: `I had the opportunity to work with Karolis from 2016 to 2019 while he was in Australia. I can attest he is a highly motivated, committed and responsible individual. Working with him gives you the confidence that work is going to be done and to the best standard.
    He would be a tremendous asset for you to hire or to get his services as a highly qualified professional.`,
  },
  {
    linkedinUrl: '',
    name: 'Cathal McAliskey',
    position: 'Lead IT Consultant at GemPool Recruitment',
    imageUrl: `/reviewers/1631633235263.jpeg`,
    id: 5,
    message: `Karolis is the consummate professional. Highly personable, excellent communication skills, dedicated and technically astute. Along with all that he is a nice guy.`,
  },
  {
    linkedinUrl: '',
    name: 'Orla Lewis',
    position: 'Product Design Manager at Irish Life',
    imageUrl: `/reviewers/1645312108470.jpeg`,
    id: 6,
    message: `Karolis worked as a react developer with my UX team. He was instrumental in building and developing our design system, a first for the company. I found him to be highly skilled and knowledgeable and an expert in his field. He is a strong communicator and diligent in his work. I highly recommend Karolis and hope to work with him again in the future. `,
  },
];

function RecommendationList() {
  return (
    <SimpleGrid columns={[1, 2]} pb={[7, 0]}>
      {recomendations.map((item, index) => {
        const showBorder = index % 2 === 0;
        const isLast = recomendations.length - 1 === index;
        return (
          <Stack
            key={item.id}
            isInline
            spacing={[5]}
            borderRightWidth="0.5px"
            borderBottomWidth={[isLast ? 0 : '0.5px']}
            borderRightColor={showBorder ? 'gray.600' : 'transparent'}
            borderBottomColor={'gray.600'}
            pr={[2, showBorder ? 14 : 0]}
            pl={[0, !showBorder ? 14 : 0]}
            pb={[7, 14]}
            pt={[7, 14]}
          >
            <Stack spacing={10}>
              <Box>
                <Box pb={4}>
                  <Icon as={VscQuote} fontSize={['4xl', '6xl']} />
                </Box>
                <Box>
                  <Text fontSize={['sm', 'md']} fontWeight="light">
                    {item.message}
                  </Text>
                </Box>
              </Box>
              <HStack spacing={4}>
                <Center maxW="20" w="full" borderColor="white" borderWidth="4px" rounded="full" overflow="hidden">
                  <Img src={item.imageUrl} objectFit="cover" alt="picture of reviewer" />
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
          </Stack>
        );
      })}
    </SimpleGrid>
  );
}

function CompanyLogos() {
  return (
    <Stack isInline spacing={[5, 10]}>
      {companyList.map((item) => (
        <Box
          key={item.iconUrl}
          borderColor="white"
          borderWidth={['1px', '2px']}
          rounded={['md', 'xl']}
          overflow="hidden"
        >
          <Link href={item.companyUrl} isExternal>
            <Image src={item.iconUrl} alt="client logo" objectFit="contain" boxSize={[16, 20]} />
          </Link>
        </Box>
      ))}
    </Stack>
  );
}

const projectList = [
  {
    id: 1,
    title: 'POC Binary Options Trading Web App',
    imageUrl:
      'https://media-exp1.licdn.com/dms/image/C5603AQEmAjRMGwzMUw/profile-displayphoto-shrink_200_200/0/1554286352901?e=1637193600&v=beta&t=zbmO_2cV9vPnALWpx4Cdw7ecAHyuSzi6110Mzp7s58g',
  },
  {
    id: 1,
    title: 'POC Binary Options Trading Web App',
    imageUrl:
      'https://media-exp1.licdn.com/dms/image/C5603AQEmAjRMGwzMUw/profile-displayphoto-shrink_200_200/0/1554286352901?e=1637193600&v=beta&t=zbmO_2cV9vPnALWpx4Cdw7ecAHyuSzi6110Mzp7s58g',
  },
];

function ProjectList() {
  return (
    <Stack isInline spacing={[5, 10]}>
      {projectList.map((item) => (
        <Box key={item.id} p={10} bg="gray.700" rounded="md">
          <Text fontWeight="bold">{item.title}</Text>
        </Box>
      ))}
    </Stack>
  );
}
