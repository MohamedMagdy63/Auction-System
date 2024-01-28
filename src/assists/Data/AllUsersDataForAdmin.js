export const UsersData = async()=>{
    return(fetch('/getAllUsres',{
        method:'GET'
    })
    .then((res)=>res.json())
    .then((data)=>{
        return(
            data.map((x)=>{
                return({"id":x.USER_ID,"userName":x.USERNAME,"ssn":x.SSN,"Status":x.STATUS,"Category_check":x.CATEGORY_CHECK,"gender":x.GENDER,"terms_check":x.TERMS_CHECK,"phone1":x.PHONE_1,"phone2":x.PHONE_2,"address":x.ADDRESS,"bithdayDate":x.BIRTHDATE,"email":x.EMAIL})
            })
        )
    })
    )
}
export const newUser = async()=>{
    return(fetch('/getNewUsers',{
        method:'GET'
    })
    .then((res)=>res.json())
    .then((data)=>{
        return(
            data.map((x)=>{
                return({"id":x.USER_ID,"userName":x.USERNAME,"ssn":x.SSN,"Status":x.STATUS,"Category_check":x.CATEGORY_CHECK,"terms_check":x.TERMS_CHECK,"phone1":x.PHONE_1,"phone2":x.PHONE_2,"address":x.ADDRESS,"bithdayDate":x.BIRTHDATE,"email":x.EMAIL})
            })
        )
    })
    )
}

