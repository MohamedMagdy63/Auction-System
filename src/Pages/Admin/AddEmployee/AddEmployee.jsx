import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import './AddEmployee.css'
import { useEffect, useReducer, useState } from 'react';
import { AdminData } from '../../../assists/Data/Employess';
import { insertNewAdmin } from '../../../controller/moduls/insertModule';

const AddEmployee = () => {
  const [reducer, forceUpdata] = useReducer(x => x + 1, 0);
  const [adminsData,setAdminData] = useState([])

  const [emplyeeFirstName,setEmplyeeFirstName] = useState('')
  const [emplyeeLastName,setEmplyeeLastName] = useState('')
  const [emplyeeUsername,setEmplyeeUsername] = useState('')
  const [emplyeeAddress,setEmplyeeAddress] = useState('')
  const [emplyeePhoneNumber,setEmplyeePhoneNumber] = useState('')
  const [emplyeeOtherPhoneNumber,setEmplyeeOtherPhoneNumber] = useState('')
  const [emplyeeSSN,setEmplyeeSSN] = useState('')
  const [emplyeeEmail,setEmplyeeEmail] = useState('')
  const [emplyeeGender,setEmplyeeGender] = useState('')
  const [emplyeeManger,setEmplyeeManger] = useState('')
  const [emplyeeSalary,setEmplyeeSalary] = useState('')
  const [emplyeeBirthday,setEmplyeeBirthday] = useState('')
  const [emplyeePassword,setEmplyeePassword] = useState('')
  const [emplyeeWorkStartDay,setEmplyeeWorkStartDay] = useState('')
  const [emplyeeImageURL,setEmplyeeImageURL] = useState('')
  const [emplyeeImageFile,setEmplyeeImageFile] = useState('')

  const handelEmplyeeFirstName = (e)=>{
    setEmplyeeFirstName(e.target.value)
  }
  const handelEmplyeeLastName = (e)=>{
    setEmplyeeLastName(e.target.value)
  }
  const handelEmplyeeUsername = (e)=>{
    setEmplyeeUsername(e.target.value)
  }
  const handelEmplyeeAddress = (e)=>{
    setEmplyeeAddress(e.target.value)
  }
  const handelEmplyeePhoneNumber = (e)=>{
    setEmplyeePhoneNumber(e.target.value)
  }
  const handelEmplyeeOtherPhoneNumber = (e)=>{
    setEmplyeeOtherPhoneNumber(e.target.value)
  }
  const handelEmplyeeSSN = (e)=>{
    setEmplyeeSSN(e.target.value)
  }
  const handelEmplyeeEmail = (e)=>{
    setEmplyeeEmail(e.target.value)
  }
  const handelEmplyeeGender = (e)=>{
    setEmplyeeGender(e.target.value)
  }
  const handelEmplyeeManger = (e)=>{
    setEmplyeeManger(e.target.value)
  }
  const handelEmplyeeSalary = (e)=>{
    setEmplyeeSalary(e.target.value)
  }
  const handelEmplyeeBirthday = (e)=>{
    setEmplyeeBirthday(e.target.value)
  }
  const handelEmplyeePassword = (e)=>{
    setEmplyeePassword(e.target.value)
  }
  const handelEmplyeeWorkStartDay = (e)=>{
    setEmplyeeWorkStartDay(e.target.value)
  }
  const handelFilePath = (e,id)=>{
    if (e.target.files) {
        let files = e.target.files
        let filesArry = Array.prototype.slice.call(files)
        filesArry.map((f)=>{
            if(!f.type.match("image/*")){
                return;
            }
            let rander = new FileReader();
            rander.onload = (e)=>{
                var base64 = (e.target.result).toString();
                setEmplyeeImageFile(f.name)
                setEmplyeeImageURL(base64)
            }
            rander.readAsDataURL(f)
        })
    }
  }

  const handelSubmitData = ()=>{
    if(emplyeeFirstName === ''){
      console.log("error in" + "emplyeeFirstName")
    }else if(emplyeeLastName === ''){
      console.log("error in" + "emplyeeLastName")
    }else if(emplyeeUsername === ''){
      console.log("error in" + "emplyeeUsername")
    }else if(emplyeeAddress === ''){
      console.log("error in" + "emplyeeAddress")
    }else if(emplyeePhoneNumber === ''){
      console.log("error in" +"emplyeePhoneNumber")
    }else if(emplyeeOtherPhoneNumber === ''){
      console.log("error in" + "emplyeeOtherPhoneNumber")
    }else if(emplyeeSSN === ''){
      console.log("error in" + "emplyeeSSN")
    }else if(emplyeeEmail === ''){
      console.log("error in" + "emplyeeEmail")
    }else if(emplyeeGender === ''){
      console.log("error in" + "emplyeeGender")
    }else if(emplyeeManger === ''){
      console.log("error in" + "emplyeeManger")
    }else if(emplyeeSalary === ''){
      console.log("error in" + "emplyeeSalary")
    }else if(emplyeeBirthday === ''){
      console.log("error in" + "emplyeeBirthday")
    }else if(emplyeePassword === ''){
      console.log("error in" + "emplyeePassword")
    }else if(emplyeeWorkStartDay === ''){
      console.log("error in" + "emplyeeWorkStartDay")
    }else if(emplyeeImageURL === '' || emplyeeImageFile === ''){
      console.log("error in" + "emplyeeImage")
    }
    else{
      insertNewAdmin(emplyeeFirstName,emplyeeLastName
      ,emplyeeUsername,emplyeePhoneNumber
      ,emplyeeOtherPhoneNumber,emplyeeAddress,emplyeeBirthday,emplyeeSSN
      ,emplyeeEmail,emplyeePassword,'',emplyeeGender,emplyeeManger,emplyeeWorkStartDay
      ,emplyeeImageURL,emplyeeImageFile)
    }
  }

  useEffect(()=>{

    AdminData().then(adminsName=>{
      setAdminData(adminsName)
    })
    if (document.readyState === "complete") {
      setTimeout(()=>{
          if(document.querySelector('.test')){
              document.querySelector('.test').remove()
          }
      },1500)
    }
  },[reducer])
  return (
    <div className='addEmployee'>
      <div className="test">
      {document.body.classList.contains('dark') === true?
      <img src="/loader/ezgif-4-d12af8c714.gif" alt="" /> 
      :
      <img src="/loader/ezgif.com-video-to-gif.gif" alt="" /> 
       }
      </div>
        <div className="employeeContiner">
          <div className="pageTitle">Add new employee</div>
          <div className="employeeInfo">
            <div className="infoContent"><input onChange={handelEmplyeeFirstName} type="text" placeholder='First Name' name="FirstName" id="" /></div>
            <div className="infoContent"><input onChange={handelEmplyeeLastName} type="text" placeholder='Last Name' name="LastName" id="" /></div>
            <div className="infoContent"><input onChange={handelEmplyeeUsername} type="text" placeholder='Username' name="Username" id="" /></div>
            <div className="infoContent"><input onChange={handelEmplyeeAddress} type="text" placeholder='Address' name="Address" id="" /></div>
            <div className="infoContent"><input onChange={handelEmplyeePhoneNumber} type="text" placeholder='Phone number' name="Phone1" id="" /></div>
            <div className="infoContent"><input onChange={handelEmplyeeOtherPhoneNumber} type="text" placeholder='Other phone number' name="Username" id="" /></div>
            <div className="infoContent"><input onChange={handelEmplyeeSSN} type="text" placeholder='SSN' name="SSN" id="" /></div>
            <div className="infoContent"><input onChange={handelEmplyeeEmail} type="text" placeholder='Email' name="Email" id="" /></div>
            <div className="miniContiner">
              <div className="infoContent">
                <select onChange={handelEmplyeeGender} name="Gender" id="Gender">
                  <option value="Gender">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="infoContent">
                <select onChange={handelEmplyeeManger} name="Manager" id="Manager">
                  <option value="Manager">Manager</option>
                  {adminsData.map((Admins)=>{
                    return(
                      <option value={Admins.id}>{Admins.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
              <div className="infoContent"><input onChange={handelEmplyeeSalary} type="number" placeholder='Salary' name="" id="" /></div>
            <div className="infoContent"><span>Birthday date</span><input onChange={handelEmplyeeBirthday} type="date" placeholder='Birthday' name="Birthday" id="" /></div>
            <div className="infoContent"><span>Work starting day</span><input onChange={handelEmplyeeWorkStartDay} type="date" placeholder='Work start day' name="Birthday" id="" /></div>
            <div className="infoContent"><input onChange={handelEmplyeePassword} type="password" placeholder='Password' name="Password" id="" /></div>
          </div>
          <div className="submitBtn">
            <Stack direction="row" alignItems="center" spacing={2} className='iconStyle'>
              <IconButton  color="primary" aria-label="upload picture" component="label">
                <input hidden  type="file" name="file" id="file" onChange={(e)=>handelFilePath(e)} />
                <PhotoCamera className='iconStyle'/>
              </IconButton>
            </Stack>
            <button onClick={()=>{handelSubmitData()}}>Submit & Save</button>
          </div>
        </div>
    </div>
  )
}

export default AddEmployee