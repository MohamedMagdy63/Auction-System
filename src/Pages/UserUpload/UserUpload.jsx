import "./UserUpload.css"
import * as React from 'react';
import {useState} from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Announcement from '../../Components/Announcement/Announcement';
import Sidebar from '../../Components/Sidebar/Sidebar';
import UserDragDrop from "../../Components/UserDrag&Drop/UserDrag&Drop";
import FullWidthTabs from "../../Components/UserUploadBar/UserUploadBar";
const UserUpload = (props) => {
    const [sideBarOpen, setSideBarOpen] = useState('')
    const [imagesArray, setImagesArray] = useState([])
    const [imagesFile, setImagesFile] = useState([])
    return (
        <>
        <Navbar sideBarAction = {setSideBarOpen} />
            <Announcement/>
            <Sidebar sidebarUserData={props.userInformation} sideBarState = {sideBarOpen}/>
        <div className="uploadContainer">
            <div className="leftContainer">
                <UserDragDrop imageURl={setImagesArray} imageFile={setImagesFile}/>
            </div>
            <div className="rightContainer">
                <div className="subRightContainerBar" >
                    <FullWidthTabs imageURL={imagesArray} imageFile={imagesFile}/>
                </div>
            </div>
        </div>
        </>
    );
}

export default UserUpload;
