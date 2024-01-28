import Cookies from "js-cookie"

const getCookies = (cookiename) => {
  return Cookies.get(cookiename);
};
export default getCookies;