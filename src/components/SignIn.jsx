import Style from "../styles/Login.module.css"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  // Button,s
  Heading,
  // Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import Swal from "sweetalert2"
// import Cookies from "js-cookie"


export default function SimpleCard() {
  const [status, setStatus] = useState(true)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const url = `https://evtol-app-y0kb.onrender.com/api/v1/users/login`

    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus(false)

        axios.post(url, user)
        .then((res) => {
            if(res.data.status === "error"){
                setStatus(true)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: res.data.message
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: "Login Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                // Cookies.set("TOKEN", res.data.data.token, {expires: 1})
                // Cookies.set("ID", res.data.data.findUser._id)
                // console.log(res.data.data.findUser._id)
                // console.log(Cookies.get("TOKEN"))
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500)
            }
        }).catch(err => {
            console.log(err.message)
            setStatus(true)
        })
    }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.100', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <p>Don't have an account? <NavLink to="/signup" style={{color:'#47B977'}}>Create an Account</NavLink></p>
        </Stack>
        <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value = {user["email"]} onChange={(e) => setUser({...user, email: e.target.value})} disabled = {!status ? true : false} required/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value = {user["password"]} onChange={(e) => setUser({...user, password: e.target.value})} disabled = {!status ? true : false} required/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'green.400'}>Forgot password?</Link>
              </Stack>
              <div className={Style.inputWrapper}>
                  <button type="submit" className={status ? Style.button : Style.disabled} disabled={!status ? true : false} required>{status ? "Submit" : "Loading..."}</button>
              </div>
              {/* <Button
              loadingText="Loading"
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}>
                Sign in
              </Button> */}
            </Stack>
          </Stack>
        </Box>
        </form>
      </Stack>
    </Flex>
  );
}