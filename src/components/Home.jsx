// import Head from 'next/head';
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Flex,
  // Icon,
  // useColorModeValue,
  // createIcon,
} from '@chakra-ui/react';

export default function CallToActionWithAnnotation() {
  return (
    <div className='hmbg'>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head> */}

      <Container maxW={'3xl'} >
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: 'xl', sm: '3xl', md: '5xl' }}
            color={'#fff'}
            lineHeight={'105%'}>
            Explore eVTOL Modern Transportation <br />
            <Text as={'span'} color={'#fff'}>
              Application
            </Text>
          </Heading>
          <Text color={'#fff'}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem at adipisci vero dicta nesciunt eveniet ullam consectetur? Explicabo ad necessitatibus eos nesciunt perferendis magni ipsam ab, nisi dignissimos provident corrupti, voluptatum quis!.
          </Text>
          <Flex
          align="center" justify="center">

          
          <Stack
            // direction={'column'}
            spacing={3}
            // align={'center'}
            // alignSelf={'center'}
            // position={'relative'}
            >
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              mr={5}
              _hover={{
                bg: 'green.500',
              }}>
              <Link to="/register">
                Get Started
              </Link>
            </Button>
            </Stack>
          <Stack
            // direction={'column'}
            spacing={3}
            mt={5}
            // align={'center'}
            // alignSelf={'center'}
            // position={'relative'}
            >
            <Button
              colorScheme={'green'}
              bg={'none'}
              border= {'1px solid green'}
              rounded={'full'}
              px={10}
              _hover={{
                bg: 'green.500',
                border: '1px solid #00ff00'
              }}>
              <Link to="/login">
                Login
              </Link>
            </Button>
            {/* <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button> */}
            <Box>
            </Box>
          </Stack>
          </Flex>
        </Stack>
      </Container>
    </div>
  );
}

