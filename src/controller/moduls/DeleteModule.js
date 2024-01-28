export const deleteAdminPermision = async(username) =>{
    const responce = await fetch('/Delete/Permision/Admin',
    {
        method:'POST',
        body:JSON.stringify({
            'username' : username
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await responce.json()
    console.log(data)
    
    // swal("Mission Done", `Sccessfull Permission added`, "success", {button: false})
    //     setTimeout(() => {
    //         window.location.href = '/Permission'
    //     }, 2000);
}