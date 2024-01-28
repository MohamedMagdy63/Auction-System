import './PopupReport.css'
import DynamicTable from '../DynamicTable/DynamicTable'
import { useEffect, useState } from 'react'

const PopupReport = (props) => {
    const handelClosePopup = () =>{
        props.closePopup(false)
        props.OpenSidebar(false)
    }
    
  return (
    <div className='popupReport'>
        <div className={props.notActivePopup ? "popupReportLayout" : "popupReportLayout notactive"}>
            <div className="reportContioner">
                <div className="reportData">
                    <div className="closePopup" onClick={()=>{handelClosePopup()}}></div>
                    <DynamicTable reportType={props.type}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PopupReport