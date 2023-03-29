import {
  // Flex,
  // Stack,
  // Heading,
  // // Text,
  // useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import Swal from "sweetalert2"
import "../styles/signup.css"
// import Cookies from "js-cookie"


export default function Login() {
  const [status, setStatus] = useState(true)
  const[user, setUser] = useState({
      email: "",
      password: ""
  })
  // let navigate = useNavigate();
  const [type , setType] = useState({visible: false, input:"password"});
  function tooglePassword() {
    setType((value)=>{
      return {
        ...value,
        visible : !value.visible,
        input : !value.visible ? "text" : "password"
      }
    })
  } 


    let navigate = useNavigate()
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
    
        <div className='signup-form-container'>
          <div className='login-heading'>
            <h1 >Login your Account
          </h1>
          <p>Don't have an account? <NavLink to="/register" style={{color:'#47B977'}}>Create one</NavLink></p>
          </div>
        
        <form action="" method="POST" onSubmit={(e) => handleSubmit(e)} className='reg-form'>
          <div className='input-box'>
          <label>Email Address</label>
            <input type="email" value = {user["email"]} onChange={(e) => setUser({...user, email: e.target.value})} placeholder='Enter Email' disabled = {!status ? true : false}/>
          </div>
          <div className='input-box'>
            <label>Password</label>
            <input type={type.input} value = {user["password"]} onChange={(e) => setUser({...user, password: e.target.value})} placeholder='Enter Password' />
            <i className={`show-btn ${type.visible ? "fas fa-eye" : "fas fa-eye-slash"}`} onClick={tooglePassword}></i>
          </div>
          
          <div className='input-box'>
            <button className='signup-btn' onClick={()=>navigate('/dashboard')}>Login</button>
          </div>
          {/* <div>
            <p>Already have an account ? <span style={{color:'#47B977', cursor:'pointer', fontWeight:'bold'}} onClick={()=>navigate('/login')}>Login</span></p>
          </div> */}
        </form>
      </div>
    //   </Stack>
    // </Flex>
  );
}