import Badge from '@mui/material/Badge';
import * as Icons from "react-icons/ri";
import * as Icons2 from "react-icons/fa";
import React from 'react';
import './style.css'
import { FavoriteOutlined, List, Notifications } from '@mui/icons-material';
import 'animate.css'
import { NavLink } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import { notify, auctionNotify } from '../../assists/Data/notification'
import { favoriteProduct } from '../../assists/Data/favorites'
import getCookies from '../../controller/moduls/getCookies'
import { navItems } from "./NavItem.js";
const Navbar = (props) => {
    const [clicked, setClicked] = useState(false)
    const [notificationClicked, setNotificationClicked] = useState(false)
    const [favoriteClicked, setFavoriteClicked] = useState(false)
    const handleSideBar = () =>{
        clicked ? setClicked(false) : setClicked(true)
        clicked ? props.sideBarAction(false) : props.sideBarAction(true)
    }
    const handleNotificationBtn = ()=>{
        if(favoriteClicked)
            setFavoriteClicked(false);
        notificationClicked ? setNotificationClicked(false) : setNotificationClicked(true)
    }
    const handleFavoriteBtn = ()=>{
        if(notificationClicked)
            setNotificationClicked(false);
        favoriteClicked ? setFavoriteClicked(false) : setFavoriteClicked(true)
    }

    const [mobile, setMobile] = useState(false);
    const [sidebar, setSidebar] = useState(false);
  
    useEffect(() => {
      if (window.innerWidth < 1065) {
        setMobile(true);
      }
    }, []);
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 1065) {
          setMobile(true);
        } else {
          setMobile(false);
          setSidebar(false);
        }
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  

    return (
        <div className='nv-container'>
            
            {!getCookies('username')?
            <>
            {!mobile && (
              <ul className="nav-items">
                {navItems.map((item) => {
                  return (
                    <li key={item.id} className={item.nName}>
                      <NavLink to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            )}
            </>
            :''}
        {mobile && !getCookies('username') &&
          <div className="sidebar-toggle">
            {sidebar ? (
              <Icons2.FaTimes
                className="sidebar-toggle-logo"
                onClick={() => setSidebar(!sidebar)}
              />
            ) : (
              <Icons2.FaBars
                className="sidebar-toggle-logo"
                onClick={() => setSidebar(!sidebar)}
              />
            )}
          </div>
        }
        {!getCookies('username')?
        <div className={sidebar ? "sidebar active" : "sidebar"}>
        <ul className="sidebar-items">
          {navItems.map((item) => {
            return (
            <NavLink to={item.path}>
              <li
                key={item.id}
                className={item.sName}
                onClick={() => setSidebar(false)}
              >
                <div className="subTitle">
                  <span>{item.title}</span>
                  <div className="subTitleIcon">
                    {item.icon}
                  </div>
                </div>
              </li>
            </NavLink>
            );
          })}
        </ul>
      </div>
      :''
      }
    <div className="nv-wrapper">
        <div className="nv-right">
            {getCookies('username') ? 
            <>
            <div className="nv-list" onClick={() => handleSideBar()}>
                <List/>
            </div>
            <div className="nv-fav">
            <Badge className='icon' onClick={()=>{handleNotificationBtn()}} badgeContent={1} color="primary">
                <Notifications/>
            </Badge>
            <div className={notificationClicked ? "menu active" : "menu"}>
                <div className="title">Notifications</div>
                <div className="continner">
                {
                    notify.map((x)=>{
                        return(
                            <div key={x.id} className="notification_continer">
                                <div className="image_Avater">
                                    <img src={x.avater} alt="" />
                                </div>
                                <div className="notification_info">
                                    <div className="notification_data">{x.from} <span>{x.at}</span></div>
                                    <div className="massage">{x.massage}</div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    auctionNotify.map((x)=>{
                        return(
                            <div key={x.id} className="notification_continer">
                                <div className="image_Avater">
                                    <img src={x.product_image} alt="" />
                                </div>
                                <div className="notification_info">
                                    <div className="notification_data">{x.product_name} <span>{x.finish_at}</span></div>
                                    <div className="massage">{x.massage}</div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            </div> 
            <div className="nv-fav">
                <Badge className='icon' onClick={()=>{handleFavoriteBtn()}} badgeContent={1} color="primary">
                    <FavoriteOutlined/>
                </Badge>
            <div className={favoriteClicked ? "menu active" : "menu"}>
                <div className="title">favorites</div>
                <div  className="continner">
                {
                    favoriteProduct.length != 0 ?
                    favoriteProduct.map(prduct =>{
                        return(
                            <div key={prduct.id} className="favorite_continer">
                                <div className="product_image">
                                    <img src={prduct.image[0]} alt="" />
                                </div>
                                <div className="favorite_info">
                                    <div className="favorite_name">{prduct.title}</div>
                                    <div className="favorite_time">{prduct.startTime}</div>
                                    <div className="favorite_payWay">{prduct.payWay}</div>
                                    <div className="favorite_price">{prduct.price} $</div>
                                </div>
                            </div>     
                        )
                    })
                    : 
                    <div className="notFound">No Data To Show</div>
                }
                </div>
            </div>
            </div>
            </>: <>
            </>}
        </div>
    </div>
    <div className="navbar-logo">
        <a href="/" onClick={() => setSidebar(false)}>
            Aucti<Icons.RiAuctionFill className='RiAuctionFill' />n
        </a>
    </div>
</div>
);
}

export default Navbar;
