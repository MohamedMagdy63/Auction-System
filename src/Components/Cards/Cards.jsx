import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";
import './style.css'

const Box= styled(motion.li)`
position: relative;
width: 20rem;
height: 60vh;
background-color: #${props=>props.bg};
color:white;
padding:1.5rem 3.5rem;
margin-right:8rem; 
border-radius:0 50px 0 50px; 
display: flex;
flex-direction: column;
border: 1px solid white;
transition: all 0.5s forward;
`
const Title=styled.h2`
text-align:center;
font-size: calc(1.5em + 0.5vw);
font-weight:900;
`
const Image=styled.div`
position: absolute;
top:180px;
display:flex;
width:25rem;
height:55vh;
user-select: none;
`
const Button =styled.button`
width:40%;
height:10%;
background-color:#dff9fb;
border:none;
cursor:pointer;
align-items:center;
justify-content:center;
margin:5px;
padding:5px;
font-size:20px;
opacity:0.5;
z-index: 5;
&:hover{
  opacity:1;
}
`


const Item = {

    hidden: {
        scale:0
    },
    show: {
      scale:1,
  
      transition:{
        type:'spring',
        duration: 0.5,
      }
    }
  
  }
const Cards =(props)=>{
    const {id,image,title,bg}=props.data;
    return(
        <Box key ={id} variants={Item} bg={bg}>
            <Title>{title}</Title>
              <Button>
                <NavLink className='navLink' to={`/Category/${title}`}>Show More</NavLink>
              </Button>
              <Image className="imageContiner">
                <img src={image} alt="" />  
              </Image>
        </Box>
    )
}

export default Cards