import './Sidebar.css'
import {sidebarItems} from '../../assists/Data/Data'
import { NavLink } from 'react-router-dom'
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert'
import removeCookies from '../../controller/moduls/removeCookies'

const socket = io.connect("/")

const Sidebar = (props) => {
    const [val,setVal] = useState('Non')
    const [noteData,setNoteData] = useState()
    const handleLogOut = ()=>{
        removeCookies('roll')
        removeCookies('username')
        swal("Bye Bye!", `You have successfully logged out`, "success", {button: false})
        setTimeout(() => {
          window.location.href = '/'
        }, 1500);
    }
    const resFunction = ()=>{
        socket.on('JoinClient',(data)=>{
            if(props.sidebarUserData[0] !== undefined){
                if(data === props.sidebarUserData[0].CLINT_ID){
                    setVal('New message')
                }
            }
        })
    }
    useEffect(()=>{
        resFunction()
    },[])
  return (
    <div className={props.sideBarState ? 'sidebar sidebarOpen' : 'sidebar'}>
        <div className="werpper">
        <NavLink 
        to='/Setting'
        className='link'
        >
            {
                // console.log(props.sidebarUserData)
                props.sidebarUserData.length !== 0 ?
                <div className="userProfile">
                    <div className="userImg">
                        <img src={props.sidebarUserData[0].GENDER === 1 ?'/images/avaters/man.png':''} alt="" />
                    </div>
                    <div className="userInfo">
                        <h1>{props.sidebarUserData[0].USER_FIRST_LAST_NAME}</h1>
                        <p>{props.sidebarUserData[0].USER_EMAIL}</p>
                    </div>
                </div>
                :''
            }
            
        </NavLink>
        <div className="sidebarItemsContiner">
            {sidebarItems.map(item=>{
                return(
                    item.title === 'SIGNOUT' ? 
                    <>
                    <div className="logOutContiner">
                        <div className="sidebarIcon">
                            {item.icon}
                        </div>
                        <div className="sidebarTitle">
                            <div className='itemTitle' onClick={()=>{handleLogOut()}} >{item.title}</div>
                        </div>
                    </div>
                    </>
                    :
                    <NavLink 
                    to={item.link}
                    key={item.title}
                    end
                    className={({isActive})=>isActive ? 'sidebarItem active' : 'sidebarItem'}>
                        <div className="sidebarIcon">
                            {item.icon}
                        </div>
                        <div className="sidebarTitle">
                            <div className='itemTitle' >{item.title}</div>
                            {item.title === 'Pay Deposite'?
                                props.notificat !== '' ?
                                    val !== 'Non' || props.notificat !== 0 ?
                                    <>
                                        <div className='notification'>New massage</div>
                                    </>
                                    :
                                    <></>
                                :''
                            :''}
                        </div>
                        
                    </NavLink>
                )
            })}
        </div>
        </div>
    </div>
  )
}

export default Sidebar;