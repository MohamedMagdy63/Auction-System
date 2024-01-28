import './PayDepositeSeller.css'
import Navbar from '../../Components/Navbar/Navbar';
import Announcement from '../../Components/Announcement/Announcement';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getUserProduct } from '../../controller/moduls/GetData';
import { Payment } from '@material-ui/icons'
import { DepositePopBuyer } from '../../Components/DepositePopBuyer/DepositePopBuyer';

export const PayDepositeSeller = (props) => {
    const [data,setData] = useState([])
    const [sideBarOpen, setSideBarOpen] = useState('')
    const [price, setPrice] = useState()
    const [currentProductId, setCurrentProductId] = useState()
    const [depositType, setDepositType] = useState()
    const [depositID, setDepositID] = useState()
    const [depositePopupState, setDepositePopupState] = useState(false)
    const oneRun = useRef(true)
    const handelPayDeposite = (backData)=>{
      console.log(backData)
      setDepositePopupState(true)
      setPrice(backData[0].DEPOSITE_PRICE)
      setCurrentProductId(backData[0].PRODUCT_ID)
      setDepositID(backData[0].DEPOSITE_ID)
      setDepositType(1020)
    }

    const columns = [
      { field: 'PRODUCT_ID', headerName: 'ID', width: 150, cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header',
        renderCell:(params)=>{
          return(
            <div className='UserListUser'>
              <span>{params.row.PRODUCT_ID}</span>
            </div>
          )
        }
        // ,
        // sortable:false, 
        // filterable:false
      },
      { field: 'item Image', headerName: 'Item image', width: 200,cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header', 
        renderCell:(params)=>{
          return(
            <div className='transactionProductImage'>
              <img src={params.row.IMAGE} alt="" />
              <span>{params.row.PRODUCT_NAME}</span>
            </div>
          )
        }
        ,sortable:false, filterable:false},
      { field: 'PAY_WAY_NAME', headerName: 'PAY WAY', width: 150, cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header'},
      { field: 'PRODUCT_PAYMENT_DATE', headerName: 'Date', width: 150, cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header',
        renderCell:(params)=>{
          let timeData = new Date(params.row.UPLOAD_DATE)
          return(
            <div className='UserListUser'>
              <span>{timeData.getDate()} - {timeData.getMonth() + 1} - {timeData.getFullYear()}</span>
            </div>
          )
        }
      },
      { field: 'INITIAL_PRICE', headerName: 'Price', width: 150, cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
          <div className='intialPriceField'>
            <span>{params.row.INITIAL_PRICE}</span>
          </div>
        )
      }
      },
      { field: 'PERCENTAGE', headerName: 'Percentage', width: 150, cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
          <div className='percentageField'>
            <span>{params.row.PERCENTAGE}</span>
          </div>
        )
      }
      },
      { field: 'DEPOSITE_PRICE', headerName: 'Deposite', width: 150, cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
          <div className='depositeField'>
            <span>{params.row.DEPOSITE_PRICE}</span>
          </div>
        )
      }
      },
      { field: 'Pay deposite', headerName: 'Pay deposite', width: 200, cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header',
        renderCell:(params)=>{
          return(
            <>
            {params.row.ACCEPTATION === 1 && params.row.DEPOSITACCEPTATION === null && params.row.RECIPT === 'null'? 
            <>
              <div className='payDepositeBtn'>
                <button onClick={()=>{handelPayDeposite(
                  data.map(x=>{
                    return(
                      params.row.PRODUCT_ID === x.PRODUCT_ID ?
                        x
                      :''
                    )
                  })
                  
                  )}}><Payment className='icon'/> Pay Deposite</button>
              </div>
            </>: params.row.ACCEPTATION === 0 ?
            <>
              <div className='UserListUser'>
                Product refuse
              </div>
            </>
            : params.row.ACCEPTATION === 1 && params.row.DEPOSITACCEPTATION === null && params.row.RECIPT !== 'null' ?
            <div className='containerLoaderUserProduct'>
                <div className="progressUserProduct">
                <div className="colorUserProduct"></div>
                </div>
            </div>
            :''
            }
            </>
          )
        }
      },
      { field: 'REFUSE_REASON', headerName: 'Refuse reason', width: '300', cellClassName: 'super-app-theme--cell',headerClassName: 'super-app-theme--header',
      renderCell:(params)=>{
        return(
          <div>
            <span>{params.row.REFUSE_REASON !== null ? params.row.REFUSE_REASON : params.row.ACCEPTPARTREFREASON !== null ? params.row.ACCEPTPARTREFREASON : ''}</span>
          </div>
        )
      }},
    ];

    useEffect(()=>{
      if(oneRun.current){
        oneRun.current = false
        getUserProduct().then((res)=>{
          setData(res)
        })
      }
    },[])
  return (
    <div className='payDepositeSeller'>
         <Navbar sideBarAction = {setSideBarOpen} />
            <Announcement/>
            {props.userInformation ?
            <Sidebar sidebarUserData={props.userInformation} sideBarState = {sideBarOpen}/>
            :''
            }
            <div className="payDepositeContiner">
            <div style={{ height: '85vh', width: '100%' }}>
              {console.log(data)}
              <DataGrid
                getRowId={(row) => row.ACCEPT_PARTICPATION_ID}
                rows={data}
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[4]}
              />
            </div>
            {
              depositePopupState ? <DepositePopBuyer depositIdValue={depositID} popupState={setDepositePopupState} productPrice={price} productId={currentProductId} depositType={depositType}/> : ''
            }
            </div>
    </div>
  )
}
