import Style from "../styles/ViewShipments.module.css";
import { React, useState, useEffect } from 'react';
import Swal from "sweetalert2"
import axios from 'axios';
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
import {BiPlusCircle} from "react-icons/bi"
import DataTable from "react-data-table-component"
import { medcolumns, customStyles2 } from "../data"
import Cookies from "js-cookie";


import { useNavigate } from "react-router";
import {BiEditAlt} from "react-icons/bi"
import {MdDeleteForever} from "react-icons/md"

import ReactLoading from "react-loading";
import {GiCardboardBox} from "react-icons/gi"


const ViewShipments = ({
    children,
  }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [medications, setMedications] = useState([])
    const[empty, setEmpty] = useState(false)
    const[disabled, setDisabled] = useState(false)
    const [evtol, setEvtol] = useState({
        _id: "",
        serialno: "",
        weight: "",
        model: ""
    })
    const [status, setStatus] = useState(false)
    const [ready, setReady] = useState(false)
    const navigate = useNavigate()
    
    const clearmed = `https://evtol-app-y0kb.onrender.com/api/v1/medications/deleteall/${evtol._id}`

    useEffect(() => {
        axios.get(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/evtolinuse`, {headers: {Authorization: `Bearer ${Cookies.get("TOKEN")}`}})
        .then((res) => {
            setReady(true)
            console.log(res.data.data)
            setEvtol({_id: res.data.data[0]._id, serialno: res.data.data[0].serialno, weight: res.data.data[0].weight, model: res.data.data[0].model})
        })
        .catch(err => console.log(err.message))

        if(evtol._id !== ""){
            axios.get(`https://evtol-app-y0kb.onrender.com/api/v1/medications/getmedications/${evtol._id}`, {headers: {Authorization: `Bearer ${Cookies.get("TOKEN")}`}})
            .then((res2) => {
                setStatus(true)
                setMedications(res2.data.data)
            }).catch(err => console.log(err.message))
        }
        
        
        if(status && medications.length === 0){
            setEmpty(true)
            axios.all([
                axios.put(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/changestate/${evtol._id}`, {state: "IDLE"}),
                axios.put(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/clearuser/${evtol._id}`, {headers: {Authorization: `Bearer ${Cookies.get("TOKEN")}`}}),
                setEmpty(true)
            ]).catch(err => console.log(err.message))
            
        }
    }, [evtol._id, medications.length, status, evtol.model, ready])
    
    
    const editMed = (id, code, name) => {

        let weight = 0
        medications.map((data) => {
            return(
                weight += data.weight
            )
        })

        Cookies.set("TWEIGHT", weight)

        navigate(`/editmedications/${id}/${name}/${code}`)
    }

    const deleteMed = (id, code) => {
        Swal.fire({
            title: `Confirm delete of evtol ${code}`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://evtol-app-y0kb.onrender.com/api/v1/medications/delete/${id}`)
                .then((res) => {
                    if(res.data.status === "error"){
                      Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: res.data.message
                        });
                    }else{
                        Swal.fire(
                            'Deleted!',
                            'Medication has been deleted',
                            'success'
                            )
                            window.location.reload()
                    }
                }).catch(error => {
                    console.log(error.message) 
                })
            }
        })
    }

    const addmedlink = () => {
        let weight = 0
        medications.map((data) => {
            return(
                weight += (data.weight * data.quantity)
            )
        })

        Cookies.set("TWEIGHT", weight)

        if(Cookies.get("TWEIGHT") < evtol.weight){
            navigate("/addmedications")
        }else{
            return Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: `You have reached the evtol limit for adding medications ${evtol.weight}gr`
            })
        }
    }

    const deliverGoods = () => {
        let med = []
        medications.map((data) => {
            return(
                med.push(data.medicationCode + ", ")
            )
        })
        setDisabled(true)
        Swal.fire({
            title: 'Please Enter Delivery Address',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm:(address) => {
            //   try {
                    axios.post(`https://evtol-app-y0kb.onrender.com/api/v1/history`, {
                        evtolSerial: evtol.serialno,
                        medications: med,
                        date: Date.now(),
                        address: address
                    }).then((res) => {
                        console.log(res.data)

                        Cookies.remove("TWEIGHT")
                        
                
                        axios.put(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/changestate/${evtol._id}`, {state: "LOADING"})
                        .catch(err => console.log(err.message))

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: `Medications Request sent. Track your medications with number ${evtol.serialno}`,
                            showConfirmButton: true,
                        });
                        axios.delete(clearmed, {headers: {Authorization: `Bearer ${Cookies.get("TOKEN")}`}})
                        const evtolid = evtol._id
                        setTimeout(() => {
                            navigate("/dashboard")
                        }, 1000)
                
                        setTimeout(()=> {
                            axios.put(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/changestate/${evtolid}`, {state: "LOADED"}).catch(err => console.log(err.message))
                        }, 60000)
                        setTimeout(()=> {
                            axios.put(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/changestate/${evtolid}`, {state: "DELIVERING"}).catch(err => console.log(err.message))
                        }, 120000)
                        setTimeout(()=> {
                            axios.put(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/changestate/${evtolid}`, {state: "DELIVERED"}).catch(err => console.log(err.message))
                        }, 240000)
                        setTimeout(()=> {
                            axios.put(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/changestate/${evtolid}`, {state: "RETURNING"}).catch(err => console.log(err.message))
                        }, 300000)
                        setTimeout(()=> {
                            axios.put(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/changestate/${evtolid}`, {state: "IDLE"}).catch(err => console.log(err.message))
                        }, 420000)
                    }).catch(err => {
                        console.log(err)
                        setDisabled(false)
                    })
                // } catch (error) {
                //     // console.log(error)
                //     setDisabled(false)
                // }
            },
            allowOutsideClick: () => !Swal.isLoading()
          })

          setDisabled(false)
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
      <MobileNav onOpen={onOpen} navTitle= {'View Shipments'}/>
      <Box ml={{ base: 0, md: 60 }}p="1">
        {children}
      </Box>

      <div className={Style.hero}>
        {
            ready && !evtol._id ? 

                <div className={Style.emptyWrapper}>
                    <div className={Style.empty}>
                        <GiCardboardBox/>
                        <h3>No Pending Shipment Available</h3>
                    </div>
                </div>

            :
            !status ? 
                <div className={Style.loading}>
                    <ReactLoading type="bubbles" color="#0000FF"
                    height={100} width={50} />
                </div>

                :

            empty ?


                <div className={Style.emptyWrapper}>
                    <div className={Style.empty}>
                        <GiCardboardBox/>
                        <h3>No Pending Shipment Available</h3>
                    </div>
                </div>

                :

                <div className="wrap">
                    <div className={Style.heroHeading}>
                        <div className={Style.evtol}>
                            <h1>{evtol.serialno}</h1>
                            <p><span>Model: </span>{evtol.model}</p>
                            <p><span>Weight Limit: </span>{evtol.weight + "gr"}</p>
                        </div>
                        <button className={status ? Style.button : Style.disabled} onClick={() => deliverGoods()}>{!disabled ? "Send" : "Sending..."}</button>
                    </div>

                    <div className={Style.shipments}>
                        <div className={Style.heading}>
                            <h3>Medications</h3>
                            <BiPlusCircle onClick={() => addmedlink()}/>
                        </div>
                        <DataTable
                            pagination
                            responsive
                            columns={medcolumns}
                            data={medications.map((dat) => {
                                return(
                                    {
                                        medicationCode: dat.medicationCode,
                                        medicationName: dat.medicationName,
                                        medicationPicture: <img src={dat.medicationPicture} alt="Medication" style={{height: "50px", width: "50px", objectFit: "cover", backgroundPosition: "center", margin: "4px 0px", cursor: "pointer"}} onClick={() =>  window.open(dat.medicationPicture, "_blank")}/>,
                                        weight: dat.weight + "gr",
                                        quantity: dat.quantity,
                                        edit: <BiEditAlt style={{fontSize: "20px", cursor: "pointer"}} onClick={() => editMed(dat._id, dat.medicationCode, dat.medicationName)}/>,
                                        delete: <MdDeleteForever style={{fontSize: "20px", cursor: "pointer"}} onClick={() => deleteMed(dat._id, dat.medicationCode)}/>
                                    }
                                )
                            })}
                            customStyles={customStyles2}
                        />
                    </div>
                </div>
        }
        </div>


    </Box>
    </Flex>

        
    </>

}

export default ViewShipments