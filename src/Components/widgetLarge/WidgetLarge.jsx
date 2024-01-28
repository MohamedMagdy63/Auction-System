import './WidgetLarge.css'
import { Fade } from 'react-awesome-reveal'
const WidgetLarge = () => {
  const Button = ({type}) =>{
    return(<button className={'widgetLargeButton '+type}>{type}</button>)
  }
  return (
    <Fade className='Main_Wedget'>
      <div className='widgetLarge'>
      <div className="widgetLargeTitle">latest transactions</div>
      <table className='widgetLargeTable'>
        <thead>
          <tr className='widgetLargeHeader'>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className='widgetLargeItem'>
            <td className="widgetLargeUser">
              <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profiel" />
              <span className="widgetLargeUsername">Petar</span>
            </td>
            <td className="widgetLargeDate">
              2 Jun 2022
            </td>
            <td className="widgetLargeAmount">
              $190.0
            </td>
            <td className="widgetLargeStatus">
              <Button type={'Approved'}/>
            </td>
          </tr>
          <tr className='widgetLargeItem'>
            <td className="widgetLargeUser">
              <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profiel" />
              <span className="widgetLargeUsername">Petar</span>
            </td>
            <td className="widgetLargeDate">
              2 Jun 2022
            </td>
            <td className="widgetLargeAmount">
              $190.0
            </td>
            <td className="widgetLargeStatus">
              <Button type={'Declined'}/>
            </td>
          </tr>
          <tr className='widgetLargeItem'>
            <td className="widgetLargeUser">
              <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profiel" />
              <span className="widgetLargeUsername">Petar</span>
            </td>
            <td className="widgetLargeDate">
              2 Jun 2022
            </td>
            <td className="widgetLargeAmount">
              $190.0
            </td>
            <td className="widgetLargeStatus">
              <Button type={'Pending'}/>
            </td>
          </tr>
          <tr className='widgetLargeItem'>
            <td className="widgetLargeUser">
              <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profiel" />
              <span className="widgetLargeUsername">Petar</span>
            </td>
            <td className="widgetLargeDate">
              2 Jun 2022
            </td>
            <td className="widgetLargeAmount">
              $190.0
            </td>
            <td className="widgetLargeStatus">
              <Button type={'Approved'}/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </Fade>
    
  )
}

export default WidgetLarge
