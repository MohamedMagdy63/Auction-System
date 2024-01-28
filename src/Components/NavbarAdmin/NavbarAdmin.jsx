import React, { useState } from 'react'
import {Settings} from '@material-ui/icons';
import { Fade } from "react-awesome-reveal";
import './NavbarAdmin.css'

export const NavbarAdmin = (props) => {
    const [clicked, setClicked] = useState(false)
    const handleSettingBar = () =>{
        clicked ? setClicked(false) : setClicked(true)
        props.system(clicked)
    }
  return (
      <Fade className='NavbarAdmin'>
        <div className="NavbarWrapper">
            <div className="leftSide">
            <div className="content">
                <h2>Dashboard</h2>
                <h2>Dashboard</h2>
            </div>
            </div>
            <div className="rightSide">
                <div className="NavbarIconContiner" onClick={()=>{handleSettingBar()}}>
                    <Settings/>
                </div>

                <img src={props.adminData.image} alt="" className="profileImage" />
            </div>
        </div>
    </Fade>
    
  )
}
