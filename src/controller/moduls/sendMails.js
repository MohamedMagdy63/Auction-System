export const sendmail = async(name, sendTo ,email, phone, massage)=>{
    return(
        await fetch('/Contect',{
            method:'POST',
            body: JSON.stringify({
                'name': name,
                'sendTo': sendTo,
                'email': email,
                'phone': phone,
                'massage': massage,
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
export const sendmailReport = async(review,sendTo)=>{
    return(
        await fetch('/Contect/Reporter',{
            method:'POST',
            body: JSON.stringify({
                'review': review,
                'sendTo': sendTo
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