/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import * as React from 'react';
import {useState , useEffect , useRef} from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme  } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./style.css"
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import { allCategoriseName, allSubCategoriseName } from '../../assists/Data/CategoryImages';
import swal from 'sweetalert';
import { insertAuctionProduct, insertInstantProduct } from '../../controller/moduls/insertModule';
import { getSubCategoryTypes } from '../../controller/moduls/GetData';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
    
  };
}

export default function FullWidthTabs(props) {
  const onesRun = useRef(true);
  const [CategoryName,setCategoryName] = useState([])
  const [subCategorySelection,setSubCategorySelection] = useState([])
  const [productSubCategory,setProductSubCategory] = useState([])

  const [productCategory,setProductCategory] = useState('All Categorise')

  useEffect(()=>{
    if(onesRun.current){
      onesRun.current = false
      allCategoriseName().then((data)=>{
        setCategoryName(data)  
      })
    }
  },[])
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [name,setName] = useState(null)
  const [matrial,setMatrial] = useState(null);
  const [brand,setBrand] = useState(null);
  const [desc,setDesc] = useState(null);
  const [summery,setSummery] = useState(null);
  const [HomeDecoration,setHomeDecoration] = useState(null);
  const [color,setColor] = useState(null);
  const [price,setPrice] = useState(null);
  const [SIM,setSIM] = useState(null);
  const [size,setSize] = useState(null);
  const [storage,setStorage] = useState(null);
  const [date,setDate]= useState(null);
  const [state,setState] = useState(null);
  const [Category,setCategory] = useState(null);
  const [SubCategory,setSubCategory] = useState(null);
  const [DescribeState,setDescribeState]= useState(null);
  const [carCC,setCarCC] = useState(null);
  const [CarModel,setCarModel] = useState(null);
  const [CarMile, setCarMile] = useState(null);
  const [HorsePower , setHorsePower] = useState(null);
  const [GearStick , setGearStick] = useState(null);
  const [ManifuctureYear , setManifuctureYear] = useState(null);
  const [ManifuctureCountry , setManifuctureCountry] = useState(null);
  const [Class , setClass] = useState(null);
  const [Interchange , setInterchange] = useState(null);
  const [Structure , setStructure] = useState(null);
  const [LocationOfBuilding , setLocationOfBuilding] = useState(null);
  const [FuelType , setFuelType] = useState(null);
  const [BuldingArea , setBuldingArea] = useState(null);
  const [TypeBuilding , setTypeBuilding] = useState(null);
  const [BuildingFloor , setBuildingFloor] = useState(null);
  const [NumbersOfroom , setNumbersOfroom] = useState(null);

  const [WaterResis , setWaterResis] = useState(null);
  const [ScreenRes , setScreenRes] = useState(null);
  const [ScreenHz , setScreenHz] = useState(null);
  const [Wireless , setWireless] = useState(null);
  const [Battery , setBattery] = useState(null);
  const [Camera , setCamera] = useState(null);
  const [Ram , setRam] = useState(null);
  const [LiveTime , setLiveTime] = useState(null);
  const [WaitingTime , setWaitingTime] = useState(null);
  const [LiveDate , setLiveDate] = useState(null);
  const [SchedualStartDate , setSchedualStartDate] = useState(null);
  const [SchedualStartTime , setSchedualStartTime] = useState(null);
  const [SchedualEndDate , setSchedualEndDate] = useState(null);
  const [SchedualEndTime , setSchedualEndTime] = useState(null);
  const [DigitalType,setDigitalType] = useState(null)
  const [vehicles,setVehicles] = useState(false);
  const [building,setBuilding] = useState(false);
  const [Electro,setElectro] = useState(false);
  const [Mobiles , setMobiles] = useState(false);
  const [Watches , setWatches] = useState(false);
  const [Fashion , setFashion] = useState(false);
  const [TV , setTV] = useState(false);
  const [Laptop , setLaptop] = useState(false);
  const [Books , setBooks] = useState(false);
  const [Auto , setAuto] = useState(false);
  const [Music , setMusic] = useState(false);
  const [Sport , setSport] = useState(false);
  const [other,setOther] = useState(false);
  const [valid,setValid] = useState(false);
  const [validDate,setValidDate] = useState(false);
  const [empty,setEmpty] = useState(false);


  var payWay = 0
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleName =(e)=>{
    setName(e.target.value)
    e.target.value != '' ? setValid(true) : setValid(false)
  }
  const handleCategory = (event) => {
    setEmpty(false)
      setProductSubCategory([])
        setSubCategorySelection([])
        getSubCategoryTypes(event.target.value).then((subCategories)=>{
          subCategories.map(subCategory=>{
              setProductSubCategory(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
              setSubCategorySelection(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
          })
        })
        setProductCategory(event.target.value)
    setCategory(event.target.value)
    event.target.value == 'real estate' ? setBuilding(true)  : setBuilding(false)
    event.target.value == 'Electronics' ? setElectro(true)  : setElectro(false)
    event.target.value == 'Fashion' ? setFashion(true)  : setFashion(false)
    event.target.value == 'Books' ? setBooks(true)  : setBooks(false)
    event.target.value == 'Automotive' ? setAuto(true)  : setAuto(false)
    event.target.value == 'Music' ? setMusic(true)  : setMusic(false)
    event.target.value == 'sports' ? setSport(true)  : setSport(false)
  };
  const handleSubCategory = (event) => {
    console.log(event.target.value)
    if(event.target.value != ''){
      setProductSubCategory([event.target.value])
      setEmpty(true)
    }else{
        setEmpty(false)
        setProductSubCategory([])
        setSubCategorySelection([])
        getSubCategoryTypes(productCategory).then((subCategories)=>{
            subCategories.map(subCategory=>{
                setProductSubCategory(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
                setSubCategorySelection(oldArray=>[...oldArray,subCategory.CATEGORY_NAME])
            })
        })
    }
    setSubCategory(event.target.value)
    if (event.target.value ==  'Cars' || event.target.value == 'Motorcycles'){
      setVehicles(true)
    }else{
      setVehicles(false)
    }
    if(event.target.value == 'Mobiles' ||event.target.value == 'TV' ||event.target.value == 'Laptops'|| event.target.value =='camera' || event.target.value =='Video Games' ){
      setMobiles(true)
    }else{
      setMobiles(false)
    }
    event.target.value == 'TV' ? setTV(true) : setTV(false)
    event.target.value == 'Laptops' ? setLaptop(true) : setLaptop(false)
    event.target.value == 'Watches' ? setWatches(true)  : setWatches(false)
    event.target.value != '' ? setOther(true)  : setOther(false)
  };
  const handleMatrial = (e)=>{
    setMatrial(e.target.value)
    console.log(matrial)
  }
  const handleBrand=(e)=>{
    setBrand(e.target.value)
  }
  const handleDesc = (e)=>{
    setDesc(e.target.value)
  }
  const handleSummery = (e)=>{
    setSummery(e.target.value)
  }
  const handleHomeDecoration = (e)=>{
    setHomeDecoration(e.target.value)
  }
  const handleColor = (e)=>{
    setColor(e.target.value)
  }
  const handlePrice = (e)=>{
    e.target.value >0 ? setPrice(e.target.value) : e.target.value = 0
  };
  const handleSIM = (e)=>{
    setSIM(e.target.value)
  };
  
  const handleSize = (e) => {
    setSize(e.target.value)
  }
  const handleStorage =(e)=>{
    setStorage(e.target.value)
  }
  const handleDate = (e)=>{
    setDate(e.target.value)
  }
  const handleState = (e)=>{
    setState(e.target.value)
    e.target.value == '2' ? setValidDate(true) : setValidDate(false)
  }
  const handleDescribeState = (e)=>{
    setDescribeState(e.target.value)
  }
  
  const handleCarModel = (e)=>{
    setCarModel(e.target.value)
  }
  const handleCarMile = (e)=>{
    setCarMile(e.target.value)
  }
  const handleHorsePower = (e)=>{
    e.target.value >0 ? setHorsePower(e.target.value) : e.target.value = 0
  }
  const handleGearStick =(e)=>{
    setGearStick(e.target.value)
  }
  const handleManifuctureYear = (e)=>{
    e.target.value >0 ? setManifuctureYear(e.target.value) : e.target.value = 0
  }
  const handleManifuctureCountry = (e)=>{
    setManifuctureCountry(e.target.value)
  }
  const handleClass = (e)=>{
    setClass(e.target.value)
  }
  const handleCarCC = (e)=>{
    e.target.value >0 ? setCarCC(e.target.value) : e.target.value = 0
  }
  const handleInterchange = (e)=>{
    e.target.value >0 ? setInterchange(e.target.value) : e.target.value = 0
  }
  const handleStructure = (e)=>{
    setStructure(e.target.value)
  }
  const handleFuelType =(e)=>{
    setFuelType(e.target.value)
  }
  const handleLocationOfBuilding = (e)=>{
    setLocationOfBuilding(e.target.value)
  }
  const handleBuldingArea = (e)=>{
    e.target.value >0 ? setBuldingArea(e.target.value) : e.target.value = 0
  }
  const handleTypeBuilding = (e)=>{
    setTypeBuilding(e.target.value)
  }
  const handleBuildingFloor = (e)=>{
    e.target.value >0 ? setBuildingFloor(e.target.value) : e.target.value = 0
  }
  const handleNumbersOfroom = (e) =>{
    e.target.value >0 ?setNumbersOfroom(e.target.value): e.target.value = 0
  }
  const handleWaterResis = (e) =>{
    setWaterResis(e.target.value)
  }
  const handleScreenRes = (e) =>{
    setScreenRes(e.target.value)
  }
  const handleScreenHz = (e) =>{
    e.target.value >0 ? setScreenHz(e.target.value) : e.target.value = 0
    
  }
  const handleWireless = (e) =>{
    setWireless(e.target.value)
  }
  const handleBattery = (e) =>{
    setBattery(e.target.value)
  }
  const handleCamera = (e) =>{
    setCamera(e.target.value)
  }
  const handleRam = (e) =>{
    e.target.value >0 ? setRam(e.target.value) : e.target.value = 0
    
  }
  const handleLiveDate = (e) =>{
    setLiveDate(e.target.value)
  }
  const handleLiveTime = (e) =>{
    setLiveTime(e.target.value)
  }
  const handleWaitingTime = (e) =>{
    setWaitingTime(e.target.value)
    console.log(e.target.value)
  }
  const handleSchedualStartDate = (e) =>{
    setSchedualStartDate(e.target.value)
  }
  const handleSchedualEndDate = (e) =>{
    setSchedualEndDate(e.target.value)
  }
  const handleSchedualEndTime = (e)=>{
    setSchedualEndTime(e.target.value)
  }
  const handleSchedualStartTime = (e)=>{
    setSchedualStartTime(e.target.value)
  }
  const handleDigitalType = (e)=>{
    setDigitalType(e.target.value)
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    payWay =value + 1
    const timeOfLIve = `${LiveDate}` + ` ${LiveTime}`
    const startSchedual = `${SchedualStartDate}` + ` ${SchedualStartTime}`
    const endSchedual = `${SchedualEndDate}` + ` ${SchedualEndTime}`
    if (payWay === 1){
      // Instance Product
      if (Category != 'real estate'){
        if (name == null && brand == null&& desc == null&& matrial == null&& summery == null&& color == null&& price == null&& size == null&& state == null && props.imageFile == null){
          swal("Not Valid!", `Empty Field`, "error", {button: false})
        }else{
          insertInstantProduct(name,matrial,brand,desc,summery,HomeDecoration,color,price
            ,SIM,size,storage,date,state,DescribeState,carCC,CarModel,CarMile,HorsePower
            ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
            ,FuelType,BuldingArea,TypeBuilding,BuildingFloor,NumbersOfroom
            ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay,SubCategory,props.imageURL,props.imageFile)
        }
      }else{
        if (name !== null && HomeDecoration !== null&& BuldingArea !== null&& BuildingFloor !== null&& NumbersOfroom !== null&& TypeBuilding !== null&& price !== null && LocationOfBuilding !== null&& props.imageFile !== null ){
          insertInstantProduct(name,matrial,brand,desc,summery,HomeDecoration,color,price
            ,SIM,size,storage,date,2,DescribeState,carCC,CarModel,CarMile,HorsePower
            ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
            ,FuelType,BuldingArea,TypeBuilding,BuildingFloor,NumbersOfroom
            ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay,SubCategory,props.imageURL,props.imageFile)
            console.log(props.imageURL,props.imageFile)
        }else{
          swal("Not Valid!", `Empty Field`, "error", {button: false})
        }
      }
    }else if (payWay === 2){
      if (Category != 'real estate'){
        if(name == null || brand == null|| desc == null|| matrial == null|| summery == null|| color == null|| price == null|| size == null|| state == null ||LiveDate==null ||LiveTime==null || WaitingTime==null || props.imageFile == null){
          swal("Not Valid!", `Empty Field`, "error", {button: false})
        }else{
          insertAuctionProduct(name,matrial,brand,desc,summery,HomeDecoration,color
            ,SIM,size,storage,date,state,DescribeState,carCC,CarModel,CarMile,HorsePower
            ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
            ,FuelType,BuldingArea,TypeBuilding,BuildingFloor,NumbersOfroom
            ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay
            ,timeOfLIve,null,price,WaitingTime,SubCategory,props.imageURL,props.imageFile)
            swal("Welcome!", `Successful Upload`, "success", {button: true})
            setTimeout(() => {
                window.location.href = '/'
            }, 2000);
        }
      }else{
        if (name == null || HomeDecoration == null|| BuldingArea == null|| BuildingFloor == null|| NumbersOfroom == null|| TypeBuilding == null|| price == null || LocationOfBuilding == null ||LiveDate==null ||LiveTime==null || WaitingTime==null || props.imageFile == null){
          swal("Not Valid!", `Empty Field`, "error", {button: false})
        }else{
          insertAuctionProduct(name,matrial,brand,desc,summery,HomeDecoration,color
            ,SIM,size,storage,date,2,DescribeState,carCC,CarModel,CarMile,HorsePower
            ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
            ,FuelType,BuldingArea,TypeBuilding,BuildingFloor,NumbersOfroom
            ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay
            ,timeOfLIve,null,price,WaitingTime,SubCategory,props.imageURL,props.imageFile)
            swal("Welcome!", `Successful Upload`, "success", {button: true})
            setTimeout(() => {
                window.location.href = '/'
            }, 2000);
        }
      }
    }
    else{
      if (Category != 'real estate'){
        if(name == null || brand == null|| desc == null|| matrial == null|| summery == null|| color == null|| price == null|| size == null|| state == null ||SchedualStartDate==null ||SchedualEndDate==null || props.imageFile == null){
          swal("Not Valid!", `Empty Field`, "error", {button: false})
        }else{
          insertAuctionProduct(name,matrial,brand,desc,summery,HomeDecoration,color
            ,SIM,size,storage,date,state,DescribeState,carCC,CarModel,CarMile,HorsePower
            ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
            ,FuelType,BuldingArea,TypeBuilding,BuildingFloor,NumbersOfroom
            ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay
            ,startSchedual,endSchedual,price,WaitingTime,SubCategory,props.imageURL,props.imageFile)
            swal("Welcome!", `Successful Upload`, "success", {button: true})
              setTimeout(() => {
                  window.location.href = '/'
            }, 2000);
        }
      }else{
        if (name == null || HomeDecoration == null|| BuldingArea == null|| BuildingFloor == null|| NumbersOfroom == null|| TypeBuilding == null|| price == null || LocationOfBuilding == null ||SchedualStartDate==null ||SchedualEndDate==null || props.imageFile == null){
          swal("Not Valid!", `Empty Field`, "error", {button: false})
        }else{
          insertAuctionProduct(name,matrial,brand,desc,summery,HomeDecoration,color
            ,SIM,size,storage,date,state,DescribeState,carCC,CarModel,CarMile,HorsePower
            ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
            ,FuelType,BuldingArea,TypeBuilding,BuildingFloor,NumbersOfroom
            ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay
            ,startSchedual,endSchedual,price,WaitingTime,SubCategory,props.imageURL,props.imageFile)
            swal("Welcome!", `Successful Upload`, "success", {button: true})
                        setTimeout(() => {
                            window.location.href = '/'
            }, 2000);
        }
      }
    }
  }
  return (
    <Box sx={{ bgcolor: 'background.paper', width: 1000 }} className="uploadBarContainer" >
      <AppBar position="static" className='barDisplay'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Instance Sale" {...a11yProps(0)} className="barItemDisplay"/>
          <Tab label="Live Auction" {...a11yProps(1)} className="barItemDisplay" />
          <Tab label="Schedual Auction" {...a11yProps(2)} className="barItemDisplay"/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <div className="tabPanelContainer">
        <TabPanel value={value} index={0} dir={theme.direction}>
            <TextField id="standard-basic" className="inputField" label="Product Name" variant="standard" onChange={handleName} />
              <FormControl sx={{ m: 1.5, width: 200 }} >
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Category
                </InputLabel>
                <NativeSelect
                  onChange={handleCategory}
                  defaultValue=''
                  inputProps={{
                    name: 'Category',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value=''> </option>
                  {
                    CategoryName.length != 0 ?
                    CategoryName.map((category)=>{
                      return(
                        <option key={category.CATEGORY_ID} value={category.CATEGORY_NAME}>{category.CATEGORY_NAME}</option>
                        )
                      })
                    :''
                  }
                </NativeSelect>
              </FormControl>
            {
                <>
                  <FormControl sx={{ m: 1.5, width: 200 }} >
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Sub Category Name
                  </InputLabel>
                  <NativeSelect
                    onChange={handleSubCategory}
                    defaultValue=''
                    inputProps={{
                      name: 'Category',
                      id: 'uncontrolled-native',
                    }}
                  >
                  <option value=''> </option>
                  {
                    subCategorySelection.length != 0 ?
                    subCategorySelection.map((category,index)=>{
                      return(
                        <option key={index} value={category}>{category}</option>
                        )
                      })
                    :''
                  }
                </NativeSelect>
              </FormControl>
                  </>
               
              }
              
            
              {/* Cars */}
              {
                valid == true&& empty == true&& Auto ==true &&
                building == false && Electro == false && Fashion == false &&
                Music == false && Sport == false && Books==false &&
                vehicles &&  
                (
                  <>
                    <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <TextField id="standard-basic" className="inputField" label="Color"  variant="standard" onChange={handleColor} />
                    {/* <FormControl sx={{ m: 1.5, width: 200 }}>
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Color
                      </InputLabel>
                      <NativeSelect
                        onChange={handleColor}
                        value={color}
                        inputProps={{
                          name: 'Category',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value='custom'>Custom Color</option>
                        <option value='Red'>Red</option>
                        <option value='Green'>Green</option>
                        <option value='Blue'>Blue</option>
                        <option value='Yellow'>Yellow</option>
                        <option value='Magenta'>Magenta</option>
                        <option value='Cyan'>Cyan</option>
                        <option value='Orange'>Orange</option>
                        <option value='#800080'>Purple</option>
                        <option value='#FFC0CB'>Pink</option>
                        <option value='#008000'>Dark Green</option>
                        <option value='#800000'>Maroon</option>
                        <option value='#000080'>Navy</option>
                        <option value='#FFD700'>Gold</option>
                        <option value='#808080'>Gray</option>
                        <option value='#FFFFFF'>White</option>
                        <option value='#000000'>Black</option>
                        <option value='#FFFFF0'>Ivory</option>
                        <option value='#DC143C'>Crimson</option>
                        <option value='#F08080'>Light Coral</option>
                        <option value='#2E8B57'>Sea Green</option>
                        <option value='#FF4500'>Orange Red</option>
                      </NativeSelect>
                      {color === 'custom' ? 
                        <input
                          onChange={handleColor}
                          style={{ marginTop: '1rem' }}
                        />
                        : ''
                      }
                    </FormControl> */}
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Sets Number
                        </InputLabel>
                        <NativeSelect
                          onChange={handleSize}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option>
                          <option value="2" >Two sets</option> 
                          <option value="4" >Four sets</option> 
                          <option value="6" >Six sets </option> 
                          <option value="8" >Eight sets </option> 
                          <option value="12"  >Twelve Sets </option> 
                          </NativeSelect>
                        </FormControl>
                    
                      <FormControl className="inputFieldRadio">
                          <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=" "
                            name="radio-buttons-group"
                            onChange={handleState}
                          >
                            <FormControlLabel value="1" control={<Radio />} label="New"  />
                            <FormControlLabel value="2" control={<Radio />} label="Used" />
                          </RadioGroup>
                      </FormControl>
                      {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused />
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                      <TextField id="standard-basic" className="inputField" label="Car Model" variant="standard" onChange={handleCarModel}/>
                      <TextField id="standard-basic" className="inputField" label="Car Mileage" variant="standard" type='number' onChange= {handleCarMile}/>
                      <TextField id="standard-basic" className="inputField" label="Horse Power " variant="standard" type='number' onChange= {handleHorsePower} />
                      <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Gear Stick
                        </InputLabel>
                        <NativeSelect
                          onChange={handleGearStick}
                          defaultValue=''
                        >  
                          <option value="" ></option> 
                          <option value="0" >Automatic </option> 
                          <option value="1" >Manual</option>
                          </NativeSelect>
                        </FormControl>
                        <TextField id="standard-basic" className="inputField" label="Manifucture year" type='number' variant="standard" onChange= {handleManifuctureYear} />
                      <TextField id="standard-basic" className="inputField" label="Manifucture Country" variant="standard" onChange= {handleManifuctureCountry}/>
                      <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Class
                        </InputLabel>
                        <NativeSelect
                          onChange={handleClass}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  <option value=''></option> 
                          <option value='1'>First Class</option> 
                          <option value='2'>Second Class</option> 
                          <option value='3'>Third Class</option> 
                          </NativeSelect>
                      </FormControl>
                      <TextField id="standard-basic" className="inputField" label="Car CC" variant="standard" type='number' onChange= {handleCarCC} />
                      <TextField id="standard-basic" className="inputField" label="Interchange" variant="standard" type='number' onChange= {handleInterchange}/>
                      <TextField id="standard-basic" className="inputField" label="Structure" variant="standard" onChange= {handleStructure} />

                      <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Fuel Type
                        </InputLabel>
                        <NativeSelect
                          onChange={handleFuelType}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value=''></option> 
                          <option value='1'>Electric</option> 
                          <option value='2'>Petrol</option> 
                          <option value='3'>Gas</option> 
                          </NativeSelect>
                      </FormControl>
                      <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                      </Stack>

                    </>
                )
              }
              {/* Phones*/}
              {
                valid == true && empty == true&& Electro &&
                building == false && Auto == false && Fashion == false &&
                Music == false && Sport == false && Books == false &&
                Mobiles &&
                (
                  <>
                    <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <TextField id="standard-basic" className="inputField" label="Color"  variant="standard" onChange={handleColor} />
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <TextField id="standard-basic" className="inputField" label="Screen Size" variant="standard" onChange={handleSize}/>
                    <TextField id="standard-basic" className="inputField" label="Storage" variant="standard" onChange={handleStorage}/>

                    
                    <FormControl className="inputFieldRadio">
                      <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={handleState}
                      >
                        <FormControlLabel value="1" control={<Radio />} label="New"  />
                        <FormControlLabel value="2" control={<Radio />} label="Used" />
                      </RadioGroup>
                    </FormControl>
                    {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused/>
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                      {
                        !TV && !Laptop &&(
                          <>
                            <FormControl sx={{ m: 1.5, width: 200 }} >
                              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                              SIM card slot 
                              </InputLabel>
                              <NativeSelect
                                onChange={handleSIM}
                                defaultValue=''
                                inputProps={{
                                  name: 'Category',
                                  id: 'uncontrolled-native',
                                }}
                              >   
                                <option value=''></option> 
                                <option value="Dual-SIM"  >Dual SIM </option> 
                                <option value="Single-SIM"  >Single SIM </option> 
                              </NativeSelect>
                            </FormControl>
                            <FormControl sx={{ m: 1.5, width: 200 }} >
                              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                              Water Resistance
                              </InputLabel>
                              <NativeSelect
                                onChange={handleWaterResis}
                                defaultValue=''
                                inputProps={{
                                  name: 'Category',
                                  id: 'uncontrolled-native',
                                }}
                              >   
                                <option value=''></option> 
                                <option value="0">not resistant</option> 
                                <option value="1">water resistant </option> 
                              </NativeSelect>
                            </FormControl>
                            <TextField id="standard-basic" className="inputField" label="Wireless Carrier" variant="standard"onChange={handleWireless} />
                            <TextField id="standard-basic" className="inputField" label="Camera Pixels" variant="standard"onChange={handleCamera} />
                          </>
                        )
                      }
                    

                    <TextField id="standard-basic" className="inputField" label="Screen Resolution" variant="standard" onChange={handleScreenRes}/>
                    <TextField id="standard-basic" className="inputField" label="Screen Hz" variant="standard" type='number' onChange={handleScreenHz}/>
                    <TextField id="standard-basic" className="inputField" label="Battery" variant="standard"onChange={handleBattery} />
                    {
                      !TV && (
                        <>
                          <TextField id="standard-basic" className="inputField" type="number" label="RAM Size in GB" variant="standard"onChange={handleRam} />
                        </>
                      )
                    }
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                  </>
                )
              }
              {/* building */}
              {
                valid == true &&empty == true&&
                building && (
                  <>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Home Decoration
                        </InputLabel>
                        <NativeSelect
                          onChange={handleHomeDecoration}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value=""></option>
                          <option value="Fully finished"  >Fully finished </option> 
                          <option value="Partially finished">Partially finished </option> 
                          <option value="Semi-finished" >Semi-finished </option> 
                          <option value="Shell and core"  >Shell and core </option> 
                          <option value="Unfinished"  >Unfinished </option> 
                          </NativeSelect>
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    
                    <TextField id="standard-basic" className="inputField" label="Location of building" variant="standard" onChange={handleLocationOfBuilding}/>
                    <TextField id="standard-basic" className="inputField" label="Bulding Area" variant="standard" type='number' onChange={handleBuldingArea}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Building Type
                        </InputLabel>
                        <NativeSelect
                          onChange={handleTypeBuilding}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option>
                          <option value="1" >Apartment </option> 
                          <option value="2" >Villa </option> 
                          <option value="3" >Chalet </option> 
                          </NativeSelect>
                    </FormControl>
                    <TextField id="standard-basic" className="inputField" label="Building Floor" variant="standard" type='number' onChange={handleBuildingFloor}/>
                    <TextField id="standard-basic" type="number" className="inputField" label="Numbers of room" variant="standard" onChange={handleNumbersOfroom}/>
                    
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                    
                  </>
                )
              }
              {/* Watches */}
              {
                valid == true &&empty == true&&  Fashion &&
                building == false && Auto == false && Electro == false &&
                Music == false && Sport == false && Books == false &&
                Watches && (
                  <>
                    <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <TextField id="standard-basic" className="inputField" label="Color"  variant="standard" onChange={handleColor} />
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <TextField id="standard-basic" className="inputField" label="Size" variant="standard" onChange={handleSize}/>
                    <TextField id="standard-basic" className="inputField" label="Storage" variant="standard" onChange={handleStorage}/>
                    <FormControl className="inputFieldRadio">
                      <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={handleState}
                      >
                        <FormControlLabel value="1" control={<Radio />} label="New"  />
                        <FormControlLabel value="2" control={<Radio />} label="Used" />
                      </RadioGroup>
                    </FormControl>
                    {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused/>
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                    <TextField id="standard-basic" className="inputField" label="Water Resistance" variant="standard" type='number' onChange= {handleWaterResis} />
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Type
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDigitalType}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="1" >Analog </option> 
                          <option value="2" >Digital </option> 
                          <option value="3" >Both </option> 
                          </NativeSelect>
                    </FormControl>
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                  </>
                ) 
              }
              {/* others */}
            {
              valid == true &&empty == true&&
              vehicles == false && building ==false && Mobiles ==false && Watches == false&& Electro == false &&
              Auto == false && 
              other==true && (
                <>
                  <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <TextField id="standard-basic" className="inputField" label="Color"  variant="standard" onChange={handleColor} />
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <TextField id="standard-basic" className="inputField" label="Size" variant="standard" onChange={handleSize}/>
                    <FormControl className="inputFieldRadio">
                          <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            name="radio-buttons-group"
                            onChange={handleState}
                          >
                            <FormControlLabel value="1" control={<Radio />} label="New"  />
                            <FormControlLabel value="2" control={<Radio />} label="Used" />
                          </RadioGroup>
                    </FormControl>
                    {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused/>
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                </>
              )
            }
        </TabPanel>
        </div>
        <div className="tabPanelContainer">
        <TabPanel value={value}  index={1} dir={theme.direction}>
            
        <TextField id="standard-basic" className="inputField" label="Product Name" variant="standard" onChange={handleName} />
              <FormControl sx={{ m: 1.5, width: 200 }} >
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Category
                </InputLabel>
                <NativeSelect
                  onChange={handleCategory}
                  defaultValue=''
                  inputProps={{
                    name: 'Category',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value=''> </option>
                  {
                    CategoryName.length != 0 ?
                    CategoryName.map((category)=>{
                      return(
                        <option key={category.CATEGORY_ID} value={category.CATEGORY_NAME}>{category.CATEGORY_NAME}</option>
                        )
                      })
                    :''
                  }
                </NativeSelect>
              </FormControl>
            {
            <>
                  <FormControl sx={{ m: 1.5, width: 200 }} >
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Sub Category Name
                  </InputLabel>
                  <NativeSelect
                    onChange={handleSubCategory}
                    defaultValue=''
                    inputProps={{
                      name: 'Category',
                      id: 'uncontrolled-native',
                    }}
                  >
                  <option value=''> </option>
                  {
                    subCategorySelection.length != 0 ?
                    subCategorySelection.map((category,index)=>{
                      return(
                        <option key={index} value={category}>{category}</option>
                        )
                      })
                    :''
                  }
                </NativeSelect>
              </FormControl>
            </>
                
              }
              {/* Cars */}
              {
                valid == true &&empty == true&& Auto ==true &&
                building == false && Electro == false && Fashion == false &&
                Music == false && Sport == false && Books==false &&
                vehicles && 
                (
                  <>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                      <TextField id="standard-basic" className="inputField" label="Date Of Auction" variant="standard" type='date' onChange={handleLiveDate} focused/>
                      </FormControl>
                      <FormControl sx={{ marginLeft: 1, width: 220 }} >
                      <TextField id="standard-basic" className="inputField" label="Start Time" variant="standard" type='time' onChange={handleLiveTime} focused/>
                    </FormControl>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                      Waiting Time 
                      </InputLabel>
                      <NativeSelect
                        onChange={handleWaitingTime}
                        defaultValue=''
                        inputProps={{
                          name: 'Category',
                          id: 'uncontrolled-native',
                        }}
                      >  
                        <option value=""  ></option>
                        <option value="1"  >1 Minutes </option> 
                        <option value="2"  >2 Minutes </option> 
                        <option value="3"  >3 Minutes </option> 
                        <option value="4"  >4 Minutes </option> 
                        <option value="5"  >5 Minutes </option> 
                        <option value="6"  >6 Minutes </option>
                        <option value="7"  >7 Minutes </option>
                        <option value="8" >8 Minutes </option>
                        <option value="9"  >9 Minutes </option>
                        <option value="10"  >10 Minutes </option>
                        </NativeSelect>
                    </FormControl>
                    <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <TextField id="standard-basic" className="inputField" variant="standard" label="Color" onChange={handleColor} />
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Sets Number
                        </InputLabel>
                        <NativeSelect
                          onChange={handleSize}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option>
                          <option value="2" >Two sets</option> 
                          <option value="4" >Four sets</option> 
                          <option value="6" >Six sets </option> 
                          <option value="8" >Eight sets </option> 
                          <option value="12"  >Twelve Sets </option> 
                          </NativeSelect>
                        </FormControl>
                    
                      <FormControl className="inputFieldRadio">
                          <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=" "
                            name="radio-buttons-group"
                            onChange={handleState}
                          >
                            <FormControlLabel value="1" control={<Radio />} label="New"  />
                            <FormControlLabel value="2" control={<Radio />} label="Used" />
                          </RadioGroup>
                      </FormControl>
                      {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused />
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                      <TextField id="standard-basic" className="inputField" label="Car Model" variant="standard" onChange={handleCarModel}/>
                      <TextField id="standard-basic" className="inputField" label="Car Mileage" variant="standard" type='number' onChange= {handleCarMile}/>
                      <TextField id="standard-basic" className="inputField" label="Horse Power " variant="standard" type='number' onChange= {handleHorsePower} />
                      <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Gear Stick
                        </InputLabel>
                        <NativeSelect
                          onChange={handleGearStick}
                          defaultValue=''
                        >  
                          <option value="" ></option> 
                          <option value="0" >Automatic </option> 
                          <option value="1" >Manual</option>
                          </NativeSelect>
                        </FormControl>
                      <TextField id="standard-basic" className="inputField" label="Manifucture year" type='number' variant="standard" onChange= {handleManifuctureYear} />
                      <TextField id="standard-basic" className="inputField" label="Manifucture Country" variant="standard" onChange= {handleManifuctureCountry}/>
                      <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Class
                        </InputLabel>
                        <NativeSelect
                          onChange={handleClass}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  <option value=''></option> 
                          <option value='1'>First Class</option> 
                          <option value='2'>Second Class</option> 
                          <option value='3'>Third Class</option> 
                          </NativeSelect>
                      </FormControl>
                      <TextField id="standard-basic" className="inputField" label="Car CC" variant="standard" type='number' onChange= {handleCarCC} />
                      <TextField id="standard-basic" className="inputField" label="Interchange" variant="standard" type='number' onChange= {handleInterchange}/>
                      <TextField id="standard-basic" className="inputField" label="Structure" variant="standard" onChange= {handleStructure} />

                      <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Fuel Type
                        </InputLabel>
                        <NativeSelect
                          onChange={handleFuelType}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value=''></option> 
                          <option value='1'>Electric</option> 
                          <option value='2'>Petrol</option> 
                          <option value='3'>Gas</option> 
                          </NativeSelect>
                      </FormControl>
                      <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                      </Stack>
                </>
                )
              }
              {/* Phones*/}
              {
                valid == true&&empty == true && Electro &&
                building == false && Auto == false && Fashion == false &&
                Music == false && Sport == false && Books == false &&
                Mobiles &&
                (
                  <>
                  <FormControl sx={{ marginLeft: 1, width: 220 }} >
                <TextField id="standard-basic" className="inputField" label="Date Of Auction" variant="standard" type='date' onChange={handleLiveDate} focused/>
                </FormControl>
                <FormControl sx={{ marginLeft: 1, width: 220 }} >
                <TextField id="standard-basic" className="inputField" label="Start Time" variant="standard" type='time' onChange={handleLiveTime} focused/>
                </FormControl>
                <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Waiting Time 
                        </InputLabel>
                        <NativeSelect
                          onChange={handleWaitingTime}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                        <option value=""  ></option>
                          <option value="1"  >1 Minutes </option> 
                          <option value="2"  >2 Minutes </option> 
                          <option value="3"  >3 Minutes </option> 
                          <option value="4"  >4 Minutes </option> 
                          <option value="5"  >5 Minutes </option> 
                          <option value="6"  >6 Minutes </option>
                          <option value="7"  >7 Minutes </option>
                          <option value="8" >8 Minutes </option>
                          <option value="9"  >9 Minutes </option>
                          <option value="10"  >10 Minutes </option>
                          </NativeSelect>
                    </FormControl>
                    <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <TextField id="standard-basic" className="inputField" label="Color"  variant="standard" onChange={handleColor} />
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <TextField id="standard-basic" className="inputField" label="Screen Size" variant="standard" onChange={handleSize}/>
                    <TextField id="standard-basic" className="inputField" label="Storage" variant="standard" onChange={handleStorage}/>

                    
                    <FormControl className="inputFieldRadio">
                      <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={handleState}
                      >
                        <FormControlLabel value="1" control={<Radio />} label="New"  />
                        <FormControlLabel value="2" control={<Radio />} label="Used" />
                      </RadioGroup>
                    </FormControl>
                    {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused/>
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                      {
                        !TV && !Laptop &&(
                          <>
                            <FormControl sx={{ m: 1.5, width: 200 }} >
                              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                              SIM card slot 
                              </InputLabel>
                              <NativeSelect
                                onChange={handleSIM}
                                defaultValue=''
                                inputProps={{
                                  name: 'Category',
                                  id: 'uncontrolled-native',
                                }}
                              >   
                                <option value=''></option> 
                                <option value="Dual-SIM"  >Dual SIM </option> 
                                <option value="Single-SIM"  >Single SIM </option> 
                              </NativeSelect>
                            </FormControl>
                            <FormControl sx={{ m: 1.5, width: 200 }} >
                              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                              Water Resistance
                              </InputLabel>
                              <NativeSelect
                                onChange={handleWaterResis}
                                defaultValue=''
                                inputProps={{
                                  name: 'Category',
                                  id: 'uncontrolled-native',
                                }}
                              >   
                                <option value=''></option> 
                                <option value="0">not resistant</option> 
                                <option value="1">water resistant </option> 
                              </NativeSelect>
                            </FormControl>
                            <TextField id="standard-basic" className="inputField" label="Wireless Carrier" variant="standard"onChange={handleWireless} />
                            <TextField id="standard-basic" className="inputField" label="Camera Pixels" variant="standard"onChange={handleCamera} />
                          </>
                        )
                      }
                    

                    <TextField id="standard-basic" className="inputField" label="Screen Resolution" variant="standard" onChange={handleScreenRes}/>
                    <TextField id="standard-basic" className="inputField" label="Screen Hz" variant="standard" type='number' onChange={handleScreenHz}/>
                    <TextField id="standard-basic" className="inputField" label="Battery" variant="standard"onChange={handleBattery} />
                    {
                      !TV && (
                        <>
                          <TextField id="standard-basic" className="inputField" type="number" label="RAM Size in GB" variant="standard"onChange={handleRam} />
                        </>
                      )
                    }
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                  </>
                
                )
              }
              {/* building */}
              {
                valid == true &&empty == true&&
                building && (
                  <>
                  <FormControl sx={{ marginLeft: 1, width: 220 }} >
                  <TextField id="standard-basic" className="inputField" label="Date Of Auction" variant="standard" type='date' onChange={handleLiveDate} focused/>
                  </FormControl>
                  <FormControl sx={{ marginLeft: 1, width: 220 }} >
                  <TextField id="standard-basic" className="inputField" label="Start Time" variant="standard" type='time' onChange={handleLiveTime} focused/>
                  </FormControl>
                  <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Waiting Time 
                        </InputLabel>
                        <NativeSelect
                          onChange={handleWaitingTime}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value=""  ></option> 
                          <option value="1"  >1 Minutes </option> 
                          <option value="2"  >2 Minutes </option> 
                          <option value="3"  >3 Minutes </option> 
                          <option value="4"  >4 Minutes </option> 
                          <option value="5"  >5 Minutes </option> 
                          <option value="6"  >6 Minutes </option>
                          <option value="7"  >7 Minutes </option>
                          <option value="8" >8 Minutes </option>
                          <option value="9"  >9 Minutes </option>
                          <option value="10"  >10 Minutes </option>
                          </NativeSelect>
                    </FormControl>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Home Decoration
                        </InputLabel>
                        <NativeSelect
                          onChange={handleHomeDecoration}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value=""></option>
                          <option value="Fully finished"  >Fully finished </option> 
                          <option value="Partially finished">Partially finished </option> 
                          <option value="Semi-finished" >Semi-finished </option> 
                          <option value="Shell and core"  >Shell and core </option> 
                          <option value="Unfinished"  >Unfinished </option> 
                          </NativeSelect>
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <TextField id="standard-basic" className="inputField" label="Location of building" variant="standard" onChange={handleLocationOfBuilding}/>
                    <TextField id="standard-basic" className="inputField" label="Bulding Area" variant="standard" type='number' onChange={handleBuldingArea}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Building Type
                        </InputLabel>
                        <NativeSelect
                          onChange={handleTypeBuilding}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option>
                          <option value="1" >Apartment </option> 
                          <option value="2" >Villa </option> 
                          <option value="3" >Chalet </option> 
                          </NativeSelect>
                    </FormControl>
                    <TextField id="standard-basic" className="inputField" label="Building Floor" variant="standard" type='number' onChange={handleBuildingFloor}/>
                    <TextField id="standard-basic" type="number" className="inputField" label="Numbers of room" variant="standard" onChange={handleNumbersOfroom}/>
                    
                    
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                  </>
                )
              }
              {/* Watches */}
              {
                valid == true &&empty == true&& Fashion &&
                building == false && Auto == false && Electro == false &&
                Music == false && Sport == false && Books == false &&
                Watches && (
                  <>
                  <FormControl sx={{ marginLeft: 1, width: 220 }} >
                <TextField id="standard-basic" className="inputField" label="Date Of Auction" variant="standard" type='date' onChange={handleLiveDate} focused/>
                </FormControl>
                <FormControl sx={{ marginLeft: 1, width: 220 }} >
                <TextField id="standard-basic" className="inputField" label="Start Time" variant="standard" type='time' onChange={handleLiveTime} focused/>
                </FormControl>
                <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Waiting Time 
                        </InputLabel>
                        <NativeSelect
                          onChange={handleWaitingTime}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value=""  ></option>
                          <option value="1"  >1 Minutes </option> 
                          <option value="2"  >2 Minutes </option> 
                          <option value="3"  >3 Minutes </option> 
                          <option value="4"  >4 Minutes </option> 
                          <option value="5"  >5 Minutes </option> 
                          <option value="6"  >6 Minutes </option>
                          <option value="7"  >7 Minutes </option>
                          <option value="8" >8 Minutes </option>
                          <option value="9"  >9 Minutes </option>
                          <option value="10"  >10 Minutes </option>
                          </NativeSelect>
                    </FormControl>
                    <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <TextField id="standard-basic" className="inputField" label="Color"  variant="standard" onChange={handleColor} />
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <TextField id="standard-basic" className="inputField" label="Size" variant="standard" onChange={handleSize}/>
                    <TextField id="standard-basic" className="inputField" label="Storage" variant="standard" onChange={handleStorage}/>
                    <FormControl className="inputFieldRadio">
                      <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={handleState}
                      >
                        <FormControlLabel value="1" control={<Radio />} label="New"  />
                        <FormControlLabel value="2" control={<Radio />} label="Used" />
                      </RadioGroup>
                    </FormControl>
                    {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused/>
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                    <TextField id="standard-basic" className="inputField" label="Water Resistance" variant="standard" type='number' onChange= {handleWaterResis} />
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Type
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDigitalType}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="1" >Analog </option> 
                          <option value="2" >Digital </option> 
                          <option value="3" >Both </option> 
                          </NativeSelect>
                    </FormControl>
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                  </>
                ) 
              }
              {/* others */}
            {
             valid == true &&empty == true&&
             vehicles == false && building ==false && Mobiles ==false && Watches ==false && Electro == false &&
             Auto == false && 
             other==true && (
                <>
                <FormControl sx={{ marginLeft: 1, width: 220 }} >
                <TextField id="standard-basic" className="inputField" label="Date Of Auction" variant="standard" type='date' onChange={handleLiveDate} focused/>
                </FormControl>
                <FormControl sx={{ marginLeft: 1, width: 220 }} >
                <TextField id="standard-basic" className="inputField" label="Start Time" variant="standard" type='time' onChange={handleLiveTime} focused/>
                </FormControl> 
                <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Waiting Time 
                        </InputLabel>
                        <NativeSelect
                          onChange={handleWaitingTime}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value=""  ></option>
                          <option value="1"  >1 Minutes </option> 
                          <option value="2"  >2 Minutes </option> 
                          <option value="3"  >3 Minutes </option> 
                          <option value="4"  >4 Minutes </option> 
                          <option value="5"  >5 Minutes </option> 
                          <option value="6"  >6 Minutes </option>
                          <option value="7"  >7 Minutes </option>
                          <option value="8" >8 Minutes </option>
                          <option value="9"  >9 Minutes </option>
                          <option value="10"  >10 Minutes </option>
                          </NativeSelect>
                    </FormControl>
                    <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <TextField id="standard-basic" className="inputField" label="Color"  variant="standard" onChange={handleColor} />
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <TextField id="standard-basic" className="inputField" label="Size" variant="standard" onChange={handleSize}/>
                    <FormControl className="inputFieldRadio">
                          <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            name="radio-buttons-group"
                            onChange={handleState}
                          >
                            <FormControlLabel value="1" control={<Radio />} label="New"  />
                            <FormControlLabel value="2" control={<Radio />} label="Used" />
                          </RadioGroup>
                    </FormControl>
                    {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused/>
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                </>
              )
            }
        </TabPanel>
        </div>
        <div className="tabPanelContainer">
        <TabPanel value={value} index={2} dir={theme.direction}>
        <TextField id="standard-basic" className="inputField" label="Product Name" variant="standard" onChange={handleName} />
              <FormControl sx={{ m: 1.5, width: 200 }} >
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Category
                </InputLabel>
                <NativeSelect
                  onChange={handleCategory}
                  defaultValue=''
                  inputProps={{
                    name: 'Category',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value=''> </option>
                  {
                    CategoryName.length != 0 ?
                    CategoryName.map((category)=>{
                      return(
                        <option key={category.CATEGORY_ID} value={category.CATEGORY_NAME}>{category.CATEGORY_NAME}</option>
                        )
                      })
                    :''
                  }
                </NativeSelect>
              </FormControl>
            {
                <>
                  <FormControl sx={{ m: 1.5, width: 200 }} >
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Sub Category Name
                  </InputLabel>
                  <NativeSelect
                    onChange={handleSubCategory}
                    defaultValue=''
                    inputProps={{
                      name: 'Category',
                      id: 'uncontrolled-native',
                    }}
                  >
                  <option value=''> </option>
                  {
                    subCategorySelection.length != 0 ?
                    subCategorySelection.map((category,index)=>{
                      return(
                        <option key={index} value={category}>{category}</option>
                        )
                      })
                    :''
                  }
                </NativeSelect>
              </FormControl>
                  </>
              }
            
              {/* Cars */}
              {
                valid == true&&empty == true && Auto ==true &&
                building == false && Electro == false && Fashion == false &&
                Music == false && Sport == false && Books==false &&
                vehicles && 
                (
                  <>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="Start Date Of Auction" variant="standard" type='date' onChange={handleSchedualStartDate} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="Start Time Of Auction" variant="standard" type='time' onChange={handleSchedualStartTime} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="End Date Of Auction" variant="standard" type='date' onChange={handleSchedualEndDate} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="End Time Of Auction" variant="standard" type='time' onChange={handleSchedualEndTime} focused/>
                    </FormControl>
                    <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <TextField id="standard-basic" className="inputField" variant="standard" label="Color" onChange={handleColor} />
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Sets Number
                        </InputLabel>
                        <NativeSelect
                          onChange={handleSize}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option>
                          <option value="2" >Two sets</option> 
                          <option value="4" >Four sets</option> 
                          <option value="6" >Six sets </option> 
                          <option value="8" >Eight sets </option> 
                          <option value="12"  >Twelve Sets </option> 
                          </NativeSelect>
                        </FormControl>
                    
                      <FormControl className="inputFieldRadio">
                          <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=" "
                            name="radio-buttons-group"
                            onChange={handleState}
                          >
                            <FormControlLabel value="1" control={<Radio />} label="New"  />
                            <FormControlLabel value="2" control={<Radio />} label="Used" />
                          </RadioGroup>
                      </FormControl>
                      {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused />
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                      <TextField id="standard-basic" className="inputField" label="Car Model" variant="standard" onChange={handleCarModel}/>
                      <TextField id="standard-basic" className="inputField" label="Car Mileage" variant="standard" type='number' onChange= {handleCarMile}/>
                      <TextField id="standard-basic" className="inputField" label="Horse Power " variant="standard" type='number' onChange= {handleHorsePower} />
                      <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Gear Stick
                        </InputLabel>
                        <NativeSelect
                          onChange={handleGearStick}
                          defaultValue=''
                        >  
                          <option value="" ></option> 
                          <option value="0" >Automatic </option> 
                          <option value="1" >Manual</option>
                          </NativeSelect>
                        </FormControl>                      <TextField id="standard-basic" className="inputField" label="Manifucture year" type='number' variant="standard" onChange= {handleManifuctureYear} />
                      <TextField id="standard-basic" className="inputField" label="Manifucture Country" variant="standard" onChange= {handleManifuctureCountry}/>
                      <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Class
                        </InputLabel>
                        <NativeSelect
                          onChange={handleClass}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  <option value=''></option> 
                          <option value='1'>First Class</option> 
                          <option value='2'>Second Class</option> 
                          <option value='3'>Third Class</option> 
                          </NativeSelect>
                      </FormControl>
                      <TextField id="standard-basic" className="inputField" label="Car CC" variant="standard" type='number' onChange= {handleCarCC} />
                      <TextField id="standard-basic" className="inputField" label="Interchange" variant="standard" type='number' onChange= {handleInterchange}/>
                      <TextField id="standard-basic" className="inputField" label="Structure" variant="standard" onChange= {handleStructure} />

                      <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Fuel Type
                        </InputLabel>
                        <NativeSelect
                          onChange={handleFuelType}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value=''></option> 
                          <option value='1'>Electric</option> 
                          <option value='2'>Petrol</option> 
                          <option value='3'>Gas</option> 
                          </NativeSelect>
                      </FormControl>
                      <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                      </Stack>
                    </>
                )
              }
              {/* Phones*/}
              {
                valid == true&&empty == true && Electro &&
                building == false && Auto == false && Fashion == false &&
                Music == false && Sport == false && Books == false &&
                Mobiles && (
                  <>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="Start Date Of Auction" variant="standard" type='date' onChange={handleSchedualStartDate} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="Start Time Of Auction" variant="standard" type='time' onChange={handleSchedualStartTime} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="End Date Of Auction" variant="standard" type='date' onChange={handleSchedualEndDate} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="End Time Of Auction" variant="standard" type='time' onChange={handleSchedualEndTime} focused/>
                    </FormControl>
                    <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <TextField id="standard-basic" className="inputField" label="Color"  variant="standard" onChange={handleColor} />
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <TextField id="standard-basic" className="inputField" label="Screen Size" variant="standard" onChange={handleSize}/>
                    <TextField id="standard-basic" className="inputField" label="Storage" variant="standard" onChange={handleStorage}/>

                    
                    <FormControl className="inputFieldRadio">
                      <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={handleState}
                      >
                        <FormControlLabel value="1" control={<Radio />} label="New"  />
                        <FormControlLabel value="2" control={<Radio />} label="Used" />
                      </RadioGroup>
                    </FormControl>
                    {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused/>
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                      {
                        !TV && !Laptop &&(
                          <>
                            <FormControl sx={{ m: 1.5, width: 200 }} >
                              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                              SIM card slot 
                              </InputLabel>
                              <NativeSelect
                                onChange={handleSIM}
                                defaultValue=''
                                inputProps={{
                                  name: 'Category',
                                  id: 'uncontrolled-native',
                                }}
                              >   
                                <option value=''></option> 
                                <option value="Dual-SIM"  >Dual SIM </option> 
                                <option value="Single-SIM"  >Single SIM </option> 
                              </NativeSelect>
                            </FormControl>
                            <FormControl sx={{ m: 1.5, width: 200 }} >
                              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                              Water Resistance
                              </InputLabel>
                              <NativeSelect
                                onChange={handleWaterResis}
                                defaultValue=''
                                inputProps={{
                                  name: 'Category',
                                  id: 'uncontrolled-native',
                                }}
                              >   
                                <option value=''></option> 
                                <option value="0">not resistant</option> 
                                <option value="1">water resistant </option> 
                              </NativeSelect>
                            </FormControl>                            <TextField id="standard-basic" className="inputField" label="Wireless Carrier" variant="standard"onChange={handleWireless} />
                            <TextField id="standard-basic" className="inputField" label="Camera Pixels" variant="standard"onChange={handleCamera} />
                          </>
                        )
                      }
                    <TextField id="standard-basic" className="inputField" label="Screen Resolution" variant="standard" onChange={handleScreenRes}/>
                    <TextField id="standard-basic" className="inputField" label="Screen Hz" variant="standard" type='number' onChange={handleScreenHz}/>
                    <TextField id="standard-basic" className="inputField" label="Battery" variant="standard"onChange={handleBattery} />
                    {
                      !TV && (
                        <>
                          <TextField id="standard-basic" className="inputField" type="number" label="RAM Size in GB" variant="standard"onChange={handleRam} />
                        </>
                      )
                    }
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                  </>
                )
              }
              {/* building */}
              {
                valid == true&&empty == true &&
                building && (
                  <>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="Start Date Of Auction" variant="standard" type='date' onChange={handleSchedualStartDate} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="Start Time Of Auction" variant="standard" type='time' onChange={handleSchedualStartTime} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="End Date Of Auction" variant="standard" type='date' onChange={handleSchedualEndDate} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="End Time Of Auction" variant="standard" type='time' onChange={handleSchedualEndTime} focused/>
                    </FormControl>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Home Decoration
                        </InputLabel>
                        <NativeSelect
                          onChange={handleHomeDecoration}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value=""></option>
                          <option value="Fully finished"  >Fully finished </option> 
                          <option value="Partially finished">Partially finished </option> 
                          <option value="Semi-finished" >Semi-finished </option> 
                          <option value="Shell and core"  >Shell and core </option> 
                          <option value="Unfinished"  >Unfinished </option> 
                          </NativeSelect>
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <TextField id="standard-basic" className="inputField" label="Location of building" variant="standard" onChange={handleLocationOfBuilding}/>
                    <TextField id="standard-basic" className="inputField" label="Bulding Area" variant="standard" type='number' onChange={handleBuldingArea}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Building Type
                        </InputLabel>
                        <NativeSelect
                          onChange={handleTypeBuilding}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option>
                          <option value="1" >Apartment </option> 
                          <option value="2" >Villa </option> 
                          <option value="3" >Chalet </option> 
                          </NativeSelect>
                    </FormControl>
                    <TextField id="standard-basic" className="inputField" label="Building Floor" variant="standard" type='number' onChange={handleBuildingFloor}/>
                    <TextField id="standard-basic" type="number" className="inputField" label="Numbers of room" variant="standard" onChange={handleNumbersOfroom}/>
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                  </>
                )
              }
              {/* Watches */}
              {
                valid == true &&empty == true&& Fashion &&
                building == false && Auto == false && Electro== false &&
                Music == false && Sport == false && Books == false &&
                Watches && (
                  <>
                     <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="Start Date Of Auction" variant="standard" type='date' onChange={handleSchedualStartDate} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="Start Time Of Auction" variant="standard" type='time' onChange={handleSchedualStartTime} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="End Date Of Auction" variant="standard" type='date' onChange={handleSchedualEndDate} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="End Time Of Auction" variant="standard" type='time' onChange={handleSchedualEndTime} focused/>
                    </FormControl>
                    <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <TextField id="standard-basic" className="inputField" label="Color"  variant="standard" onChange={handleColor} />
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <TextField id="standard-basic" className="inputField" label="Size" variant="standard" onChange={handleSize}/>
                    <TextField id="standard-basic" className="inputField" label="Storage" variant="standard" onChange={handleStorage}/>
                    <FormControl className="inputFieldRadio">
                      <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={handleState}
                      >
                        <FormControlLabel value="1" control={<Radio />} label="New"  />
                        <FormControlLabel value="2" control={<Radio />} label="Used" />
                      </RadioGroup>
                    </FormControl>
                    {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused/>
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                    <TextField id="standard-basic" className="inputField" label="Water Resistance" variant="standard" type='number' onChange= {handleWaterResis} />
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Type
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDigitalType}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="1" >Analog </option> 
                          <option value="2" >Digital </option> 
                          <option value="3" >Both </option> 
                          </NativeSelect>
                    </FormControl>
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                  </>
                ) 
              }
              {/* others */}
            {
              valid == true&&empty == true &&
              vehicles == false && building ==false && Mobiles ==false && Watches ==false && Electro == false &&
              Auto == false && 
              other==true && (
                <>
                     <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="Start Date Of Auction" variant="standard" type='date' onChange={handleSchedualStartDate} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="Start Time Of Auction" variant="standard" type='time' onChange={handleSchedualStartTime} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="End Date Of Auction" variant="standard" type='date' onChange={handleSchedualEndDate} focused/>
                    </FormControl>
                    <FormControl sx={{ marginLeft: 1, width: 220 }} >
                    <TextField id="standard-basic" className="inputField" label="End Time Of Auction" variant="standard" type='time' onChange={handleSchedualEndTime} focused/>
                    </FormControl>
                    <TextField id="standard-basic" className="inputField" label="Product Matrial" variant="standard" onChange={handleMatrial}/>
                    <TextField id="standard-basic" className="inputField" label="Product Brand" variant="standard" onChange={handleBrand}/>
                    <TextField id="standard-basic" className="inputField" label="Description" variant="standard" onChange={handleDesc}/>
                    <TextField id="standard-basic" className="inputField" label="Summary" variant="standard" onChange={handleSummery}/>
                    <FormControl sx={{ m: 1.5, width: 200 }} >
                    <TextField id="standard-basic" className="inputField" label="Color"  variant="standard" onChange={handleColor} />
                    </FormControl>
                    <TextField
                        id="filled-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        className="inputField"
                        onChange={handlePrice}
                    />
                    <TextField id="standard-basic" className="inputField" label="Size" variant="standard" onChange={handleSize}/>
                    <FormControl className="inputFieldRadio">
                          <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            name="radio-buttons-group"
                            onChange={handleState}
                          >
                            <FormControlLabel value="1" control={<Radio />} label="New"  />
                            <FormControlLabel value="2" control={<Radio />} label="Used" />
                          </RadioGroup>
                    </FormControl>
                    {
                      validDate == true ? 
                      <>
                        <TextField  id="standard-basic" className="inputField" label="Buying Date" type='date' variant="standard" onChange={handleDate} focused/>
                        <FormControl sx={{ m: 1.5, width: 200 }} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Describe State
                        </InputLabel>
                        <NativeSelect
                          onChange={handleDescribeState}
                          defaultValue=''
                          inputProps={{
                            name: 'Category',
                            id: 'uncontrolled-native',
                          }}
                        >  
                          <option value="" ></option> 
                          <option value="Pre-owned" >Pre-owned </option> 
                          <option value="Second-hand" >Second-hand </option> 
                          <option value="Gently used" >Gently used </option> 
                          <option value="Pre-loved"  >Pre-loved </option> 
                          <option value="Refurbished"  >Refurbished </option> 
                          </NativeSelect>
                        </FormControl>
                      </>
                      : ''
                      }
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" className='uploadButton' onClick={handleSubmit}>UPload</Button>
                    </Stack>
                </>
              )
            }
        </TabPanel>
        </div>
      </SwipeableViews>
      
    </Box>
  );
}