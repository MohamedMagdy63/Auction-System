import './Transaction.css'
import { DataGrid } from '@material-ui/data-grid';
import { allProductTransactionAuction } from '../../../assists/Data/ProductData'
import { useEffect, useReducer, useRef, useState } from 'react';

const Transaction = () => {
  const [data,setData] = useState([])
  const [reducer, forceUpdata] = useReducer(x => x + 1, 0);
  
  useEffect(()=>{
    allProductTransactionAuction().then((res)=>{
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
    {
      field: 'AUCTION_NUMBER',
      headerName: 'Auction Number',
      width: 180,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    { field: 'item', headerName: 'Item', width: 400,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header', 
    renderCell:(params)=>{
      return(
        <div className='transactionProductImage'>
          <img src={params.row.IMAGE} alt="" />
          <span>{params.row.TITLE}</span>
        </div>
      )
    }
    ,sortable:false, filterable:false},
    { field: 'PAYWAY', headerName: 'Pay way', width: 180,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header' },
    {
      field: 'STATE',
      headerName: 'Status',
      width: 120,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'INITIAL_PRICE_OF_AUCTION',
      headerName: 'Price',
      width: 200,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params)=>{
        return(
        <div className='initialPrice'>
          <div>{Math.floor(params.row.INITIAL_PRICE_OF_AUCTION)}</div>
        </div>
        )
      }
    },
    {
      field: 'SALLER_NAME',
      headerName: 'Seller name',
      width: 200,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header'
    },
    {
      field:"Start Action",
      headerName: "Start Action",
      width:150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params)=>{
        return(
        <div className="startAction">
          <div className="startActionDate">{new Date(params.row.STARTTIME).getDate()}/{new Date(params.row.STARTTIME).getMonth()}/{new Date(params.row.STARTTIME).getFullYear()}</div>
          <div className="startActionTime">{new Date(params.row.STARTTIME).getHours()}:{new Date(params.row.STARTTIME).getMinutes()}:{new Date(params.row.STARTTIME).getSeconds()}</div>
        </div>
        )
      }
    },
    {
      field:"Transaction",
      headerName: "Transaction",
      width:160,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params)=>{
        return(
        <div className='transcationState'>
          <div className={params.row.WINNER_NAME !== null ? 'transationSold': 'transationShown'}>{params.row.WINNER_NAME !== null ? 'Sold': 'Shown'}</div>
        </div>
        )
      }
    },
    {
      field:"End Action",
      headerName: "End Action",
      width:150,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params)=>{
        return(
        <div className="startAction">
          {params.row.ENDTIME !== null ?
            <>
              <div className="startActionDate">{new Date(params.row.ENDTIME).getDate()}/{new Date(params.row.ENDTIME).getMonth()}/{new Date(params.row.ENDTIME).getFullYear()}</div>
              <div className="startActionTime">{new Date(params.row.ENDTIME).getHours()}:{new Date(params.row.ENDTIME).getMinutes()}:{new Date(params.row.ENDTIME).getSeconds()}</div>
            </>
          :
          <div className="noBid">Pending Bid</div>
          }
      </div>
        )
      }
    },
    {
      field: 'WINNER_NAME',
      headerName: 'winner',
      width: 180,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params)=>{
        return(
        <div className="winnerName">
          <div>{params.row.WINNER_NAME !== null? params.row.WINNER_NAME : 'Pending Winner name'}</div></div>
        )
      }
    }
  ];
  return (
    <div className='transaction'>
      <div className="test">
      {document.body.classList.contains('dark') === true?
      <img src="/loader/ezgif-4-d12af8c714.gif" alt="" /> 
      :
      <img src="/loader/ezgif.com-video-to-gif.gif" alt="" /> 
       }  
      </div>
        <div style={{ height: 690, width: '100%'}}>
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

export default Transaction