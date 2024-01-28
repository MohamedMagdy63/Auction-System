import './WidgetSmall.css'
import { Fade } from 'react-awesome-reveal'
import {RemoveRedEye} from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { newUser } from '../../assists/Data/AllUsersDataForAdmin';
import { NavLink } from 'react-router-dom';
const WidgetSmall = () => {
  const onesRun = useRef(true)
  const [user,setUser]= useState([])
  useEffect(()=>{
    if(onesRun.current){
      onesRun.current=false
      newUser().then((res)=>{
        setUser(res)
        console.log(res)
      })
    }
  },[])
  return (
    <Fade className='main'>
      <div className='widgetSmall'>
      <span className="widgetSmallTitle">New Member</span>
      <ul className='widgetSmallList'>
        {user.map((data)=>{
          return(
          <li className='widgetSmallItem'>
            <div className="widgetSmallUser">
              <span className="widgetSmallUsername">{data.userName}</span>
              <span className="widgetSmallJob">{data.email}</span>
            </div>
            <NavLink to={'/User/'+data.id}>
              <button className="widgetSmallBtn">
                <span><RemoveRedEye className='icon'/></span>Vision
              </button>
            </NavLink>
          </li>
          )
        })}
      </ul>
    </div>
    </Fade>
  )
}

export default WidgetSmall