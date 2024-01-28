import React, { useEffect, useRef, useState } from 'react';
import Announcement from '../../Components/Announcement/Announcement';
import Navbar from '../../Components/Navbar/Navbar';
import Slider from '../../Components/Slider/Slider';
import Catogery from '../../Components/Auctions/Auction'
import Products from '../../Components/Products/Products';
import Footer from '../../Components/Footer/Footer';
import Newsletter from '../../Components/Newsletter/Newsletter';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Home.css'
import { LiveProducts } from '../../assists/Data/liveAuction';
import { ProductImage } from '../../assists/Data/instantProduct';
import { getReportRequire, getTrindingProduct, getUserProduct } from '../../controller/moduls/GetData';
import getCookies from '../../controller/moduls/getCookies';
import { Feedback } from '../Feedback/Feedback';
const Home = (props) => {
    const oneRun = useRef(true)
    const [product,setProduct] = useState([])
    const [productInstant,setProductInstant] = useState([])
    const [notficationData,setNotficationData] = useState('')
    const [feedbackPopup,setFeedbackPopup] = useState(false)
    const [reportRequire,setReportRequire] = useState([])
    const [trindingProduct,setTrindingProduct] = useState('')
    var numberOfProduct = 0
    useEffect(()=>{
       window.scrollTo(0,0);
        if(oneRun.current){
            oneRun.current = false
            LiveProducts().then((res)=>{
                setProduct(res)
                ProductImage().then((output)=>{
                    setProductInstant(output)
                    getTrindingProduct().then((trind)=>{
                        console.log(trind)
                        setTrindingProduct(trind[0].CATEGORY_NAME)
                    })
                    if(getCookies('username')){
                        getUserProduct().then((data)=>{
                            data.map((userProduct)=>{
                                if(userProduct.ACCEPTATION !== null || 
                                    userProduct.DEPOSITACCEPTATION !== null || 
                                    userProduct.DEPOSITSEEN !== 1 || 
                                    userProduct.REVIEWSEEN !== 1){
                                        numberOfProduct += 1
                                }
                            })
                            setNotficationData(numberOfProduct)
                            setFeedbackPopup(true)
                            getReportRequire().then((results)=>{
                                setReportRequire(results.rateRequireArray)
                            })
                        })
                    }
                })
            })
        }
        
        setTimeout(()=>{
            if(document.querySelector('.test')){
                document.querySelector('.test').remove()
            }
        },7000)
    },[])
    const [sideBarOpen, setSideBarOpen] = useState('')
    const [categories, setCategories] = useState([])
    return (
        <div className='homeContainer'>
            <div className="test"><video src="/loader/logo_3.mp4" autoPlay alt="" /></div>
            <Navbar  sideBarAction = {setSideBarOpen} />           
            <Announcement/>
            {props.userInformation ?
            <Sidebar sidebarUserData={props.userInformation} notificat={notficationData} sideBarState = {sideBarOpen}/>
            :''
            }
            <Slider/>
            <div className="homeTitle">Trending Live Auction</div>
            <div className="line"></div>
            <Catogery liveAuctionProduct={product}/>
            <div className="homeTitle">Trending instant product</div>
            <div className="line"></div>
            <Products trinding = {trindingProduct} allInstantProduct = {productInstant} typeOfProduct={true}/>
            <Newsletter/>
            <Footer/>
            {reportRequire.length !== 0 ?
            feedbackPopup ? <Feedback skipFeedback={setFeedbackPopup} reportData={reportRequire}></Feedback> : ''
            :''}
        </div>
    );
}

export default Home;
