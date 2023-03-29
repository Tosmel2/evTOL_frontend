import Style from "../../styles/Form.module.css";
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
import axios from "axios";
import { React, useState } from "react";
import Swal from "sweetalert2";


const Add = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
        const [status, setStatus] = useState(true)
        const[evtol, setEvtol] = useState({
            serialno: "",
            weight: '',
            batteryCapacity: 100
        })

    const url = "https://evtol-app-y0kb.onrender.com/api/v1/evtol/register"
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(false)
        
        if(evtol["weight"] > 500){
            setStatus(true)
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Weight Limit should not exceed 500"
              });
        }

        
        axios.post(url, evtol)
        .then((res) => {
            if(res.data.status === "error"){
                setStatus(true)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message
                  });
                  console.log(res)
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: "Evtol Added",
                    showConfirmButton: false,
                    timer: 1500
                });
                setStatus(true)
                setEvtol({
                    serialno: "",
                    model: "",
                    weight: "",
                    batteryCapacity: ""
                })
                console.log(res)
            }
        }).catch(error => {
            console.log(error.message) 
            setStatus(true)
        })
    }


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
      <MobileNav onOpen={onOpen} navTitle= {'Add eVTOL'}/>
      <Box ml={{ base: 0, md: 60 }}p="1">
        {children}
      </Box>

      <div className={Style.formWrapper}>
            <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
                <div className={Style.inputWrapper}>
                    <label htmlFor="model">Please enter the Serial No:</label>
                    <input type="text" name="" id="" value={evtol["serialno"]} onChange={(e) => setEvtol({...evtol, serialno: e.target.value})} required  disabled={!status ? true : false}/>
                </div>
                <div className={Style.inputWrapper}>
                    <label htmlFor="wlimit">Weight Limit:</label>
                    <input type="number" name="" id="" value={evtol["weight"]} onChange={(e) => setEvtol({...evtol, weight: e.target.value})}/>
                </div>
                <div className={Style.inputWrapper}>
                    <button type="submit"  className={status ? Style.button : Style.disabled} disabled={!status ? true : false}>{status ? "Submit" : "Loading..."}</button>
                </div>
            </form>
        </div>


    </Box>
    </Flex>
        
    </>

}

export default Add