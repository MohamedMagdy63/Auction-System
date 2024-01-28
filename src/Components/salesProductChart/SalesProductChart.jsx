import { LineChart, 
  Line, 
  XAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer } from 'recharts';
import {dataProduct} from '../../assiats/Data'
import { Fade } from "react-awesome-reveal";

export default function SalesProductChart() {
  return (
    <Fade>
      <div className='salesProductChart'>
      <ResponsiveContainer width="100%" aspect={3/1}>
        <LineChart data={dataProduct} >
          <CartesianGrid stroke='#8884d8' strokeDasharray="8 8" />
          <XAxis dataKey="Month" stroke='#8884d8' />
          <Line type="monotone" dataKey="Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </Fade>
    
  )
}
