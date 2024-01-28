import swal from 'sweetalert';
export const review =  async(productId)=>{
    return(
        fetch('/acceptProduct',{
            method:'POST',
            body:JSON.stringify({
                'productId': productId
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            return(data)
        })
    )
}
export const refuseReview =  async(productId)=>{
    return(
        fetch('/refuseProduct',{
            method:'POST',
            body:JSON.stringify({
                'productId': productId
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            return(data)
        })
    )
}