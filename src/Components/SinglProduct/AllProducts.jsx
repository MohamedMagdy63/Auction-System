import React from 'react';
import {
FavoriteBorderOutlined,
SearchOutlined,
} from "@mui/icons-material";
import styled from '@emotion/styled';
import { NavLink, useParams } from "react-router-dom";
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
const AllProducts = ({item}) => {
    return(
        <Container>
        <Circle />
        <Image src={item.IMAGE} />
        <Info>
        {
            item.PAYWAY=== "Instant"
            ?
            <NavLink to={`/instant/${item.PRODUCT_ID}/${item.PAYWAY}`}>
            <div className="iconDiv">
            <SearchOutlined />
            </div>
            </NavLink>
            :
            <NavLink to={`/allProducts/${item.PRODUCT_ID}/${item.PAYWAY !== "Live Auction"? 'Schedule' :'Live'}`}>
            <div className="iconDiv">
            <SearchOutlined />
            </div>
            </NavLink>
        }   
        <div className="iconDiv" onClick={()=>{handleFavoriteBtn(item)}}>
        <FavoriteBorderOutlined/>
        </div>
        </Info>
    </Container>
    )
};

export default AllProducts;
