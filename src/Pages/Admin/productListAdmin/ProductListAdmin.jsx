import './ProductListAdmin.css'
import { DataGrid } from '@material-ui/data-grid';
import { AllProductsReview } from '../../../assists/Data/ProductData'
import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductListAdmin() {
  const [data,setData] = useState([])
  const [reducer, forceUpdata] = useReducer(x => x + 1, 0);
    useEffect(()=>{
      AllProductsReview().then((res)=>{
        setData(res)
      })
    if (document.readyState === "complete") {
      setTimeout(()=>{
          if(document.querySelector('.test')){
              document.querySelector('.test').remove()
          }
      },1500)
    }  
  },[reducer])

  const columns = [
    { field: 'id', headerName: 'ID', width: 90,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header' },
    { field: 'item', headerName: 'Item', width: 200,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header', 
    renderCell:(params)=>{
      return(
        <div className='productListName'>
          <img src={params.row.image} alt="" />
          <span>{params.row.title}</span>
        </div>
      )
    }
    ,sortable:false, filterable:false},
    { field: 'Pay_Way', headerName: 'Pay way', width: 180,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header' },
    {
      field: 'Pay_Way',
      headerName: 'Pay way',
      width: 130,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
            <span>{params.row.payWay}</span>
        )
      }
    },
    {
      field: 'Status',
      headerName: 'Status',
      width: 130,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
            <span>{params.row.state}</span>
        )
      }
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 140,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
            <span>{params.row.price !== null ? params.row.price : params.row.initial_price} $</span>
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
          <Link to={'/Product/'+params.row.id}>
            <button className='productListDetails'>Details</button>
          </Link>
          </>
        )
      }
    }
  ];
  return (
    <div className='productList'>
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
          pageSize={12}
          rowsPerPageOptions={[4]}
        />
      </div>
    </div>
  )
}
