import swal from 'sweetalert';
import getCookies from './getCookies'

export const insertNewUser = (firstname,
    lastname,username,
    phone,otherPhone,
    address,birthday,
    SSN,email,
    password,confirmPassword,
    gender) =>{
        const date = new Date()
    fetch('/insertNewUser',
    {
        method:'POST',
        body:JSON.stringify({
            'firstname':firstname,
            'lastname':lastname,
            'username':username,
            'phone':phone,
            'otherPhone':otherPhone,
            'address':address,
            'birthday':birthday,
            'SSN':SSN,
            'email':email,
            'password':password,
            'confirmPassword':confirmPassword,
            'gender':gender,
            'currentDate': `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` 
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data[0] == 'SUCCESSED'){
            swal("Welcome!", `Successful Sign in`, "success", {button: false})
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000);
        }else{
            swal("Error", `Error in Sign in`, "error")
        }
    })
}
export const insertReviewReport = async(reviewReport,reportId) =>{
    const date = new Date()
    fetch('/insert/review/report',
    {
        method:'POST',
        body:JSON.stringify({
            'reportId':reportId,
            'reviewReport':reviewReport,
            'username': getCookies('username'),
            'currentDate': `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` 
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        return data
    })
}
export const insertNewAdmin = (firstname,
    lastname,username,
    phone,otherPhone,
    address,birthday,
    SSN,email,
    password,confirmPassword,
    gender,managers,startDayWork,imageURL,imageFile) =>{
        const date = new Date()
    fetch('/insertNewAdmin',
    {
        method:'POST',
        body:JSON.stringify({
            'firstname':firstname,
            'lastname':lastname,
            'username':username,
            'phone':phone,
            'otherPhone':otherPhone,
            'address':address,
            'birthday':birthday,
            'SSN':SSN,
            'email':email,
            'password':password,
            'confirmPassword':confirmPassword,
            'gender':gender,
            'manager':managers,
            'startDayWork':startDayWork,
            'ImageURL':imageURL,
            'imageFile':imageFile,
            'currentDate': `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` 
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data[0] === 'SUCCESSED'){
            swal("Welcome!", `Successful Sign in`, "success", {button: true})
            setTimeout(() => {
                window.location.href = '/New_Employee'
            }, 2000);
        }else{
            swal("Error", `Error in Sign in`, "error", {button: true})
        }
    })
}
export const insertNewCategory = (categoryName , subCategoryId,imageURL,imageFile) =>{
    fetch('/New/Category',
    {
        method:'POST',
        body:JSON.stringify({
            'categoryName':categoryName,
            'subCategoryId':subCategoryId,
            'ImageURL':imageURL,
            'imageFile':imageFile 
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data[0] === 'SUCCESSED'){
            swal("Welcome!", `Successful Inserted`, "success", {button: true})
            setTimeout(() => {
                window.location.href = '/category/Image/Change'
            }, 2000);
        }else{
            swal("Error", `Error in Inserting`, "error", {button: true})
        }
    })
}
// export const insertAdminPermision = async(username,permissions) =>{
//     return(
//     await permissions.map(async(x)=>{
//         console.log(x)
//         return(
//             await fetch('/Insert/Permision/Admin',
//             {
//                 method:'POST',
//                 body:JSON.stringify({
//                     'username' : username,
//                     'permissions' : x.toLowerCase()
//                 }),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             })
//             .then(async(res)=>await res.json())
//             .then(async(data)=>{
//                 return(await data)
//             })
//         )
//     })
//     )
// }
export const insertAdminPermision = async(username,permissions) =>{
    for (let index = 0; index < permissions.length; index++) {
        const responce = await fetch('/Insert/Permision/Admin',
        {
            method:'POST',
            body:JSON.stringify({
                'username' : username,
                'permissions' : permissions[index].toLowerCase()
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await responce.json()
    }  
    swal("Mission Done", `Sccessfull Permission added`, "success", {button: false})
        setTimeout(() => {
            window.location.href = '/Permission'
        }, 2000);
}
export const insertDepositeBuyer = async(productId,price,clientID) =>{
    return(
        fetch('/insertNewDeposite/buyer',{
            method:'POST',
            body:JSON.stringify({
                'clientID':clientID,
                'productId':productId,
                'price': price
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
export const insertDeposite = async(productId,imageFile,imageUrl,price) =>{
    return(
        fetch('/insertNewDeposite',{
            method:'POST',
            body:JSON.stringify({
                'username':getCookies('username'),
                'productId':productId,
                'imageFile': imageFile,
                'imageUrl': imageUrl,
                'price': price
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
export const insertDepositeByPaymob = async(productId,imageFileName,imageUrl,price) =>{
    return(
        fetch('/insertNewDeposite/Paymob',{
            method:'POST',
            body:JSON.stringify({
                'username':getCookies('username'),
                'productId':productId,
                'imageFileName': imageFileName,
                'imageUrl': imageUrl,
                'price': price
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
export const insertBid = async(price,depositId) =>{
    let date = new Date()
    return(
        fetch('/insertDeposite',{
            method:'POST',
            body:JSON.stringify({
                'price':price,
                'time': `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` ,
                'depositId': depositId,
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
export const insertInstantProduct = async(name,matrial,brand,desc,summery,HomeDecoration,color,price
    ,SIM,size,storage,date,state,DescribeState,carCC,CarModel,CarMile,HorsePower
    ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
    ,FuelType,BuldingArea,TypeBuilding,BuildingFloor,NumbersOfroom
    ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay,CategoryName,imageURL,imageFile)=>{
        let ProductDate = new Date()
        return(
            fetch('/insertInstantProduct',{
                method:'POST',
                body: JSON.stringify({
                    'name':name
                    ,'matrial' : matrial
                    ,'brand' : brand
                    ,'desc' : desc
                    ,'summery' : summery
                    ,'HomeDecoration' :HomeDecoration
                    ,'color' : color
                    ,'price':price
                    , 'SIM' : SIM
                    ,'size' : size
                    , 'storage': storage
                    , 'date':date
                    , 'state' :state
                    , 'DescribeState':DescribeState
                    , 'carCC' : carCC
                    , 'CarModel' : CarModel
                    , 'CarMile'  : CarMile
                    , 'HorsePower' : HorsePower
                    ,'GearStick' : GearStick
                    , 'ManifuctureYear' : ManifuctureYear
                    , 'ManifuctureCountry' : ManifuctureCountry
                    , 'Class' :Class
                    , 'Interchange' : Interchange
                    , 'Structure':Structure
                    , 'LocationOfBuilding':LocationOfBuilding 
                    , 'FuelType' :FuelType 
                    , 'BuldingArea' :BuldingArea
                    , 'TypeBuilding' :TypeBuilding
                    , 'UploadDate' : `${ProductDate.getFullYear()}-${ProductDate.getMonth()+1}-${ProductDate.getDate()} ${ProductDate.getHours()}:${ProductDate.getMinutes()}:${ProductDate.getSeconds()}`
                    , 'BuildingFloor' :BuildingFloor
                    , 'NumbersOfroom' :NumbersOfroom
                    , 'WaterResis' :WaterResis
                    , 'ScreenRes' :ScreenRes
                    , 'ScreenHz' :ScreenHz
                    , 'Wireless' :Wireless
                    , 'Battery' :Battery
                    , 'Camera' :Camera
                    , 'Ram' :Ram
                    , 'DigitalType' :DigitalType
                    , 'payWay':payWay
                    ,'client':getCookies('username')
                    ,'CategoryName':CategoryName
                    ,'imageURL':imageURL
                    ,'imageFile':imageFile
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res)=>res.json())
            .then((data)=>{
                console.log(data)
                if(data[0] === 'SUCCESSED'){
                    swal("Welcome!", `Successful Upload`, "success", {button: false})
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 2000);
                }else{
                    swal("Error", `Error in Inserting`, "error", {button: true})
                }
            })
        )
    }
    // ------------------------------------------------------------------------------------------
    export const insertAuctionProduct = async(name,matrial,brand,desc,summery,HomeDecoration,color
        ,SIM,size,storage,date,state,DescribeState,carCC,CarModel,CarMile,HorsePower
        ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
        ,FuelType,BuldingArea,TypeBuilding,BuildingFloor,NumbersOfroom
        ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay
        ,StartAuction,EndAuction,InitialPrice,WaitingTime,CategoryName,imageURL,imageFile)=>{
            let ProductDate = new Date()
            return(
                fetch('/insertAuctionProduct',{
                    method:'POST',
                    body: JSON.stringify({
                        'name':name
                        ,'matrial' : matrial
                        ,'brand' : brand
                        ,'desc' : desc
                        ,'summery' : summery
                        ,'HomeDecoration' :HomeDecoration
                        ,'color' : color
                        ,'price':null
                        ,'SIM' : SIM
                        ,'size' : size
                        ,'storage': storage
                        ,'date':date
                        ,'state' :state
                        ,'DescribeState':DescribeState
                        ,'carCC' : carCC
                        ,'CarModel' : CarModel
                        ,'CarMile'  : CarMile
                        ,'HorsePower' : HorsePower
                        ,'GearStick' : GearStick
                        ,'ManifuctureYear' : ManifuctureYear
                        ,'ManifuctureCountry' : ManifuctureCountry
                        ,'Class' :Class
                        ,'Interchange' : Interchange
                        ,'Structure':Structure
                        ,'LocationOfBuilding':LocationOfBuilding 
                        ,'FuelType' :FuelType 
                        ,'BuldingArea' :BuldingArea
                        ,'TypeBuilding' :TypeBuilding
                        ,'UploadDate' : `${ProductDate.getFullYear()}-${ProductDate.getMonth()+1}-${ProductDate.getDate()} ${ProductDate.getHours()}:${ProductDate.getMinutes()}:${ProductDate.getSeconds()}`
                        ,'BuildingFloor' :BuildingFloor
                        ,'NumbersOfroom' :NumbersOfroom
                        ,'WaterResis' :WaterResis
                        ,'ScreenRes' :ScreenRes
                        ,'ScreenHz' :ScreenHz
                        ,'Wireless' :Wireless
                        ,'Battery' :Battery
                        ,'Camera' :Camera
                        ,'Ram' :Ram
                        ,'DigitalType' :DigitalType
                        ,'payWay':payWay
                        ,'client':getCookies('username')
                        ,'StartAuction': StartAuction
                        ,'EndAuction': EndAuction
                        ,'InitialPrice': InitialPrice
                        ,'WaitingTime': WaitingTime
                        ,'CategoryName':CategoryName
                        ,'imageURL':imageURL
                        ,'imageFile':imageFile
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then((res)=>{
                    res.json()
                }).then((data)=>{
                    if(data[0] === 'SUCCESSED'){
                        swal("Welcome!", `Successful Upload`, "success", {button: true})
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 2000);
                    }else{
                        swal("Error", `Error in Inserting`, "error", {button: true})
                    }
                })
            )
        }

export const insertReports = async(clientID)=>{
    const dateTime = new Date()
    const rateId = [4,3]
    for (let index = 0; index < clientID.length; index++) {
        for (let index3 = 0; index3 < rateId.length; index3++) {
            const responce = await fetch('/insert/rating/form',
            {
                method:'POST',
                body:JSON.stringify({
                    'rateId' : rateId[index3],
                    'clientID' : clientID[index],
                    'currentDate' : `${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${dateTime.getDate()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await responce.json()
            for (let index2 = 0; index2 < data.IDs.length; index2++) {
                const responce2 = await fetch('/insert/rating/form/final/report',
                {
                    method:'POST',
                    body:JSON.stringify({
                        'maxReportId' : data.maxReportId,
                        'commonReportId' : data.IDs[index2]
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const data2 = await responce2.json()
            }
        }
    } 
}
export const insertAngryReports = async(clientID)=>{
    const dateTime = new Date()
    const rateId = 1
    const responce = await fetch('/insert/rating/form',
    {
        method:'POST',
        body:JSON.stringify({
            'rateId' : rateId,
            'clientID' : clientID,
            'currentDate' : `${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${dateTime.getDate()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await responce.json()
    for (let index2 = 0; index2 < data.IDs.length; index2++) {
        const responce2 = await fetch('/insert/rating/form/final/report',
        {
            method:'POST',
            body:JSON.stringify({
                'maxReportId' : data.maxReportId,
                'commonReportId' : data.IDs[index2]
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data2 = await responce2.json()
    }
        
    
}
export const insertReportsSeller = async(clientID,bidId)=>{
    const dateTime = new Date()
    console.log(clientID)
    const responce = await fetch('/insert/rating/form/seller',
    {
        method:'POST',
        body:JSON.stringify({
            'clientID' : clientID,
            'currentDate' : `${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${dateTime.getDate()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`,
            'bidId': bidId
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await responce.json()
    for (let index2 = 0; index2 < data.IDs.length; index2++) {
        const responce2 = await fetch('/insert/rating/form/final/report',
        {
            method:'POST',
            body:JSON.stringify({
                'maxReportId' : data.maxReportId,
                'commonReportId' : data.IDs[index2]
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data2 = await responce2.json()
    }
    
}
export const insertReportsBuyer = async(clientID,productId)=>{
    const dateTime = new Date()
    console.log(clientID)
    const responce = await fetch('/insert/rating/form/buyer',
    {
        method:'POST',
        body:JSON.stringify({
            'clientID' : clientID,
            'currentDate' : `${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${dateTime.getDate()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`,
            'productId': productId
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await responce.json()
    for (let index2 = 0; index2 < data.IDs.length; index2++) {
        const responce2 = await fetch('/insert/rating/form/final/report',
        {
            method:'POST',
            body:JSON.stringify({
                'maxReportId' : data.maxReportId,
                'commonReportId' : data.IDs[index2]
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data2 = await responce2.json()
    }
    
}