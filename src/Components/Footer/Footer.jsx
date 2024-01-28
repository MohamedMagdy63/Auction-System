import './style.css'
import styled from "@emotion/styled";
import {
    Facebook,
    GitHub,
    Instagram,
    LinkedIn,
    Twitter,
  } from "@mui/icons-material";
  import { NavLink } from 'react-router-dom';  
  const SocialIcon = styled.div`
    width: 50px;
    height: 35px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
  `;
  
  
  const Footer = () => {
    return (
      <div className="footerContainer">
        <div className="socialContainer">
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="000">
            <GitHub />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <LinkedIn />
          </SocialIcon>
        </div>
        <div className="footerProduct">
          <h3><NavLink className="hyberlink" to="/Privacy">TERMS & CONDITIONS</NavLink></h3>
          <h3><NavLink className="hyberlink" to="/About">ABOUT US</NavLink></h3>
        </div>
      </div>
    );
  };
  
  export default Footer;