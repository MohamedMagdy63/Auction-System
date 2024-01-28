import React from 'react';
import "./FavoriteButton.css"
import Popup from 'reactjs-popup';
import {FavoriteBorderOutlined} from "@mui/icons-material";
import { NavLink } from 'react-router-dom';
import LeftSlideImage from "../../assists/images/popUps/e8fec05b98afd5c58ef3f3ef59a7b074.jpg"
const FavoriteLogin = () => {
    return (
        <Popup
        trigger={<FavoriteBorderOutlined />}
        modal
        nested
    >
    {close => (
    <div className="favContainer">
        <button className="close" onClick={close}>
        &times;
        </button>
        <div className="leftContainer">
            <img src={LeftSlideImage} alt="" />
        </div>
        <div className="reightContainer">
        <div className="header"> Join us! </div>
        <div className="content">
            Create account or log in your account to enjoy with favorite items list..
        </div>
        
        <div className="actions">
        <NavLink className="NavLinkItem" to="/Login">
            <button className="button"> Log In </button>
        </NavLink>
        <NavLink className="NavLinkItem" to="/signin">
            <button className="button">Sign up</button>
        </NavLink>
        </div>
        </div>
       
        </div>
        )}
    </Popup>
    );
}

export default FavoriteLogin;
