import React from 'react'
import Announcement from '../Components/Announcement/Announcement';
import Navbar from '../Components/Navbar/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import { useState , useEffect } from 'react';
import About from '../Components/About/About';

const AboutUs = (props) => {
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
        <About/>
    </div>
  )
}

export default AboutUs