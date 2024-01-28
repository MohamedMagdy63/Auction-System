import './PopupAdmin.css'
import {Links} from '../../assists/Data/PagePermision'
import { useEffect, useRef, useState } from 'react'
import { insertAdminPermision } from '../../controller/moduls/insertModule'
import { deleteAdminPermision } from '../../controller/moduls/DeleteModule'
import { AdminPermissionOwnerPages } from '../../controller/moduls/AuthModule'
const PopupAdmin = (props) => {
    const [closeBtn,setCloseBtn] = useState('')
    // const [mainChecked,setMainChecked] = useState(false)
    const [valueChecked,setValueChecked] = useState([])
    // const [supTitleChecked,setSupTitleChecked] = useState([])
    // const [permissionOwner,setPermissionOwner] = useState([])
    const handelCloseBtn = ()=>{
        setCloseBtn(true)
        props.displayPopup('')
    }
    const handlePermissionChoose = (event)=>{
        let updatedList = [...valueChecked];
        if (event.target.checked) {
            updatedList = [...valueChecked, event.target.value];
            Links.map((items)=>{
                if(items.mainTitle === event.target.value){
                    items.link.map(sup=>{
                        updatedList.push(sup.title);
                    })
                }
            })
        } else {
            updatedList.splice(updatedList.indexOf(event.target.value), 1);
            Links.map((items)=>{
                if(items.mainTitle === event.target.value){
                    items.link.map(sup=>{
                        if(updatedList.indexOf(sup.title) !== -1)
                            updatedList.splice(updatedList.indexOf(sup.title), 1);
                    })
                }
            })
        }
        setValueChecked(updatedList)
        
        // if(valueChecked.includes(event.target.value.toUpperCase())){
        //     var index = valueChecked.indexOf(event.target.value.toUpperCase());
        //     if (index > -1) {
        //         setValueChecked(oldVal => [...oldVal, valueChecked.splice(index, 1)])
        //     }
        // }else{
        //     setValueChecked(oldVal => [...oldVal, event.target.value.toUpperCase()])
        // }
    }
    const handlePermissionChooseSupptitle = (event,x)=>{
        let names = document.querySelectorAll(`[name="${x}"]`)
        let check = 0
        for (let index = 0; index < names.length; index++) {
            if(names[index].checked){
                check++
            }
        }
        if(check){
            document.getElementById(`'${x}'`).checked=true
            if(valueChecked.indexOf(x) === -1){
                setValueChecked(valueChecked=>[...valueChecked,x])
            }
        }else
        {
            document.getElementById(`'${x}'`).checked=false
            valueChecked.splice(valueChecked.indexOf(x), 1);
        }
        // names.map((name)=>{
        //     console.log(name.checked)
        // })

        if(event.target.checked){
            if(valueChecked.length !== 0){
                setValueChecked(valueChecked=>[...valueChecked,event.target.value])
            }else{
                setValueChecked([event.target.value])
            }
        }else{
            valueChecked.splice(valueChecked.indexOf(event.target.value), 1);
        }
        
    }
    const handelSubmitData = () =>{
        deleteAdminPermision(props.nameOfEmployee).then(()=>{
            insertAdminPermision(props.nameOfEmployee,valueChecked)
        })
    }
    const oneRun = useRef(true)
    useEffect(()=>{
        if(oneRun.current){
            oneRun.current = false
            AdminPermissionOwnerPages(props.nameOfEmployee).then((data)=>{
                data.map((item)=>{
                    setValueChecked(valueChecked=>[...valueChecked,item.PERMISSION_NAME])
                })
            })
        }
    })
    if(!closeBtn){
  return ( 
     <div className='popup'>
        <div className="continer">
            <div className="header">
                <div className="closeBtn" onClick={()=>{handelCloseBtn()}}></div>
                <div className="Text">{props.employeeNameR}</div>
            </div>
            <div className="permissionContiner">
                <div className="tableContiner">
                    <div className="tableHeader">
                        <div className="access">Access</div>
                        <div className="Permission">Permission</div>
                    </div>
                    {Links.map((access,x)=>{
                        return(
                            <div key={x} className="tableContentMainTitle">
                                <div className="mainTitle">
                                    <div className="pagename">{access.mainTitle}</div>
                                    <div className="checkBtn"><input disabled={true} checked={access.state} type="checkbox" value={access.mainTitle} id={`'${access.mainTitle}'`} /></div>
                                </div>
                                {
                                    access.link.map((supAccess,index)=>{
                                        return(
                                        <div key={index} className="tablecontent">
                                            <div className="pagename">{supAccess.title}</div>
                                            <div className="checkBtn">
                                                <input onChange={(e)=>handlePermissionChooseSupptitle(e,access.mainTitle)}  name={access.mainTitle} type="checkbox" value={supAccess.title} id={`'${supAccess.title}'`} />
                                                {
                                                    valueChecked.map(own=>{
                                                            if(own === supAccess.title.toLowerCase() ){
                                                                document.getElementById(`'${access.mainTitle}'`).checked=true
                                                                document.getElementById(`'${supAccess.title}'`).checked=true
                                                            }
                                                    })
                                                }
                                            </div>
                                        </div>  
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="submit">
                <button onClick={()=>{handelSubmitData()}}>Submit</button>
            </div>
        </div>
    </div> 
  )}else{return(false)}
}

export default PopupAdmin