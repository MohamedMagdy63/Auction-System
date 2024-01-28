import './LiveAuctionEffect.css'
import { useEffect, useRef, useState } from 'react'
import { fetchProductBidLive } from '../../assists/Data/liveAuction'
import swal from 'sweetalert';
import { updateSoldBid } from '../../controller/moduls/UpdateModule';
import { insertReports, insertReportsBuyer, insertReportsSeller } from '../../controller/moduls/insertModule';
import { sendmail } from '../../controller/moduls/sendMails';
import io from 'socket.io-client'

const socket = io.connect("/")

export const LiveAuctionEffect = (props) => {
    const [productBid,setProductBid]=useState([])
    const [lastBidTime,setLastBidTime]=useState()
    const oneRun = useRef(true)
    const oneRunEndAuction = useRef(true)

    const fetchBidTable = async() =>{
        fetchProductBidLive(props.productId,props.productData[0].paywayId).then(async(data)=>{
            if(data.length !== 0){
                setProductBid(data)
                setLastBidTime(new Date(data[0].BID_TIME)) 
            }
        })
    }

    useEffect(()=>{
        // debounceFn()
        if(oneRun.current){
            oneRun.current =false;
            fetchBidTable()
            socket.on('newEffect',()=>{
                fetchBidTable()
            })
            socket.on('finishAuction',(productBidData)=>{
                if(oneRunEndAuction.current){
                    oneRunEndAuction.current = false
                    swal("Winner", `Congratolation ${productBidData.data[0].NAME}, he/she is the winner`, "success")
                    updateSoldBid(props.productData[0].id)
                    if(productBidData){
                        sendmail(productBidData.data[0].NAME,
                                props.productOwner[0].USER_EMAIL,
                                productBidData.data[0].USER_EMAIL,
                                productBidData.data[0].USER_PHONE1,
                                'The Winner').then((res)=>{
                            if(res.code === 200){
                                sendmail(props.productOwner[0].USER_FIRST_LAST_NAME,
                                        productBidData.data[0].USER_EMAIL,
                                        props.productOwner[0].USER_EMAIL,
                                        props.productOwner[0].USER_PHONE1,
                                        'The owner of product').then((out)=>{
                                    if(out.code === 200){
                                        let clientArray = new Array()
                                        props.auctionClientsData.map((cli)=>{
                                            clientArray.push(cli.CLINT_ID)
                                        })

                                        insertReports(clientArray).then(()=>{
                                            insertReportsSeller(props.productOwner[0].CLINT_ID,productBidData.data[0].BID_ID).then(()=>{
                                                insertReportsBuyer(productBidData.data[0].CLINT_ID,productBidData.data[0].PRODUCT_ID).then(()=>{
                                                    window.location.href = '/'
                                                })
                                            })
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
        setInterval(() => {
            if(lastBidTime){
                const now = new Date()
                const test = new Date(now.getTime() - lastBidTime.getTime())
                console.log(test.getMinutes())
                if(test.getMinutes() >= 3){
                    socket.emit('timeOut',{"data":productBid})
                }
            }
        }, 1000);
    },[socket,lastBidTime])

  return (
    <div className='liveAuctionEffect'>
        <div className="liveAuctionContiner">
            {
                productBid.map((bid)=>{
                    const time = new Date(bid.BID_TIME)
                    return(
                    <div key={bid.NAME} className="bidCard">
                        <div className="dataContiner">
                            <div className="dataContinerUser">{bid.NAME}</div>
                            <div className="dataContinerDate">{`${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}</div>
                            <div className="dataContinerBid">{bid.MONEY}</div>
                        </div>
                        
                    </div>
                    )
                })
            }
            
        </div>
    </div>
  )
}
