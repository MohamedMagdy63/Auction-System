import Cookies from "js-cookie"

const removeCookies = (cookiename) => {
  return Cookies.remove(cookiename);
};
export default removeCookies;