import React from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Text
} from '@chakra-ui/react';
// import Style from "../styles/Shipments.module.css";
import SidebarContent from '../components/SidebarContent';
import MobileNav from '../components/MobileNav';
import DataTable from "react-data-table-component"
import { columns, data, customStyles } from "../data"

const Shipments = ({
    children,
  }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return <>
        <Flex>
      <SidebarContent
        w="18%"
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
    <Box minH="100vh" w={{ base: '100%', md: "82%" }} ml="auto" bg={useColorModeValue('gray.100', 'gray.900')} style={{border: '2px solid blue'}}>
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
      <MobileNav onOpen={onOpen} navTitle= {'Shipments'}/>
      <Box ml={{ base: 0, md: 60 }}p="1">
        {children}
      </Box>

      {/* <div className={Style.hero}> */}
            <Text fontSize={{base: '16', md: '24'}} textAlign={['center' ]}>Today's Shipments</Text>
            <DataTable
                pagination
                responsive
                columns={columns}
                data={data}
                customStyles={customStyles}
            />
            
        {/* </div> */}


    </Box>
    </Flex>

    </>

}

export default Shipments