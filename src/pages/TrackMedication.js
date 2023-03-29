import { React, useState } from 'react';
import Swal from "sweetalert2"
import axios from 'axios';
import Style from "../styles/Form.module.css"
import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
//   Text
} from '@chakra-ui/react';

import SidebarContent from '../components/SidebarContent';
import MobileNav from '../components/MobileNav';
// import DataTable from "react-data-table-component"
// import { columns, data, customStyles } from "../data"

const TrackMedication = ({
    children,
  }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [status, setStatus] = useState(true)
    const [serialno, setSerialno] = useState("")

    const handleSubimt = (e) => {
        e.preventDefault()
        setStatus(false)

        axios.post(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/${serialno}`)
        .then((res) => {
            console.log(res.data)
            if(res.data.status === "error"){
                setStatus(true)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message
                  });
            }else{
                setSerialno("")
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: `Evtol with ${serialno} is currently ${res.data.data.state}`
                })
                setStatus(true)
            }
            setSerialno("")
            setStatus(true)
        })
        .catch(err => {
            setStatus(true)
            console.log(err.message)
        })

    }
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
      <MobileNav onOpen={onOpen} navTitle= {'Track Medication'}/>
      <Box ml={{ base: 0, md: 60 }}p="1">
        {children}
      </Box>

      <div className={Style.deleteWrapper}>
            <form action="" method="delete" onSubmit={(e) => handleSubimt(e)}>
                <div className={Style.inputWrapper}>
                    <label htmlFor="model">Please enter the Serial Number of evtol:</label>
                    <input type="text" name="" id=""   onChange={(e) => setSerialno(e.target.value)}   value={serialno}  disabled={!status ? true : false} required/>
                </div>
                <div className={Style.inputWrapper}>
                <button type="submit" className={status ? Style.button : Style.disabled} disabled={!status ? true : false} required>{status ? "Submit" : "Loading..."}</button>
                </div>
            </form>
        </div>


    </Box>
    </Flex>

    </>

}

export default TrackMedication