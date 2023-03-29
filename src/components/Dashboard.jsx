import React from 'react';
import {
  // IconButton,
  // Avatar,
  Box,
  // CloseButton,
  Flex,
  // HStack,
  // VStack,
  // Icon,
  useColorModeValue,
  // Link,
  Drawer,
  DrawerContent,
  // Text,
  useDisclosure,
  // Menu,
  // MenuButton,
  // MenuDivider,
  // MenuItem,
  // MenuList,
} from '@chakra-ui/react';
// import {
//   FiTrendingUp,
//   FiCompass,
//   FiSettings,
//   FiMenu,
//   FiBell,
//   FiChevronDown,
//   FiLogOut,
// } from 'react-icons/fi';

// import {
//   RiDashboardLine,
// } from 'react-icons/ri';
import SidebarContent from '../components/SidebarContent';
import MobileNav from '../components/MobileNav';
// import SidebarContent from './components/SidebarContent';



// const LinkItems = [
//   { name: 'Dashboard', icon: RiDashboardLine },
//   { name: 'Tracking', icon: FiTrendingUp },
//   { name: 'Shipments', icon: FiCompass },
//   { name: 'Settings', icon:FiSettings },
//   { name: 'Logout', icon: FiLogOut },
// ];

export default function SidebarWithHeader({
  children,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex>
      <SidebarContent
        w="18%"
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
    <Box minH="100vh" w={{ base: '100%', md: "82%" }} ml="auto" bg={useColorModeValue('gray.100', 'gray.900')} style={{border: '2px solid blue'}}>
      {/* <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      /> */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="2">
        {children}
      </Box>

      <h1>gggggggggggggggggggggggggggggg</h1>


    </Box>
    </Flex>
 
  );
};


// const SidebarContent = ({ onClose, ...rest }) => {
//   return (
//     <Box
//       transition="3s ease"
//       bg={useColorModeValue('green.400', 'green.900')}
//       borderRight="1px"
//       borderRightColor={useColorModeValue('gray.200', 'gray.700')}
//       w={{ base: 60, md: 60 }}
//       pos="fixed"
//       h="full"
//       {...rest}>
//       <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
//         <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="white">
//           ADNEGS_evTOL
//         </Text>
//         <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} color="white" />
//       </Flex>
//       {LinkItems.map((link) => (
//         // link.name === 'Logout' ? (
//         //   <NavItem key={link.name} icon={link.icon} onClick={() => localStorage.clear()}>
//         //     {link.name}
//         //   </NavItem>
//         // ) : (
          
//         <NavItem key={link.name} icon={link.icon}>
//           {link.name}
//         </NavItem>
//         // )
//       ))}
//     </Box>
//   );
// };


// const NavItem = ({ icon, children, ...rest }) => {
//   return (
//     <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
//       <Flex
//         align="center"
//         p="4"
//         mx="4"
//         borderRadius="lg"
//         role="group"
//         cursor="pointer"
//         color="white"
//         fontSize="20"
//         _hover={{
//           bg: 'green.200',
//           color: 'white',
//         }}
//         {...rest}>
//         {icon && (
//           <Icon
//             mr="4"
//             fontSize="16"
//             _groupHover={{
//               color: 'white',
//             }}
//             as={icon}
//           />
//         )}
//         {children}
//       </Flex>
//     </Link>
//   );
// };


// const MobileNav = ({ onOpen, ...rest }) => {
//   const firstname = localStorage.getItem('firstname');
//   return (
//     <Flex
//       boxShadow="lg"
//       // ml={{ base: 0, md: 60 }}
//       px={{ base: 4, md: 4 }}
//       height="20"
//       alignItems="center"
//       bg={useColorModeValue('white', 'gray.900')}
//       borderBottomWidth="1px"
//       borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
//       justifyContent={{ base: 'space-between', md: 'flex-end' }}
//       {...rest}>
//       <IconButton
//         display={{ base: 'flex', md: 'none' }}
//         borderColor='green.600'
//         color="green.400"
//         onClick={onOpen}
//         variant="outline"
//         aria-label="open menu"
//         icon={<FiMenu />}
//       />

//       <Text
//         display={{ base: 'flex', md: 'flex' }}
//         fontSize="xl"
//         fontFamily="monospace"
//         fontWeight="bold">
//         Welcome Back
//       </Text>

//       <HStack spacing={{ base: '0', md: '6' }}>
//         <IconButton
//           size="lg"
//           variant="ghost"
//           aria-label="open menu"
//           icon={<FiBell />}
//         />
//         <Flex alignItems={'center'}>
//           <Menu>
//             <MenuButton
//               py={2}
//               transition="all 0.3s"
//               _focus={{ boxShadow: 'none' }}>
//               <HStack>
//                 <Avatar
//                   size={'sm'}
//                   src={
//                     'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
//                   }
//                 />
//                 <VStack
//                   display={{ base: 'none', md: 'flex' }}
//                   alignItems="flex-start"
//                   spacing="1px"
//                   ml="2">
//                   <Text fontSize="sm">Justina Clark {firstname}</Text>
//                   <Text fontSize="xs" color="gray.600">
//                     User
//                   </Text>
//                 </VStack>
//                 <Box display={{ base: 'none', md: 'flex' }}>
//                   <FiChevronDown />
//                 </Box>
//               </HStack>
//             </MenuButton>
//             <MenuList
//               bg={useColorModeValue('white', 'gray.900')}
//               borderColor={useColorModeValue('gray.200', 'gray.700')}>
//               <MenuItem>Profile</MenuItem>
//               <MenuItem>Settings</MenuItem>
//               <MenuDivider />
//               <MenuItem>Sign out</MenuItem>
//             </MenuList>
//           </Menu>
//         </Flex>
//       </HStack>
//     </Flex>
//   );
// };