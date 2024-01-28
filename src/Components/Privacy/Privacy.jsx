import React, { useEffect, useRef, useState } from 'react';
import './style.css'
import privacyImg from '../../assists/images/Privacy/image-removebg-preview.png'
import Navbar from '../Navbar/Navbar';
import Announcement from '../Announcement/Announcement';
import Sidebar from '../Sidebar/Sidebar';
import Footer from "../Footer/Footer";
import { getTerms } from '../../controller/moduls/GetData';
const Privacy = (props) => {
    const [sideBarOpen, setSideBarOpen] = useState('')
    const [termAndRule, setTermAndRule] = useState([])
    const oneRun = useRef(true)
    useEffect(()=>{
        if(oneRun.current){
            oneRun.current = false
            getTerms().then((data)=>{
                setTermAndRule(data)
            })
        }
    },[])
    return (
        <div className="privacyContainer">
            <Navbar sideBarAction = {setSideBarOpen} />
            <Announcement/>
            {props.userInformation ?
            <Sidebar sidebarUserData={props.userInformation} sideBarState = {sideBarOpen}/>
            :''
            }
            <div className="privacyContainerImg">
                <img src={privacyImg} className="privacyContainerImgItem" alt="Privacy Image" />
            </div>
            <div className="privacyContainerText">
                <h2>Hi There !</h2>
                {
                    termAndRule.length != 0 ?
                    <>
                        {
                            termAndRule.map((rule,index)=>{
                                return(
                                    <p key={index}>{index+1}- {rule.TERMS_AND_CONDITIONS}</p>
                                )
                            })
                        }
                    </>
                    :''
                }
            </div>
            <Footer/>
        </div>
    );
}

export default Privacy;
