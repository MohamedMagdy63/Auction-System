import './SchadulingActionProduct.css';
import {schedualProducts} from '../../assists/Data/schadulingAuction';
import { NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { allCategorise } from '../../assists/Data/CategoryImages';
import { getSubCategoryTypes } from '../../controller/moduls/GetData';
import { updateSoldBid } from '../../controller/moduls/UpdateModule';
import { checkProductState, fetchProductBidLive } from '../../assists/Data/liveAuction';
import { getUserByClientId, getUserById } from '../../controller/moduls/getUserById';
import { sendmail } from '../../controller/moduls/sendMails';
import { insertReports, insertReportsBuyer, insertReportsSeller } from '../../controller/moduls/insertModule';const SchadulingActionProduct = () => {
    const onesRun = useRef(true);
    const [product,setProduct] = useState([])
    const [productSubCategory,setProductSubCategory] = useState([])
    const [subCategorySelection,setSubCategorySelection] = useState([])
    const [productCategory,setProductCategory] = useState('All Categorise')
    const [categories, setCategories] = useState([])


    const handleSubCategory = (e)=>{
        if(e.target.value !== 'All'){
            setProductSubCategory([e.target.value])
        }else{
            setProductSubCategory([])
            setSubCategorySelection([])
            getSubCategoryTypes(productCategory).then((subCategories)=>{
                subCategories.map(subCategory=>{
                    setProductSubCategory(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
                    setSubCategorySelection(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
                })
            })
        }
    }
    const handleCategory = (e) =>{
        setProductSubCategory([])
        setSubCategorySelection([])
        getSubCategoryTypes(e.target.value).then((subCategories)=>{
            subCategories.map(subCategory=>{
                setProductSubCategory(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
                setSubCategorySelection(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
            })
        })
        setProductCategory(e.target.value)
    }

  useEffect(()=>{
    if(onesRun.current){
      onesRun.current = false
      var test = new Array()
      schedualProducts().then((res)=>{
        //   res.map(async(x)=>{
        //     let time
        //     time = Date.parse(x.endAuction) - Date.now();
        //     let day = Math.floor(time / (1000 * 60 * 60 * 24))
        //     let Hours = Math.floor((time / (1000 * 60 * 60)) % 24)
        //     let Minuts = Math.floor((time / 1000 / 60) % 60)
        //     let Seconds = Math.floor((time / 1000) % 60)
        //     if(day <= 0 && Hours <= 0 && Minuts <= 0 && Seconds <= 0){
                
        //         checkProductState(x.id,x.payWayId).then(async(data)=>{
        //             data.map((cli)=>{
        //                 setClientIDs(oldArray => [...oldArray,cli.CLINT_ID])
        //                 test.push(cli.CLINT_ID)
        //             })
        //             insertReports(test).then((state)=>{
        //                 console.log(state)

        //             })
        //         })
        //         // updateSoldBid(x.id)

        //         // let clientArray = new Array()
        //         // fetchProductBidLive(x.id,x.payWayId).then((results)=>{
        //         //     results.map((cli)=>{
        //         //         return clientArray.push(cli.CLINT_ID)
        //         //     })
           
                    
        //         //     // insertReports(clientArray).then(async()=>{
        //         //     //     insertReportsSeller(clientArray[0].OWNERPRODUCT,clientArray[0].BID_ID).then(async()=>{
        //         //     //         insertReportsBuyer(clientArray[0].CLINT_ID,clientArray[0].PRODUCT_ID).then(async()=>{
                                
        //         //     //         })
        //         //     //     })
        //         //     // }) 
        //         //     // getUserByClientId(results[0].OWNERPRODUCT).then((out)=>{

        //         //     //     // sendmail(results[0].NAME,
        //         //     //     //         out[0].email,
        //         //     //     //         results[0].USER_EMAIL,
        //         //     //     //         results[0].USER_PHONE1,
        //         //     //     //         'The Winner').then( (res)=>{
        //         //     //     //     if(res.code === 200){
        //         //     //     //         sendmail(out[0].userName,
        //         //     //     //                 results[0].USER_EMAIL,
        //         //     //     //                 out[0].email,
        //         //     //     //                 out[0].phone1,
        //         //     //     //                 'The owner of product').then(async(out)=>{
        //         //     //     //             if(out.code === 200){
                                        
        //         //     //     //             }
        //         //     //     //         })
        //         //     //     //     }
        //         //     //     // })
        //         //     // })
        //         //     console.log(clientArray)
        //         // })
        //     }else{
        //         setProduct(oldArray=>[...oldArray,x])
        //     }
        // })
        setProduct(res)
        allCategorise().then((category)=>{
            setCategories(category)
        })
      })
    }
    // console.log(clientIDs)
  },[])
  return (
    <div className='productCards'>
        <div className="Continer">
            <div className="controllBar">
                <div className="filter">
                <div className="filterText">Categories:</div>
                    <select onChange={handleCategory}>
                    <option value="All Categorise"> All Categories </option>
                    {
                        categories.length != 0 ?
                        categories.map((category)=>{
                        return(
                            <option key={category.CATEGORY_ID} value={category.CATEGORY_NAME}>{category.CATEGORY_NAME}</option>
                        )
                        })
                        :''
                    }
                    </select>
                </div>
                {productCategory !== 'All Categorise' ? 
                    <div className="filterSubCategory">
                    <div className="filterText">Subcategories:</div>
                        <select onChange={handleSubCategory}>
                            <option value={'All'}>All</option>
                            {
                                subCategorySelection.length != 0 ?
                                subCategorySelection.map((subcategory,index)=>{
                                return(
                                    <option key={index} value={subcategory}>{subcategory}</option>
                                )
                                })
                                :''
                            }
                        </select>
                    </div>
                :
                ''
                }
            </div>
            <div className="cards">
                {
                    productCategory === 'All Categorise' ?
                        product.map(x=>{
                            return(
                                <div key={x.image} className="card">
                                    <div className="card_img">
                                        <img src={x.image[0]} alt="" />
                                    </div>
                                    <div className="info">
                                        <div className="title">
                                            {x.title}
                                        </div>
                                        <div className="summary">
                                            {x.summary}
                                        </div>
                                        <div className="categorie">
                                        <div className="name">{x.Category} <br /> <span className="type">{x.brand}</span></div>
                                        </div>
                                        <div className="Price">
                                            {x.price.toFixed(2)}<span>Eg</span> 
                                        </div>
                                        {/* <DetailReview item={x}/> */}
                                        <NavLink to={`${x.id}/${x.payWay !== "Schedule Auction"? 'Live' :'Schedule'}`}>
                                            <button className="cardDetailsBtn">Details</button>
                                        </NavLink>
                                        
                                    </div>
                                </div>
                            )
                        })
                    :
                    product.map(x=>{
                        return(
                            productSubCategory.map((subCategory)=>{
                                return(
                                    subCategory.toLowerCase() === x.Category.toLowerCase() ?
                                        <div key={x.image} className="card">
                                            <div className="card_img">
                                                <img src={x.image[0]} alt="" />
                                            </div>
                                            <div className="info">
                                                <div className="title">
                                                    {x.title}
                                                </div>
                                                <div className="summary">
                                                    {x.summary}
                                                </div>
                                                <div className="categorie">
                                                <div className="name">{x.Category} <br /> <span className="type">{x.brand}</span></div>
                                                </div>
                                                <div className="Price">
                                                    {x.price}<span>Eg</span> 
                                                </div>
                                                {/* <DetailReview item={x}/> */}
                                                <NavLink to={`${x.id}/${x.payWay !== "Schedule Auction"? 'Live' :'Schedule'}`}>
                                                    <button className="cardDetailsBtn">Details</button>
                                                </NavLink>
                                                
                                            </div>
                                        </div>
                                    :''
                                )
                            })
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default SchadulingActionProduct