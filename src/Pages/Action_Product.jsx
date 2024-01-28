import React from 'react'
import { ProductCards } from '../Components/productCards/ProductCards'
import Announcement from '../Components/Announcement/Announcement';
import Navbar from '../Components/Navbar/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import { useState } from 'react';

const Action_Product = (props) => {
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
        <ProductCards/>
    </div>
  )
}

export default Action_Product