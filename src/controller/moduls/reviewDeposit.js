import swal from 'sweetalert';
import getCookies from './getCookies';
export const acceptDeposit =  async(depositId,massage)=>{
    const date = new Date()
    return(
        fetch('/acceptDeposit',{
            method:'POST',
            body:JSON.stringify({
                'depositId': depositId,
                'date': `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                'massage': massage,
                'username': getCookies('username')
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data[0] == 'SUCCESSED')
            {
                swal("Done!", `Successfully accepted`, "success", {button: false})
                setTimeout(() => {
                    window.location.href = '/Deposite'
                }, 2000);
            }
            else
            {
                swal("Write something here:", {
                content: "input",
                })
                .then((value) => {
                swal(`You typed: ${value}`);
                });
            }
            return(data)
        })
    )
}
export const refuseDeposit=  async(depositId,maassage)=>{
    const date = new Date()
    return(
    swal("Write something here:", {
        content: "input",
    })
    .then((value) => {
        return(
            fetch('/refuseDeposit',{
                method:'POST',
                body:JSON.stringify({
                    'depositId': depositId,
                    'date': `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                    'massage': maassage,
                    'username': getCookies('username'),
                    'report':value
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
    })
    )
}

export const checkDepositState = async(productId)=>{
    return(
        fetch('/checkStateOfDeposite',{
            method:'POST',
            body:JSON.stringify({
                'productId': productId,
                'username': getCookies('username')
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
export const checkUserPayDeposit = async(productId)=>{
    return(
        fetch('/checkUserDeposite',{
            method:'POST',
            body:JSON.stringify({
                'productId': productId,
                'username': getCookies('username')
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