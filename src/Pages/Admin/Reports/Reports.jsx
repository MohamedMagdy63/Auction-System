import './Reports.css'
// import {testData} from '../../assiats/Data'
import ReportChart from '../../../Components/chartReport/ReportChart'
import { useEffect, useState } from 'react'
import PopupReport from '../../../Components/PopupReport/PopupReport'
import {rows2,SellerData,BuyerData} from '../../../assists/Data/ReportData'
const Reports = (props) => {
  const [openViewReport,SetOpenViewReport] = useState('')
  const [reportType,SetReportType] = useState('')
  const [reportRows,SetReportRows] = useState('')
  const handelOpenViewReport=(reportType)=>{
    SetReportType(reportType)
    SetOpenViewReport(true)
    props.popupState(true)
  }
  useEffect(() => {
    if (document.readyState === "complete") {
        setTimeout(()=>{
            if(document.querySelector('.test')){
                document.querySelector('.test').remove()
            }
        },1500)
      }  
  }, []);
  return (
    <div className='reports'>
      <div className="test">
        {document.body.classList.contains('dark') === true?
        <img src="/loader/ezgif-4-d12af8c714.gif" alt="" /> 
        :
        <img src="/loader/ezgif.com-video-to-gif.gif" alt="" /> 
        }    
        </div>
        <div className="ReportoverView">
          <div className="overviewTitle">Overview</div>
          <div className="reportContiner">
            <div className="EmplyeeReport">
              <div className="reportHeader">
                <div className="reportInfo">
                  <div className="reportTitle">Employes</div>
                  {/* <div className="reportUpdate">Last Updated at <span className='spanclass'>4 Jun</span> </div> */}
                </div>
                <button className="viewReport" onClick={()=>handelOpenViewReport('Emplyee')}>View Report</button>
              </div>
              <div className="reportNumber">{rows2[0].length}</div>
              <ReportChart graphType={'Emplyee'}/>
            </div>      
            <div className="EmplyeeReport">
              <div className="reportHeader">
                <div className="reportInfo">
                  <div className="reportTitle">Sellers</div>
                  {/* <div className="reportUpdate">Last Updated at <span className='spanclass'>4 Jun</span> </div> */}
                </div>
                <button className="viewReport" onClick={()=>handelOpenViewReport('Sellers')}>View Report</button>
              </div>
              <div className="reportNumber">{SellerData[0].length}</div>
              <ReportChart graphType={'Sellers'}/>
            </div>      
            <div className="EmplyeeReport">
              <div className="reportHeader">
                <div className="reportInfo">
                  <div className="reportTitle">Buyers</div>
                  {/* <div className="reportUpdate">Last Updated at <span className='spanclass'>4 Jun</span> </div> */}
                </div>
                <button className="viewReport" onClick={()=>handelOpenViewReport('Buyers')}>View Report</button>
              </div>
              <div className="reportNumber">{BuyerData[0].length}</div>
              <ReportChart graphType={'Buyers'}/>
            </div>      
          </div>
        </div>
        {openViewReport ? <PopupReport countRows={SetReportRows} type={reportType} OpenSidebar={props.popupState} closePopup={SetOpenViewReport} notActivePopup={true}/> : <PopupReport notActivePopup={false}/>}
    </div>
  )
}

export default Reports