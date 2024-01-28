import './Deposite.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {  useState ,useEffect, useReducer} from 'react';
import { depositeData } from '../../../assists/Data/deposit'
import { acceptDeposit,refuseDeposit } from '../../../controller/moduls/reviewDeposit';
import swal from 'sweetalert';
export const Deposite = () => {
  const [currentResipe,setCurrentResipe] = useState(0)
  
  const [scrollValue, setScrollValue] = useState(-168)

  const handleDistance = (val) =>{
    setScrollValue( val > 1 ? -168 + (740 * val) : -168 + (720 * val))
  }
  const handleLeftArrow = ()=>{
    setCurrentResipe(currentResipe === 0 ? number_of_resipe - 1 : (currentResipe - 1))
    handleDistance(currentResipe === 0 ? number_of_resipe - 1 : (currentResipe - 1))
  }
  const handleRightArrow = ()=>{
    setCurrentResipe(currentResipe === number_of_resipe - 1 ? 0 : (currentResipe + 1))
    handleDistance(currentResipe === number_of_resipe - 1 ? 0 : (currentResipe + 1))
  }
  
  // const onesRun = useRef(true)
  const [reducer, forceUpdata] = useReducer(x => x + 1, 0);
  const [deposite,setDeposite] = useState([])
  const number_of_resipe = deposite.length
  const handleAcceptDeposit = (id)=>{
    swal("Write something here:", {
      content: "input",
    })
    .then((value) => {
      swal(`You typed: ${value}`);
      acceptDeposit(id,value)
    });
  }
  
  const handleRefuseDeposit = (id)=>{
    swal("Write something here:", {
      content: "input",
    })
    .then((value) => {
      swal(`You typed: ${value}`);
      refuseDeposit(id,value).then((data)=>{
        if(data[0] == 'SUCCESSED')
        {
            swal("Done!", `Successful refuse`, "success", {button: false})
            setTimeout(() => {
                window.location.href = '/Deposite'
            }, 2000);
        }
        else
        {
            swal("Error", "Some thing error", "error")
        }
        
      })
    });
  }
  useEffect(() => {
    depositeData().then((res)=>{
      setDeposite(res)
    })
    if (document.readyState === "complete") {
      setTimeout(()=>{
          if(document.querySelector('.test')){
              document.querySelector('.test').remove()
          }
      },1500)
    }
    
  }, [reducer]);
  return (
    <div className='deposite'>
      <div className="test">
      {document.body.classList.contains('dark') === true?
      <img src="/loader/ezgif-4-d12af8c714.gif" alt="" /> 
      :
      <img src="/loader/ezgif.com-video-to-gif.gif" alt="" /> 
       }
      </div>
        <div className="depositSliderContinner">
          {
            number_of_resipe != 0 ?
            deposite.map((resipe)=>{
                return(
                  <div key={resipe.id} className="depositCarts" style={{right: `${scrollValue}px`}}>
                    <div className="resipe">
                      <img src={resipe.image} alt="" />
                    </div>
                    <div className="resipeData">
                      <div className="resipeTitle">Recipe must be</div>
                      <div className="clientName">{resipe.clientName}</div>
                      <div className="auctionNumber">
                        <div className="number">{resipe.auction_number}</div>
                        <div className="productName">{resipe.product_name}</div>
                      </div>
                      <div className="realPrice">Product Price: <span>{Math.floor(resipe.product_price)} $</span> </div>
                      <div className="percentage">Deposit percentage: <span>{resipe.deposit_percentage} %</span></div>
                      <div className="priceAfterPercentage">Deposite: <span>{resipe.deposit_price} $</span></div>
                      <div className="controller">
                        <div className="accept" onClick={()=>{handleAcceptDeposit(resipe.id)}}>Accept</div>
                        <div className="refuse" onClick={()=>{handleRefuseDeposit(resipe.id)}}>Refuse</div>
                      </div>
                    </div>
                  </div>
                )
              })
              : <div className="notFoundPage">No data for show</div>
          }
          
        </div>
        {
        number_of_resipe != 0 ?
          <div className="depositController">
            <div className="arrowLeft" onClick={()=>{handleLeftArrow()}}><KeyboardArrowLeftIcon/></div>
            <div className="slides">{currentResipe + 1 }/{number_of_resipe}</div>
            <div className="arrowRight" onClick={()=>{handleRightArrow()}}><KeyboardArrowRightIcon/></div>
          </div>
        :''
        }
    </div>
  )
}
