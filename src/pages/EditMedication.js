import Style from "../styles/Form.module.css";
import {
    Box,
    Flex,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
  //   Text
  } from '@chakra-ui/react';
  
  import SidebarContent from "../components/SidebarContent";
  import MobileNav from '../components/MobileNav';
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const EditMedication = ({
    children,
  }) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const[status, setStatus] = useState(true)
    const[id, setId] = useState()
    const [evtol, setEvtol] = useState({
        weight: "",
        model: ""
    })
    const[medication, setMedication] = useState({
        medicationName: "",
        medicationCode: "",
        medicationPicture: "",
        weight: "",
        quantity: "",
        evtol: ""
    })
    const navigate = useNavigate()
    const url = `https://evtol-app-y0kb.onrender.com/api/v1/medications/editmedication/${id}`
    // const url2 = `https://evtol-app-y0kb.onrender.com/api/v1/medications/finbyid/${Cookies.get("MED_ID")}`

    useEffect(() => {
        setMedication({medicationPicture: Cookies.get("MED_CODE")})
        const url2 = window.location.href.split("/")
        setMedication({medicationCode: url2.pop(), medicationName: url2.pop()})
        setId(url2.pop())

        axios.all([
            axios.get(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/evtolinuse`, {headers: {Authorization: `Bearer ${Cookies.get("TOKEN")}`}})
        ])
        .then(axios.spread((res) => {
            setEvtol({weight: res.data.data[0].weight, model: res.data.data[0].model})
            console.log(res.data.data[0])
        }))
        .catch(err => console.log(err.message))
        
        
        
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus(false)
        
        if(medication["quantity"] * medication["weight"] > evtol.weight){
            setStatus(true)
            return Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: `Evtol's weight limit is ${evtol.weight}gr`
            })
        }

        if(Cookies.get("TWEIGHT")){
            if((parseFloat(Cookies.get("TWEIGHT")) + parseFloat((medication["quantity"] * medication["weight"]))) > evtol.weight){
                setStatus(true)
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: `Weight left in evtol is ${evtol.weight - Cookies.get("TWEIGHT")}gr`
                })
            }
        }

        const formdata = new FormData()
        formdata.append("medicationName", medication["medicationName"])
        formdata.append("medicationCode", medication["medicationCode"])
        formdata.append("medicationPicture", medication["medicationPicture"])
        formdata.append("weight", medication["weight"])
        formdata.append("quantity", medication["quantity"])
        formdata.append("evtol", Cookies.get("EVTOL_ID"))

        axios.put(url, formdata, {
            headers: {
                Authorization: `Bearer ${Cookies.get("TOKEN")}`
            }
        }).then((res) => {
            if(res.data.status === "error"){
                setStatus(true)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: res.data.message
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: "Medication Edited Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    setStatus(true)
                    
                    setMedication({
                        medicationName: "",
                        medicationCode: "",
                        medicationPicture: null,
                        weight: "",
                        quantity: "",
                        evtol: ""
                    })
                    navigate("/viewshipments")
                }, 1500)
            }
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
        <MobileNav onOpen={onOpen} navTitle= {'Edit Medication'}/>
        <Box ml={{ base: 0, md: 60 }}p="1">
            {children}
        </Box>

        <div className={Style.formWrapper}>
                <form action="" method="put" onSubmit={(e) => handleSubmit(e)}>
                    <div className={Style.inputWrapper}>
                        <label htmlFor="model">Medication Name:</label>
                        <input type="text" name="" id="" value = {medication["medicationName"]} onChange={(e) => setMedication({...medication, medicationName: e.target.value})} disabled = {!status ? true : false} required/>
                    </div>
                    <div className={Style.inputWrapper}>
                        <label htmlFor="battery">Medication Code:</label>
                        <input type="text" name="" id=""  value = {medication["medicationCode"]} onChange={(e) => setMedication({...medication, medicationCode: e.target.value})} disabled = {!status ? true : false} required/>
                    </div>
                    <div className={Style.inputWrapper}>
                        <label htmlFor="wlimit">Image:</label>
                        <input type="file" name="" id=""   filename = {medication["medicationPicture"]} onChange={(e) => setMedication({...medication, medicationPicture: e.target.files[0]})} disabled = {!status ? true : false} required/>
                    </div>
                    <div className={Style.inputWrapper}>
                        <label htmlFor="wlimit">Weight per Medication:</label>
                        <input type="number" name="" id=""  value = {medication["weight"]} onChange={(e) => setMedication({...medication, weight: e.target.value})} disabled = {!status ? true : false} required/>
                    </div>
                    <div className={Style.inputWrapper}>
                        <label htmlFor="wlimit">Quantity:</label>
                        <input type="number" name="" id=""  value = {medication["quantity"]} onChange={(e) => setMedication({...medication, quantity: e.target.value})} disabled = {!status ? true : false} required/>
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

export default EditMedication





















