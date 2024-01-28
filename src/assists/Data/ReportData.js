import { getBuyerData, getEmployeeData, getEmployeeSalery, getSellerData } from "../../controller/moduls/DataAnalysis";

export const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  export var testData = []
  export var rows2 = []
  export var SellerData = []
  export var BuyerData = []
  export var numberSale = []
  export var buyerAnalysisData = []
  
  getEmployeeData().then((fullData)=>{
    rows2.push(fullData.emplyees)
    testData.push(fullData.salery)
    SellerData.push(fullData.sellers)
    let instantCount = 0
    let liveCount = 0
    let schduleCount = 0
    fullData.sellers.map((seller)=>{
      instantCount = instantCount + seller.INSTANT_PRODUCTS 
      liveCount = liveCount + seller.LIVE_AUCTION_PRODUCTS 
      schduleCount = schduleCount + seller.SCHEDULE_AUCTION_PRODUCTS 
    })
    numberSale.push({'Type':'INSTANT','Count':instantCount},{'Type':'LIVE','Count':liveCount},{'Type':'SCHDULE','Count':schduleCount})
    BuyerData.push(fullData.buyers)
    fullData.buyersAnaliysis.map((x,index)=>{
      if(index < 10){
        buyerAnalysisData.push(x)
      }
    })
  })

  // getEmployeeData().then((empData)=>{
  //   rows2 = []
  //   rows2.push(empData)
  //   getSellerData().then((Seller)=>{
  //     SellerData = []
  //     SellerData.push(Seller)
  //     let instantCount = 0
  //     let liveCount = 0
  //     let schduleCount = 0
  //     Seller.map((x)=>{
  //       instantCount = instantCount + x.INSTANT_PRODUCTS 
  //       liveCount = liveCount + x.LIVE_AUCTION_PRODUCTS 
  //       schduleCount = schduleCount + x.SCHEDULE_AUCTION_PRODUCTS 
  //     })
  // numberSale.push({'Type':'INSTANT','Count':instantCount},{'Type':'LIVE','Count':liveCount},{'Type':'SCHDULE','Count':schduleCount})
  //     getBuyerData().then((Buyer)=>{
  //       BuyerData = []
  //       BuyerData.push(Buyer)
  //       getEmployeeSalery().then((SaleryData)=>{
  //         testData = []
  //         testData.push(SaleryData)
  //       })
  //     })
  //   })
  // })


  