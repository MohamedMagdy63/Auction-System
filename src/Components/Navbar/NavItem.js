import { BiCategoryAlt } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { GiSandsOfTime } from "react-icons/gi";
import { IoTodayOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { AiOutlineUserAdd } from "react-icons/ai";
export const navItems = [
  {
    id: 1,
    title: "Categories",
    path: "/Categories",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <BiCategoryAlt />,
  },
  {
    id: 2,
    title: "Shopping",
    path: "/Shopping/all",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FiShoppingBag />,
  },
  {
    id: 3,
    title: "SchaduleAuction",
    path: "/Schadule_$$_auction",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <IoTodayOutline />,
  },
  {
    id: 4,
    title: "LiveAuction",
    path: "/Live_$$_auction",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <GiSandsOfTime />,
  },
  {
    id: 5,
    title: "LogIn",
    path: "/Login",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <CiLogin />,
  },
  {
    id: 6,
    title: "SignUp",
    path: "/signin",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <AiOutlineUserAdd />,
  },
];