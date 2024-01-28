import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import React ,{useState , useEffect}from 'react';
import './style.css'
import styled from '@emotion/styled';
import { sliderItems } from '../../assists/Data/Data';
import { NavLink } from 'react-router-dom';

const Arrow =styled.div`
width: 50px;
height: 50px;
background-color: #fff7f7;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
left:${props=>props.direction==="left" && "10px"};
right:${props=>props.direction==="right" && "10px"};
margin: auto;
cursor:pointer;
opacity:0.5;
z-index:2;
`
const Wrapper=styled.div`
height: 100%;
display: flex;
transition: all 1.5s ease;
transform: translateX(${props=>props.SlideIndex * -100}vw);
`
const Slide=styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
background-color: #${props=>props.bg};
`
const Slider = () => {
    const [SlideIndex=0, setSlideIndex] = useState();
    const handleClick =(direction)=>{
        if(direction==='left'){
            setSlideIndex(SlideIndex > 0 ? SlideIndex - 1 : 5)
        }else{
            setSlideIndex(SlideIndex < 5 ? SlideIndex + 1 : 0)
        }
    }
    return (
        <div className="sliderContainer">
            <Arrow direction="left" onClick={()=>handleClick('left')}>
            <ArrowLeftOutlined/>
            </Arrow>
            <Wrapper SlideIndex={SlideIndex}>
                {
                    sliderItems.map(item=>(
                        <Slide bg={item.bg} key={item.id}>
                            <div className="sl-img">
                                {item.img} 
                            </div>
                            <div className="sl-info">
                                <div className="sl-title">
                                    <h1>{item.title}</h1>
                                </div>
                                <div className="sl-desc">
                                    <p>{item.desc}</p>
                                </div>
                                {window.innerWidth >= 800 ? (item.arrow) : '' }
                                <div className="sl-button">
                                    <NavLink className='navButton' to={`/Category/${item.link}`}> 
                                        {item.button}
                                    </NavLink>
                                </div>
                            </div>
                        </Slide>
                    ))
                }
            </Wrapper>
            <Arrow direction="right" onClick={()=>handleClick('right')}>
            <ArrowRightOutlined/>
            </Arrow>
        </div>
    );
}

export default Slider;
