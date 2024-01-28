import './ProductCards.css'
import {LiveProducts} from '../../assists/Data/liveAuction'
import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { getSubCategoryTypes } from '../../controller/moduls/GetData';
import { allCategorise } from '../../assists/Data/CategoryImages';


export const ProductCards = () => {
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
      LiveProducts().then((res)=>{
        // res.map((x)=>{
        // let time
        // time = Date.parse(x.startTime) - Date.now();
        // let day = Math.floor(time / (1000 * 60 * 60 * 24))
        // let Hours = Math.floor((time / (1000 * 60 * 60)) % 24)
        // let Minuts = Math.floor((time / 1000 / 60) % 60)
        // let Seconds = Math.floor((time / 1000) % 60)
        // if(day <= 0 && Hours <= 0 && Minuts <= 0 && Seconds <= 0){
        //     fetchProductBidLive(x.id,x.payWayId).then((results)=>{
        //         let time2
        //         time2 = Date.parse(results[0].BID_TIME) - Date.now();
        //         let day2 = Math.floor(time2 / (1000 * 60 * 60 * 24))
        //         let Hours2 = Math.floor((time2 / (1000 * 60 * 60)) % 24)
        //         let Minuts2 = Math.floor((time2 / 1000 / 60) % 60)
        //         let Seconds2 = Math.floor((time2 / 1000) % 60)
        //         if(day2 <= 0 && Hours2 <= 0 && Minuts2 <= 0 && Seconds2 <= 0){
        //             updateSoldBid(x.id)
        //             insertReportsSeller(results[0].OWNERPRODUCT,results[0].BID_ID).then(()=>{
        //                 insertReportsBuyer(results[0].CLINT_ID,results[0].PRODUCT_ID).then(()=>{
        //                     console.log("Done")
        //                 })
        //             })
        //         }else{
        //             setProduct(oldArray=>[...oldArray,x])
        //         }
        //     })
        // }else{
        //     setProduct(oldArray=>[...oldArray,x])
        // }
        // })
        setProduct(res)
        allCategorise().then((category)=>{
            setCategories(category)
        })
      })
    }
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
                        categories.length !== 0 ?
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
                            <option value='All'>All</option>
                            {
                                subCategorySelection.length !== 0 ?
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
                                <div key={x.id} className="card">
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
                                        {x.price.toFixed(2)} Eg
                                        </div>
                                        <NavLink to={`/liveAuction/${x.id}/${x.payWay !== "Schedule Auctoin"? 'Live' :'Schedule'}`}>
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
                                        <div key={x.id} className="card">
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
                                                <NavLink to={`/liveAuction/${x.id}/${x.payWay !== "Schedule Auctoin"? 'Live' :'Schedule'}`}>
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
