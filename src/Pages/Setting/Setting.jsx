import React, { useEffect, useRef, useState } from 'react';
import './Setting.css'
import { Person, CalendarToday, PhoneAndroid, Email, LocationSearching, Publish } from '@material-ui/icons'

import Navbar from '../../Components/Navbar/Navbar';
import Announcement from '../../Components/Announcement/Announcement';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Footer from '../../Components/Footer/Footer';
import { userSpacificData } from '../../controller/moduls/getUserData';
import { updataUserData } from '../../controller/moduls/UpdateModule';
import swal from 'sweetalert';
const Setting = (props) => {
    const [sideBarOpen, setSideBarOpen] = useState('')
    const [userData, setUserData] = useState([])
    const oneRun = useRef(true)

    // Field Data
    const [userFirstName,setUserFirstName] = useState('') 
    const [userEmail,setUserEmail] = useState('') 
    const [userPhone1,setUserPhone1] = useState('') 
    const [userPhone2,setUserPhone2] = useState('') 
    const [userAddress,setUserAddress] = useState('') 
    useEffect(()=>{
      if(oneRun.current){
        oneRun.current = false
        userSpacificData().then((userData)=>{
          console.log(userData)
          setUserData(userData)
        })
      }
    },[])

    const handelUserFullName = (e)=>{
      setUserFirstName(e.target.value)
    }
    const handelUserEmail = (e)=>{
      setUserEmail(e.target.value)
    }
    const handelPhone1 = (e)=>{
      setUserPhone1(e.target.value)
    }
    const handelPhone2 = (e)=>{
      setUserPhone2(e.target.value)
    }
    const handelUserAddress = (e)=>{
      setUserAddress(e.target.value)
    }
    const handelUpdateUserData = ()=>{
        updataUserData(userFirstName,userEmail,userAddress,userPhone1,userPhone2).then((state)=>{
          if(state[0] === 'SUCCESSED'){
            swal("Done!", `Sccessfull Update`, "success", {button: false})
            setTimeout(() => {
                window.location.href = '/Setting'
            }, 2000);
          }
        })
    }


    return (
        <>
        <Navbar sideBarAction = {setSideBarOpen} />
            <Announcement/>
            <Sidebar sidebarUserData={props.userInformation} sideBarState = {sideBarOpen}/>
        {
          userData.length !== 0 ?
          <div className='user'>
            <div className="userEditWerpper">
                <div className="userEditTitle">Edit User</div>
                {/* <div className="userEditBtn">
                  <Link to={'/New_User'}>
                    <button className="editBtn">Create</button>
                  </Link>
                </div> */}
            </div>
            <div className="userEditInfo">
              <div className="userInfo">
                <div className="userMainInfo">
                  {
                    userData[0].GENDER === 1 ?
                      <img className='avater' src="/images/avaters/man.png" alt="" />
                    :
                      <img className='avater' src="/images/avaters/woman.png" alt="" /> 
                  }
                  <div className="personInfo">
                    <span className="userName">{userData[0].USER_FIRST_LAST_NAME}</span>
                    <span className="userJob">{userData[0].USER_NAME}</span>
                  </div>
                </div>
                <div className="userAccountInfo">
                  <h3>Account Details</h3>
                  <div className="accountData">
                    <Person className='Icon'/> <span>{userData[0].USER_SSN}</span>
                  </div>
                  <div className="accountData">
                    <CalendarToday className='Icon'/> <span>{new Date(userData[0].DATE_CREATED).getDate()}-{new Date(userData[0].DATE_CREATED).getMonth()+1}-{new Date(userData[0].DATE_CREATED).getFullYear()}</span>
                  </div>
                  <h3>Contact Details</h3>
                  <div className="accountData">
                    <PhoneAndroid className='Icon'/> <span>{userData[0].USER_PHONE1}</span>
                  </div>
                  <div className="accountData">
                    <PhoneAndroid className='Icon'/> <span>{userData[0].USER_PHONE2 !== null ? userData[0].USER_PHONE2 : 'Dont Have other Phone'}</span>
                  </div>
                  <div className="accountData">
                    <Email className='Icon'/> <span>{userData[0].USER_EMAIL}</span>
                  </div>
                  <div className="accountData">
                    <LocationSearching className='Icon'/> <span>{userData[0].USER_ADDRESS}</span>
                  </div>
                </div>
              </div>
              <div className="userInfoUpdate">
                <span className="userUpdateTitle">Edit</span>
                <div className="userUpdateForm">
                  <div className="userUpdateItemsList">
                    <div className="userUpdateItem">
                      <label>Full name</label>
                      <input type="text" name="Fullname" onChange={handelUserFullName} placeholder={userData[0].USER_FIRST_LAST_NAME} />
                    </div>
                    <div className="userUpdateItem">
                      <label>Email</label>
                      <input type="text" name="Email" onChange={handelUserEmail} placeholder={userData[0].USER_EMAIL} />
                    </div>
                    <div className="userUpdateItem">
                      <label>Phone 1</label>
                      <input type="text" name="Phone" onChange={handelPhone1} placeholder={userData[0].USER_PHONE1} />
                    </div>
                    <div className="userUpdateItem">
                      <label>Phone 2</label>
                      <input type="text" name="Phone" onChange={handelPhone2} placeholder={userData[0].USER_PHONE2 !== null ? userData[0].USER_PHONE2 : 'Dont Have'} />
                    </div>
                    <div className="userUpdateItem">
                      <label>Address</label>
                      <input type="text" name="Address" onChange={handelUserAddress} placeholder={userData[0].USER_ADDRESS} />
                    </div>
                  </div>
                  <div className="userInfoUpdateRight">
                    <button onClick={()=>{handelUpdateUserData()}}>Update</button>
                </div>
                </div>
              </div>
            </div>  
          </div>
          :''
        }
        
    <Footer/>
        </>
    );
}

export default Setting;
