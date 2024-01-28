import './FeaturedInfo.css'
import { Fade } from "react-awesome-reveal";

import { ArrowDownward,ArrowUpward } from '@material-ui/icons'

const FeaturedInfo = (props) =>{
  return (
    <Fade>
      <div className='featuredInfo'>
      <div className="featuredWerpper">
        {props.profitValues.length !== 0 ?
          props.profitValues.map((profit)=>{
            return(
              <div className="featuredItem">
              <div className="featuredTitle">{profit.CATEGORY_NAME}</div>
              <div className="featuredMoneyContiner">
                <div className="featuredMoney">{Math.floor(profit.SALES)} Eg</div>
                <div className="featuredMoneyRate">
                  {Math.floor(profit.DIFFERENCE)} <span> {Math.floor(profit.DIFFERENCE) > 0 ? <div className="postive"><ArrowUpward/></div> : <ArrowDownward/>}</span> <span>{Math.floor(profit.DIFFERENCE) > 0 ?<div className="postive">Profit</div> :'Loss'}</span>
                </div>
              </div>
                <div className="featuredsub">Compered last Month</div>
            </div>
            )
          })
        :''}
      </div>
    </div>
    </Fade>
    
  )
}

export default FeaturedInfo;