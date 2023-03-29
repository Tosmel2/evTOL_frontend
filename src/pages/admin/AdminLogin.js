import Style from "../../styles/Login.module.css"
import { useState } from "react"
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router"
import Cookies from "js-cookie"

const AdminLogin = () => {
    const [admin, setAdmin] = useState({
        username: "",
        password: ""
    })
    const[status, setStatus] = useState(true)
    const navigate = useNavigate();

    const url = "https://evtol-app-y0kb.onrender.com/api/v1/users/admin_login"

    const handleSubimt = (e) => {
        e.preventDefault();
        setStatus(false)

        axios.post(url, admin)
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
                    text: "Login Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                Cookies.set("USERNAME", admin["username"])
                  setTimeout(() => {
                      navigate("/admin");
                  }, 1500)
            }
        }).catch(error => {
            console.log(error.message) 
            setStatus(true)
        })
    }

    return<>
        <div className={Style.wrapper}>
            <div className={Style.formWrapper}>
                <h1>Login</h1>
                <form action="" method="post"  onSubmit={(e) => handleSubimt(e)}>
                    <div className={Style.inputWrapper}>
                        <label htmlFor="email">Username:</label>
                        <input type="text" name="" id=""  value = {admin["username"]} onChange={(e) => setAdmin({...admin, username: e.target.value})} disabled={!status ? true : false}/>
                    </div>
                    <div className={Style.inputWrapper}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="" id=""   value = {admin["password"]} onChange={(e) => setAdmin({...admin, password: e.target.value})} disabled={!status ? true : false}/>
                    </div>
                    <div className={Style.inputWrapper}>
                        <button className={status ? Style.button : Style.disabled} disabled={!status ? true : false}>{status ? "Submit" : "Loading..."}</button>
                    </div>
                </form>
            </div>
        </div>
    </>

}

export default AdminLogin