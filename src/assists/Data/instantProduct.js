import getCookies from "../../controller/moduls/getCookies"

export const Trending_Products = 'Cars'

export const ProductImage = async()=>{
  return ( 
    fetch('/getAllProducts',{
    method:'GET'
  })
  .then((res)=>res.json())
  .then((data)=>{
    return(
      data.map((x)=>{
          return({"id":x.id,"images":x.images,"title":x.title,"Category":x.Category,"payWay":x.payWay,"price":x.price,"desc":x.title,"state":x.state})
      })
    )
  })
  )
}

export const productOfInstant = async(prodactId)=>{
  return(
    fetch('/instantProducts/Id',{
      method:'POST',
      body:JSON.stringify({
        "productId":prodactId,
        "username":getCookies('username')
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