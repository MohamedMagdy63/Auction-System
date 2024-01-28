import React from 'react'
import './SidebarAdmin.css'
import {Links} from '../../assists/Data/PagePermision'
import { NavLink } from 'react-router-dom'
import { Slide } from "react-awesome-reveal";

export const SidebarAdmin = (props) => {
  return (
    <Slide className={props.reportPopupState ? 'SidebarAdmin displaySidebar' : 'SidebarAdmin'}>
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            {
              Links.map((link)=>{
                if(props.adminPermission.includes(link.mainTitle.toUpperCase())){
                return(
                  <div key={link.mainTitle}>
                    <div  className="sidebartitle">
                      {link.mainTitle}
                    </div>
                    <ul className='sidebarList'>
                      {
                        link.link.map((data)=>{
                          // console.log(permission)
                          // permission.includes(data.title.toUpperCase())
                        if(props.adminPermission.includes(data.title.toUpperCase())){
                          return(
                            <NavLink
                            to={data.type}
                            key={data.title}
                            end
                            className={({isActive})=>isActive ? 'sidebarListItem active' : 'sidebarListItem'}><span>{data.icon}</span>{data.title}</NavLink>
                          )
                        }
                      })
                      }
                    </ul>
                  </div>
                )
              }
              })
            }
          </div>
        </div>
    </Slide>
    
  )
}
