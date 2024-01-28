import './Chart.css'
import { Fade } from "react-awesome-reveal";


import { LineChart,
    Line, 
    XAxis, 
    CartesianGrid,
    Tooltip, 
    ResponsiveContainer, 
    YAxis,
    Legend,
    Area} from 'recharts';



const Chart = ({Title,data,dataKeyX,dataKeyY,dataLine,yearWanted}) => {
  const handleYearWanted = (e) =>{
    yearWanted(new Date(e.target.value).getFullYear())
  }
  return (
    <Fade>
      <div className='chart'>
        <div className="headerChart">
          <div className="chartTitle">{Title}</div>
          <div className="Year"><input type="date" name="" id="" onChange={handleYearWanted} /></div>
        </div>
        <ResponsiveContainer width="100%" aspect={4/1}>
          <LineChart width={700} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeyX}  allowDuplicatedCategory={false} />
            <YAxis dataKey={dataKeyY} />
            <Tooltip />
            <Legend />
            {data.map((s,index) => (
              <Line dataKey={dataLine} data={s.data} name={s.CATEGORY_NAME} key={s.CATEGORY_NAME} stroke={`#${s.data[index].bg}`} />
            ))}
          </LineChart>
      </ResponsiveContainer>
    </div>
    </Fade>
    
  )
}

export default Chart