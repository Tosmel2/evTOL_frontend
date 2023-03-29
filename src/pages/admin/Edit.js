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
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";

const Edit = ({
  children,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setStatus ] = useState(true)
    const [redirecting, setRedirect] = useState(false)
    const [serialno, setSerialno] = useState("")
    const [id, setId] = useState("")
    const[evtol, setEvtol] = useState({
        weight: '',
        batteryCapacity: "",
        state: ''
    })
    
    const url1 = `https://evtol-app-y0kb.onrender.com/api/v1/evtol/${serialno}`
    const url2 = `https://evtol-app-y0kb.onrender.com/api/v1/evtol/edit/${id}`
 
    const submitSerial = (e) => {
      e.preventDefault()
      setStatus(false)

      axios.post(url1)
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
                // text: "Login Successfull",
                showConfirmButton: false,
                timer: 1000
            });
            setEvtol({model: res.data.data.model, weight: res.data.data.weight, batteryCapacity: res.data.data.batteryCapacity, state: res.data.data.state})
            setId(res.data.data._id)
            setTimeout(() => {
              setSerialno("")
                setRedirect(true);
                setStatus(true)
              }, 1000)
        }
        }).catch(error => {
            console.log(error.message) 
            setStatus(true)
        })
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(false)
        if(evtol["weight"] > 500){
            setStatus(true)
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Weight Limit exceeded"
              });
            }
            
        if(evtol["batteryCapacity"] < 25 && evtol["state"] === ("IDLE" || "LOADING" || "LOADED")){
          setStatus(true)
          return Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "eVTOL can not be used with a battery less than 25%"
            });

        }
        

        axios.put(url2, evtol)
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
                    text: "Evtol Edited Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                
                setTimeout(() => {
                  setStatus(true)
                  setRedirect(false)
                  setEvtol({
                      model: "",
                      weight: "",
                      batteryCapacity: "",
                      state: ""
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
      <MobileNav onOpen={onOpen} navTitle= {'Edit eVTOL'}/>
      <Box ml={{ base: 0, md: 60 }}p="1">
        {children}
      </Box>
      {
          !redirecting ?  

          <div className={Style.deleteWrapper}>
              <form action="" method="post" onSubmit={(e) => submitSerial(e)}>
                  <div className={Style.inputWrapper}>
                      <label htmlFor="model">Please enter the eVTOL's Serial Number:</label>
                      <input type="text" name="" id=""   onChange={(e) => setSerialno(e.target.value)}   value={serialno}  disabled={!status ? true : false} required/>
                  </div>
                  <button type="submit" className={status ? Style.button : Style.disabled} disabled={!status ? true : false} required>Submit</button>
              </form>
          </div>

          :

          <div className={Style.formWrapper}>
              <form action="" method="put" onSubmit={(e) => handleSubmit(e)}>
                  <div className={Style.inputWrapper}>
                      <label htmlFor="wlimit">Weight Limit:</label>
                      <input type="number" name="" id=""  onChange={(e) => setEvtol({...evtol, weight: e.target.value})}   value={evtol["weight"]}  disabled={!status ? true : false} required/>
                  </div>
                  <div className={Style.inputWrapper}>
                      <label htmlFor="battery">Battery capacity:</label>
                      <input type="number" name="" id=""  onChange={(e) => setEvtol({...evtol, batteryCapacity: e.target.value})}  value={evtol["batteryCapacity"]}  disabled={!status ? true : false} required/>
                  </div>
                  <div className={Style.inputWrapper}>
                      <label htmlFor="status">Status:</label>
                      <select name="" id="" onChange={(e) => setEvtol({...evtol, state: e.target.value})} value={evtol["state"]}  disabled={!status ? true : false} required>
                          <option value=""></option>
                          <option value="IDLE">IDLE</option>
                          <option value="LOADING">LOADING</option>
                          <option value="LOADED">LOADED</option>
                          <option value="DELIVERING">DELIVERING</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="RETURNING">RETURNING</option>
                          <option value="INACTIVE">INACTIVE</option>
                      </select>
                  </div>
                  <div className={Style.inputWrapper}>
                      <button type="submit" className={status ? Style.button : Style.disabled} disabled={!status ? true : false} required>{status ? "Submit" : "Loading..."}</button>
                  </div>
              </form>
          </div>
        }
    </Box>
    </Flex>
        


    </>

}

export default Edit