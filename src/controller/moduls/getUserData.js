import getCookies from "./getCookies";
// export const userData =  async() =>{
//     return(
//         fetch('/SessionUsername',{
//             method:'POST',
//             body:JSON.stringify({
//                 'username': getCookies('username')
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })
//         .then((res)=>res.json())
//         .then((data)=>{
//             return(data)
//         })
//     )
// }

export const userSpacificData = (user)=>{
    return(
        fetch('/userDataByUsername',{
            method:'POST',
            body:JSON.stringify({
                'username': getCookies('username')
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((results)=>{
            return(results)
        })
    )
}