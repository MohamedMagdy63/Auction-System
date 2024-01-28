import React, { useEffect } from 'react'
import swal from 'sweetalert';
import './SettingBar.css'
import facebook from '../../assists/images/facebook.png'
import tiwitter from '../../assists/images/icons8-twitter-100.png'
import instagram from '../../assists/images/instagram.png'
import whatsapp from '../../assists/images/whatsapp.png'
import lightMode from '../../assists/images/Sun.png'
import darktMode from '../../assists/images/Moon.png'
import Stars from '../../assists/images/Stars.jpg'
import Sky from '../../assists/images/Sky.jpg'
import powerOff from '../../assists/images/Power_Off.png'
import removeCookies from '../../controller/moduls/removeCookies'
import { Calender } from '../../SubComponents/calender/Calender';

export const SettingBar = (props) => {
  const handleLogOut = () =>{
    removeCookies('roll')
    removeCookies('username')
    swal("Bye Bye!", `You have successfully logged out`, "success", {button: false})
    setTimeout(() => {
      window.location.href = '/'
  }, 1500);
  }
  const handleSettingBar = () =>{
    const settingBar = document.querySelector('.settingBar')
    props.toggleBar ? settingBar.classList.remove('activeBar') : settingBar.classList.add('activeBar')
  }
  const handleDarkMode = ()=>{
    document.body.classList.toggle('dark');
    document.querySelector('.cit').classList.toggle('lightmode')
    if(document.body.classList.contains('dark')){
      // document.querySelector('#taggoleTitle').innerHTML = 'Dark Mode';
      document.querySelector('#modeIcon').src = darktMode;
      document.querySelector('#btnBackground').src = Stars;
    }else{
      // document.querySelector('#taggoleTitle').innerHTML = 'Light Mode';
      document.querySelector('#modeIcon').src = lightMode;
      document.querySelector('#btnBackground').src = Sky;
    }
  }
  useEffect(()=>{
    handleSettingBar();
  })
  return (
    <div className='settingBar'>
       <Calender/>
       <div className="sittingContiner">

       <div className="toggleBtnBody">
          <div className="taggleBtn">
            <img id='btnBackground' src={Sky} alt="" />
            <div className="cit" onClick={()=>{handleDarkMode()}}>
              <img id='modeIcon' src={lightMode} alt="" />
            </div>
            {/* <span id='taggoleTitle'>Light Mode</span> */}
          </div>
       </div>
       <div className="logoutBtn" onClick={()=>{handleLogOut()}}><img src={powerOff} alt="" /></div>

       </div>
       <div className="footer">
          <div className='social-icon'>
            <a href="#"><img src={facebook} alt="facebook" /></a>
            <a href="#"><img src={tiwitter} alt="tiwitter" /></a>
            <a href="#"><img src={instagram} alt="instagram" /></a>
            <a href="#"><img src={whatsapp} alt="whatsapp" /></a>
          </div>
       </div>
    </div>
  )
  
}
