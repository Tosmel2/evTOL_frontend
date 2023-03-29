// import { Link } from "react-router-dom";
import { useState } from 'react';
// import { NavLink } from "react-router-dom"
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router"
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
// import '../signup/signup.css'
import "../styles/signup.css"


export default function SignUp() {
  const [status, setStatus] = useState(true)
  const[user, setUser] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: ""
  })
  let navigate = useNavigate();
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

  // https://evtol-app-y0kb.onrender.com
  // const [showPassword, setShowPassword] = useState(false);

  // const navigate = useNavigate()

  // const url = `https://localhost:8000/api/v1/users/register`
  const url = `https://evtol-app-y0kb.onrender.com/api/v1/users/register`

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(false)

    axios.post(url, user)
    .then((res) => {
        if(res.data.status === "error"){
            setStatus(true)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.data.message
            });
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "Account Creation Successful",
                showConfirmButton: false,
                timer: 1500
            });
              setTimeout(() => {
                  navigate("/signin");
              }, 1500)
        }
    }).catch(error => {
        console.log(error.message) 
        setStatus(true)
    })
}


  return (
    <>
      
      <div className='signup-form-container'>
     
        <h1 className='signup-heading'>Signup To Explore evTOL Services
        </h1>

        <form action="" method="POST" onSubmit={(e) => handleSubmit(e)} className='reg-form'>
 
          <div className='input-box'>
            <label>First Name</label>
            <input type="text" value = {user["firstname"]} onChange={(e) => setUser({...user, firstname: e.target.value})} placeholder='Enter First Name' />
          </div>
          <div className='input-box'>
            <label>Last Name</label>
            <input type="text" value = {user["lastname"]} onChange={(e) => setUser({...user, lastname: e.target.value})} placeholder='Enter Last Name' />
          </div>
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
            <button className='signup-btn' onClick={()=>navigate('/login')}>Sign Up</button>
          </div>
          <div>
            <p>Already have an account ? <span style={{color:'#DD6B20', cursor:'pointer', fontWeight:'bold'}} onClick={()=>navigate('/login')}>Login</span></p>
          </div>
        </form>
      </div>
    </>
    
  );
}