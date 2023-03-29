import Style from "../../styles/Overview.module.css"
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
import DataTable from "react-data-table-component"
import { columns, customStyles } from "../../data"
import { useEffect, useState } from "react"
import axios from "axios"

const Overview = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
    const [evtols, setEvtols] = useState([])
    
    
    
    const url = "https://evtol-app-y0kb.onrender.com/api/v1/evtol"
    
    useEffect(() => {
        axios.get(url)
        .then((res) => {
            console.log(res)
            const allEvtols = res.data.data
            setEvtols(allEvtols)
        }).catch(error => console.log(error.message))
    }, []);
    
    console.log(evtols)
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
      <MobileNav onOpen={onOpen} navTitle= {'Welcome Admin'}/>
      <Box ml={{ base: 0, md: 60 }}p="1">
        {children}
      </Box>

      <div className={Style.hero}>
            <div className={Style.statWrapper}>
                <div className={Style.stat}>
                    <h1>{evtols.length}</h1>
                    <p>Total eVTOL</p>
                </div>
                <div className={Style.stat}>
                    <h1>{evtols.filter(et => et.state === "LOADING").length}</h1>
                    <p>Loading eVTOL</p>
                </div>
                <div className={Style.stat}>
                    <h1>{evtols.filter(et => et.batteryCapacity <= 25).length}</h1>
                    <p>Inactive eVTOL</p>
                </div>
                <div className={Style.stat}>
                    <h1>{evtols.filter(et => et.batteryCapacity > 25 && et.state === "IDLE").length}</h1>
                    <p>Available eVTOL</p>
                </div>
            </div>

            <div className={Style.statTableWrapper}>
                <h1>All eVTOLs</h1>
                <div className={Style.statTable}>
                        <DataTable
                            pagination
                            // responsive
                            columns={columns}
                            data={evtols}
                            
                            customStyles={customStyles}
                        />
                </div>
            </div>
        </div>


    </Box>
    </Flex>

        
    </>

}

export default Overview