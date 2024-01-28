export const selleProductOfEachCategory = (year)=>{
    const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E"]
    return(
        fetch('/Number/Product/Category/Sell',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'year': year
            }),
        })
        .then((res)=>res.json())
        .then((results)=>{
            return(
                results.map(data=>{
                    let hexColorRep = ""

                for (let index = 0; index < 6; index++){
                const randomPosition = Math.floor ( Math.random() * hexCharacters.length ) 
                    hexColorRep += hexCharacters[randomPosition]
                }
                // const randomColor = Math.floor(Math.random()*16777215).toString(16);
                return({"CATEGORY_NAME":data.CATEGORY_NAME,"MONTH":data.MONTH,"bg":`${hexColorRep}`,"NumberOfSales":data.TOTAL_SALES,"TotalPrice":data.TOTAL_BID})
                })
            )
        })
    )
}
export const profitOfEachCategory = ()=>{
    return(
        fetch('/Profit/Last/Month',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((results)=>{
            return(results)
        })
    )
}
export const getEmployeeData = ()=>{
    return(
        fetch('/Employee/Data',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((results)=>{
            return(results)
        })
    )
}
export const getEmployeeSalery = ()=>{
    return(
        fetch('/Employee/Salary',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((results)=>{
            return(results)
        })
    )
}
export const getSellerData = ()=>{
    return(
        fetch('/Seller/Data',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((results)=>{
            return(results)
        })
    )
}
export const getBuyerData = ()=>{
    return(
        fetch('/Buyer/Data',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((results)=>{
            return(results)
        })
    )
}