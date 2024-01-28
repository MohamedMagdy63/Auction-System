import HomeIcon from '@mui/icons-material/Home';
import GridOnIcon from '@mui/icons-material/GridOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GavelIcon from '@mui/icons-material/Gavel';
import PriceChangeIcon from '@mui/icons-material/PriceChange';


import AuctionHummar from './SvgComponents/AuctionHummer'
import Arrow from '../../SubComponents/ReightArrow/Arrow'

/////////// Admin Data ///////////
import { Settings,ExitToApp, Upload, Payment } from '@mui/icons-material'
import { CategoryImages } from './CategoryImages'

export const allLinks = {
  userHomePage : '/',
  userCategoriesPage : '/Categories',
  userShoppingPage : '/shopping/:categoryOfProduct',
  userShoppingPageAll : '/shopping/all',
  userLiveAuctionPage : '/Live_$$_auction',
  userSchaduleAuctionPage : '/Schadule_$$_auction',
  userLoginPage : '/login',
  userSigninPage : '/Signin',
  userProductPage : '/Product',
  userAboutUsPage : '/About',
  userPrivacyPage : '/Privacy',
  userUploadProduct : '/Upload',
  userPayDeposite : '/Pay/Deposite',
  userSettingPage : '/Setting',
  liveAuctionPage:'/liveAuction/:productId/:productType',
  schedulingAuctionPage: '/Schadule_$$_auction/:productId/:productType',
  instantProductPage: '/instant/:productId/:productType',
  categoryProducts:'/Category/:categoryName',
  signout:'/signout',
  


  adminHomePage: '/',
  adminPermissionPage: '/Permission',
  adminUsersPage: '/Users',
  adminUserPage: '/User/:userid',
  adminNewUserPage: '/New_User',
  adminProductsPage: '/Products',
  adminReviewProductsPage: '/Product/:productid',
  adminNewProductsPage: '/New_Product',
  adminTransactionPage: '/Transaction',
  adminReportsPage: '/Reports',
  adminMailPage: '/Mail',
  adminAddEmployeePage: '/New_Employee',
  adminChangeImageOfCategory: 'category/Image/Change',
  adminAcceptDeposite:'Deposite',
  allProducts:'allProducts/:productId/:productType',
}


export const sliderItems = [
  {
    id: 0,
    img: <AuctionHummar/>,
    title: "Auction World",
    bg: "95a5a6",
    arrow:<Arrow/>
  },  
];
CategoryImages().then((categoryName)=>{
  categoryName.map((category)=>{
    sliderItems.push({
      id: category.id,
      img: <img src={category.image} alt=""/>,
      title: category.title,
      bg: category.bg,
      button:<button>ShowMore</button>,
      link: category.title,
    })
  })
})



  export const sidebarItems = 
  [
    {
      title: "Home",
      icon: <HomeIcon/>,
      link: allLinks.userHomePage
    },
    {
      title: "Categories",
      icon: <GridOnIcon/>,
      link: allLinks.userCategoriesPage
    },
    {
      title: "Shopping",
      icon: <MonetizationOnIcon/>,
      link: allLinks.userShoppingPageAll
    },
    {
      title: "Live auction",
      icon: <GavelIcon/>,
      link: allLinks.userLiveAuctionPage
    },
    {
      title: "Schadule auction",
      icon: <PriceChangeIcon/>,
      link: allLinks.userSchaduleAuctionPage
    },
    {
      title: "Upload Product",
      icon: <Upload/>,
      link: allLinks.userUploadProduct
    },
    {
      title: "Pay Deposite",
      icon: <Payment/>,
      link: allLinks.userPayDeposite
    },
    {
      title: "Setting",
      icon: <Settings/>,
      link: allLinks.userSettingPage
    },
    {
      title: "SIGNOUT",
      icon: <ExitToApp/>,
      link: allLinks.signout
    },
    
  ]



  /////////// Admin Data ///////////

export const data = [
    {
      name: 'Jun',
      userActive: 4000,
    },
    {
      name: 'Feb',
      userActive: 3000,
    },
    {
      name: 'Mar',
      userActive: 2000,
    },
    {
      name: 'Apr',
      userActive: 2780,
    },
    {
      name: 'May',
      userActive: 1890,
    },
    {
      name: 'Jun',
      userActive: 2390,
    },
    {
      name: 'Aug',
      userActive: 3490,
    },
    {
      name: 'Aug',
      userActive: 4000,
    },
    {
      name: 'Sep',
      userActive: 5000,
    },
    {
      name: 'Oct',
      userActive: 2000,
    },
    {
      name: 'Nov',
      userActive: 3000,
    },
    {
      name: 'Dec',
      userActive: 3490,
    },
  ];

export const dataProduct = [
    {
      Month: '',
      Sales: 0,
    },
    {
      Month: 'Sep',
      Sales: 2000,
    },
    {
      Month: 'Oct',
      Sales: 1000,
    },
    {
      Month: 'Nov',
      Sales: 3000,
    },
  ];
  
  export const rows = [
    { id: 1, userName: 'Snow', email: 'example@gmail.com' , Status: 'active' , Phone: '01555555555', Category_check: 0, terms_check: 1, SSN:'1254786324587951', block:0, date:'10/12/2000', birthdate:'15/10/1989', address:'Helwan-Cairo-Egypt'},
    { id: 2, userName: 'Snow', email: 'example@gmail.com' , Status: 'active' , Phone: '01555555555', Category_check: 0, terms_check: 1, SSN:'1254786324587951', block:1, date:'10/12/2000', birthdate:'15/10/1989', address:'Helwan-Cairo-Egypt' },
    { id: 3, userName: 'Snow', email: 'example@gmail.com' , Status: 'Block' , Phone: '01000000000', Category_check: 1, terms_check: 1, SSN:'1254786324587951', block:0, date:'10/12/2000', birthdate:'15/10/1989', address:'Helwan-Cairo-Egypt' },
    { id: 4, userName: 'Ahmed', email: 'example@gmail.com' , Status: 'active' , Phone: '01000000000', Category_check: 0, terms_check: 1, SSN:'1254786324587951', block:0, date:'10/12/2000', birthdate:'15/10/1989', address:'Helwan-Cairo-Egypt' },
    { id: 5, userName: 'Snow', email: 'example@gmail.com' , Status: 'active' , Phone: '01000000000', Category_check: 0, terms_check: 1, SSN:'1254786324587951', block:1, date:'10/12/2000', birthdate:'15/10/1989', address:'Helwan-Cairo-Egypt' },
    { id: 6, userName: 'Snow', email: 'example@gmail.com' , Status: 'Block' , Phone: '01111111111', Category_check: 1, terms_check: 1, SSN:'1254786324587951', block:0, date:'10/12/2000', birthdate:'15/10/1989', address:'Helwan-Cairo-Egypt' },
    { id: 7, userName: 'Snow', email: 'example@gmail.com' , Status: 'active' , Phone: '01111111111', Category_check: 0, terms_check: 1, SSN:'1254786324587951', block:0, date:'10/12/2000', birthdate:'15/10/1989', address:'Helwan-Cairo-Egypt' },
  ];
  


