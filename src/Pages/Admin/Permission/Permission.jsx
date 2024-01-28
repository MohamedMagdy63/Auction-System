import './Permission.css'
import { DataGrid } from '@material-ui/data-grid';
import {AdminData} from '../../../assists/Data/Employess';
import { useEffect, useReducer, useState } from 'react';
import PopupAdmin from '../../../Components/PopupAdmin/PopupAdmin';
import { updateUserBlocks } from '../../../controller/moduls/AuthModule';
const Permission = () => {
  const [reducer, forceUpdata] = useReducer(x => x + 1, 0);
  const [data,setData] = useState([])
  const [popup,setpopup] = useState('')
  const [employeeName, setEmployessName] = useState('')
  const [employee_name_r, setEmployess_name_r] = useState('')
  useEffect(()=>{
    AdminData().then((res)=>{
      setData(res)
    })
    if (document.readyState === "complete") {
      setTimeout(()=>{
          if(document.querySelector('.loader')){
              document.querySelector('.loader').remove()
          }
      },1500)
    }  
  },[reducer])
  
  const handelingPermission = (name,employee_name)=>{
    setpopup(true)
    setEmployessName(name)
    setEmployess_name_r(employee_name)
  }
  const handleBlockAdmin = (id)=>{
    updateUserBlocks(1,id).then((data)=>{
      if(data[0] === 'SUCCESSED'){
        forceUpdata()
      }
    })
  }
  const handleUnBlockAdmin = (id)=>{
    updateUserBlocks(0,id).then((data)=>{
      if(data[0] === 'SUCCESSED'){
        forceUpdata()
      }
    })
  }


  const columns = [
    { field: 'Image', headerName: 'Image', width: 100,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header', 
    renderCell:(params)=>{
      return(
        <div className='PremissionUserImage'>
          <img src={params.row.image} alt="" />
        </div>
      )
    }
    ,sortable:false, filterable:false},
    { field: 'name', headerName: 'Name', width: 160,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header' },
    { field: 'email', headerName: 'E-mail', width: 180,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header' },
    { field: 'phone', headerName: 'Main Phone', width: 160,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header' },
    { field: 'phone2', headerName: 'sub-Phone', width: 160,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header',
    renderCell: (params)=>{
      return(
        <>
          <div className={params.row.phone2 !== null ? "" : 'notFoundOtherPhone'}>{params.row.phone2 !== null ? params.row.phone2 : "Dont Have :("}</div>
        </>
      )
    }
    },
    {
      field:"Permission",
      headerName: "Permission",
      width:150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params)=>{
        return(
          <>
            <button className='permissionBtn' onClick={()=>{handelingPermission(params.row.userName,params.row.name)}}>Permission</button>
          </>
        )
      }
    },
    {
      field:"blockAdmin",
      headerName: "Block Admin",
      width:130,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params)=>{
        return(
          <>
            <button onClick={()=>{handleBlockAdmin(params.row.id)}} className='blockBtn'>Block</button>
          </>
        )
      }
    },
    {
      field:"unBlockAdmin",
      headerName: "Unblock Admin",
      width:130,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params)=>{
        return(
          <>
            <button onClick={()=>{handleUnBlockAdmin(params.row.id)}} className='unBlockBtn'>Unblock</button>
          </>
        )
      }
    },
  ];
  return (
    <div className='permission'>
      <div className="loader">
      {document.body.classList.contains('dark') === true?
      <img src="/loader/ezgif-4-d12af8c714.gif" alt="" /> 
      :
      <img src="/loader/ezgif.com-video-to-gif.gif" alt="" /> 
       }
        </div>
        <div className="header_page">
          <div className="title">Employess Managemet</div>
          <div className="search">
            <input type="text" placeholder='Search Employee' />
            <button className='searchBtn'>Search</button>
          </div>
        </div>
        <div style={{height:"88%", width:"100%"}}>
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={12}
            rowsPerPageOptions={[6]}
            disableSelectionOnClick
            getRowClassName={(params) => `super-app-theme--${params.row.baned === 0 ? 'active' : 'block'}`}
          />
        </div>
        {popup ? <PopupAdmin displayPopup = {setpopup} employeeNameR={employee_name_r} nameOfEmployee = {employeeName}/> : ''}
    </div>
  )
}

export default Permission