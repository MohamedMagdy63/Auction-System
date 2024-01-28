import './UserList.css'
import { DataGrid } from '@material-ui/data-grid';
import { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Block, Check } from '@material-ui/icons';
import { UsersData } from '../../../assists/Data/AllUsersDataForAdmin';
import { updateUserBlocks } from '../../../controller/moduls/AuthModule';
const UserList = () => {
  const [reducer, forceUpdata] = useReducer(x => x + 1, 0);
  const [data,setData] = useState([])
  useEffect(() => {
    UsersData().then((res)=>{
      setData(res)
    })
    if (document.readyState === "complete") {
      setTimeout(()=>{
          if(document.querySelector('.test')){
              document.querySelector('.test').remove()
          }
      },1500)
    }
  }, [reducer]);
  const handelBlock = (id) =>{
    data.map((x)=>{
      if(x.id === id){
        updateUserBlocks(1,id).then((data)=>{
          if(data[0] === 'SUCCESSED'){
            forceUpdata()
          }
        })
      }
    })
  }
  const handelUnBlock = (id) =>{
    data.map((x)=>{
      if(x.id === id){
        updateUserBlocks(0,id).then((data)=>{
          if(data[0] === 'SUCCESSED'){
            forceUpdata()
          }
        })
      }
    })
  }
  const columns = [
    // { field: 'id', headerName: 'ID', width: 100,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header' },
    { field: 'user', headerName: 'User', width: 150, cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header',
    renderCell:(params)=>{
      return(
        <div className='UserListUser'>
          <span>{params.row.userName}</span>
        </div>
      )
    }
    // ,
    // sortable:false, 
    // filterable:false
  },
    { field: 'gender', headerName: 'Gender', width: 150,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header',
    renderCell:(params)=>{
      return(
        <div className='UserListUser'>
          <span>{params.row.gender !== 0 ? "Male" : "Female"}</span>
        </div>
      )
    }
    },
    { field: 'email', headerName: 'E-mail', width: 170,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header' },
    {
      field: 'Status',
      headerName: 'Status',
      width: 120,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
          <>
            {params.row.Status == 0 ? <p>Active</p>  : <p>Block</p>}
          </>
        )
      }
    },
    {
      field: 'Phone',
      headerName: 'Phone',
      width: 150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
          <>
            {params.row.phone1}
          </>
        )
      }
    },
    {
      field: 'Phone-2',
      headerName: 'Phone-2',
      width: 150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
          <>
            {params.row.phone2}
          </>
        )
      }
    },
    {
      field: 'Category_check',
      headerName: 'Category_check',
      width: 180,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
          <>
            {params.row.Category_check == 0 ? <p>False</p> : <p>True</p>}
          </>
        )
      }
    },
    {
      field: 'terms_check',
      headerName: 'terms_check',
      width: 160,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
          <>
            {params.row.terms_check == 0 ? <p>False</p> : <p>True</p>}
          </>
        )
      }
    },
    {
      field:"unblock",
      headerName: "Unblock-User",
      width:170,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params)=>{
        return(
          <>
            <Check className='userListUnBlock' onClick={()=>handelUnBlock(params.row.id)}/>
          </>
        )
      }
    },
    {
      field:"action",
      headerName: "Action",
      width:150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params)=>{
        return(
          <>
            <Link to={'/User/'+params.row.id}>
              <button className='userListDetails'>Details</button>
            </Link>
          </>
        )
      }
    },
    {
      field:"block",
      headerName: "Block-User",
      width:140,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params)=>{
        return(
          <>
            <Block className='userListBlock' onClick={()=>handelBlock(params.row.id)}/>
          </>
        )
      }
    },
  ];
  return (
    <div className='userList'>
      <div className="test">
      {document.body.classList.contains('dark') === true?
      <img src="/loader/ezgif-4-d12af8c714.gif" alt="" /> 
      :
      <img src="/loader/ezgif.com-video-to-gif.gif" alt="" /> 
       }  
      </div>
      <div style={{ height: 690, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[6]}
          disableSelectionOnClick
          getRowClassName={(params) => `super-app-theme--${params.row.Status === 0 ? 'active' : 'block'}`}
        />
      </div>
    </div>
  )
  
}

export default UserList