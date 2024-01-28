import Cookies from "js-cookie"

const setCookies = (cookiename, usrin) => {
  Cookies.set(cookiename, usrin,{
    expires:1,
    secure:false,
    sameSite:'Strict',
    path:'/'
  });
};
export default setCookies;