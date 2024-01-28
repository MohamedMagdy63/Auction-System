import './Feedback.css'
import * as Icons from "react-icons/ri";
import smile from '../../assists/images/Emojis/smiley-icon.png'
import angry from '../../assists/images/Emojis/angry-icon.png'
import laugh from '../../assists/images/Emojis/laugh-icon.png'
import sad from '../../assists/images/Emojis/sad-icon.png'
import confused from '../../assists/images/Emojis/confused-color-icon.png'
import {  useState } from 'react';
import { updateFinalReport, updateFinalReportWithNotSatif } from '../../controller/moduls/UpdateModule';
import { insertAngryReports } from '../../controller/moduls/insertModule';


export const Feedback = (props) => {
    const [choiceIsActive,setChoiceIsActive] = useState([])
    const [feedbackReportId,setFeedbackReportId] = useState([])
    const [feedbackCommonReportId,setFeedbackCommonReportId] = useState([])
    const [feedbackRate,setFeedbackRate] = useState([])
    const [userOpinion,setUserOpinion] = useState([])
    const handleSkipBtn = ()=>{
        props.skipFeedback(false)
    }
    const handleSubmitData = ()=>{
        updateFinalReport(feedbackRate,feedbackReportId,feedbackCommonReportId,userOpinion).then((responce)=>{
            window.location.href = '/'
        })
    }
    const handleReport = ()=>{
        props.reportData.map((x)=>{
            if(x.REP_RAT_SUGG !== "report" && x.REP_RAT_SUGG !== "suggestion"){
                updateFinalReportWithNotSatif(1,x.REPORT_ID,x.COMMON_REPORT_ID,null)
            }else{
                updateFinalReportWithNotSatif(null,x.REPORT_ID,x.COMMON_REPORT_ID,'Not satisfied')
            }
        })
        insertAngryReports(props.reportData[0].CLINT_ID).then(()=>{
            window.location.href = '/'
        })
    }
    const handleAngryChoise = (id,reportID,commonReportID)=>{
        console.log(id)
        setChoiceIsActive(oldArray => {const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] ='angry'+id
            return updateItem
        })
        setFeedbackReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =reportID
            return updateItem
        })
        setFeedbackCommonReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =commonReportID
            return updateItem
        })
        setFeedbackRate(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] = 1
            return updateItem
        })
        // let findVal = false
        // if(choiceIsActive.length !== 0){
        //     choiceIsActive.map((values,index)=>{
        //         if(index === id){
        //             setChoiceIsActive([choiceIsActive[id] , 'angry'+id])
        //             findVal = true
        //         }
        //     })
        //     console.log(findVal)
        // }
        // if(choiceIsActive.length === 0 || !findVal){
        //     setChoiceIsActive(oldArray => [...oldArray, 'angry'+id])
        // }
    }
    const handleSadChoise = (id,reportID,commonReportID)=>{
        console.log(id)
        setChoiceIsActive(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] ='sad'+id
            return updateItem
        })
        setFeedbackReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =reportID
            return updateItem
        })
        setFeedbackCommonReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =commonReportID
            return updateItem
        })
        setFeedbackRate(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] = 2
            return updateItem
        })
        // let findVal = false
        // if(choiceIsActive.length !== 0){
        //     choiceIsActive.map((values,index)=>{
        //         if(index === id){
        //             setChoiceIsActive([choiceIsActive[id] = 'sad'+id])
        //             findVal = true
        //         }
        //     })
        // }
        // if(choiceIsActive.length === 0 || !findVal){
        //     setChoiceIsActive(oldArray => [...oldArray, 'sad'+id])
        // }
    }
    const handleConfusedChoise = (id,reportID,commonReportID)=>{
        console.log(id)
        setChoiceIsActive(oldArray => {const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] ='confused'+id
            return updateItem
        })
        setFeedbackReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =reportID
            return updateItem
        })
        setFeedbackCommonReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =commonReportID
            return updateItem
        })
        setFeedbackRate(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] = 3
            return updateItem
        })
        // let findVal = false
        // if(choiceIsActive.length !== 0){
        //     choiceIsActive.map((values,index)=>{
        //         if(index === id){
        //             setChoiceIsActive([choiceIsActive[id] = 'confused'+id])
        //             findVal = true
        //         }
        //     })
        // }
        // if(choiceIsActive.length === 0 || !findVal){
        //     setChoiceIsActive(oldArray => [...oldArray, 'confused'+id])
        // }
    }
    const handleSmileChoise = (id,reportID,commonReportID)=>{
        console.log(id)
        setChoiceIsActive(oldArray => {const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] ='smile'+id
            return updateItem
        })
        setFeedbackReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =reportID
            return updateItem
        })
        setFeedbackCommonReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =commonReportID
            return updateItem
        })
        setFeedbackRate(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] = 4
            return updateItem
        })
        // let findVal = false
        // if(choiceIsActive.length !== 0){
        //     choiceIsActive.map((values,index)=>{
        //         if(index === id){
        //             setChoiceIsActive([choiceIsActive[id] = 'smile'+id])
        //             findVal = true
        //         }
        //     })
        // }
        // if(choiceIsActive.length === 0 || !findVal){
        //     setChoiceIsActive(oldArray => [...oldArray, 'smile'+id])
        // }
    }
    const handleLaughChoise = (id,reportID,commonReportID)=>{
        setChoiceIsActive(oldArray => {const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] ='laugh'+id
            return updateItem
        })
        setFeedbackReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =reportID
            return updateItem
        })
        setFeedbackCommonReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =commonReportID
            return updateItem
        })
        setFeedbackRate(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] = 5
            return updateItem
        })
        // let findVal = false
        // if(choiceIsActive.length !== 0){
        //     choiceIsActive.map((values,index)=>{
        //         if(index === id){
        //             setChoiceIsActive([choiceIsActive[id] = 'laugh'+id])
        //             findVal = true
        //         }
        //     })
        // }
        // if(choiceIsActive.length === 0 || !findVal){
        //     setChoiceIsActive(oldArray => [...oldArray, 'laugh'+id])
        // }
    }
    const handleTextArea = (e,id,reportID,commonReportID)=>{
        console.log(e.target.value)
        setFeedbackReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =reportID
            return updateItem
        })
        setFeedbackCommonReportId(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] =commonReportID
            return updateItem
        })
        setUserOpinion(oldArray =>{const updateItem = [...oldArray]
            updateItem.slice(id,0)
            updateItem[id] = e.target.value
            return updateItem
        })
    }

  return (
    <div className='feedback'>
        <div className="feedbackLayout">
            <div className="feedbackContainer">
                <div className="leftCornerTop"></div>
                <div className="rightCornerTop">
                    Aucti<Icons.RiAuctionFill className='RiAuctionFill' />n
                </div>
                <div className="introContiner">
                    <h2>Feedback Form</h2>
                    <p>Thank you for taking the survey! we value your opinion ranking question go from 1 to 5</p>
                    <p>Please select the option that better suits your opinion.</p>
                </div>
                <div className="ratingOptionContiner">
                    {console.log(props.reportData)}
                    {props.reportData.map((x,index)=>{
                        return(
                            x.REP_RAT_SUGG !== "report" && x.REP_RAT_SUGG !== "suggestion" ?
                                <div className="rating">
                                    <div className="textContaint"><span>{index+1}. </span>{x.COMMON_REPORT}</div>
                                    <div className="options">
                                        <img id={'angry'+index} onClick={()=>{handleAngryChoise(index,x.REPORT_ID,x.COMMON_REPORT_ID)}} className={choiceIsActive.includes('angry'+index) ? 'cheked' : ''} src={angry} alt="angry" />
                                        <img id={'sad'+index} onClick={()=>{handleSadChoise(index,x.REPORT_ID,x.COMMON_REPORT_ID)}} className={choiceIsActive.includes('sad'+index) ? 'cheked' : ''} src={sad} alt="sad" />
                                        <img id={'confused'+index} onClick={()=>{handleConfusedChoise(index,x.REPORT_ID,x.COMMON_REPORT_ID)}} className={choiceIsActive.includes('confused'+index) ? 'cheked' : ''} src={confused} alt="confused" />
                                        <img id={'smile'+index} onClick={()=>{handleSmileChoise(index,x.REPORT_ID,x.COMMON_REPORT_ID)}} className={choiceIsActive.includes('smile'+index) ? 'cheked' : ''} src={smile} alt="smile" />
                                        <img id={'laugh'+index} onClick={()=>{handleLaughChoise(index,x.REPORT_ID,x.COMMON_REPORT_ID)}} className={choiceIsActive.includes('laugh'+index) ? 'cheked' : ''} src={laugh} alt="laugh" />
                                    </div>
                                </div>
                                    
                            :
                            <div className="rating">
                                <div className="textContaint"><span>{index+1}. </span>{x.COMMON_REPORT}</div>
                                <div className="textareaContiner">
                                    <textarea onChange={(e)=>handleTextArea(e,index,x.REPORT_ID,x.COMMON_REPORT_ID)} name="" id="" cols="100" rows="4"></textarea>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="feedbackController">
                    <div className="feedbackSkip" onClick={()=>{handleSkipBtn()}}> <span>Skip</span></div>
                    <div className="thanksText">Thank You ...</div>
                    {props.reportData[0].REP_RAT_SUGG_ID !== 1? 
                        <div className="ReportBtn"><button className="submitFeedbackForm" onClick={()=>{handleReport()}}><span className="text">Report</span></button></div>
                    :''}
                    <div className="BtnSubmitForm"><button className="submitFeedbackForm"><span className="text" onClick={()=>{handleSubmitData()}}>Submit</span></button></div>
                </div>
                <div className="rightCornerdown"></div>
            </div>
        </div>
    </div>
  )
}
