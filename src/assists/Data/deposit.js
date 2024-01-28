export const depositeData = async() => {
    return (fetch('/getDepositeData',{
        method:'GET'
    })
    .then((res)=>res.json())
    .then((data)=>{
        return(
            data.map((x)=>{
                return({"id":x.DEPOSITE_ID,"image":x.RECIPT,"clientName":x.CLINT_NAME,"auction_number":x.AUCTION_NUMBER
                ,"product_name":x.PRODUCT_NAME,"product_price":x.PRICE,"deposit_percentage":x.THE_PERCENTAGE
                ,"deposit_price":x.DEPOSIT_PRICE})
            })
        )
    })
    )
}