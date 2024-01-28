import getCookies from "../../controller/moduls/getCookies"

export const schedualProducts = async()=>{
  return (fetch('/ScheduleProducts',{
        method:'GET'
    })
    .then((res)=>res.json())
    .then((data)=>{
        return(
            data.map((x)=>{
                return({"id":x.id,"image":x.images,"title":x.title,"Category":x.Category,"payWay":x.payWay,"payWayId":x.payWayId,"price":x.price,"desc":x.title,"state":x.state,'brand':x.brand,'model':x.model,'color':x.color,'size':x.size,'summary':x.summary,'endAuction':x.endAuction})
            })
        )
    })
    )
}

export const productOfSchedualing = async(prodactId)=>{
  return(
    fetch('/ScheduleProducts/Id',{
      method:'POST',
      body:JSON.stringify({
        "productId":prodactId,
        "username" :getCookies('username')
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

export const fetchProductBid = (prodactId)=>{
  return(
    fetch('/product/bid',{
      method:'POST',
      body:JSON.stringify({
        "productId":prodactId
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