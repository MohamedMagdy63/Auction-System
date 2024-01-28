import './User.css'
import { Person, Category, Home, Cake, Gavel, CreditCard,CalendarToday, PhoneAndroid, Email, LocationSearching, Publish } from '@material-ui/icons'
import { useParams } from 'react-router-dom'
import { useState , useReducer } from 'react'
import { useEffect } from 'react'
import { UsersData } from '../../../assists/Data/AllUsersDataForAdmin'
import { getUserById } from '../../../controller/moduls/getUserById'

const User = () => {
  const {userid} = useParams()
  // const onesRun = useRef(true)
  const [reducer, forceUpdata] = useReducer(x => x + 1, 0);
  const [ rows, setRows] = useState([])
  useEffect(() => {
    getUserById(userid).then((res)=>{
      setRows(res)
    })
    if (document.readyState === "complete") {
      setTimeout(()=>{
          if(document.querySelector('.test')){
              document.querySelector('.test').remove()
          }
      },1500)
    }
  }, [reducer]);
  return (
    <div className='user'>
      <div className="test">
      {document.body.classList.contains('dark') === true?
      <img src="/loader/ezgif-4-d12af8c714.gif" alt="" /> 
      :
      <img src="/loader/ezgif.com-video-to-gif.gif" alt="" /> 
       }
      </div>
      <div className="userEditWerpper">
          <div className="userEditTitle">User Information</div>
      </div>
      <div className="userEditInfo">
        <div className="userInfo">
          <div className="userMainInfo">
            <div className="personInfo">
              <span className="userName">{rows.userName}</span>
            </div>
          </div>
          <div className="userAccountInfo">
            <h3>Account Details</h3>
            <div className="accountData">
              <Person className='Icon'/> <span>{rows.email}</span>
            </div>
            <div className="accountData">
              <CalendarToday className='Icon'/> <span>{rows.ssn}</span>
            </div>
            <h3>Contact Details</h3>
            <div className="accountData">
              <PhoneAndroid className='Icon'/> <span>{rows.phone1}</span>
            </div>
            <div className="accountData">
              <LocationSearching className='Icon'/> <span>Egypt|EG</span>
            </div>
          </div>
        </div>
        <div className="userDetailsInfoContiner">
          <span className="userUpdateTitle">User Details</span>
          <div className="userForm">
            <div className="userDetailsInfoList">
              <div className="userDetailsInfo">
                <label>SSN</label>
                <div className="dataIcon">
                  <CreditCard className='Icon'/>
                  <span>{rows.ssn}</span>
                </div>
              </div>
              <div className="userDetailsInfo">
                <label>Category check</label>
                <div className="dataIcon">
                  <Category className='Icon'/>
                  <span>{rows.Category_check == 0 ? 'Not Checked' : 'Checked'}</span>
                </div>
              </div>
              <div className="userDetailsInfo">
                <label>Terms check</label>
                <div className="dataIcon">
                  <Gavel className='Icon'/>
                  <span>{rows.terms_check == 0 ? 'Not Checked' : 'Checked'}</span>
                </div>
              </div>
              <div className="userDetailsInfo">
                <label>Birthdate</label>
                <div className="dataIcon">
                  <Cake className='Icon'/>
                  <span>{rows.bithdayDate}</span>
                </div>
              </div>
              <div className="effect">
                <div className="userDetailsInfo">
                  <label>Address</label>
                  <div className="dataIcon">
                    <Home className='Icon'/>
                    <span>{rows.address}</span>
                  </div>
                </div>
                <div className="userDetailsInfo">
                  <div className="dataIcon">
                    <span className={rows.Status == 0 ? 'active' : 'block'}>{rows.Status == 0 ? 'Active' : 'Block'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default User