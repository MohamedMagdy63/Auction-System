import React, { useEffect } from 'react'
import Announcement from '../Components/Announcement/Announcement';
import Navbar from '../Components/Navbar/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import MainCategoryOfSelling from '../Components/MainCategoryOfSelling/MainCategoryOfSelling'
import { useState } from 'react';

const Action_Product = (props) => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
    const [sideBarOpen, setSideBarOpen] = useState('')
  return (
    <div>
        <Navbar sideBarAction = {setSideBarOpen} />
        <Announcement/>
        {props.userInformation ?
        <Sidebar sidebarUserData={props.userInformation} sideBarState = {sideBarOpen}/>
        :''
        }
        <MainCategoryOfSelling/>
    </div>
  )
}

export default Action_Product