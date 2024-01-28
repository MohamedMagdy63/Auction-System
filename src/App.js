import './App.css';
import Action_Product from './Pages/Action_Product';
import Categories from './Pages/Categories';
import ActionSchadulingPage from './Pages/ActionSchadulingPage'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AboutUs from './Pages/AboutPage';
import Privacy from './Components/Privacy/Privacy';
import Setting from './Pages/Setting/Setting';

//////// Admin ////////
import { NavbarAdmin } from "./Components/NavbarAdmin/NavbarAdmin";
import { SettingBar } from './Components/settingBar/SettingBar';
import React, { useEffect, useRef, useState } from 'react'
import { SidebarAdmin } from "./Components/SidebarAdmin/SidebarAdmin";

import { HomeAdmin } from './Pages/Admin/HomeAdmin/HomeAdmin.jsx'
import ProductListAdmin  from './Pages/Admin/productListAdmin/ProductListAdmin.jsx'
import UserList from "./Pages/Admin/users/UserList";
import User from "./Pages/Admin/user/User";
import Unauthorized from './Pages/Admin/Unauthorized/Unauthorized';
import Permission from "./Pages/Admin/Permission/Permission"
import Transaction from "./Pages/Admin/Transaction/Transaction"
import Reports from "./Pages/Admin/Reports/Reports"
import Mail from "./Pages/Admin/Mail/Mail"
import AddEmployee from "./Pages/Admin/AddEmployee/AddEmployee"
import ReviewProduct from './Pages/Admin/ReviewProduct/ReviewProduct';
import ChangeCategoryImage from './Pages/Admin/ChangeCategoryImage/ChangeCategoryImage';
import { Deposite } from './Pages/Admin/Deposite/Deposite';

import {allLinks} from './assists/Data/Data'
import { Links } from './assists/Data/PagePermision'
import UserUpload from './Pages/UserUpload/UserUpload';
import LiveAuctionPage from './Pages/UserDetailsLiveAuction Page/UserDetailsLiveAuctionPage';
import getCookies from './controller/moduls/getCookies'
import { NotFoundPage } from './Pages/NotFoundPage';
import { getSessionData } from './controller/moduls/AuthModule'
import { getAdminPermissionPages } from './controller/moduls/AuthModule'
import Login from './Pages/Login/Login';
import Signin from './Pages/SignUp/Signin';
import Home from './Pages/Home/Home';
import ProductList from './Pages/ProductList/ProductList';
import { userSpacificData } from './controller/moduls/getUserData';
import CategoryProducts from './Pages/CategoryProducts/CategoryProducts';
import { PayDepositeSeller } from './Pages/payDepositeSeller/PayDepositeSeller';
import io from 'socket.io-client'
import { AdminDataByUsername } from './assists/Data/Employess';

const socket = io.connect("/")

function App() {
  const [setting,setSetting] = useState({})
  const [roll,setroll] = useState('')
  const [reportDetail,setReportDetail] = useState('')
  const onesRun = useRef(true)
  const [isNot, setIsNot] = useState(0);
  const [user, setUser] = useState('')
  const [permissionArray, setPermissionArray] = useState([])
  const [linkMain, setLinkMain] = useState('')
  const [userInfo,setUserInfo] = useState([])
  const [adminData,setAdminData] = useState([])
  // socket.on("connect",()=>{
  //   console.log("Test")
  // })

  useEffect(()=>{
    if(onesRun.current){
      onesRun.current = false
      if(getCookies('roll')){
        let user = ''
        let roll = ''
        getSessionData(getCookies('roll'), getCookies('username')).then(async(res)=>{
          setroll(JSON.parse(res).roll)
          setUser(JSON.parse(res).username)
          user = JSON.parse(res).username
          roll = JSON.parse(res).roll
          if(roll === 'Admin'){
            AdminDataByUsername().then((results)=>{
              setAdminData(results[0])
              getAdminPermissionPages(user).then((data)=>{
                return(
                data.map((val)=>{
                  let item = val.PERMISSION_NAME
                  setPermissionArray(oldarray => [...oldarray,item.toUpperCase()])
                  Links.map((x)=>{
                    x.link.map((y)=>{
                      if(y.title.toUpperCase() === item.toUpperCase())
                        setLinkMain(y.type)
                    })
                  })
                })
                )
              })
            })
          }
        })
      }else{
        setIsNot(1)
      }
      if(getCookies('roll')){
        userSpacificData().then(userData=>{
          setUserInfo(userData)
        })
      }
    }
  },[userInfo])
  return (
    <>
    {
      (
        ()=>{
            if(roll == 'User'){
              return(
                <Router>
                  <Routes>
                    <Route exact path={allLinks.userHomePage} element={<Home userInformation = {userInfo}/>}/>
                    <Route path={allLinks.userShoppingPage} element={<ProductList userInformation = {userInfo}/>}/>
                    <Route path={allLinks.userLiveAuctionPage} element={<Action_Product userInformation = {userInfo}/>}/>
                    <Route path={allLinks.userSchaduleAuctionPage} element={<ActionSchadulingPage userInformation = {userInfo}/>}/>
                    <Route path={allLinks.userCategoriesPage} element={<Categories userInformation = {userInfo}/>}/>
                    <Route path={allLinks.userAboutUsPage} element={<AboutUs userInformation = {userInfo}/>}/>
                    <Route path={allLinks.userPrivacyPage} element={<Privacy userInformation = {userInfo}/>}/>
                    <Route path={allLinks.userSettingPage} element={<Setting userInformation = {userInfo}/>}/>
                    <Route path={allLinks.userUploadProduct} element={<UserUpload userInformation = {userInfo}/>}/>
                    <Route path={allLinks.userPayDeposite} element={<PayDepositeSeller userInformation = {userInfo}/>}/>
                    <Route path={allLinks.liveAuctionPage} element={<LiveAuctionPage userInformation = {userInfo}/>}/>
                    <Route path={allLinks.schedulingAuctionPage} element={<LiveAuctionPage userInformation = {userInfo}/>}/>
                    <Route path={allLinks.instantProductPage} element={<LiveAuctionPage userInformation = {userInfo}/>}/>
                    <Route path={allLinks.categoryProducts} element={<CategoryProducts userInformation = {userInfo}/>}/>
                    <Route path={allLinks.allProducts} element={<LiveAuctionPage userInformation = {userInfo}/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                  </Routes>
                </Router>
              )
            }else if(roll  == 'Admin'){
              if(permissionArray.length != 0){
              return(
                <Router>
                  <NavbarAdmin system={setSetting} adminData = {adminData}/>
                  <SettingBar toggleBar={setting}/>
                  <div className="continerMainPageAdmin">
                  <SidebarAdmin   
                  username={user} 
                  reportPopupState={reportDetail}
                  adminPermission = {permissionArray}
                  />
                  <Routes>
                    <Route exact path={allLinks.adminHomePage} element={permissionArray.includes('Home'.toUpperCase()) ? <HomeAdmin/> : <Navigate to={linkMain}/>}/>
                    <Route path={allLinks.adminUsersPage} element={permissionArray.includes('users'.toUpperCase()) ? <UserList/> : <Unauthorized/> }/>
                    <Route path={allLinks.adminUserPage} element={permissionArray.includes('users'.toUpperCase()) ? <User/> : <Unauthorized/>} />
                    <Route path={allLinks.adminProductsPage} element={permissionArray.includes('products'.toUpperCase()) ? <ProductListAdmin/> : <Unauthorized/>}/>
                    <Route path={allLinks.adminReviewProductsPage} element={permissionArray.includes('products'.toUpperCase()) ? <ReviewProduct/> : <Unauthorized/>}/>
                    <Route path={allLinks.adminPermissionPage} element={permissionArray.includes('permission'.toUpperCase()) ? <Permission/> : <Unauthorized/>}/>
                    <Route path={allLinks.adminTransactionPage} element={permissionArray.includes('transaction'.toUpperCase()) ? <Transaction/> : <Unauthorized/>}/>
                    <Route path={allLinks.adminReportsPage} element={permissionArray.includes('reports'.toUpperCase()) ? <Reports popupState={setReportDetail}/> : <Unauthorized/>}/>
                    <Route path={allLinks.adminMailPage} element={permissionArray.includes('mail'.toUpperCase()) ? <Mail/> : <Unauthorized/>}/>
                    <Route path={allLinks.adminAddEmployeePage} element={permissionArray.includes('add employee'.toUpperCase()) ? <AddEmployee/> : <Unauthorized/>}/>
                    <Route path={allLinks.adminChangeImageOfCategory} element={permissionArray.includes('change category image'.toUpperCase()) ? <ChangeCategoryImage/> : <Unauthorized/>}/>
                    <Route path={allLinks.adminAcceptDeposite} element={permissionArray.includes('deposite'.toUpperCase()) ? <Deposite/> : <Unauthorized/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                  </Routes>
                </div>
              </Router>
              )
            }
            }else if(isNot == 1){
              return(
                <Router>
                  <Routes>
                    <Route exact path={allLinks.userHomePage} element={<Home/>}/>
                    <Route path={allLinks.userLoginPage} element={<Login/>}/>
                    <Route path={allLinks.userShoppingPage} element={<ProductList/>}/>
                    <Route path={allLinks.userSigninPage} element={<Signin/>}/>
                    <Route path={allLinks.userLiveAuctionPage} element={<Action_Product/>}/>
                    <Route path={allLinks.userSchaduleAuctionPage} element={<ActionSchadulingPage/>}/>
                    <Route path={allLinks.userCategoriesPage} element={<Categories/>}/>
                    <Route path={allLinks.userAboutUsPage} element={<AboutUs/>}/>
                    <Route path={allLinks.userPrivacyPage} element={<Privacy/>}/>
                    <Route path={allLinks.liveAuctionPage} element={<LiveAuctionPage/>}/>
                    <Route path={allLinks.schedulingAuctionPage} element={<LiveAuctionPage/>}/>
                    <Route path={allLinks.instantProductPage} element={<LiveAuctionPage/>}/>
                    <Route path={allLinks.categoryProducts} element={<CategoryProducts userInformation = {userInfo}/>}/>
                    <Route path={allLinks.allProducts} element={<LiveAuctionPage userInformation = {userInfo}/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                  </Routes>
                </Router>
              )
            }
        }
      )()
      }
    </>
  );
}

export default App;
