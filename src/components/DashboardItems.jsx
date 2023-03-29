import { useState, useEffect } from "react";
import {
    Box,
    Flex,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
  //   Text
  } from '@chakra-ui/react';
  
  import SidebarContent from './SidebarContent';
  import MobileNav from './MobileNav';
import Style from "../styles/Dashboard.module.css"
import {GiCardboardBox} from "react-icons/gi"
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

const DashboardItems = ({
    children,
  }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const[status, setStatus] = useState(false)
    const [evtols, SetEvtols] = useState([])
    const[name, setName] = useState("")
    const[userid, setId] = useState("")
    

    const url = `https://evtol-app-y0kb.onrender.com/api/v1/evtol/available`;
    const url2 = `https://evtol-app-y0kb.onrender.com/api/v1/users/specificUser`;
    
    
    useEffect(() => {
        axios.all([
            axios.get(url),
            axios.get(url2, {headers: {Authorization: `Bearer ${Cookies.get("TOKEN")}`}})

        ])
        .then(axios.spread((res, res2) => {
            if(res.data.status === "error"){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message
                });
            }else{
                SetEvtols(res.data.data)
                setName(res2.data.data.firstname + " " + res2.data.data.lastname)
                setId(res2.data.data._id)
                console.log(res2.data.data)
                setStatus(true)
                // evtols.length === 0 ? SetEvtol(false) : SetEvtol(true)
            }
        }))
    }, [url, url2])


    const setUser = (id) => {
        axios.put(`https://evtol-app-y0kb.onrender.com/api/v1/evtol/user/${id}`, {user: userid},{
            headers: {
                Authorization: `Bearer ${Cookies.get("TOKEN")}`
            }
        }).then(res => {
            console.log(res.data)
            console.log(userid)
        })
        .catch(err => console.log(err.message))
    }

    return <>
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
      <MobileNav onOpen={onOpen} navTitle= {`Welcome ${name}`}/>
      <Box ml={{ base: 0, md: 60 }}p="1">
        {children}
      </Box>

      <div className={Style.hero}>
            {
                !status ? 
                <div className={Style.loading}>
                    <ReactLoading type="bubbles" color="#00FF00"
                    height={100} width={50} />
                </div>

                :

                evtols.length === 0 ? 
                <div className={Style.emptyWrapper}>
                    <div className={Style.empty}>
                        <GiCardboardBox/>
                        <h3>No Available evtols</h3>
                    </div>
                </div>

                : 
                

                <div className={Style.cardWrapper}>
                {
                    evtols.map((data, index) => {
                        return(
                            <div className={Style.evtolCard} key={index}>
                                <div className={Style.head}>
                                    <h3>{data.serialno}</h3>
                                    <div className={Style.content}>
                                        <p><span>Model:</span> {data.model}</p>
                                        <p><span>Weight Limit:</span> {data.weight}gr</p>
                                    </div>
                                </div>
                                <NavLink to = "/addmedications" onClick={() => setUser(data._id)}>
                                    <button>Use</button>
                                </NavLink>
                            </div>
                        )
                    })
                }
                    
                </div>
            }
        </div>


    </Box>
    </Flex>
      

    </>

}

export default DashboardItems