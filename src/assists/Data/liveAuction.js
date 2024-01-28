import getCookies from '../../controller/moduls/getCookies'


// export const auctionProduct = 
//   [
//     {
//         id: 1,
//         image:[sportCarImg,
//                 sportCarImg1,
//                 sportCarImg2,
//                 sportCarImg3,
//                 sportCarImg4,
//                 sportCarImg5],
//         title: "BMW m4",
//         category: "Cars",
//         type:"Sport Car",
//         desc:'As the two-door version of the M3 sedan, the M4 has high levels of comfort, luxury, and daily usability—and a reasonably roomy rear seat should you need them.',
//         massage:"Attempt to see more",
//         payWay: 'Live Auction',
//         state:"new",
//         endTime:"01-MAR-23",
//         price:"1800000",
//         user:['Mickel','Emad','Ahmed'],
//         bid:['150','180','40'],
//         date:['01-FEB-23','01-MAR-23','05-MAR-23'],
//         startTime:'01-JAN-23'
//     },
//     {
//       id: "2",
//       image: [mirror],
//       title:"Mirror",
//       category: "Furniture",
//       type:"Antike Mirror",
//       price:"800",
//       endTime:"01-MAR-23",
//       desc:'As the two-door version of the M3 sedan, the M4 has high levels of comfort, luxury, and daily usability—and a reasonably roomy rear seat should you need them.',
//       massage:"Attempt to see more",
//       payWay: 'Live Auction',
//       state:"new",
//       user:['Mickel','Emad','Ahmed'],
//       bid:['150','180','40'],
//       date:['01-FEB-23','01-MAR-23','05-MAR-23'],
//       startTime:'01-JAN-23'
//     },
//     {
//       id: "3",
//       image: [gramophone],
//       title:"Gramophone",
//       category: "Heritage",
//       type:"Gramophone,CDs",
//       price:"1200",
//       endTime:"01-MAR-23",
//       desc:'As the two-door version of the M3 sedan, the M4 has high levels of comfort, luxury, and daily usability—and a reasonably roomy rear seat should you need them.',
//       massage:"Attempt to see more",
//       payWay: 'Live Auction',
//       state:"new",
//       user:['Mickel','Emad','Ahmed'],
//       bid:['150','180','40'],
//       date:['01-FEB-23','01-MAR-23','05-MAR-23'],
//       startTime:'01-JAN-23'
//     },
//     {
//       id: "4",
//       image: [gramophone2],
//       title:"Gramophone",
//       category: "Heritage",
//       type:"Gramophone,CDs",
//       price:"1300",
//       endTime:"01-MAR-23",
//       desc:'As the two-door version of the M3 sedan, the M4 has high levels of comfort, luxury, and daily usability—and a reasonably roomy rear seat should you need them.',
//       massage:"Attempt to see more",
//       payWay: 'Live Auction',
//       state:"new",
//       user:['Mickel','Emad','Ahmed'],
//       bid:['150','180','40'],
//       date:['01-FEB-23','01-MAR-23','05-MAR-23'],
//       startTime:'01-JAN-23'
//     },
//     {
//       id: "5",
//       image: [xbox_controller],
//       title:"Xbox Controller",
//       category: "Technology",
//       type:"Xbox,Controller",
//       price:"200",
//       endTime:"01-MAR-23",
//       desc:'As the two-door version of the M3 sedan, the M4 has high levels of comfort, luxury, and daily usability—and a reasonably roomy rear seat should you need them.',
//       massage:"Attempt to see more",
//       payWay: 'Live Auction',
//       state:"new",
//       user:['Mickel','Emad','Ahmed'],
//       bid:['150','180','40'],
//       date:['01-FEB-23','01-MAR-23','05-MAR-23'],
//       startTime:'01-JAN-23'
//     },
//     {
//       id: "6",
//       image: [camera],
//       title:"Camera",
//       category: "Technology",
//       type:"Camera",
//       price:"500",
//       endTime:"01-MAR-23",
//       desc:'As the two-door version of the M3 sedan, the M4 has high levels of comfort, luxury, and daily usability—and a reasonably roomy rear seat should you need them.',
//       massage:"Attempt to see more",
//       payWay: 'Live Auction',
//       state:"new",
//       user:['Mickel','Emad','Ahmed'],
//       bid:['150','180','40'],
//       date:['01-FEB-23','01-MAR-23','05-MAR-23'],
//       startTime:'01-JAN-23'
//     },
//     {
//       id: "7",
//       image: [Shoes],
//       title:"Shoes",
//       category: "Clothes",
//       type:"Sport Shoes",
//       price:"200",
//       endTime:"01-MAR-23",
//       desc:'As the two-door version of the M3 sedan, the M4 has high levels of comfort, luxury, and daily usability—and a reasonably roomy rear seat should you need them.',
//       massage:"Attempt to see more",
//       payWay: 'Live Auction',
//       state:"new",
//       user:['Mickel','Emad','Ahmed'],
//       bid:['150','180','40'],
//       date:['01-FEB-23','01-MAR-23','05-MAR-23'],
//       startTime:'01-JAN-23'
//     },
//     {
//       id: "8",
//       image: [watch],
//       title:"Watch",
//       category: "Clothes",
//       type:"Prand-watch",
//       price:"800",
//       endTime:"01-MAR-23",
//       desc:'As the two-door version of the M3 sedan, the M4 has high levels of comfort, luxury, and daily usability—and a reasonably roomy rear seat should you need them.',
//       massage:"Attempt to see more",
//       payWay: 'Live Auction',
//       state:"new",
//       user:['Mickel','Emad','Ahmed'],
//       bid:['150','180','40'],
//       date:['01-FEB-23','01-MAR-23','05-MAR-23'],
//       startTime:'01-JAN-23'
//     },
//     {
//       id: "9",
//       image: [flat],
//       title:"Home",
//       category: "Buildings",
//       type:"Flat",
//       price:"2000",
//       endTime:"01-MAR-23",
//       desc:'As the two-door version of the M3 sedan, the M4 has high levels of comfort, luxury, and daily usability—and a reasonably roomy rear seat should you need them.',
//       massage:"Attempt to see more",
//       payWay: 'Live Auction',
//       state:"new",
//       user:['Mickel','Emad','Ahmed'],
//       bid:['150','180','40'],
//       date:['01-FEB-23','01-MAR-23','05-MAR-23'],
//       startTime:'01-JAN-23'
//     },
//     {
//       id: "10",
//       image: [status],
//       title:"Status",
//       category: "Heritage",
//       type:"ancien-statue",
//       price:"3000",
//       endTime:"01-MAR-23",
//       desc:'As the two-door version of the M3 sedan, the M4 has high levels of comfort, luxury, and daily usability—and a reasonably roomy rear seat should you need them.',
//       massage:"Attempt to see more",
//       payWay: 'Live Auction',
//       state:"new",
//       user:['Mickel','Emad','Ahmed'],
//       bid:['150','180','40'],
//       date:['01-FEB-23','01-MAR-23','05-MAR-23'],
//       startTime:'01-JAN-23'
//     },
//   ]
  export const LiveProducts = async()=>{
    return (fetch('/LiveProducts',{
          method:'GET'
      })
      .then((res)=>res.json())
      .then((data)=>{
          return(
              data.map((x)=>{
                  return({"id":x.id,"image":x.images,"title":x.title,"Category":x.Category,"payWay":x.payWay,"payWayId":x.payWayId,"price":x.price,"desc":x.title,"state":x.state,'brand':x.brand,'model':x.model,'color':x.color,'size':x.size,'summary':x.summary,'startTime':x.startTime})
              })
          )
      })
      )
  }

  export const productOfLive = async(prodactId)=>{
    return(
      fetch('/liveProducts/Id',{
          method:'POST',
          body:JSON.stringify({
            "productId":prodactId,
            "username": getCookies('username')
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
  
  export const fetchProductBidLive = async(prodactId,paywayId)=>{
    return(
      await fetch('/product/bid',{
        method:'POST',
        body:JSON.stringify({
          "productId":prodactId,
          "paywayId":paywayId,
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
  export const checkProductState = async(prodactId,paywayId)=>{
    return(
      await fetch('/checkProductIfSold',{
        method:'POST',
        body:JSON.stringify({
          "productId":prodactId,
          "paywayId":paywayId,
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