import { useEffect, useRef, useState } from "react";
import Announcement from '../../Components/Announcement/Announcement'
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Newsletter from "../../Components/Newsletter/Newsletter.jsx";
import styled from "@emotion/styled";
import Products from '../../Components/Products/Products'
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import "./style.css"
import { getSubCategoryTypes } from "../../controller/moduls/GetData";

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const ProductList = (props) => {
  const [productState,setProductState] = useState('All')
  const [productCategory,setProductCategory] = useState('All Categorise')
  const [productSubCategory,setProductSubCategory] = useState([])
  const [subCategorySelection,setSubCategorySelection] = useState([])
  const [subCategoryForInstantProduct,setSubCategoryForInstantProduct] = useState([])
  const [sideBarOpen, setSideBarOpen] = useState('')
  const Option = styled.option``;
  const [categories, setCategories] = useState([])
  const {categoryOfProduct} = useParams()
  const oneRun = useRef(true)


  const handleProductState = (e) =>{
    setProductState(e.target.value)
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
  const handleSubCategory = (e)=>{
    if(e.target.value !== 'All Categorise'){
      setProductSubCategory([e.target.value])
    }else{
        setProductSubCategory([])
        setSubCategorySelection([])
        getSubCategoryTypes(productCategory).then((subCategories)=>{
            // eslint-disable-next-line array-callback-return
            subCategories.map(subCategory=>{
                setProductSubCategory(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
                setSubCategorySelection(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
            })
        })
    }
  }


  useEffect(()=>{
    window.scrollTo(0,0);
    if(oneRun.current){
      oneRun.current = false
      if(categoryOfProduct !== 'all' && categoryOfProduct !== null){
        getSubCategoryTypes(categoryOfProduct).then((subCategories)=>{
          subCategories.map(subCategory=>{
            setSubCategoryForInstantProduct(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
          }) 
        })
      }
    }
  },[])
  
  return (
    <div className="productContainer">
      <Navbar sideBarAction = {setSideBarOpen}/>
      <Announcement />
      {props.userInformation ?
      <Sidebar sidebarUserData={props.userInformation} sideBarState = {sideBarOpen}/>
      :''
      }
      <div className="productTitle">{categoryOfProduct === 'all' ? 'Instant Product' : categoryOfProduct}</div>
      {categoryOfProduct !== 'all' ?
      ''
      :
      <div className="filterContainer">
        <div className="filter">
          <div className="filterText">Categories:</div>
            <select onChange={handleCategory}>
              <option value="All Categorise"> All Categories</option>
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
              <option value="All Categorise"> All </option>
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
        <div className="filterState">
          <div className="filterText">Sort:</div>
          <Select onChange={handleProductState} name="state" id="state">
            <Option value="All">All</Option>
            <Option value="New">New</Option>
            <Option value="Used">Used</Option>
          </Select>
        </div>
      </div>
      }
      <Products instantSubCategory={subCategoryForInstantProduct} routeCategory = {categoryOfProduct} subCategoryFilter = {productSubCategory} catogryFilter = {productCategory} allCatogrieshave = {setCategories} stateProduct={productState}/>
      <Newsletter />
      <Footer />
    </div>
    
  );
};

export default ProductList;