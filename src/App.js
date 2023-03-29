import React from 'react';
import './App.css';
// import '.src/App.css';

import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/Home';
// import SidebarWithHeader from './components/SidebarWithHeader';
import DashboardItems from './components/DashboardItems';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AdminLogin from './pages/admin/AdminLogin';
import Edit from './pages/admin/Edit';
import Overview from './pages/admin/overview';
import Add from './pages/admin/Add';
import Delete from './pages/admin/Delete';
import Settings from './pages/admin/Settings';
import Dashboard from './components/Dashboard';
import Shipments from '././pages/Shipments';
import ViewShipments from './pages/ViewShipments';
import AddMedications from './pages/AddMedications';
import EditMedication from './pages/EditMedication';
import UserSettings from './pages/UserSettings';
import Tracking from './pages/TrackMedication';
import History from './pages/admin/History';
// import History from './././pages/History';


// import Shipments from "./pages/Shipments";

function App() {
  return (

    <ChakraProvider theme={theme}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<DashboardItems />}/>

      <Route path = "/admin_login" element = {<AdminLogin />}/>
        <Route path = "/admin/edit" element = {<Edit/>}/>
        <Route path = "/admin" element = {<Overview/>}/>
        <Route path = "/admin/add" element = {<Add/>}/>
        <Route path = "/admin/delete" element = {<Delete/>}/>
        <Route path = "/admin/settings" element = {<Settings/>}/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>
        <Route path = "/shipments" element = {<Shipments/>}/>
        <Route path = "/viewshipments" element = {<ViewShipments/>}/>
        <Route path = "/addmedications" element = {<AddMedications/>}/>
        <Route path = "/editmedications/:id/:name/:code" element = {<EditMedication />}/>
        <Route path = "/settings" element = {<UserSettings/>}/>
        <Route path = "/tracking" element = {<Tracking/>}/>
        <Route path = "/history" element = {<History/>}/>
      {/* <Route path="/dashboard" element={<SidebarWithHeader />}/> */}
    </Routes>
    </BrowserRouter>
    
    </ChakraProvider>
  );
}

export default App;
