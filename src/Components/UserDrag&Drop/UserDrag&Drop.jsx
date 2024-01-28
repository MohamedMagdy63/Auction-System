import React, {useState} from 'react';
import "./style.css"
import { useRef } from 'react';
const UserDragDrop = (props) => {
    const [files,setFiles]=useState(null)
    const [maximum,setMaximum]=useState(false)
    const inputRef=useRef();
    const handleDragOver=(e)=>{
        e.preventDefault()
    }
    const handleFiles = (e)=>{
        setFiles(e.target.files)
        if (e.target.files) {
            let files = e.target.files
            let filesArry = Array.prototype.slice.call(files)
            filesArry.map((f)=>{
                if(!f.type.match("image/*")){
                    return;
                }
                let rander = new FileReader();
                rander.onload = (e)=>{
                    var base64 = (e.target.result).toString()
                    props.imageFile(oldarray=>[...oldarray,f.name])
                    props.imageURl(oldarray=>[...oldarray,base64])
                }
                rander.readAsDataURL(f)
            })
        }
        const counter = e.target.files.length
        counter <= 6 ? setMaximum(true) : setMaximum(false)
    }
    const handleDrop =(e)=>{
        e.preventDefault()
        setFiles(e.dataTransfer.files)
        const counter = e.dataTransfer.files.length
        counter <= 6 ? setMaximum(true) : setMaximum(false)
        
    }
    const handleSelect = ()=>{
        inputRef.current.click()
    }
    if(files)return(
        maximum !== true ?
            <>
                <div className="uploads">
                    <ul>
                        {Array.from(files).map((file,idx)=>
                            <li key={idx}>{file.name}</li>
                            )}
                    </ul>
                    <div className="actions">
                        <button className='buttonDisplay' onClick={()=> setFiles(null)}>Cancel</button>
                    </div>
                </div>
            </>
        : setFiles(null)
    )
    return (
        <>
            {!files && (
                <div 
                    className='dropContainer'
                    onDragOverCapture={handleDragOver}
                    onDrop={handleDrop}
                >
                    <h1>Drag Images</h1>
                    <h1>Or</h1>
                    <input 
                    type="file"
                    multiple
                    onChange={handleFiles}
                    hidden
                    ref={inputRef}
                    accept="image/*"
                    />
                    <p>Please insert more than 6 images</p>
                    <button className='buttonDisplay' onClick={handleSelect}>Select Files</button>
                </div>
            )}
        </>
    );
}

export default UserDragDrop;
