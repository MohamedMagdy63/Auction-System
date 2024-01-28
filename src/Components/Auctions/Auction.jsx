import React from 'react';
import LiveAuction from '../LiveAuction/LiveAuction'
import './style.css'



const Catogery = (props) => {
    return (
        <div className="cats-cont">
            {
                props.liveAuctionProduct.map((item,index)=>(
                    index < 3 ? 
                    <LiveAuction item={item} key={item.id}/>
                    : ''
                ))
            }
        </div>
    );
}

export default Catogery;
