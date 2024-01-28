

export const getUserById = async(userId)=>{
    return(
    fetch('/getUserData',{
        method:'POST',
        body:JSON.stringify({
            'userId': userId
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        return({"id":data[0].USER_ID,"userName":data[0].USERNAME,"ssn":data[0].SSN,"Status":data[0].STATUS,"Category_check":data[0].CATEGORY_CHECK,"terms_check":data[0].TERMS_CHECK,"phone1":data[0].PHONE_1,"phone2":data[0].PHONE_2,"address":data[0].ADDRESS,"bithdayDate":data[0].BIRTHDATE,"email":data[0].EMAIL})

    })
    )
}
export const getUserByClientId = async(ClientID)=>{
    return(
    fetch('/userDataByClientId',{
        method:'POST',
        body:JSON.stringify({
            'ClientID': ClientID
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        return(data)

    })
    )
}