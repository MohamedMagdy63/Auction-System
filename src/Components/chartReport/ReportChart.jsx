import React, { useEffect } from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Fade } from "react-awesome-reveal";
import {testData,numberSale,buyerAnalysisData} from '../../assists/Data/ReportData'

const ReportChart = (props) => {
  return (
    <Fade>
    <div className='reportChart'>
        <ResponsiveContainer width="100%" aspect={5/2}>
        <AreaChart
          width={100}
          height={100}
          data={props.graphType === 'Emplyee' ? testData[0] : props.graphType === 'Sellers' ? numberSale : props.graphType === 'Buyers' ? buyerAnalysisData : ''}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <XAxis tick={props.graphType === 'Buyers'?false:true}  dataKey={props.graphType === 'Emplyee' ? "MONTH" : props.graphType === 'Sellers' ? 'Type' : props.graphType === 'Buyers' ? 'USER_FIRST_LAST_NAME' : ''} />
          <Area type="monotone" dataKey={props.graphType === 'Emplyee' ? "TOTAL_SALARY" : props.graphType === 'Sellers' ? 'Count' : props.graphType === 'Buyers' ? 'WON_AUCTION' : ''} stroke="#8884d8" fill="#f28482" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    </Fade>
  )
}

export default ReportChart