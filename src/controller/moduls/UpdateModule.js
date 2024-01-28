export const updateBid = async(money,depositeId,bidId) =>{
    let date = new Date()
    return(
        fetch('/updateBid',{
            method:'POST',
            body:JSON.stringify({
                'money':money,
                'time': `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` ,
                'depositeId': depositeId,
                'bidId': bidId
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
export const updateSoldBid = async(productId) =>{
    return(
        fetch('/updateSoldBid',{
            method:'POST',
            body:JSON.stringify({
                'productId':productId,
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
export const updateFinalReport = async(rateVal,reportId,commenReportId,userOpinion) =>{
    for (let index = 0; index < commenReportId.length; index++) {
        const responce = await fetch('/ubdate/finalReport',{
            method:'POST',
            body:JSON.stringify({
                'rateVal':rateVal[index],
                'reportId':reportId[index],
                'commenReportId':commenReportId[index],
                'userOpinion':userOpinion[index]
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await responce.json()
        return data
    }
}
export const updateFinalReportWithNotSatif = async(rateVal,reportId,commenReportId,userOpinion) =>{
    const responce = await fetch('/update/finalReport/Angry',{
        method:'POST',
        body:JSON.stringify({
            'rateVal':rateVal,
            'reportId':reportId,
            'commenReportId':commenReportId,
            'userOpinion':userOpinion
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await responce.json()
    return data
}


export const updataUserData = async(userFullName,userEmail,userAddress,userPhone1,userPhone2) =>{
    return(
        fetch('/Update/User/Data',{
            method:'POST',
            body:JSON.stringify({
                'userFullName':userFullName,
                'userEmail':userEmail,
                'userAddress':userAddress,
                'userPhone1':userPhone1,
                'userPhone2':userPhone2,
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
export const UpdateDeposite = async(depositID,imageFile,imageURL) =>{
    return(
        fetch('/updateNewDeposite',{
            method:'POST',
            body:JSON.stringify({
                'depositID':depositID,
                'imageFile':imageFile,
                'imageURL':imageURL,
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
export const UpdateDepositeByPaymob = async(depositID,imageFile,imageURL) =>{
    return(
        fetch('/updateNewDeposite/Paymob',{
            method:'POST',
            body:JSON.stringify({
                'depositID':depositID,
                'imageFile':imageFile,
                'imageURL':imageURL,
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