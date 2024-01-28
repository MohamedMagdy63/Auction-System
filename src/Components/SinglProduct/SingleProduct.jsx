import {
  FavoriteBorderOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import styled from '@emotion/styled';
import { NavLink } from "react-router-dom";
import { favoriteProduct } from '../../assists/Data/favorites'
import './SingleProduct.css'


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover{
    opacity:1;
  }
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  width: 75%;
  object-fit: contain;
  z-index: 2;
`;

const handleFavoriteBtn = (item) =>{
  favoriteProduct.push(item)
}


const SingleProduct = ({ item, productState, categorySelect, subCategorySelect }) => {
  const mainBlock = ()=>{
    return(
      <Container>
      <Circle />
      <Image src={item.images[0]} />
      <Info>
        
        <NavLink to={`/instant/${item.id}/${item.payWay}`}>
          <div className="iconDiv">
            <SearchOutlined />
          </div>
        </NavLink>
          
          <div className="iconDiv" onClick={()=>{handleFavoriteBtn(item)}}>
            <FavoriteBorderOutlined/>
          </div>
      </Info>
    </Container>
    )
  }
  return (
    //Category
    productState || categorySelect ?
      productState === 'All'?
        categorySelect === 'All Categorise'?
          mainBlock()
        :
        subCategorySelect.lenght !== 0 ?
        subCategorySelect.map((subs)=>{
          return(
            item.Category.toLowerCase() === subs.toLowerCase() ?
            mainBlock()
          :'' 
          )
        })
        :''
      :
      item.state.toLowerCase() === productState.toLowerCase() ?
        categorySelect === 'All Categorise'?
          mainBlock()
        :
        subCategorySelect.lenght !== 0 ?
        subCategorySelect.map((subs)=>{
          return(
            item.Category.toLowerCase() === subs.toLowerCase() ?
            mainBlock()
          :'' 
          )
        })
        :''
      :''
    :
    mainBlock()
  );
};

export default SingleProduct;