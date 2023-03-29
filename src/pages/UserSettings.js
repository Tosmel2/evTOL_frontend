import { React, useState } from 'react';
import Swal from "sweetalert2"
import axios from 'axios';
import Cookies from "js-cookie";
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


const UserSettings = ({
    children,
  }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setStatus ] = useState(true)
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: ""
    })


    const pswurl = `https://evtol-app-y0kb.onrender.com/api/v1/users/updatepassword`
    const deturl = `https://evtol-app-y0kb.onrender.com/api/v1/users/update`

    const changePassword = (e) => {
        e.preventDefault()
        setStatus(false)
        if(password !== cpassword){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Password does not match"
            })
        }

        axios.put(pswurl, {password: password}, {
            headers: {
                Authorization: `Bearer ${Cookies.get("TOKEN")}`
            }
        })
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus(false)

        axios.put(deturl, user, {
            headers: {
                Authorization: `Bearer ${Cookies.get("TOKEN")}`
            }
        })
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
                    text: "Profile Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    setStatus(true)
                    setUser({
                        firstname: "",
                        lastname: "",
                        email: ""
                    })
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
    <Box minH="100vh" w={{ base: '100%', md: "82%" }} ml="auto" bg={useColorModeValue('gray.100', 'gray.900')}>
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
      <MobileNav onOpen={onOpen} navTitle= {'User Settings'}/>
      <Box ml={{ base: 0, md: 60 }}p="1">
        {children}
      </Box>

      <div className={Style.settings}>
        
            <div className={Style.profile}>
                <h2>User Profile</h2>
                <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
                    <div className={Style.inputWrapper}>
                        <label htmlFor="wlimit">Firstname:</label>
                        <input type="text" name="" id=""  value={user["firstname"]} onChange={(e) => setUser({...user, firstname: e.target.value})} disabled={!status ? true : false} required />
                    </div>
                    <div className={Style.inputWrapper}>
                        <label htmlFor="battery">Lastname:</label>
                        <input type="text" name="" id=""  value={user["lastname"]} onChange={(e) => setUser({...user, lastname: e.target.value})} disabled={!status ? true : false} required />
                    </div>
                    <div className={Style.inputWrapper}>
                        <label htmlFor="battery">Email Address:</label>
                        <input type="email" name="" id=""  value={user["email"]} onChange={(e) => setUser({...user, email: e.target.value})} disabled={!status ? true : false} required />
                    </div>
                    <div className={Style.inputWrapper}>
                        <button type="submit" className={status ? Style.button : Style.disabled} disabled={!status ? true : false} required>{status ? "Submit" : "Loading..."}</button>
                    </div>
                </form>
            </div>

            <div className={Style.password}>
                <h2>Change Password</h2>
                <form action="" method="put" onSubmit={(e) => changePassword(e)}>
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
        </div>


    </Box>
    </Flex>
        
    </>

}

export default UserSettings