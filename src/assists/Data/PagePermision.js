import {Home, PowerSettingsNew, Group,
    ShoppingCart, Receipt, AttachMoney, Assessment, Photo, ContactMail, PersonAdd} from '@material-ui/icons';
import { allLinks } from '../Data/Data'


export const PermissionPage =[
    {
        pageName:"Product Requestes",
        state:"0"
    },
    {
        pageName:"Product Requestes",
        state:"0"
    },
    {
        pageName:"Product Requestes",
        state:"0"
    },
    {
        pageName:"Product Requestes",
        state:"0"
    },
    {
        pageName:"Product Requestes",
        state:"0"
    },
    {
        pageName:"Product Requestes",
        state:"0"
    },
    {
        pageName:"Product Requestes",
        state:"0"
    },
    {
        pageName:"Product Requestes",
        state:"0"
    },
    {
        pageName:"Product Requestes",
        state:"0"
    },
]

export const Links = 
[
    {
        mainTitle:"Dashboard",
        link:
        [
            {
                title:'Home',
                icon:<Home/>,
                type: allLinks.adminHomePage,
            },
        ]
    },
    {
        mainTitle:"Quick Menu",
        link:
        [
            {
                title:'users',
                icon:<Group/>,
                type: allLinks.adminUsersPage
            },
            {
                title:'products',
                icon:<ShoppingCart/>,
                type: allLinks.adminProductsPage
            },
            {
                title:'deposite',
                icon:<Receipt/>,
                type: allLinks.adminAcceptDeposite
            },
            {
                title:'transaction',
                icon:<AttachMoney/>,
                type: allLinks.adminTransactionPage
            },
            {
                title:'reports',
                icon:<Assessment/>,
                type: '/Reports'
            },
            {
                title:'change category image',
                icon:<Photo/>,
                type: allLinks.adminChangeImageOfCategory
            },
        ]
    },
    {
        mainTitle:"notifications",
        link:
        [
            {
                title:'mail',
                icon:<ContactMail/>,
                type: allLinks.adminMailPage
            }
        ]
    },
    {
        mainTitle:"staff",
        link:
        [
            {
                title:'add employee',
                icon:<PersonAdd/>,
                type: allLinks.adminAddEmployeePage
            },
            {
              title:'permission',
              icon:<PowerSettingsNew/>,
              type: allLinks.adminPermissionPage
            }
        ]
    },
]