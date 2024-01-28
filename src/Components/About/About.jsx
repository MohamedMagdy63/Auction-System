import React, { Component } from 'react';
import './style.css'
import ImgContainer from '../../assists/images/About/gavel-3577254_1920.jpg'
import Avatar from '../../SubComponents/Avatar/Avatar';
import M_Magdy from '../../assists/images/aboutImages/megz.jpeg'  
import M_Adel from '../../assists/images/aboutImages/151880731_1805642846260004_1857836745440737480_n.jpg'  
import E_Shokry from '../../assists/images/aboutImages/50529e44-fbb5-43e4-9edc-3b89ecbaa2dd.jpg'  
import A_G from '../../assists/images/aboutImages/309710846_2999678066998367_8926037082331862943_n.jpg'  
import Z_Ashraf from '../../assists/images/aboutImages/139521083_1310259156003743_4367094470551779500_n.jpg'  
import {
    Facebook,
    GitHub,
    Instagram,
    LinkedIn,
  } from "@mui/icons-material";
class About extends Component {
    render() {
        return (
            <div className='aboutContainer'>
                <img src={ImgContainer} className='aboutImgContainer' alt=""/>
                <div className="layout"></div>
                <div className="aboutTitle">About Us</div>
                <div className="aboutDescribe">We are an individual college team look forwards to develope and maintain an interactive website for makes auctions more easy from doing in tradition way. </div>
                <div className="aboutAimTitle">Our Aim</div>
                <div className="aboutAimDescribe">We are the founder of The Auction System in our country, and our aim to be in all world connect seller to buyer and make a greatful auctions.</div>
                <div className="centerContainer">
                    <div className="bigContainer">
                        <div className="blockContainer">
                            <div className="containerTitle">Strategy</div>
                            <div className="containerDescription">
                            1. Prioritize user experience, trust, and security while offering comprehensive auction listings and transparent information.
                            <br/>
                            2. Implement effective marketing strategies, strategic auction scheduling, and responsive customer support to build a thriving auction community.
                            </div>
                        </div>
                        <div className="blockContainer">
                            <div className="containerTitle">Opportunities</div>
                            <div className="containerDescription">
                            1. Capitalize on the growing demand for online auctions by creating an innovative platform that offers seamless user experience and a wide range of auction listings.
                            <br />
                            2. Leverage digital marketing channels and strategic partnerships to drive traffic, attract buyers and sellers, and establish your auction website as a trusted and prominent player in the market.
                            </div>
                        </div>
                        <div className="blockContainer">
                            <div className="containerTitle">Marketing plan</div>
                            <div className="containerDescription">
                            1. Utilize targeted digital marketing campaigns, including social media advertising and email marketing, to reach and engage potential buyers and sellers, driving traffic to your auction website.
                            <br />
                            2. Collaborate with influencers, industry experts, and relevant communities to generate buzz, increase brand awareness, and establish your auction website as a go-to platform for auctions.
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="titleContainer">
                    <div className="stratigy">
                        <div className='title'>Achieved by: </div >
                    </div>
                </div>
                <div className="avatar">
                <Avatar/>
                </div>
                
                <div className="blackCardContainer">
                    <div className="blackCardTitle">
                        <p className='title_p'>Contacts</p>
                        <h2 className='title_h2'>A Team of Professionals</h2>
                        <div className='title_div'></div>
                    </div>
                    <div className="continersCards">
                        <div className="blackCardBlocks">
                            <div className="blackCardItem">
                                <img src={A_G} alt="Ahmed Gamal" className='aboutImage'/>
                                <div className="aboutOurTeam">
                                    <p><span>Ahmed gamal</span></p>
                                    <p>A Full Stack developer develops and maintain backend and frontend of our system</p>
                                    <p>Social Media :</p>
                                    <div className="socialContainer">
                                        <Facebook />
                                        <Instagram />
                                        <GitHub />
                                        <LinkedIn/>
                                    </div>
                                </div>
                            </div>
                            <div className="blackCardItem">
                                <img src={M_Magdy} alt="Mohamed magdy" className='aboutImage'/>
                                <div className="aboutOurTeam">
                                    <p><span>Mohamed Magdy</span></p>
                                    <p>A Full Stack developer develops and maintains frontend and backend of our system</p>
                                    <p>Social Media :</p>
                                    <div className="socialContainer">
                                        <Facebook />
                                        <Instagram />
                                        <GitHub />
                                        <LinkedIn/>
                                    </div>
                                </div>
                            </div>
                            <div className="blackCardItem">
                                <img src={Z_Ashraf} alt="Zeyad Ashraf" className='aboutImage'/>
                                <div className="aboutOurTeam">
                                    <p><span>Zeyad ashraf</span></p>
                                    <p>A Computer Engineer, Database designer and data entry</p>
                                    <p>Social Media :</p>
                                    <div className="socialContainer">
                                        <Facebook />
                                        <Instagram />
                                        <GitHub/>
                                        <LinkedIn />
                                    </div>
                                </div>
                            </div>
                            <div className="blackCardItem">
                                <img src={E_Shokry} alt="Eslam mohamed " className='aboutImage'/>
                                <div className="aboutOurTeam">
                                    <p><span>Eslam mohamed</span></p>
                                    <p>A Computer Engineer who developes python scripts and data entry </p>
                                    <p>Social Media :</p>
                                    <div className="socialContainer">
                                        <Facebook />
                                        <Instagram />
                                        <GitHub />
                                        <LinkedIn/>
                                    </div>
                                </div>
                            </div>
                            <div className="blackCardItem">
                                <img src={M_Adel} alt="Mohamed adel" className='aboutImage'/>
                                <div className="aboutOurTeam">
                                    <p><span>Mohamed adel</span></p>
                                    <p>A Computer Engineer collects data</p>
                                    <p>Social Media :</p>
                                    <div className="socialContainer">
                                        <Facebook />
                                        <Instagram />
                                        <GitHub />
                                        <LinkedIn/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
