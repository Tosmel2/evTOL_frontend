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
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";


const Settings = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setStatus ] = useState(true)
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")

    const name = Cookies.get("USERNAME")

    const url = `https://evtol-app-y0kb.onrender.com/api/v1/users/adminpassword/${name}`

    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus(false)
        if(password !== cpassword){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Password does not match"
            })
        }

        axios.put(url, {password: password})
        .then((res) => {
            if(res.data.status === "error"){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message
                })
                setStatus(true)
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: "Password Changed Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    setStatus(true)
                    setCpassword("")
                    setPassword("")
                }, 1500)
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
      <MobileNav onOpen={onOpen} navTitle= {'Settings'}/>
      <Box ml={{ base: 0, md: 60 }}p="1">
        {children}
      </Box>

      <div className={Style.settings}>
            <form action="" method="put" onSubmit={(e) => handleSubmit(e)}>
                <div className={Style.inputWrapper}>
                    <label htmlFor="wlimit">New Password:</label>
                    <input type="password" name="" id="psw" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!status ? true : false} required />
                </div>
                <div className={Style.inputWrapper}>
                    <label htmlFor="battery">Confirm Password:</label>
                    <input type="password" name="" id="cpsw" value={cpassword} onChange={(e) => setCpassword(e.target.value)} disabled={!status ? true : false} required />
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

export default Settings