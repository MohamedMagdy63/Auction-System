export const AllProducts = async()=>{
  return ( fetch('/getAllProductsForAdmin',{
    method:'GET'
  })
  .then((res)=>res.json())
  .then((data)=>{
    return(
      data.map((x)=>{
        return({"id":x.ID,"title":x.TITLE,"image":x.IMAGE,"price":x.PRICE_OF_INSTANS,"initial_price":x.PRICE_OF_AUCTION,'brand':x.BRAND,"desc":x.DESCRIPTION,'size':x.PRODUCT_SIZE,'storage':x.PRODUCT_STORAGE,'summary':x.PRODUCT_SUMMARY,'matrial':x.PRODUCT_MATERIAL,'color':x.PRODUCT_COLOR,'paymentDate':x.PRODUCT_PAYMENT_DATE,'productDescripitionState':x.PRODUCT_DESCRIPTION_STATE,'startTime':x.STARTTIME,'endTime':x.ENDTIME,"Category":x.CATEGORY,"payWay":x.PAYWAY,"state":x.STATE})
      })
    )
  })
  )
}
export const ALLProductsInCategories = async()=>{
  return ( fetch('/getAllProductsInCategory',{
    method:'GET'
  })
  .then((res)=>res.json())
  .then((data)=>{
    return(
      // data.map((x)=>{
      //   return({"id":x.id,"title":x.title,"images":x.image,"price":x.price,"desc":x.desc,"Category":x.Category,"payWay":x.payWay,"state":x.state})
        
      // })
      data
    )
  })
  )
}


export const AllProductsReview = async()=>{
  return ( fetch('/getAllProductsForAdmin',{
    method:'GET'
  })
  .then((res)=>res.json())
  .then((data)=>{
    return(
      data.map((x)=>{
        return({"id":x.ID,"title":x.TITLE,"image":x.IMAGE,"price":x.PRICE_OF_INSTANS,"initial_price":x.PRICE_OF_AUCTION,'brand':x.BRAND,"desc":x.DESCRIPTION,'size':x.PRODUCT_SIZE,'storage':x.PRODUCT_STORAGE,'summary':x.PRODUCT_SUMMARY,'matrial':x.PRODUCT_MATERIAL,'color':x.PRODUCT_COLOR,'paymentDate':x.PRODUCT_PAYMENT_DATE,'productDescripitionState':x.PRODUCT_DESCRIPTION_STATE,'startTime':x.STARTTIME,'endTime':x.ENDTIME,"Category":x.CATEGORY,"payWay":x.PAYWAY,"state":x.STATE})
      })
    )
  })
  )
}
export const AllProductsReviewDetails = async(productId)=>{
  return ( fetch('/getProductDetails',{
    method:'POST',
    body:JSON.stringify({
      'productId': productId
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
export const allProductTransactionAuction = async()=>{
  return ( fetch('/getAllTransactionAuction',{
    method:'GET',
    })
    .then((res)=>res.json())
    .then((data)=>{
      return(
        data.map((x)=>{
            return({"id":x.PRODUCT_ID,"IMAGE":x.IMAGE,"TITLE":x.TITLE,"SALLER_NAME":x.SALLER_NAME,"PAYWAY":x.PAYWAY,"STATE":x.STATE,"INITIAL_PRICE_OF_AUCTION":x.INITIAL_PRICE_OF_AUCTION,"WINNER_NAME":x.WINNER_NAME,"STARTTIME":x.STARTTIME,"ENDTIME":x.ENDTIME,"WINNER_NAME":x.WINNER_NAME,"AUCTION_NUMBER":x.AUCTION_NUMBER})
        })
      )
    })
    )
}
