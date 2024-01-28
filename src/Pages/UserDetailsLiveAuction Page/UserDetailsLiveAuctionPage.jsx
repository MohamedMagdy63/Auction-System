import React, { useState ,useEffect} from 'react';
import './LiveAuctionPage.css'
import Footer from '../../Components/Footer/Footer';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import Announcement from '../../Components/Announcement/Announcement';
import Newsletter from '../../Components/Newsletter/Newsletter';
import { NavLink, useParams } from 'react-router-dom';
import {productOfSchedualing,fetchProductBid}from '../../assists/Data/schadulingAuction'
import { productOfLive,fetchProductBidLive } from '../../assists/Data/liveAuction';
import { productOfInstant} from "../../assists/Data/instantProduct";
import styled from '@emotion/styled';
import { ArrowLeftOutlined, ArrowRightOutlined, FavoriteBorder } from '@mui/icons-material';
import { motion } from "framer-motion";
import { LiveTimer } from '../../SubComponents/LiveTimer/LiveTimer'
import { favoriteProduct } from '../../assists/Data/favorites'
import { useRef } from 'react';
import TableOfCarsUser from '../../Components/TableOfContentUser/TableOfCarsUser';
import Others from '../../Components/TableOfContentUser/Others';
import TableOfBuildingUser from '../../Components/TableOfContentUser/TableOfBuildingUser';
import TableOfPhonesUser from '../../Components/TableOfContentUser/TableOfPhonesUser';
import getCookies from '../../controller/moduls/getCookies';
import { DepositePop } from '../../Components/DepositePop/DepositePop';
import { checkDepositState, checkUserPayDeposit } from '../../controller/moduls/reviewDeposit';
import swal from 'sweetalert';
import { insertBid, insertReports, insertReportsBuyer, insertReportsSeller } from '../../controller/moduls/insertModule';
import { checkLastDepositeOfUser } from '../../controller/moduls/AuthModule';
import { updateBid, updateSoldBid } from '../../controller/moduls/UpdateModule';
import { LiveAuctionEffect } from '../../Components/LiveAuctionEffect/LiveAuctionEffect';
import io from 'socket.io-client'
import { sendmail } from '../../controller/moduls/sendMails';

const socket = io.connect("/")

const Arrow =styled.div`
width: 50px;
height: 50px;
background-color: #fff7f7;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
left:${props=>props.direction==="left" && "10px"};
right:${props=>props.direction==="right" && "10px"};
margin: auto;
cursor:pointer;
opacity:0.5;
z-index:2;
`

const handleFavoriteBtn = (id,arr) =>{
    favoriteProduct.push(arr[id-1])

}

const LiveAuctionPage = (props) => {
    const [categoryType,setCategoryType] = useState('')
    const onesRun = useRef(true)
    const oneRunEndAuction = useRef(true)
    const [products,setProducts]=useState([])
    const [productBid,setProductBid]=useState([])
    const {productId, productType} = useParams()
    const [sideBarOpen, setSideBarOpen] = useState('')
    const [chooes,setChooes] = useState(0)
    const [imageLength, setImageLength] = useState()
    const [width,setWidth] = useState(0)
    const [price, setPrice] = useState()
    const [initialPrice, setInitialPrice] = useState()
    const [StanderPrice, setStanderPrice] = useState()
    const [startAuction, setStartAuction] = useState()
    const [endAuction, setEndAuction] = useState()
    const [checkuserDeposite,setCheckuserDeposite] = useState([])
    const [auctionClients,setAuctionClients] = useState([])
    const [ownerUserProduct,setOwnerUserProduct] = useState([])
    const [userPayDepositeProduct,setUserPayDepositeProduct] = useState([])
    const [auctionStart, setAuctionStart] = useState(false)
    const [depositePopupState, setDepositePopupState] = useState(false)
    const [showBuyerData, setShowBuyerData] = useState(false)
    const [increaseValue, setIncreaseValue] = useState(5)
    const currentDate = useState(new Date())
    const carousal = useRef()
    const [lastBid, setLastBid] = useState(false)
    const [schaduleAuctionIsFinished, setSchaduleAuctionIsFinished] = useState(false)
    let productPayWay ;
    

    const fetchBidTable = (res) =>{
        fetchProductBidLive(productId,res[0].paywayId).then((data)=>{
            setProductBid(data)
            if(data.length === 0){
                setPrice(res[0].price)
            }else{
                setPrice(data[0].MONEY)
                setStanderPrice(data[0].MONEY)
            }
        })
    }
    const handleInputValue = (e)=>{
        if (e.target.value >=0){
            setIncreaseValue(e.target.value)
        }else{
            e.target.value = 0
        }
        
    }
    const handleBidBtn = (data)=>{
        if(productBid.length !== 0){
            if(productBid[0].NAME !== checkuserDeposite[0].USER_FIRST_LAST_NAME){
                checkLastDepositeOfUser(data[0].DEPOSITE_ID).then((results)=>{
                    console.log(results)
                    if(results.length !== 0){
                        updateBid(price,results[0].DEPOSITE_ID,results[0].BID_ID).then((out)=>{
                            if(out[0] === 'SUCCESSED'){
                                //////////////////////////////
                                socket.emit('newBid',{massage:'Bid'})
                                // fetchBidTable(products)
                                setLastBid(true)
                            }else{
                                console.log('Error when execute')
                            }
                        })
                    }else{
                        insertBid(price,data[0].DEPOSITE_ID).then((respose)=>{
                            if(respose[0] === 'SUCCESSED'){
                                socket.emit('newBid',{massage:'Bid'})
                                // fetchBidTable(products)
                                setLastBid(true)
                            }else{
                                console.log('Error when execute')
                            }
                        })
                    }
                })
            }else{
                swal("Information", `You can't bid right now, You are the highest bidder`, "info")
            }
        }else{
            checkLastDepositeOfUser(data[0].DEPOSITE_ID).then((results)=>{
                console.log(results)
                if(results.length !== 0){
                    updateBid(price,results[0].DEPOSITE_ID,results[0].BID_ID).then((out)=>{
                        if(out[0] === 'SUCCESSED'){
                            //////////////////////////////
                            socket.emit('newBid',{massage:'Bid'})
                            // fetchBidTable(products)
                            setLastBid(true)
                        }else{
                            console.log('Error when execute')
                        }
                    })
                }else{
                    insertBid(price,data[0].DEPOSITE_ID).then((respose)=>{
                        if(respose[0] === 'SUCCESSED'){
                            socket.emit('newBid',{massage:'Bid'})
                            // fetchBidTable(products)
                            setLastBid(true)
                        }else{
                            console.log('Error when execute')
                        }
                    })
                }
            })
        }
    }



    useEffect(()=>{
        setWidth(carousal.current.scrollWidth - carousal.current.offsetWidth)
        if(onesRun.current){
            onesRun.current=false
            window.scrollTo(0,0);
            if(productType === "Live")
            {
                productOfLive(productId).then((res)=>{
                    setCategoryType(res.mainArray[0].Category)
                    setStartAuction(new Date(res.mainArray[0].StartTime))
                    setEndAuction(0)
                    const time = Date.parse(res.mainArray[0].StartTime) - Date.now();
                    let day = Math.floor(time / (1000 * 60 * 60 * 24)) + 1
                    let Minutes = Math.floor((time / 1000 / 60) % 60) + 1
                    let hour = Math.floor((time / (1000 * 60 * 60)) % 24) + 1
                    let months = Math.floor(day / 31) + 1
                    let years = Math.floor(months / 12) + 1
                    // console.log(!day <= 0 && !Minutes <= 0 && !hour <= 0 && !months <= 0 && !years <= 0)
                    if(!day <= 0 && !Minutes <= 0 && !hour <= 0 && !months <= 0 && !years <= 0){
                        setAuctionStart(false)
                    }else{
                        setAuctionStart(true)
                    }
                    setProducts(res.mainArray)
                    setImageLength(res.mainArray[0].images.length)
                    setInitialPrice(res.mainArray[0].price)
                    res.currentUserData.map(data=>{
                        if(data.PRODUCT_ID == productId){
                            setCheckuserDeposite(oldArray => [...oldArray, data])
                        }
                    })
                    setOwnerUserProduct(res.ownerProduct)
                    fetchBidTable(res.mainArray)
                    setAuctionClients(res.clients)
                    socket.on('updatePrice',()=>{
                        fetchBidTable(res.mainArray)
                    })
                    if(getCookies('username')){
                        checkUserPayDeposit(res.mainArray[0].id).then((data)=>{
                            console.log(data)
                            setUserPayDepositeProduct(data)
                        })
                    }
                })
            } 
            else if(productType === "Schedule"){
                productOfSchedualing(productId).then((res)=>{
                    console.log(res)
                    setCategoryType(res.mainArray[0].Category)
                    setStartAuction(new Date(res.mainArray[0].StartTime))
                    const time = Date.parse(res.mainArray[0].StartTime) - Date.now();
                    let day = Math.floor(time / (1000 * 60 * 60 * 24)) + 1
                    let Minutes = Math.floor((time / 1000 / 60) % 60) + 1
                    let hour = Math.floor((time / (1000 * 60 * 60)) % 24) + 1
                    let months = Math.floor(day / 31) + 1
                    let years = Math.floor(months / 12) + 1
                    // console.log(!day <= 0 && !Minutes <= 0 && !hour <= 0 && !months <= 0 && !years <= 0)
                    if(!day <= 0 && !Minutes <= 0 && !hour <= 0 && !months <= 0 && !years <= 0){
                        setAuctionStart(false)
                    }else{
                        setAuctionStart(true)
                    }
                    setProducts(res.mainArray)
                    setImageLength(res.mainArray[0].images.length)
                    setEndAuction(new Date(res.mainArray[0].endTime))
                    setInitialPrice(res.mainArray[0].price)
                    
                    res.currentUserData.map(data=>{
                        if(data.PRODUCT_ID == productId){
                            setCheckuserDeposite(oldArray => [...oldArray, data])
                        }
                    })

                    setOwnerUserProduct(res.ownerProduct)
                    fetchBidTable(res.mainArray)
                    setAuctionClients(res.clients)
                    socket.on('updatePrice',()=>{
                        fetchBidTable(res.mainArray)
                    })
                    if(getCookies('username')){
                        checkUserPayDeposit(res.mainArray[0].id).then((data)=>{
                            console.log(data)
                            setUserPayDepositeProduct(data)
                        })
                    }
                })
            }
            else if(productType === "Instant"){
                productOfInstant(productId).then((res)=>{
                    setCategoryType(res.mainArray[0].Category)
                    setProducts(res.mainArray)
                    setPrice(res.mainArray[0].price)
                    setImageLength(res.mainArray[0].images.length)
                    setOwnerUserProduct(res.output)
                }) 
            }
        }
        // if auction Ended
        if(schaduleAuctionIsFinished){
            socket.emit('timeOutSchaduelAuction')
            socket.on('finishSchaduelAuction',()=>{
                if(oneRunEndAuction.current){
                    oneRunEndAuction.current = false
                    console.log("Alaona")
                    // 1) show massage with winner
                    if(productBid.length !== 0){
                        swal("Winner", `Congratolation ${productBid[0].NAME}, he/she is the winner`, "success")
                        // 2) update product from showing to sold
                        updateSoldBid(products[0].id).then(()=>{
                            // 4) send the winner data to buyer and visa revirce
                            //"ahmedgamal10122000@gmail.com"
                            if(productBid.length !== 0){
                                console.log(productBid[0])
                                sendmail(productBid[0].NAME,
                                        ownerUserProduct[0].USER_EMAIL,
                                        productBid[0].USER_EMAIL,
                                        productBid[0].USER_PHONE1,
                                        'The Winner').then((res)=>{
                                    if(res.code === 200){
                                        sendmail(ownerUserProduct[0].USER_FIRST_LAST_NAME,
                                                productBid[0].USER_EMAIL,
                                                ownerUserProduct[0].USER_EMAIL,
                                                ownerUserProduct[0].USER_PHONE1,
                                                'The owner of product').then((out)=>{
                                            if(out.code === 200){
                                                // 3) redirect all users to Home pages
                                                // setTimeout(() => {
                                                    
                                                    let clientArray = new Array()
                                                    auctionClients.map((cli)=>{
                                                        clientArray.push(cli.CLINT_ID)
                                                    })
                                                    insertReports(clientArray).then(()=>{
                                                        // 3) redirect all users to Home pages
                                                        insertReportsSeller(ownerUserProduct[0].CLINT_ID,productBid[0].BID_ID).then(()=>{
                                                            insertReportsBuyer(productBid[0].CLINT_ID,productBid[0].PRODUCT_ID).then(()=>{
                                                                window.location.href = '/'
                                                            })
                                                        })
                                                    })
                                                // }, 2000);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        
                    }else{
                        swal("Unfortunately", `No one win the auction`, "warning")
                        // 2) update product from showing to sold
                        updateSoldBid(products[0].id).then(()=>{
                            // eslint-disable-next-line no-array-constructor
                            let clientArray = new Array()
                            // eslint-disable-next-line array-callback-return
                            auctionClients.map((cli)=>{
                                clientArray.push(cli.CLINT_ID)
                            })
                            insertReports(clientArray).then(()=>{
                                window.location.href = '/'
                            })
                        })
                    }
                }
            })
        }
    })

    // const relatedProduct=productPayWay[Math.floor(Math.random()*10)]
    // const relatedProduct1=productPayWay[Math.floor(Math.random()*10)]
    // const relatedProduct2=productPayWay[Math.floor(Math.random()*10)]
    
    const handleClick = (direction,length) => {
        if(direction === 'right'){
            setChooes(chooes === length[0]-1  ? 0 : (chooes + 1))
        }else{
            setChooes(chooes === 0 ? length[0]-1  : (chooes - 1))
        }
    }
    const handelchooes = (x)=>{
        setChooes(x)
    }
    const handelIncreasePrice = () => {
        setPrice(parseInt(price) + parseInt(increaseValue))
    }
    const handelDecreasePrice = () => {
        if(price > StanderPrice)
            setPrice(parseInt(price) - parseInt(increaseValue))
    }
    const handlePayDepositeBtn =()=>{
        setDepositePopupState(true)
    }
    const handleInstantBtn = ()=> {
        console.log("Work")
        setShowBuyerData(true)
    }

    return (
        <>
            <Navbar sideBarAction = {setSideBarOpen} />
            <Announcement/>
            {props.userInformation ?
            <Sidebar sidebarUserData={props.userInformation} sideBarState = {sideBarOpen}/>
            :''
            }
            <div className="container">
                <div className='liveDetailsContainer'>
                    <div className="liveDetailsLeftContainer">
                        <div className="liveDetailsLeftTopContainer">
                        <Arrow className='arrowMedia' direction="left" onClick={()=>{handleClick('left',products.map((x)=>{return(x.images.length)}))}} >
                            <ArrowLeftOutlined/>
                        </Arrow>
                    
                        {
                        products.map((product)=>{
                        return(
                            product.id == productId ?
                            <div key={product.images[chooes]} className="imageHolder">
                                <img src={product.images[chooes]} className='liveImageContainer' alt="" />
                            </div>
                            : ''
                        )
                        })}
                        {/* <img src={categories[productId-1].image[0]} className='liveImageContainer' alt="" /> */}
                        <Arrow className='arrowMedia' direction="right" onClick={()=>handleClick('right',products.map((x)=>{return(x.images.length)}))}>
                            <ArrowRightOutlined/>
                        </Arrow>
                        </div>
                        <motion.div ref={carousal} className="carousel" whileTap={'grabbing'}>
                            <motion.div 
                            drag='x' 
                            dragConstraints={{right:0, left:-width}}
                            className="liveDetailsLeftBottomContainer" >
                                {
                                    products.map((x)=>{
                                        return(
                                            x.id == productId ?
                                            x.images.map((eachImage,index)=>{
                                                return(
                                                    <>
                                                        <motion.div key={eachImage} className='items' onClick={()=>{handelchooes(index)}}>
                                                            <img src={eachImage} className='liveImageContainer2' alt="" />
                                                        </motion.div>
                                                    </>
                                                )
                                            })
                                            : ''
                                        )
                                        
                                    })
                                }
                            </motion.div>
                        </motion.div>
                    </div>
                    <div className="dataMediaContainer">
                        <div className="liveNameOfPtodct">
                            {products.map((x)=>{return(x.Category)})}
                            
                        </div>
                        <div className="description">
                            {products.map((x)=>{return(x.title)})}
                            <br/>
                            {products.map((x)=>{return(x.desc)})}
                        </div>
                    </div>
                    <div className="liveDescripeOfPtodct">
                        {categoryType === "Cars"?
                        <div className="carsContainer">
                            {products.map((x)=>{return(
                                <TableOfCarsUser item={x}/>
                            )})}
                        </div>
                        :
                        categoryType === "Home"?
                        <div className="carsContainer">
                            {products.map((x)=>{return(
                                <TableOfBuildingUser item={x}/>
                            )})}
                        </div>
                        :
                        categoryType === "Mobiles"?
                        <div className="carsContainer">
                            {
                            products.map((x)=>{return(
                                <TableOfPhonesUser item={x}/>
                            )})
                            } 
                        </div>
                        :
                        products.map((x)=>{return(
                            <Others item={x}/>
                        )})
                        }
                    </div>
                    {/* bid part */}
                    {productType != "Instant" ?
                        <div className="liveTableOfUsers">
                            <div className="liveTableOfUsersTitle">Auction History</div>
                            
                            <table className="liveTableOfUsersTable">
                                <thead>
                                <tr className='liveHeader'>
                                    <th className='liveDate'>Date</th>
                                    <th>Bid</th>
                                    <th>User</th>
                                </tr>
                                </thead>
                                
                                <tbody>
                                    {productBid.map((bid,index)=>{
                                        const time = new Date(bid.BID_TIME)
                                        return(
                                        <tr key={index} className='liveBody'>
                                            <td className='liveDate'>{`${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}</td>
                                            <td>{bid.MONEY} Eg</td>
                                            <td>{bid.NAME}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            
                            {/* <div className="liveStartDate">
                                <div className="timeAndDateOfBegining">End date: {productPayWay[productId].endTime}</div>
                                <div className="titleBegining">Start date: {productPayWay[productId].startTime}</div>
                            </div> */}

                        </div>
                    : ''}

                </div>
                <div className="liveDetailsRightContainer">
                    <div className="projectLogo">{products.map((x)=>{return(x.payWay)})}</div>
                    <div className="dataContainer">
                        <div className="liveState">Item Condition : {products.map((x)=>{return(x.state)})}</div>
                        {productType != "Instant" ?<div>Auction ends at: {products.map((x)=>{return(x.StartTime)})} </div>:''}
                        <div className="liveAuctionEnd">Time Zone UTC/GMT</div>
                        <div className="priceTitle">Reserve price has been met</div>
                    </div>
                    {console.log(userPayDepositeProduct)}
                    {productType != "Instant" ?
                        getCookies('username') ?
                            auctionStart?
                                userPayDepositeProduct.length !== 0 ?
                                    <div className="liveButtonsContainer">
                                        <button className='buttonMinus' onClick={()=>{handelDecreasePrice()}}>-</button>
                                        <input type="number" className='liveInput' value={price} readOnly />
                                        <input type="number" className='liveInputValueIncrease' onChange={handleInputValue} placeholder={increaseValue}/>
                                        <button className='buttonAdd' onClick={()=>{handelIncreasePrice()}}>+</button>   
                                        <button className='buttonBid' onClick={()=>{handleBidBtn(userPayDepositeProduct)}}>Bid</button>                     
                                    </div>
                                :''
                            :<>
                                <div className="notStart">
                                    <p>The Auction dont start yet</p>
                                    {
                                    checkuserDeposite ?
                                        checkuserDeposite.length === 0 ?
                                            <button className='button-55' onClick={()=>{handlePayDepositeBtn()}}>Pay Deposite</button>
                                        : 
                                        checkuserDeposite[0].ACCEPTATION === null ?
                                        <div className='containerLoader'>
                                            <p>Wait Accept From Admin</p>
                                            <div className="progress">
                                            <div className="color"></div>
                                            </div>
                                        </div>
                                            // <div className="waitAnswer">Wait Accept From Admin <span></span><span></span><span></span></div>
                                        :
                                        checkuserDeposite[0].ACCEPTATION === 1 ?
                                            <div className="accepted">Accepted</div>
                                        :
                                        checkuserDeposite[0].ACCEPTATION === 0 ?
                                            <>
                                                <div className="resfuse">{checkuserDeposite[0].REFUSE_REASON}</div>
                                                <br />
                                                <button className='button-55' onClick={()=>{handlePayDepositeBtn()}}>Pay Deposite</button>
                                            </>
                                        : ''
                                    :
                                    ''
                                    }
                                </div>
                            </>
                        :<div className='noteDiv'>
                            You must Login To Bid
                            <NavLink className={'loginLink'} to={'/Login'}>
                                <div className="loginClass">Log in</div>
                            </NavLink>
                        </div>
                    :''}
                    <div className="favoriteContainer">
                        <div className='icon' onClick={()=>{handleFavoriteBtn(productId, productPayWay)}}>
                            <FavoriteBorder/> 
                        </div>
                        <h4>Add to your favorite list!</h4>
                    </div>
                    <div className="bidContainer">
                    {productType != "Instant" ?<div>Start Bid from {initialPrice} :Eg </div>:''}
                    {productType === "Instant" &&  !showBuyerData? getCookies('username') ? <button onClick={()=>{handleInstantBtn()}}>Buy now for Eg {products.map((x)=>{return(x.price)})} e.g</button>:<div className='note'>You Must Login To Show Owner Data</div>:''}
                    {showBuyerData ? 
                    <div className='sallerDataContiner'>
                        <div className="sallerName"><p>Saller Name:</p> <span>{ownerUserProduct[0].USER_FIRST_LAST_NAME}</span></div>
                        <div className="sallerPhone"><p>Saller Phone: </p><span>{ownerUserProduct[0].USER_PHONE1}</span></div>
                    </div> 
                    : ''}
                    </div>
                    {productType != "Instant" ?
                    <div className="timerContainer">
                        <LiveTimer 
                            stateAuction = {auctionStart}
                            stateAuctionF = {setAuctionStart}
                            auctionStartTime={startAuction}
                            auctionEndTime={endAuction}
                            currentStartTime={currentDate}
                            paywayProduct = {productType}
                            SchaduleIsFinished = {setSchaduleAuctionIsFinished}
                        />
                    </div>
                    :''}
                </div>
                {
                    depositePopupState ? <DepositePop popupState={setDepositePopupState} productPrice={price} productId={products[0].id}/> : ''
                }
                {
                    auctionStart && productType === "Live" && products.length !== 0? 
                    <LiveAuctionEffect auctionClientsData={auctionClients} productId={productId} productData={products} productOwner={ownerUserProduct}/>
                    : ''
                }
                
                
                
            
            </div>
                
            {/* 
                <div className="liveBottomContainer">
                <div className="titleOfContainer">
                    <h1>Related Products</h1>
                </div>
                <div className="titleLine">

                </div>
                </div> 
            */}
            {/* <div className="containerRelated">
                <div className="subContainer">
                    <div className="subImageContainer">
                        <img src={relatedProduct.image[0]}  alt="" />
                        <div className="imageLayout"></div>             
                        <p>{relatedProduct.payWay}</p>
                        <h3>{relatedProduct.title}</h3>
                        <button>Details</button>
                    </div>
                </div>
                <div className="subContainer">
                    <div className="subImageContainer">
                    <img src={relatedProduct1.image[0]}  alt="" />
                    <p>{relatedProduct1.payWay}</p>
                    <h3>{relatedProduct1.title}</h3>
                    <button>Details</button>
                    </div>
                </div>
                <div className="subContainer">
                    <div className="subImageContainer">
                    <img src={relatedProduct2.image[0]}  alt="" />
                    <p>{relatedProduct2.payWay}</p>
                    <h3>{relatedProduct2.title}</h3>
                    <button>Details</button>
                    </div>
                </div>
            </div> */}
            <Newsletter/>
            <Footer/>
        </>
    );
}

export default LiveAuctionPage;
