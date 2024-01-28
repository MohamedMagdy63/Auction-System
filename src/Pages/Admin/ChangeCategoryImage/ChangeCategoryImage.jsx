import './ChangeCategoryImage.css'
import {CloudUpload} from '@mui/icons-material'
import {CategoryImages, MainCategory, allSubCategoriseName, subCategoryFilter} from '../../../assists/Data/CategoryImages'
import { useEffect, useReducer, useRef, useState } from 'react'
import { UpdateCategory } from '../../../controller/moduls/UpdateCategoryImg'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { insertNewCategory } from '../../../controller/moduls/insertModule'

function ChangeCategoryImage(props) {
    const [file, setFile] = useState([]);
    const [reducer, forceUpdata] = useReducer(x => x + 1, 0);
    const onesRun = useRef(true)
    const [categories,setCategories] = useState([])
    const [topping, setTopping] = useState("Main_Category")
    const [typeOfCategory, setTypeOfCategory] = useState("Main_Category")
    const [mainCategoryHave, setMainCategoryHave] = useState([])
    const [idMainCategory, setIdMainCategory] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [newcategoryImageURL,setNewcategoryImageURL] = useState('')
    const [newcategoryImageFile,setNewcategoryImageFile] = useState('')


    const handelFilePath = (e,id)=>{
        if (e.target.files) {
            let files = e.target.files
            let filesArry = Array.prototype.slice.call(files)
            filesArry.map((f)=>{
                if(!f.type.match("image/*")){
                    return;
                }
                let rander = new FileReader();
                rander.onload = (e)=>{
                    var base64 = (e.target.result).toString();
                    UpdateCategory(base64,f.name,id)
                }
                rander.readAsDataURL(f)
            })
        }
        // forceUpdata()
    }
    const handleMainCategoryFilter = (e)=>{
        setTopping(e.target.value)
        console.log(e.target.value)
        if(e.target.value === "Main_Category"){
            CategoryImages().then((res)=>{
                setCategories(res)
            })
        }else{
            subCategoryFilter().then((res)=>{
                setCategories(res)
            })
        }
    }
    const handleTypeOfNewCategory = (e)=>{
        setTypeOfCategory(e.target.value)
        console.log(e.target.value)
        if(e.target.value === "Sub_Category"){
            CategoryImages().then((res)=>{
                setMainCategoryHave(res)
            })
        }else{
            setMainCategoryHave([])
        }
    }
    const handleSelection = (e)=>{
        setIdMainCategory(e.target.value)
    }
    const handleNewCategoryName = (e)=>{
        setCategoryName(e.target.value)
    }
    const handelFilePathNewCategory = (e)=>{
        if (e.target.files) {
            let files = e.target.files
            let filesArry = Array.prototype.slice.call(files)
            filesArry.map((f)=>{
                if(!f.type.match("image/*")){
                    return;
                }
                let rander = new FileReader();
                rander.onload = (e)=>{
                    var base64 = (e.target.result).toString();
                    setNewcategoryImageFile(f.name)
                    setNewcategoryImageURL(base64)
                }
                rander.readAsDataURL(f)
            })
        }
    }
    const handleSubmitNewCategoryData = ()=>{
        if(typeOfCategory === ''){
            console.log("error in" + "typeOfCategory")
          }else if(categoryName === ''){
            console.log("error in" + "categoryName")
          }else if(newcategoryImageURL === ''){
            console.log("error in" + "newcategoryImageURL")
          }else if(newcategoryImageFile === ''){
            console.log("error in" +"newcategoryImageFile")
          }else{
            if(typeOfCategory === "Main_Category"){
                insertNewCategory(categoryName,null,newcategoryImageURL,newcategoryImageFile)
            }else{
                insertNewCategory(categoryName,idMainCategory,newcategoryImageURL,newcategoryImageFile)
            }
          }
    }

    useEffect(()=>{
        CategoryImages().then((res)=>{
            setCategories(res)
        })
        if (document.readyState === "complete") {
            setTimeout(()=>{
                if(document.querySelector('.test')){
                    document.querySelector('.test').remove()
                }
            },1500)
        }
    },[reducer])
    
  return (
    <div className='changeCategoryImage'>
        <div className="test">
        {document.body.classList.contains('dark') === true?
      <img src="/loader/ezgif-4-d12af8c714.gif" alt="" /> 
      :
      <img src="/loader/ezgif.com-video-to-gif.gif" alt="" /> 
       }
        </div>
        <div className="headerBar">
            <div className="filterContiner">
                <label>
                    <input type="radio"  name="Category" id="" value="Main_Category"  onChange={handleMainCategoryFilter} checked={topping === "Main_Category"}/>
                    <span>Main Category</span>
                </label>
                <label>
                    <input type="radio" name="Category" id="" value="Sub_Category"  onChange={handleMainCategoryFilter} checked={topping === "Sub_Category"}/>
                    <span>Sub Category</span>
                </label>
            </div>
        </div>
        <div className="containerCategory">
            {
                categories.map(category=>{
                    return(
                        <div key={category.id} className="categoryCard">
                            <img src={category.image} alt="" />
                            <div className="categoryData">
                                <div className="categoryName">{category.title}</div>
                                <div className="changeCategoryImage">
                                    <h4>Change Image</h4>
                                    <div className="uplodeImage"> 
                                        <label htmlFor={`file_${category.id}`} ><CloudUpload/></label>
                                        <input type="file" name="file" id={`file_${category.id}`} onChange={(e)=>handelFilePath(e,category.id)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className="newCategory">
            <div className="addNewCategory">
                <label>
                    <input type="radio" name="newCategory" id="" value="Main_Category" onChange={handleTypeOfNewCategory} checked={typeOfCategory === "Main_Category"}/>
                    <span>Main Category</span>
                </label>
                <label>
                    <input type="radio" name="newCategory" id="" value="Sub_Category" onChange={handleTypeOfNewCategory} checked={typeOfCategory === "Sub_Category"}/>
                    <span>Sub Category</span>
                </label>
                {mainCategoryHave.length !== 0?
                <select name="type" id="type" onChange={handleSelection}>
                <option value='all'>All Main Category</option>
                    {mainCategoryHave.map((category)=>{
                        return(
                            <>
                                <option key={category.id} value={category.id}>{category.title}</option>
                            </>
                        )
                    })}
                </select>
                :''}
                <div className="categoryName">
                    <label>Name</label>
                    <input type="text" name='CategoryName' placeholder='Category Name' onChange={handleNewCategoryName}/>
                </div>
                <div className="productImage">
                    <Stack direction="row" alignItems="center" spacing={2} className='iconStyleBorder'>
                        <IconButton  color="primary" aria-label="upload picture" component="label">
                            <input hidden  type="file" name="file" id="file" onChange={(e)=>handelFilePathNewCategory(e)} />
                            <PhotoCamera className='iconStyle'/>
                        </IconButton>
                    </Stack>
                </div>
                <button className="addNewCategoryBtn" onClick={()=>{handleSubmitNewCategoryData()}}>Submit</button>
            </div>
        </div>
    </div>

  )
}

export default ChangeCategoryImage