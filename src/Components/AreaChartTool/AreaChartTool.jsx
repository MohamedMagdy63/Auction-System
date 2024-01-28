import './AreaChartTool.css'
import React from 'react'
import { Fade } from 'react-awesome-reveal';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip
  } from "recharts";
import { SellerData,BuyerData } from '../../assists/Data/ReportData';

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];
  
export const AreaChartTool = (props) => {
    return (
      <Fade>
        <div className='AreaChartTool'>
          <ResponsiveContainer className='' width="100%" aspect={3/1}>
            <AreaChart
              width={700}
              height={300}
              data={props.type === 'Seller' ? SellerData[0]:props.type === 'Buyer'? BuyerData[0] : ''}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={props.type === 'Seller' ? "USER_FIRST_LAST_NAME" : props.type === 'Buyer'? 'USER_FIRST_LAST_NAME' : ''} />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey={props.type === 'Seller' ? "INSTANT_PRODUCTS" : props.type === 'Buyer'? "USER_AUCTION_COUNT" : ''}
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey={props.type === 'Seller' ? "LIVE_AUCTION_PRODUCTS" : props.type === 'Buyer'? "WAIT_IN_REVIEW_DEPOSIT" : ''}
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey={props.type === 'Seller' ? "SCHEDULE_AUCTION_PRODUCTS" : props.type === 'Buyer'? "NOT_ACCEPT_DEPOSIT" : ''}
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
              <Area
                type="monotone"
                dataKey={props.type === 'Seller' ? "" : props.type === 'Buyer'? "ACCEPT_DEPOSIT" : ''}
                stackId="1"
                stroke="#ffc658"
                fill="#60a3bc"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Fade>
      );
}
