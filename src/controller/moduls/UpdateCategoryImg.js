
export const UpdateCategory = (url,name,id)=>{
    fetch('/uploadImage',{
        method:'POST',
        body: JSON.stringify({
            'imageUrl': url,
            'name': name,
            'id': id,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
    })
}