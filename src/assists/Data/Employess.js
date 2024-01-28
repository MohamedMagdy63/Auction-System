import getCookies from "../../controller/moduls/getCookies"

export const AdminData = async()=>{
    return (fetch('/getAllAdmins',{
        method:'GET'
    })
    .then((res)=>res.json())
    .then((data)=>{
        return(
            data.map((x)=>{
                return({"id":x.ID,"baned":x.GOT_BANNED,"email":x.USER_EMAIL,"phone":x.USER_PHONE1,"phone2":x.USER_PHONE2,"image":x.IMAGE,"name":x.ADMIN_NAME,"userName":x.USER_NAME})
            })
        )
    })
    )
}
export const AdminDataByUsername = async()=>{
    return (fetch('/getAllAdmins/username',{
        method:'POST',
        body:JSON.stringify({
            'username': getCookies('username')
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        return(
            data.map((x)=>{
                return({"id":x.ID,"baned":x.GOT_BANNED,"email":x.USER_EMAIL,"phone":x.USER_PHONE1,"phone2":x.USER_PHONE2,"image":x.IMAGE,"name":x.ADMIN_NAME})
            })
        )
    })
    )
}