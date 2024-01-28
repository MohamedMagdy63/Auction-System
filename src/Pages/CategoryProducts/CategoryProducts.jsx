import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Announcement from '../../Components/Announcement/Announcement';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './CategoryProducts.css'
import { useParams } from 'react-router-dom';
import styled from "@emotion/styled";
import Newsletter from '../../Components/Newsletter/Newsletter';
import Footer from '../../Components/Footer/Footer';
import ProductsOfCategorey from '../../Components/Products/ProductsOfCategorey';
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const CategoryProducts = (props) => {
    const [sideBarOpen, setSideBarOpen] = useState('')
    const [type, setType] = useState(['Instant','Live Auction','Schedule Auction'])
    const [typeProduct , setTypeProduct] = useState('All Types')
    const [productState,setProductState] = useState('All')

    const {categoryName} = useParams()
    const oneRun = useRef(true)

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    const handleProductState = (e) =>{
        setProductState(e.target.value)
    }
    const handleType =(e)=>{
        setTypeProduct(e.target.value)
    }
    
    return (
        <>
            <Navbar sideBarAction = {setSideBarOpen}/>
            <Announcement />
            {props.userInformation ?
            <Sidebar sidebarUserData={props.userInformation} sideBarState = {sideBarOpen}/>
            :''
            }
            <div className="titleOfpage">{categoryName}</div>
            <div className="filterContainer">
                <div className="filter">
                    <div className="filterText">Type of selling:</div>
                        <Select onChange={handleType}>
                        <Option value="All Types"> All Types </Option>
                        {
                            type.length != 0 ?
                            type.map((type,index)=>{
                            return(
                                <Option key={index} value={type}>{type}</Option>
                            )
                            })
                            :''
                        }
                        </Select>
                    </div>
                <div className="filter">
                    <div className="filterText">Sort Products:</div>
                        <Select onChange={handleProductState} name="state" id="state">
                            <Option value="All">All</Option>
                            <Option value="New">New</Option>
                            <Option value="Used">Used</Option>
                        </Select>
                </div>
            </div>
            <div className="container">
                <ProductsOfCategorey filterPayway = {typeProduct} filterProductState={productState} CategoryNameRoute={categoryName}/>
            </div>
            <Newsletter />
            <Footer />
        </>
    );
}

export default CategoryProducts;
