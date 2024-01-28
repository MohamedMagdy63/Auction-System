import React from 'react'
import SchadulingActionProduct from '../Components/SchadulingActionProduct/SchadulingActionProduct'
import Announcement from '../Components/Announcement/Announcement';
import Navbar from '../Components/Navbar/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import { useState } from 'react';


const ActionSchadulingPage = (props) => {
  window.scrollTo(0,0);
  const [sideBarOpen, setSideBarOpen] = useState('')
  return (
    <div>
      <Navbar sideBarAction = {setSideBarOpen} />
      <Announcement/>
      {props.userInformation ?
      <Sidebar sidebarUserData={props.userInformation} sideBarState = {sideBarOpen}/>
      :''
      }
      <SchadulingActionProduct/>
    </div>
  )
}

export default ActionSchadulingPage