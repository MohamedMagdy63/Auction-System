import getCookies from "./getCookies"

export const getPersentage = async()=>{
    return(
        fetch('/getPersentage',{
            method:'GET'
        })
        .then((res)=>res.json())
        .then((data)=>{
            return data
        })
    )
}
export const getPersentageSeller = async()=>{
    return(
        fetch('/getPersentageSeller',{
            method:'GET'
        })
        .then((res)=>res.json())
        .then((data)=>{
            return data
        })
    )
}
export const getPersentageByuer = async()=>{
    return(
        fetch('/getPersentageBuyer',{
            method:'GET'
        })
        .then((res)=>res.json())
        .then((data)=>{
            return data
        })
    )
}
export const getUserProduct = async()=>{
    return(
        fetch('/user/products',{
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
            return data
        })
    )
}
export const getReportClientSend = async(userID)=>{
    return(
        fetch('/report/client/send',{
            method:'POST',
            body:JSON.stringify({
                'userID': userID
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            return data
        })
    )
}
export const getReportRequire = async()=>{
    return(
        fetch('/rateRequire',{
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
            return data
        })
    )
}
export const getSubCategoryTypes = async(categoryName)=>{
    return(
        fetch('/category/sub/category',{
            method:'POST',
            body:JSON.stringify({
                'categoryName': categoryName
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            return data
        })
    )
}
export const getTrindingProduct = async()=>{
    return(
        fetch('/Trinding/Product',{
            method:'GET',
        })
        .then((res)=>res.json())
        .then((data)=>{
            return data
        })
    )
}
export const getTerms = async()=>{
    return(
        fetch('/Terms/Condition',{
            method:'GET'
        })
        .then((res)=>res.json())
        .then((data)=>{
            return data
        })
    )
}


