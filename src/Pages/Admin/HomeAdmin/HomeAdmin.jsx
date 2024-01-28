import Chart from '../../../Components/chart/Chart'
import FeaturedInfo from '../../../Components/featuredInfo/FeaturedInfo'
import './HomeAdmin.css'
import WidgetLarge from '../../../Components/widgetLarge/WidgetLarge'
import WidgetSmall from '../../../Components/widgetSmall/WidgetSmall'
import {data} from '../../../assists/Data/Data'
import { useEffect, useRef, useState } from 'react'
import { profitOfEachCategory, selleProductOfEachCategory } from '../../../controller/moduls/DataAnalysis'
import { AreaChartTool } from '../../../Components/AreaChartTool/AreaChartTool'



export const HomeAdmin  = () => {
  const [salesEachManth,setSalesEachManth] = useState([])
  const [profitEachManth,setProfitEachManth] = useState([])
  const [year,setYear] = useState(new Date().getFullYear())
  // const test = useState(
  //   [
  //     {
  //       CATEGORY_NAME: 'Cars',
  //       data: [
  //         {MONTH: 1,NumberOfSales: 2},
  //         {MONTH: 2,NumberOfSales: 6},
  //         {MONTH: 3,NumberOfSales: 7},
  //         {MONTH: 4,NumberOfSales: 8},
  //         {MONTH: 5,NumberOfSales: 2},
  //         {MONTH: 6,NumberOfSales: 3},
  //         {MONTH: 7,NumberOfSales: 7},
  //         {MONTH: 8,NumberOfSales: 2},
  //         {MONTH: 9,NumberOfSales: 20},
  //         {MONTH: 10,NumberOfSales: 19},
  //         {MONTH: 11,NumberOfSales: 11},
  //         {MONTH: 12,NumberOfSales: 21}
  //       ],
  //     },
  //     {
  //       CATEGORY_NAME: 'Mobiles',
  //       data: [
  //         {MONTH: 1,NumberOfSales: 3},
  //         {MONTH: 2,NumberOfSales: 2},
  //         {MONTH: 3,NumberOfSales: 5},
  //         {MONTH: 4,NumberOfSales: 8},
  //         {MONTH: 5,NumberOfSales: 9},
  //         {MONTH: 6,NumberOfSales: 8},
  //         {MONTH: 7,NumberOfSales: 20},
  //         {MONTH: 8,NumberOfSales: 21},
  //         {MONTH: 9,NumberOfSales: 31},
  //         {MONTH: 10,NumberOfSales: 40},
  //         {MONTH: 11,NumberOfSales: 41}
  //       ],
  //     }
  //   ]
  //   )
  
  
  const oneRun = useRef(true)

  useEffect(()=>{
    // if(oneRun.current){
    //   oneRun.current = false
    // }
    selleProductOfEachCategory(year).then((res)=>{
      let newArray = []
      let dataArray = []
      let mainArray = []
      res.map((cate,index)=>{
        if(index === 0){
          newArray.push(cate.CATEGORY_NAME)
          dataArray.push({"MONTH":cate.MONTH,"NumberOfSales":cate.NumberOfSales,"bg":cate.bg,"TotalPrice":Math.floor(cate.TotalPrice)})
        }else{
          if(newArray.includes(cate.CATEGORY_NAME)){
            dataArray.push({"MONTH":cate.MONTH,"NumberOfSales":cate.NumberOfSales,"bg":cate.bg,"TotalPrice":Math.floor(cate.TotalPrice)})
          }else{
            newArray.map((name)=>{
              mainArray.push({"CATEGORY_NAME":name,"data":dataArray})
            })
            newArray =[]
            dataArray =[]
            newArray.push(cate.CATEGORY_NAME)
            dataArray.push({"MONTH":cate.MONTH,"NumberOfSales":cate.NumberOfSales,"bg":cate.bg,"TotalPrice":Math.floor(cate.TotalPrice)})
            if(index === res.length - 1){
              newArray.map((name)=>{
                mainArray.push({"CATEGORY_NAME":name,"data":dataArray})
              })
            }
          }
        }
      })
      setSalesEachManth(mainArray)
      profitOfEachCategory().then((profit)=>{
        setProfitEachManth(profit)
      })
    })
  },[year])
  return (
    <div className='home'>
      <Chart Title="Number Of Sales" data={salesEachManth} dataKeyX={'MONTH'} dataKeyY={'NumberOfSales'} dataLine={'NumberOfSales'} yearWanted ={setYear} />
      <Chart Title="Price of category" data={salesEachManth} dataKeyX={'MONTH'} dataKeyY={'TotalPrice'} dataLine={'TotalPrice'} yearWanted ={setYear}/>
      <AreaChartTool type={'Seller'}/>
      <AreaChartTool type={'Buyer'}/>
      <FeaturedInfo profitValues={profitEachManth}/>
      <div className="homeWidgets">
        <WidgetSmall/>
        {/* <WidgetLarge/> */}
      </div>
    </div>
  )
}
