import './LiveTimer.css'
import React,{useState,useEffect, useRef} from "react";

export const LiveTimer =(props)=>{
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minuts, setMinuts] = useState(0);
    const [seconds, setSeconds] = useState(0);
    // console.log(props.stateAuction)
    const runOnes = useRef(true)

    const getTime = () => {
        let time
        if(!props.stateAuction){
            time = Date.parse(props.auctionStartTime) - Date.now();
        }else{
            time = Date.parse(props.auctionEndTime) - Date.now();
        }
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinuts(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(()=>{
        if(props.paywayProduct === 'Schedule'){
            // console.log(props.stateAuction)
            if(props.stateAuction){
                const interval = setInterval(() => getTime(), 1000);
                // console.log(days+" "+hours+" "+minuts+" "+seconds)
                if(days <= 0 && hours <= 0 && minuts <= 0 && seconds <= 0){
                    // console.log('Auction Ended')
                    props.SchaduleIsFinished(true)
                    setDays('00');
                    setHours('00');
                    setMinuts('00');
                    setSeconds('00');
                    clearInterval(interval)
                }else{
                    // console.log('Not Ended Untill Now')
                }
                return () => clearInterval(interval);
            }else{
                getTime(props.auctionStartTime)
                const interval = setInterval(() => getTime(props.auctionStartTime), 1000);
                // console.log(days+" "+hours+" "+minuts+" "+seconds)
                if(days === 0 && hours === 0 && minuts === 0 && seconds === 0){
                    props.stateAuctionF(true)
                }else{
                    props.stateAuctionF(false)
                }
                return () => clearInterval(interval);
            }
        }else{
            if(!props.auctionEndTime && props.stateAuction){
                setDays('00');
                setHours('00');
                setMinuts('00');
                setSeconds('00');
                return
            }else{
                const interval = setInterval(() => getTime(props.auctionStartTime), 1000);
                // console.log(days+" "+hours+" "+minuts+" "+seconds)
                if(days === 0 && hours === 0 && minuts === 0 && seconds === 0){
                    if(!props.auctionEndTime){
                        props.stateAuctionF(true)
                    }
                }else{
                    props.stateAuctionF(false)
                }
                return () => clearInterval(interval);
            }
        }
    })
    return(
        <div className="TimerContainer">
            <div className="liveTimer">
                {days}
            </div>
            <p>days</p>
            <div className="liveTimer">
                {hours}
            </div>
            <p>hours</p>
            <div className="liveTimer">
                {minuts}
            </div>
            <p>minuts</p>
            <div className="liveTimer">
                {seconds}
            </div>
            <p>seconds</p>     
        </div>
    )
}