import swal from 'sweetalert';
import removeCookies from '../moduls/removeCookies'
import setCookies from '../moduls/setCookies'
import getCookies from './getCookies';


export const login = async (username, password) =>
{
    fetch('/checkUserLogIn', {
        method: 'POST',
        body:JSON.stringify({
            'username': username,
            'password': password
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.state !== 'Fail')
        {
            swal("Welcome!", `Successful login ${username}`, "success", {button: false})
            setTimeout(() => {
                removeCookies('roll')
                removeCookies('username')
                setCookies('username',JSON.stringify(data.user))
                setCookies('roll',JSON.stringify(data.roll))
                window.location.href = '/'
            }, 2000);
        }
        else
        {
            swal("Error", "Username/password not correct ", "error")
        }
    })
}

export const getSessionData = async(roll, username) =>
{
    return(
        fetch('/SessionData', {
            method: 'POST',
            body:JSON.stringify({
                'roll': roll,
                'username': username
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.text())
        .then((data)=>{
            return(data)
        })
    )
}

// export const getAdminPermission = async(username)=>{
//     return(
//     fetch('/permission',{
//         method:'POST',
//         body: JSON.stringify({
//             'user': username
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     .then((res)=>res.json())
//     .then((data)=>{return(data)})
//     )
// }

export const getAdminPermissionPages = async(username)=>{
    return(
        fetch('/permission/page',{
            method:'POST',
            body: JSON.stringify({
                'user': username
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((data)=>{return(data)})
        )
}

export const updateUserBlocks = async(state,userId)=>{
    return(
        fetch('/blockUsers',{
            method: 'POST',
            body:JSON.stringify({
                'state': state,
                'userId': userId
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            return data
        })
    )
}

export const AdminPermissionOwnerPages = async(username)=>{
    return(
        fetch('/owner/Permision/Admin',{
            method:'POST',
            body: JSON.stringify({
                'name': username
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((data)=>{return(data)})
    )
}

export const checkLastDepositeOfUser = async(depositID)=>{
    return(
        fetch('/checkLastUserDeposit',{
            method:'POST',
            body: JSON.stringify({
                'username': getCookies('username'),
                'depositID': depositID
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>res.json())
        .then((data)=>{return(data)})
    )
}

