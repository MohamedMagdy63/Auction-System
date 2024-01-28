import './Mail.css'
import {PolicyRounded} from '@material-ui/icons'
import {rows} from '../../../assists/Data/Data'
import { problems } from '../../../assists/Data/reportProblem'
import { useEffect, useRef, useState } from 'react'
import { UsersData } from '../../../assists/Data/AllUsersDataForAdmin'
import { getReportClientSend } from '../../../controller/moduls/GetData'
import { sendmail, sendmailReport } from '../../../controller/moduls/sendMails'
import { insertReviewReport } from '../../../controller/moduls/insertModule'

const Mail = () => {
  const [data, setData] = useState([])
  const [searchName, setSearchName] = useState('')
  const [adminReview, setAdminReview] = useState('')
  const [report,setReport] = useState([])
  const [currentUser,setCurrentUser] = useState()
  const [currentUserEmail,setCurrentUserEmail] = useState()
  const oneRun = useRef(true)
  const handelProblems = (userId,userEmail)=>{
    setReport([])
    setCurrentUser(userId)
    setCurrentUserEmail(userEmail)
    getReportClientSend(userId).then((res)=>{
      let arr = []
      res.map((val)=>{
        if(!arr.includes(val.REPORT_ID)){
          arr.push(val.REPORT_ID)
          setReport(oldArray=>[...oldArray,val])
        }else{
          setReport(oldArray=>[...oldArray,{'REPORT_ID':val.REPORT_ID,'REVIEW_REPORT':val.REVIEW_REPORT}])
        }
      })
    })
  }
  const handelSearchInput = (e)=>{
    setSearchName(e.target.value.toLowerCase())
  }
  const handleAdminReview = (e)=>{
    setAdminReview(e.target.value)
  }
  const handleSubmitReview = ()=>{
    insertReviewReport(adminReview,report[report.length-1].REPORT_ID).then(()=>{
      getReportClientSend(currentUser).then((res)=>{
        setReport([])
        let arr = []
        res.map((val)=>{
          if(!arr.includes(val.REPORT_ID)){
            arr.push(val.REPORT_ID)
            setReport(oldArray=>[...oldArray,val])
          }else{
            setReport(oldArray=>[...oldArray,{'REPORT_ID':val.REPORT_ID,'REVIEW_REPORT':val.REVIEW_REPORT}])
          }
        })
        sendmailReport(adminReview,currentUserEmail).then((res)=>{
            if(res.code === 200){
              
            }
          })

      })
    })
  }
  useEffect(()=>{
    if(oneRun.current){
      oneRun.current = false
      UsersData().then((res)=>{
        setData(res)
        console.log(res)
      })
    }
    if (document.readyState === "complete") {
      setTimeout(()=>{
          if(document.querySelector('.test')){
              document.querySelector('.test').remove()
          }
      },1500)
    }
  },[])
  return (
    <div className='mail'>
      <div className="test">
      {document.body.classList.contains('dark') === true?
      <img src="/loader/ezgif-4-d12af8c714.gif" alt="" /> 
      :
      <img src="/loader/ezgif.com-video-to-gif.gif" alt="" /> 
       }
        </div>
        <div className="mailContiner">
          <div className="Mails">
            <div className="mailsContent">
              {
                report.map((reportDetails)=>{
                  return(
                    <>
                      {reportDetails.REPORT_DESCRIPTION ?<div className="sender">{reportDetails.REPORT_DESCRIPTION}</div>: ''}
                      {reportDetails.REVIEW_REPORT != '' ? <div className="resiver">{reportDetails.REVIEW_REPORT}</div> : ''}
                    </>
                  )
                })
              }
            </div>
            <div className="mailPlaceWrite">
              <textarea name="" id="" cols="30" rows="1" onChange={handleAdminReview}></textarea>
              <button className='SendBtn' onClick={()=>{handleSubmitReview()}}>Send</button>
            </div>
          </div>
          <div className="usersMail">
            <div className="headerBar">
              <PolicyRounded className='icon'/>
              <input type="text" name="" placeholder='Search' id="" onChange={handelSearchInput} />
            </div>
            <div className="users">
              {data.map((user,index)=>{
                return(
                    user.userName.toLowerCase().includes(searchName) ?
                      <>
                        <div key={index} className="userData" onClick={()=>{handelProblems(user.id,user.email)}}>
                          <div className="userName">{user.userName}</div>
                          <div className="userEmail">{user.email}</div>
                        </div>
                      </>
                    : ''
                )
              })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Mail