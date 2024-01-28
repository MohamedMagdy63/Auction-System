import'./ReviewProduct.css'
// import {productRows} from '../../../assists/Data/ProductData'
import {useParams} from "react-router-dom";
import { useState , useRef, useEffect } from 'react';
import { AllProductsReviewDetails } from '../../../assists/Data/ProductData';
import { review, refuseReview } from '../../../controller/moduls/reviewProduct';
import io from 'socket.io-client'
import { insertDeposite, insertDepositeBuyer } from '../../../controller/moduls/insertModule';
import { getPersentageByuer } from '../../../controller/moduls/GetData';
import swal from 'sweetalert';

const socket = io.connect("/")
const ReviewProduct = () => {
    const [payWay,setPayway]=useState()
    const {productid} = useParams()
    const [chooes,setChooes] = useState(0)
    const handelchooes = (x)=>{
        setChooes(x)
    }
  const onesRun = useRef(true)
  const [ productRows, setRows] = useState([])

  const handelAcceptProduct = (id,price,client,payWay)=>{
    let depositePrice = 0
    review(productid).then((data)=>{
        if(payWay !== "Instant"){
            getPersentageByuer().then((out)=>{
                depositePrice = price * out[0].PERCENTAGE
                insertDepositeBuyer(id,depositePrice,client).then((data)=>{
                    console.log(data)
                    if(data[0] == 'SUCCESSED')
                    {
                        swal("Done!", `Sccessfull accept`, "success", {button: false})
                        setTimeout(() => {
                            window.location.href = '/Products'
                        }, 2000);
                    }
                    else
                    {
                        swal("Error", "Some thing error", "error")
                    }
                })
            })
        }else{
            if(data[0] == 'SUCCESSED')
            {
                swal("Done!", `Successfully accepted`, "success", {button: false})
                setTimeout(() => {
                    window.location.href = '/Products'
                }, 2000);
            }
            else
            {
                swal("Error", "Some thing error", "error")
            }
        }
    })
    // socket.emit("adminAcceptProduct",(id))
  }
  const handelRefuseProduct = (id,price,client)=>{
    let depositePrice = 0
    refuseReview(productid).then((data)=>{
        if(data[0] == 'SUCCESSED')
        {
            swal("Done!", `Successfully accepted`, "success", {button: false})
            setTimeout(() => {
                window.location.href = '/Products'
            }, 2000);
        }
        else
        {
            swal("Error", "Some thing error", "error")
        }
    })
  }
  useEffect(() => {
    if(onesRun.current){
      onesRun.current = false
      AllProductsReviewDetails(productid).then((res)=>{
        setRows(res)
        console.log(res)
      })
    }
    if (document.readyState === "complete") {
        setTimeout(()=>{
            if(document.querySelector('.test')){
                document.querySelector('.test').remove()
            }
        },1500)
      }  
  }, []);
  return (
    <div className='reviewProduct'>
        <div className="test">
        {document.body.classList.contains('dark') === true?
        <img src="/loader/ezgif-4-d12af8c714.gif" alt="" /> 
        :
        <img src="/loader/ezgif.com-video-to-gif.gif" alt="" /> 
        }    
        </div>
        <div className="infoContiner">
            <div className="prductImages">
                <div className="slider">
                    {
                        productRows.map((image)=>{
                            return(
                                image.image.map((eachImage,index)=>{
                                    return(
                                        <div key={index} onClick={()=>{handelchooes(index)}} className={index === chooes ? "imageSlider active" : "imageSlider"}>
                                            <img src={eachImage} alt="" />
                                        </div>
                                    )
                                })
                            )
                        })
                    }
                </div>
                <div className="imageProvider">
                    {productRows.map((product,index)=>{
                        return(
                            <div key={index} className="imageHolder">
                                <img src={product.image[chooes]} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="productData">
                {productRows.map((product,index)=>{
                    return(
                        <div key={index}>
                            <div className="mainData">
                                <div className="brand">{product.brand}</div>
                                <div className="name">{product.title}</div>
                                <div className="model">{product.model}</div>
                            </div>
                            <div className="description">{product.desc}</div>
                            <div className="secData">
                                {product.color ? 
                                <div className="data">
                                    <div className="head">Color</div>
                                    <div className="value">{product.color}</div>
                                </div>
                                :''}
                                {product.size ? 
                                <div className="data">
                                    <div className="head">Size</div>
                                    <div className="value">{product.size}</div>
                                </div>
                                :''}
                                {product.state ? 
                                <div className="data">
                                    <div className="head">Status</div>
                                    <div className="value">{product.state}</div>
                                </div>
                                :''}
                                {product.payWay ? 
                                <div className="data">
                                    <div className="head">PayWay</div>
                                    <div className="value">{product.payWay}</div>
                                </div>
                                :''}
                                {product.matrial ? 
                                <div className="data">
                                    <div className="head">Material</div>
                                    <div className="value">{product.matrial}</div>
                                </div>
                                :''}
                                {product.Category ? 
                                <div className="data">
                                    <div className="head">Category</div>
                                    <div className="value">{product.Category}</div>
                                </div>
                                :''}
                                {product.storage ? 
                                <div className="data">
                                    <div className="head">Storage</div>
                                    <div className="value">{product.storage}</div>
                                </div>
                                :''}
                                {product.startTime ? 
                                <div className="data">
                                    <div className="head">Auction Start</div>
                                    <div className="value">{new Date(product.startTime).getDate()}/{new Date(product.startTime).getMonth() + 1}/{new Date(product.startTime).getFullYear()}  {new Date(product.startTime).getHours()}:{new Date(product.startTime).getMinutes()}:{new Date(product.startTime).getSeconds()}</div>
                                </div>
                                :''}
                                {product.UPLOAD_DATE ? 
                                <div className="data">
                                    <div className="head">Upload</div>
                                    <div className="value">{new Date(product.UPLOAD_DATE).getDate()}/{new Date(product.UPLOAD_DATE).getMonth() + 1}/{new Date(product.UPLOAD_DATE).getFullYear()}  {new Date(product.UPLOAD_DATE).getHours()}:{new Date(product.UPLOAD_DATE).getMinutes()}:{new Date(product.UPLOAD_DATE).getSeconds()}</div>
                                </div>
                                :''}
                                {product.SCREEN_RESOLUTION ? 
                                <div className="data">
                                    <div className="head">Screen resolution</div>
                                    <div className="value">{product.SCREEN_RESOLUTION}</div>
                                </div>
                                :''}
                                {product.VEHICLE_CC ? 
                                <div className="data">
                                    <div className="head">CC</div>
                                    <div className="value">{product.VEHICLE_CC}</div>
                                </div>
                                :''}
                                {product.VEHICLE_CLASS ? 
                                <div className="data">
                                    <div className="head">Class</div>
                                    <div className="value">{product.VEHICLE_CLASS}</div>
                                </div>
                                :''}
                                {product.VEHICLE_FUEL_TYPE_NAME ? 
                                <div className="data">
                                    <div className="head">Fual type</div>
                                    <div className="value">{product.VEHICLE_FUEL_TYPE_NAME}</div>
                                </div>
                                :''}
                                {product.VEHICLE_GEAR_STICK ? 
                                <div className="data">
                                    <div className="head">Gear stick</div>
                                    <div className="value">{product.VEHICLE_GEAR_STICK}</div>
                                </div>
                                :''}
                                {product.VEHICLE_HORSE_POWER ? 
                                <div className="data">
                                    <div className="head">Horse power</div>
                                    <div className="value">{product.VEHICLE_HORSE_POWER}</div>
                                </div>
                                :''}
                                {product.VEHICLE_INTERCHANGE_PARTNUMBER ? 
                                <div className="data">
                                    <div className="head">Interchange number</div>
                                    <div className="value">{product.VEHICLE_INTERCHANGE_PARTNUMBER}</div>
                                </div>
                                :''}
                                {product.VEHICLE_MANUFACTURE_COUNTRY ? 
                                <div className="data">
                                    <div className="head">Manufacture country</div>
                                    <div className="value">{product.VEHICLE_MANUFACTURE_COUNTRY}</div>
                                </div>
                                :''}
                                {product.VEHICLE_MANUFACTURE_YEAR ? 
                                <div className="data">
                                    <div className="head">Manufacture year</div>
                                    <div className="value">{product.VEHICLE_MANUFACTURE_YEAR}</div>
                                </div>
                                :''}
                                {product.VEHICLE_MILEAGE ? 
                                <div className="data">
                                    <div className="head">Mileage</div>
                                    <div className="value">{product.VEHICLE_MILEAGE}</div>
                                </div>
                                :''}
                                {product.VEHICLE_MODEL ? 
                                <div className="data">
                                    <div className="head">Model</div>
                                    <div className="value">{product.VEHICLE_MODEL}</div>
                                </div>
                                :''}
                                {product.VEHICLE_STRUCTURE ? 
                                <div className="data">
                                    <div className="head">Structure</div>
                                    <div className="value">{product.VEHICLE_STRUCTURE}</div>
                                </div>
                                :''}
                                {product.WATER_RESISTANCE ? 
                                <div className="data">
                                    <div className="head">Water resistance</div>
                                    <div className="value">{product.WATER_RESISTANCE}</div>
                                </div>
                                :''}
                                {product.BUILDING_FLOOR ? 
                                <div className="data">
                                    <div className="head">Floor</div>
                                    <div className="value">{product.BUILDING_FLOOR}</div>
                                </div>
                                :''}
                                {product.BUILD_AREA ? 
                                <div className="data">
                                    <div className="head">Area</div>
                                    <div className="value">{product.BUILD_AREA}</div>
                                </div>
                                :''}
                                {product.BUILD_DECORATION ? 
                                <div className="data">
                                    <div className="head">Decoration</div>
                                    <div className="value">{product.BUILD_DECORATION}</div>
                                </div>
                                :''}
                                {product.BUILD_LOCATION ? 
                                <div className="data">
                                    <div className="head">Location</div>
                                    <div className="value">{product.BUILD_LOCATION}</div>
                                </div>
                                :''}
                                {product.BUILD_ROOMS_NUMBER ? 
                                <div className="data">
                                    <div className="head">Rooms</div>
                                    <div className="value">{product.BUILD_ROOMS_NUMBER}</div>
                                </div>
                                :''}
                                {product.BUILD_TYPE_NAME ? 
                                <div className="data">
                                    <div className="head">Build type</div>
                                    <div className="value">{product.BUILD_TYPE_NAME}</div>
                                </div>
                                :''}
                            </div>
                            <div className="control">
                                {product.price ? 
                                    <div className="price">{product.price} E.L</div>
                                : product.initial_price ?
                                    <div className="price">{product.initial_price} E.L</div>
                                :''
                                }
                                <div className="actions">
                                    {console.log(product)}
                                    <button className="accept" onClick={()=>{handelAcceptProduct(product.id,product.initial_price,product.clientID,product.payWay)}}>Accept</button>
                                    <button className="refuse" onClick={()=>{handelRefuseProduct(product.id,product.initial_price,product.clientID)}}>Refuse</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default ReviewProduct