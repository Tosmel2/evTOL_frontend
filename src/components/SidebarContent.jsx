import React from 'react';
import { NavLink } from "react-router-dom"
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Text,
} from '@chakra-ui/react';

import {
  FiTrendingUp,
  FiCompass,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';

import {
  RiDashboardLine,
} from 'react-icons/ri'
const LinkItems = [
  { name: 'DashboardItems', icon: RiDashboardLine, path: '/dashboard' },
  { name: 'Tracking', icon: FiTrendingUp, path: '/tracking' },
  { name: 'Shipments', icon: FiCompass, path: '/shipments' },
  { name: 'Settings', icon:FiSettings, path: '/settings' },
  { name: 'Logout', icon: FiLogOut, path: '/logout' },
];



const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('green.400', 'green.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 60, md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="white">
          <span style={{color:'#c7490e'}}>ADNEGS_evTOL</span>
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} color="white" />
      </Flex>
      {LinkItems.map((link) => (
        // link.name === 'Logout' ? (
        //   <NavItem key={link.name} icon={link.icon} onClick={() => localStorage.clear()}>
        //     {link.name}
        //   </NavItem>
        // ) : (
          
        <NavItem key={link.name} icon={link.icon}>
          <NavLink to={link.path}>{link.name}</NavLink>
        </NavItem>

      ))}
    </Box>
    
  );
};


const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color="white"
        fontSize="20"
        _hover={{
          bg: 'green.200',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};


export default SidebarContent