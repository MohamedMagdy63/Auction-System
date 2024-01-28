export const CategoryImages = async() => {
  const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E"]
    return( fetch('/getMainCategories',{
      method:'GET'
    })
    .then((res)=>res.json())
    .then((data)=>{
      return(
      data.map((x)=>{
        let hexColorRep = ""
        for (let index = 0; index < 6; index++){
          const randomPosition = Math.floor ( Math.random() * hexCharacters.length ) 
            hexColorRep += hexCharacters[randomPosition]
        }
        // const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return({"id":x.ID,"bg":`${hexColorRep}`,"image":x.IMAGE,"title":x.TITLE})
      })
      )
    })
  )
}
export const allCategorise = async () =>{
  return( fetch('/getAllCategories',{
    method:'GET'
  })
  .then((res)=>res.json())
  .then((data)=>{
    
    return(
    data
    )
  })
)
}
export const allCategoriseName = async () =>{
  return( fetch('/getAllCategoriesName',{
    method:'GET'
  })
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data)
    return(
    data
    )
  })
)
}
export const allSubCategoriseName = async () =>{
  return( fetch('/getSubCategory',{
    method:'GET'
  })
  .then((res)=>res.json())
  .then((data)=>{
    
    return(
    data
    )
  })
)
}
export const subCategoryFilter = async () =>{
  return( fetch('/getSubCategory',{
    method:'GET'
  })
  .then((res)=>res.json())
  .then((data)=>{
    return(
    data.map((x)=>{
      return({"id":x.CATEGORY_ID,"image":x.CATEGORY_IMAGE,"title":x.CATEGORY_NAME})
    })
    )
  })
)
}