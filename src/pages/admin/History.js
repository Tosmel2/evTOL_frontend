import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
//   Text
} from '@chakra-ui/react';

import SidebarContent from '../../components/SidebarContent';
import MobileNav from '../../components/MobileNav';
import DataTable from "react-data-table-component";
import Style from "../../styles/Overview.module.css"
import { historyColumns, customStyles } from "../../data";
import { useState, useEffect } from "react";
import axios from "axios";

const History = ({
  children,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [history, setHistory] = useState([])

    
    useEffect(() => {
        axios.get(`https://evtol-app-y0kb.onrender.com/api/v1/history/gethistory`)
        .then((res) => {
            console.log(res)
            const allhistory = res.data.data
            setHistory(allhistory)
        }).catch(error => console.log(error.message))
    }, []);

    return<>
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
      <MobileNav onOpen={onOpen} navTitle= {'History'}/>
      <Box ml={{ base: 0, md: 60 }}p="1">
        {children}
      </Box>

      <div className={Style.hero}>
            <DataTable
                pagination
                // responsive
                columns={historyColumns}
                data={history}
                
                customStyles={customStyles}
            />
        </div>

    </Box>
    </Flex>
    </>

}

export default History