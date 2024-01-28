import { useEffect, useState ,useRef} from 'react'
import { getPersentage, getPersentageSeller } from '../../controller/moduls/GetData'
import { insertDeposite, insertDepositeByPaymob } from '../../controller/moduls/insertModule'
import './DepositePopBuyer.css'
import swal from 'sweetalert'
import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { paymobIframeCreate } from '../../controller/moduls/Paymob'
import { UpdateDeposite } from '../../controller/moduls/UpdateModule'
export const DepositePopBuyer = (props) => {
  const [depositePrice, setDepositPrice] = useState()
  const [emplyeeImageURL,setEmplyeeImageURL] = useState('')
  const [emplyeeImageFile,setEmplyeeImageFile] = useState('')

  useEffect(()=>{
    if(props.depositType === 1020){
      getPersentageSeller().then(results=>{
        console.log(results)
        setDepositPrice(props.productPrice * results[0].PERCENTAGE)
      })
    }else{
      getPersentage().then(results=>{
        setDepositPrice(props.productPrice * results[0].PERCENTAGE)
      })
    }
  },[])

  const handleClosePopup = () =>{
    props.popupState(false)
  }
  const handelFilePath = (e,id)=>{
    if (e.target.files) {
        let files = e.target.files
        let filesArry = Array.prototype.slice.call(files)
        filesArry.map((f)=>{
          if (f.value != null) {
            console.log(f.value)
          }else{
            // console.log("no")
          }
            let rander = new FileReader();
            rander.onload = (e)=>{
                var base64 = (e.target.result).toString();
                setEmplyeeImageFile(f.name)
                setEmplyeeImageURL(base64)
            }
            rander.readAsDataURL(f)
        })
    }
  }
  const handleSubmitData = ()=>{
    console.log(emplyeeImageURL)
        UpdateDeposite(props.depositIdValue,emplyeeImageFile,emplyeeImageURL).then((Data)=>{
        if(Data[0] === 'SUCCESSED'){
          swal("Success", `Deposite Sended to Admin`, "success", {button: false})
          setTimeout(() => {
              window.location.reload()
          }, 2000);
        }else{
          swal("Error", ``, "error")
        }
      })
  }
  const handlePaymobBtn = ()=>{
    // UpdateDepositeByPaymob(props.depositIdValue,'/images/paymob.jpg').then((Data)=>{
    //   if(Data[0] === 'SUCCESSED'){
    //     swal("Success", `Deposite Sended to Admin`, "success", {button: false})
    //     paymobIframeCreate(Math.floor(props.productPrice)*100)
    //     setTimeout(() => {
    //         window.location.reload()
    //     }, 2000);
    //   }else{
    //     swal("Error", ``, "error")
    //   }
    // })
  }
  return (
    <div className='depositePop'>
        <div className="depositeLayout">
          <div className="closePopup" onClick={()=>{handleClosePopup()}}>X</div>
          <div className="depositePopupContiner">
            <div className="payWays">
              <div className="way"><p>Telda : </p><span>01555734756</span></div>
              <div className="way"><p>CIB Smart Wallet : </p><span>01555734756</span></div>
              <div className="way"><p>paypal : </p><span>01555734756</span></div>
              <button className="paymob" onClick={()=>{handlePaymobBtn()}}><img src="/images/paymob.jpg" alt="" /></button>
            </div>
            <div className="PayControl">
              <p>Price must pay <span>{Math.floor(props.productPrice)} E.L</span></p>
              <p>Upload Your resipe</p>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button className='uploadBTN' variant="contained" component="label">
                  Upload
                  <input hidden accept="image/*"  multiple type="file"  onChange={(e)=>handelFilePath(e)}  />
                </Button>
                {/* <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera className='camera' />
                </IconButton> */}
              </Stack>
              {/* <input className='resipeFile' type="file" name="resipe" id="" onChange={(e)=>handelFilePath(e)} /> */}
              <button className='button-6' onClick={()=>{handleSubmitData()}}>Submit</button>
            </div>
          </div>
        </div>
    </div>
  )
}
