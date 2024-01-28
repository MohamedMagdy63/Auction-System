import React, { useRef ,useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {CategoryImages} from '../../assists/Data/CategoryImages'
import { motion } from "framer-motion";
import Cards from '../Cards/Cards';
import { SvgComponent } from './AllSvgs';
import './style.css'

const Main = styled(motion.ul)`
position: fixed;
top: 6rem;
left:calc(1.5rem + 0.5vw);
height: 40vh;
display: flex;
color: black;
`
const Rotate = styled.span`
display:block;
position: fixed;
right:1rem;
bottom: 1rem;
width: 80px;
height: 80px;
z-index:1;
`
const container = {

    hidden: {opacity:0},
    show: {
      opacity:1,
  
      transition:{
        staggerChildren: 0.5,
        duration: 0.5,
      }
    }
}



const MainCategoryOfSelling = () => {
    // const [position , setPosition] = useState(false)
    const ref =useRef(null);
    const yinyang = useRef(null);
    const onesRun = useRef(true);
    const [categories,setCategories] = useState([])

    useEffect(() => {
        if(onesRun.current){
            onesRun.current = false
            let continer = document.querySelector('.categoreyContainer')
            CategoryImages().then((res)=>{
                setCategories(res)
                continer.style.height = `calc(70*${res.length}vh)`
            })
        }
        let element = ref.current;
        const rotate=()=>{
            element.style.transform = `translateX(${-window.pageYOffset}px)`
            return (yinyang.current.style.transform =
                'rotate(' + -window.pageYOffset + 'deg)')
            
        }
        window.addEventListener('scroll',rotate)
        return ()=> window.removeEventListener('scroll',rotate)
        
        
    }, []);

    
    return (
        <>
        <div className="categoreyContainer">
            <Main
            ref={ref}
            variants={container} 
            initial='hidden' 
            animate='show' 
            >
                {
                    categories.map( item =>
                        <Cards key={item.id} data={item}/>
                    )
                }
            </Main>
            <Rotate ref={yinyang} >
                <SvgComponent width={80} height={80}  />
            </Rotate>
        </div>
        </>
    );
}

export default MainCategoryOfSelling;
