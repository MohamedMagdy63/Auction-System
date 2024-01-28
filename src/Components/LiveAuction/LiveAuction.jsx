import React from 'react';
import './style.css'
import ShopIcon from '@mui/icons-material/Shop';
import { NavLink } from 'react-router-dom';
const LiveAuction = ({item}) => {

    return (
        <div className="cat-container">
            <img src={item.image[0]} alt=""/>
            <div className="cat-layout"></div>
            <div className="cat-info">
                <div className="endTime">{new Date(item.startTime).getFullYear()} - {new Date(item.startTime).getMonth()+1} - {new Date(item.startTime).getDate()} , {new Date(item.startTime).getHours()}:{new Date(item.startTime).getMinutes()}:{new Date(item.startTime).getSeconds()}</div>
                <div className="cat-title">{item.title}</div>
                <div className="cat-price">{Math.floor(item.price)} Eg</div>
                <NavLink to={`liveAuction/${item.id}/Live`}>
                    <ShopIcon className='enter'/>
                </NavLink>
                </div>
            </div>
        );
    }

export default LiveAuction;
