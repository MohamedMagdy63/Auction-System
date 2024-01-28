import { SearchOutlined } from '@mui/icons-material';
import React from 'react';
import './SearchItem.css'
import Popup from 'reactjs-popup';
const SearchItem = ({item}) => {
    return (
        <Popup
        trigger={<SearchOutlined />}
        modal
        nested
    >
    {close => (
    <div className="searchContainer">
        <button className="close" onClick={close}>
        &times;
        </button>
        <div className="imgContainer">
        <img src={item.img} className='imgItem'/>

        </div>
        <div className="content">
            {/* <Timer/> */}
            {/* <img className='imgContainer' src={item.img}/> */}
            <div className="header">Denim Jumpsuit</div>
            <div className="popUpPrice">$ 20</div>
            <div className="detailTitle">Clothes</div>
            <div className="contentDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.</div>
            <div className="colorOfItem">Color:darkblue</div>
            <div className="colorOfItem">Size :XS</div>
            <div className="buttonsContainer">
            <button className="descButton"> Attempt Now </button>
            {/* <button
            className="button"
            onClick={() => {
            close();
            }}
        >
            close modal
        </button> */}
            </div>
        </div>
        
        
    {/* <div className="actions">
    <Popup
        trigger={}
        position="bottom left"
        nested
    >
        
    </Popup>
        
            </div> */}
        </div>
        )}
    </Popup>
    );
}

export default SearchItem;
