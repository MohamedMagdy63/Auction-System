import React from 'react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { ALLProductsInCategories } from '../../assists/Data/ProductData';
import AllProducts from '../SinglProduct/AllProducts';
import { getSubCategoryTypes } from '../../controller/moduls/GetData';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const ProductsOfCategorey = (props) => {
    const onesRun = useRef(true);
    const [product,setProduct] = useState([])
    const [subCategory, setSetSubCategory] = useState([])

    useEffect(()=>{
        if(onesRun.current){
          onesRun.current = false
          ALLProductsInCategories().then((res)=>{
            setProduct(res)
            getSubCategoryTypes(props.CategoryNameRoute).then((subCategories)=>{
                subCategories.map(subCategory=>{
                    setSetSubCategory(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
                }) 
            })
          })
        }
      },[product])
    return ( 
      <Container>
        {console.log(props.filterPayway)}
        {
        props.filterPayway === 'All Types' ?
          product.length !== 0 ?
            product.map((item) => (
              subCategory.length !== 0 ?
                subCategory.map((subCategory)=>(
                    subCategory.toLowerCase() === item.CATEGORY.toLowerCase() ?
                    <AllProducts item={item}  />
                    : ''
                ))
                  
              :''
            ))
          :''
        :
        product.length !== 0 ?
          product.map((item) => (
            item.PAYWAY === props.filterPayway ?
              subCategory.length !== 0 ?
                subCategory.map((subCategory)=>{
                  return(
                    subCategory.toLowerCase() === item.CATEGORY.toLowerCase() ?
                    <AllProducts item={item} />
                    : ''
                  )
                }) 
              :''
            :''
          ))
        :''
        }
      </Container>
    );
}

export default ProductsOfCategorey;
