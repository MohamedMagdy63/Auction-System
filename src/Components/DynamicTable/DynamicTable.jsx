import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {rows,rows2,SellerData,BuyerData} from '../../assists/Data/ReportData'




export default function DynamicTable(props) {
  var columns = []
  if(props.reportType === 'Emplyee'){
    columns = [
      { field: 'ADMIN_ID', headerName: 'ID', width: 120 },
      { field: 'USER_FIRST_LAST_NAME', headerName: 'Emplyee name', width: 180 },
      { field: 'GENDER', headerName: 'Gender', width: 90, 
      renderCell:(params)=>{
        return(
            <span>{params.row.GENDER === 1 ? 'Male' : 'Female'}</span>
        )
      }
      },
      { field: 'USER_EMAIL', headerName: 'Emplyee Mail', width: 180 },
      {
        field: 'TOTAL_SALARY',
        headerName: 'Salary',
        width: 130,
      },
      {
        field: 'USER_FIRST_LAST_NAME_1',
        headerName: 'Manger Name',
        // description: 'This column has a value getter and is not sortable.',
        // sortable: false,
        width: 160,
        
      },
      {
        field: 'USER_PHONE1',
        headerName: 'Phone',
        width: 130,
      },
      {
        field: 'USER_SSN',
        headerName: 'SSN',
        width: 190,
      },
      {
        field: 'USER_ADDRESS',
        headerName: 'Address',
        width: 350,
      },
      {
        field: 'RECRUITMENT DAY',
        headerName: 'Recruitment day',
        width: 200,
        renderCell:(params)=>{
          return(
              <span>{new Date(params.row.RECRUITMENT_DAY).getDate()} / {new Date(params.row.RECRUITMENT_DAY).getMonth() + 1} / {new Date(params.row.RECRUITMENT_DAY).getFullYear()}</span>
          )
        }
      },
      {
        field: 'LEAVING_DAY',
        headerName: 'Leaving day',
        width: 200,
        renderCell:(params)=>{
          return(
              <span>{params.row.LEAVING_DAY ? params.row.LEAVING_DAY : 'Still Work'}</span>
          )
        }
      },
    ];
  }else if(props.reportType === 'Sellers'){
    columns = [
      // { field: 'ADMIN_ID', headerName: 'ID', width: 120 },
      {field: 'USER_FIRST_LAST_NAME', headerName: 'Seller name', width: 180 },
      {field: 'TOTAL_PRODUCTS_THIS_UPLOAD', headerName: 'Product batch', width: 180,},
      {field: 'INSTANT_PRODUCTS', headerName: 'Instant', width: 180 },
      {field: 'LIVE_AUCTION_PRODUCTS', headerName: 'Live Auction', width: 180},
      {field: 'SCHEDULE_AUCTION_PRODUCTS', headerName: 'Schedule Auction', width: 190},
      {field: 'ACCEPT_PRODUCT',headerName: 'Accept Product',width: 250,},
      {field: 'NOT_ACCEPT_PRODUCT',headerName: 'Refused Product',width: 250,},
      {field: 'ACCEPT_AUCTION_PRODUCT',headerName: 'Accept Product Auction', width: 250,},
      {field: 'NOT_ACCEPT_AUCTION_PRODUCT',headerName: 'Refused Product Auction', width: 250,},
      {field: 'WAIT_IN_REVIEW_PRODUCT',headerName: 'Waitting', width: 190,},
      {field: 'WAIT_IN_REVIEW_AUCTION_PRODUCT',headerName: 'Waitting Auction', width: 190,},
      {field: 'TOTAL_SOLD_PRODUCTS',headerName: 'Total Sold', width: 190,},
    ];
  }else if(props.reportType === 'Buyers'){
    columns = [
      // { field: 'ADMIN_ID', headerName: 'ID', width: 120 },
      {field: 'USER_FIRST_LAST_NAME', headerName: 'Buyer name', width: 180 },
      {field: 'USER_AUCTION_COUNT', headerName: 'Auctions Entered', width: 200,},
      {field: 'WANT_TO_PAY_DEPOSIT',headerName: 'Deposite Waitting Pay',width: 250,},
      {field: 'ACCEPT_DEPOSIT', headerName: 'Deposite Accepted', width: 200 },
      {field: 'NOT_ACCEPT_DEPOSIT', headerName: 'Deposite Refused', width: 200},
      {field: 'WAIT_IN_REVIEW_DEPOSIT', headerName: 'Deposite Waitting Review', width: 240},
      {field: 'WON_AUCTION',headerName: 'Auctions Wined', width: 200,},
    ];
  }
  return (
    <div style={{ height: 600, width: '100%' }}>
      {console.log(BuyerData[0])}
      <DataGrid
        getRowId={props.reportType === 'Emplyee' ? (row) => row.USER_ID : props.reportType === 'Sellers' ? (row) => row.USER_ID : props.reportType === 'Buyers' ? (row) => row.USER_ID:''}
        rows={props.reportType === 'Emplyee' ? rows2[0] :props.reportType === 'Sellers' ? SellerData[0] : props.reportType === 'Buyers' ? BuyerData[0] : []}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
}