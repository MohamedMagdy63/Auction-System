import styled from '@emotion/styled';
import { ProductImage } from "../../assists/Data/instantProduct";
import SingleProduct from "../SinglProduct/SingleProduct";
import { useEffect, useRef, useState } from 'react';
import { allCategorise } from '../../assists/Data/CategoryImages';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = (props) => {
  const oneRun = useRef(true)
  const [itemData,setItemData] = useState([])
  useEffect(()=>{
    if(oneRun.current){
      oneRun.current = false
      if(!props.typeOfProduct){
        ProductImage().then((output)=>{
          setItemData(output)
          allCategorise().then((category)=>{
            props.allCatogrieshave(category)
          })
        })
      }
    }
  },[itemData])
  return (
    props.routeCategory === 'all' || props.routeCategory === undefined ?
    props.routeCategory === undefined ?
        <Container>
          {props.allInstantProduct.length !== 0 ?
            props.allInstantProduct.map((item) => (
              item.Category === props.trinding ?
              <SingleProduct categorySelect={props.catogryFilter} productState = {props.stateProduct} item={item} key={item.id} />
              :''
            ))
            :''
          }
        </Container>
      : 
      !props.typeOfProduct ? 
        <Container>
          {itemData.length !== 0 ?
            itemData.map((item) => (
              <SingleProduct subCategorySelect ={props.subCategoryFilter} categorySelect={props.catogryFilter} productState = {props.stateProduct} item={item} key={item.id} />
            ))
            :''
          }
        </Container>
      :''

    :
    !props.typeOfProduct ? 
      <Container>
        {
          itemData.map((item) => (
            props.instantSubCategory.length !== 0 ?
              props.instantSubCategory.map((subCate)=>{
                return(
                  item.Category.toLowerCase() === subCate.toLowerCase() ?
                  <SingleProduct item={item} key={item.id} />
                  : ''
                )
              })
            :''
          ))
        }
      </Container>
    :''
  );
};

export default Products;