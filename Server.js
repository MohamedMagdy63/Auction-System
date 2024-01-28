/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const db = require('./src/controller/dataBase')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt') 
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const fs = require('fs')
const path = require('path')
const http = require('http')
const { Server } = require("socket.io");
const { forIn } = require('lodash')

const app = express()


app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({ 
    secret:"secretKKKKKKKKKkey",
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        maxAge: 3600000
    },
}));

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'/',
        methods: ["GET","POST"]
    }
});



const encrypt = (text) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex'), keys: key };
}

const decrypt = (text) => {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(text.keys), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
const hasPermission = (username)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('permission.permission_name','permission').then(()=>{
        return db.innerJoin('admin_permission','permission', 'admin_permission', 'permission_id').then(()=>{
            return db.where('admin_permission.admin_id', '=' ,'').then(()=>{
                return db.openOtherSelect('admin.admin_id', 'admin').then(()=>{
                    return db.innerJoin('users','admin','users','user_id').then(()=>{
                        return db.where('users.user_name', '=', `'${username}'`).then(()=>{
                            return db.closeOtherSelect().then(()=>{
                                return db.all().then(()=>{
                                    return db.data
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const getmaxId = (colum_name,table_name) =>{
    db.data.splice(0,(db.data.length+1))
    return db.select(`Max(${colum_name}) as Num`,`${table_name}`).then(()=>{
        return db.all().then(()=>{
            return(db.data)
        })
    })
}
const insertUser = (id,firstname,lastname,username,phone,otherPhone,address,birthday,SSN,email,password,gender,currentDate) =>{
    db.data.splice(0,(db.data.length+1))
    return bcrypt.hash(password,10).then((incrype)=>{
        return db.insert('users',
        'USER_ID, USER_SSN, USER_NAME, USER_PHONE1, USER_PHONE2, USER_ADDRESS, GENDER, USER_BIRTHDAY, DATE_CREATED, GOT_BANNED, USER_EMAIL, USER_PASSWORD, USER_FIRST_LAST_NAME',
        `${id},'${SSN}','${username}','${phone}','${otherPhone}','${address}',${gender == 'male' || gender == 'Male' ? 1 : 0},TO_DATE('${birthday}', 'YYYY-MM-DD'),TO_DATE('${currentDate}', 'YYYY-MM-DD'),0,'${email}','${incrype}','${firstname} ${lastname}'`).then(()=>{
            return db.execute().then(()=>{
                return(db.data)
            })
        })
    })
    
}
const insertClient = (id,userID) =>{
    db.data.splice(0,(db.data.length+1))
    return db.insert('clint','CLINT_ID, CATEGORY_CHECK, TERMS_CHECK, USER_ID',
    `${id},0,1,${userID}`).then(()=>{
        return db.execute().then(()=>{
            return(db.data)
        })
    })
}
const isAdminSystem = async(username, password)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('*','users').then(()=>{
        return db.innerJoin('admin','users','admin','user_id').then(()=>{
            return db.where('user_name','=',`'${username}'`).then(()=>{
                return db.all().then(()=>{
                    if(db.data.length != 0){
                        return( bcrypt.compare(password,db.data[0].USER_PASSWORD).then((x)=>{
                            if(x){
                                if(db.data[0].GOT_BANNED !== 0){
                                    return({'state':'Fail','roll': '','user': username})
                                }else{
                                    db.data.splice(0,(db.data.length+1))
                                    return({'state':'Success','roll':  encrypt('Admin'), 'user': encrypt(username)})
                                }
                            }else{
                                db.data.splice(0,(db.data.length+1))
                                return({'state':'Fail','roll': '','user': username})
                            }
                        })
                        )
                    }else{
                        db.data.splice(0,(db.data.length+1))
                        return({'state':'Fail','roll': '','user': username})
                    }
                })
            })
        })
    })
}
const isClientSystem = (username, password)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('*','users').then(()=>{
        return db.innerJoin('clint','users','clint','user_id').then(()=>{
            return db.where('user_name','=',`'${username}'`).then(()=>{
                return db.all().then(()=>{
                    if(db.data.length != 0){
                        return( bcrypt.compare(password,db.data[0].USER_PASSWORD).then((x)=>{
                            if(x){
                                if(db.data[0].GOT_BANNED !== 0){
                                    return({'state':'Fail','roll': '','user': username})
                                }else{
                                    db.data.splice(0,(db.data.length+1))
                                    return({'state':'Success','roll': encrypt('User'), 'user': encrypt(username)})
                                }
                            }else{
                                db.data.splice(0,(db.data.length+1))
                                return({'state':'Fail','roll': '','user': username})
                            }
                        })
                        )
                    }else{
                        db.data.splice(0,(db.data.length+1))
                        return({'state':'Fail','roll': '','user': username})
                    }
                })
            })
        })
    })
}
const MainCategory = async ()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('category_id as id , category_name as title , category_image as image', 'category').then(()=>{
        return db.where('sub_category_id','is',null).then(()=>{
            return db.all().then(()=>{
                return db.data
            })
        })
    })
}
const AllMainCategory = async ()=>{
    return db.select('*', 'category').then(()=>{
        return db.where('sub_category_id','is',null).then(()=>{
            return db.all().then(()=>{
                return db.data
            })
        })
    })
}
const SubCategory = async ()=>{
    return db.select('*', 'category').then(()=>{
        return db.where('sub_category_id','is not', null).then(()=>{
            return db.all().then(()=>{
                return db.data
            })
        })
    })
}
const categories = async ()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('*', 'category').then(()=>{
        return db.where('sub_category_id', 'is', 'null').then(()=>{
            return db.all().then(()=>{
                return db.data
            })
        })
    })
}
const subOfCategory = async (categoryName)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('*','category').then(()=>{
        return db.where('sub_category_id', '=','').then(()=>{
            return db.openOtherSelect('category_id','category').then(()=>{
                return db.where('category_name', '=', `'${categoryName}'`).then(()=>{
                    return db.closeOtherSelect().then(()=>{
                        return db.all().then(()=>{
                            return db.data
                        })
                    })
                })
            })
        })
    })
}
const insertProductImage = async (id,imageId,path)=>{
    db.data.splice(0,(db.data.length+1))
    return db.insert('product_image','product_id , image_id , image',`${id},${imageId},'${path}'`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const UpdateCategory = async (id,path)=>{
    return db.update('category',`category_image = '${path}'`).then(()=>{
        return db.where('category_id','=',`'${id}'`).then(()=>{
            return db.execute().then(()=>{
                return db.data
            })
        })
    })
}
const InstantProducts = async()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('p.product_id ,p.product_name as title ,pimag.image as image , p.product_price as price , p.product_brand , p.product_description as description , p.product_size , p.product_storage , p.product_summary , p.product_material , p.wireless_carrier , p.slot_of_card , p.battery , p.camera_pixels , p.RAM , p.product_color , p.product_payment_date , p.product_description_state , p.vehicle_model , p.vehicle_horse_power , p.vehicle_cc , p.vehicle_structure , p.vehicle_manufacture_year , p.vehicle_manufacture_country , p.vehicle_mileage , p.vehicle_interchange_partNumber , p.vehicle_gear_stick , p.water_resistance , p.screen_resolution , p.screen_Hz , p.build_location , p.build_area , p.building_floor , p.build_decoration , p.build_rooms_number , p.upload_date ,vft.vehicle_fuel_type_name , vc.vehicle_class , dt.digital_type , bt.build_type_name , pw.pay_way_name as payWay , s.state_name as state , c.category_name as Category ' , 'product p').then(()=>{
        return db.innerJoin('category_product cp','p','cp','product_id').then(()=>{
            return db.innerJoin('state s','p','s','state_id').then(()=>{
                return db.leftJoin('vehicle_fuel_type vft','p','vft','vehicle_fuel_type_id').then(()=>{
                    return db.leftJoin('vehicle_class vc','p','vc','vehicle_class_id').then(()=>{
                        return db.leftJoin('digital_type dt','p','dt','digital_type_id').then(()=>{
                            return db.leftJoin('build_type bt','p','bt','build_type_id').then(()=>{
                                return db.leftJoin('product_image pimag','p','pimag','product_id').then(()=>{
                                    return db.leftJoin('pay_way pw','p','pw','pay_way_id').then(()=>{
                                        return db.leftJoin('category c','cp','c','category_id').then(()=>{
                                            return db.innerJoin('review_product rp','p','rp','product_id').then(()=>{
                                                return db.where('pw.pay_way_name','=',"'Instant'").then(()=>{
                                                    return db.otherOperation('and').then(()=>{
                                                        return db.otherWhere('rp.acceptation','=','1').then(()=>{
                                                            return db.all().then(()=>{
                                                                return db.data
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const auctionProductsById = async(payWay,prodactId)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('a.end_day_time as endTime,p.product_id,p.product_name as title ,pimag.image as image , a.initial_price as price ,p.product_price , p.product_brand , p.product_description as description , p.wireless_carrier , p.slot_of_card , p.battery , p.camera_pixels , p.RAM , p.product_size , p.product_storage , p.product_summary , p.product_material , p.product_color , p.product_payment_date , p.product_description_state , p.vehicle_model , p.vehicle_horse_power , p.vehicle_cc , p.vehicle_structure , p.vehicle_manufacture_year , p.vehicle_manufacture_country , p.vehicle_mileage , p.vehicle_interchange_partNumber , p.vehicle_gear_stick , p.water_resistance , p.screen_resolution , p.screen_Hz , p.build_location , p.build_area , p.building_floor , p.build_decoration , p.build_rooms_number , p.upload_date ,vft.vehicle_fuel_type_name , vc.vehicle_class , dt.digital_type , bt.build_type_name, a.start_day_time as startTime , pw.pay_way_name as payWay, s.state_name as state , c.category_name as Category, pw.pay_way_id ' , 'product p').then(()=>{
        return db.innerJoin('category_product cp','p','cp','product_id').then(()=>{
            return db.innerJoin('state s','p','s','state_id').then(()=>{
                return db.leftJoin('vehicle_fuel_type vft','p','vft','vehicle_fuel_type_id').then(()=>{
                    return db.leftJoin('vehicle_class vc','p','vc','vehicle_class_id').then(()=>{
                        return db.leftJoin('digital_type dt','p','dt','digital_type_id').then(()=>{
                            return db.leftJoin('build_type bt','p','bt','build_type_id').then(()=>{
                                return db.leftJoin('product_image pimag','p','pimag','product_id').then(()=>{
                                    return db.leftJoin('pay_way pw','p','pw','pay_way_id').then(()=>{
                                        return db.leftJoin('category c','cp','c','category_id').then(()=>{
                                            return db.leftJoin('auction a','p','a','product_id').then(()=>{
                                                return db.where('p.pay_way_id','=',payWay).then(()=>{
                                                    return db.otherOperation('and').then(()=>{
                                                        return db.otherWhere('p.product_id','=',prodactId).then(()=>{
                                                            return db.all().then(()=>{
                                                                return db.data
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const auctionProducts = async(payWay)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('p.product_id,p.product_name as title ,pimag.image as image , a.initial_price as price , p.product_brand , p.product_description as description , p.product_size , p.product_storage , p.product_summary , p.product_material , p.product_color , p.product_payment_date , p.product_description_state , p.vehicle_model , p.vehicle_horse_power , p.vehicle_cc , p.vehicle_structure , p.vehicle_manufacture_year , p.wireless_carrier , p.slot_of_card , p.battery , p.camera_pixels , p.RAM , p.vehicle_manufacture_country , p.vehicle_mileage , p.vehicle_interchange_partNumber , p.vehicle_gear_stick , p.water_resistance , p.screen_resolution , p.screen_Hz , p.build_location , p.build_area , p.building_floor , p.build_decoration , p.build_rooms_number , p.upload_date ,vft.vehicle_fuel_type_name , vc.vehicle_class , dt.digital_type , bt.build_type_name, a.start_day_time as startTime,a.end_day_time as endTime , pw.pay_way_name as payWay,pw.pay_way_id as payWayID , s.state_name as state , c.category_name as Category ' , 'product p').then(()=>{
        return db.innerJoin('category_product cp','p','cp','product_id').then(()=>{
            return db.innerJoin('state s','p','s','state_id').then(()=>{
                return db.leftJoin('vehicle_fuel_type vft','p','vft','vehicle_fuel_type_id').then(()=>{
                    return db.leftJoin('vehicle_class vc','p','vc','vehicle_class_id').then(()=>{
                        return db.leftJoin('digital_type dt','p','dt','digital_type_id').then(()=>{
                            return db.leftJoin('build_type bt','p','bt','build_type_id').then(()=>{
                                return db.leftJoin('product_image pimag','p','pimag','product_id').then(()=>{
                                    return db.leftJoin('pay_way pw','p','pw','pay_way_id').then(()=>{
                                        return db.leftJoin('category c','cp','c','category_id').then(()=>{
                                            return db.leftJoin('auction a','p','a','product_id').then(()=>{
                                                return db.innerJoin('review_product rp','p','rp','product_id').then(()=>{
                                                    return db.innerJoin('deposite d','a','d','auction_id').then(()=>{
                                                        return db.innerJoin('accept_particpation ap','d','ap','deposite_id').then(()=>{
                                                            return db.where('p.pay_way_id','=',payWay).then(()=>{
                                                                return db.otherOperation('and').then(()=>{
                                                                    return db.otherWhere('rp.acceptation','=','1').then(()=>{
                                                                        return db.and('p.sold','=','0').then(()=>{
                                                                            return db.and('d.percentage_id', '=', '1').then(()=>{
                                                                                return db.and('ap.acceptation', '=','1').then(()=>{
                                                                                    return db.all().then(()=>{
                                                                                        return db.data
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                    
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const ALLProducts = async()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('p.product_name as title ,pimag.image as image , p.product_id as id, p.product_price as price_of_instans , a.initial_price as price_of_auction , p.product_brand as brand , p.product_description as description , p.product_size , p.product_storage , p.product_summary , p.product_material , p.product_color , p.product_payment_date , p.product_description_state , a.start_day_time as startTime , a.end_day_time as endTime , pw.pay_way_name as payWay , s.state_name as state , c.category_name as Category' , 'product p').then(()=>{
        return db.innerJoin('category_product cp','p','cp','product_id').then(()=>{
            return db.innerJoin('state s','p','s','state_id').then(()=>{
                return db.leftJoin('vehicle_fuel_type vft','p','vft','vehicle_fuel_type_id').then(()=>{
                    return db.leftJoin('vehicle_class vc','p','vc','vehicle_class_id').then(()=>{
                        return db.leftJoin('digital_type dt','p','dt','digital_type_id').then(()=>{
                            return db.leftJoin('build_type bt','p','bt','build_type_id').then(()=>{
                                return db.leftJoin('product_image pimag','p','pimag','product_id').then(()=>{
                                    return db.leftJoin('pay_way pw','p','pw','pay_way_id').then(()=>{
                                        return db.leftJoin('category c','cp','c','category_id').then(()=>{
                                            return db.leftJoin('auction a','a','p','product_id').then(()=>{
                                                return db.innerJoin('review_product rp','p','rp','product_id').then(()=>{
                                                    return db.where('pimag.image_id','=','1').then(()=>{
                                                        return db.otherOperation('and').then(()=>{
                                                            return db.otherWhere('rp.acceptation','is','null').then(()=>{
                                                                return db.all().then(()=>{
                                                                    return db.data
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const ALLProductsInCategories = async()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('p.product_id, a.auction_id,p.product_name as title ,pimag.image as image , p.product_price as price, a.initial_price as price , p.product_brand , p.product_description as description , p.product_size , p.product_storage , p.product_summary , p.product_material , p.product_color , p.product_payment_date , p.product_description_state , p.vehicle_model , p.vehicle_horse_power , p.vehicle_cc , p.vehicle_structure , p.vehicle_manufacture_year , p.wireless_carrier , p.slot_of_card , p.battery , p.camera_pixels , p.RAM , p.vehicle_manufacture_country , p.vehicle_mileage , p.vehicle_interchange_partNumber , p.vehicle_gear_stick , p.water_resistance , p.screen_resolution , p.screen_Hz , p.build_location , p.build_area , p.building_floor , p.build_decoration , p.build_rooms_number , p.upload_date ,vft.vehicle_fuel_type_name , vc.vehicle_class , dt.digital_type , bt.build_type_name, a.START_DAY_TIME , a.END_DAY_TIME , a.END_LIVE_AUCTION  , pw.pay_way_name as payWay , s.state_name as state , c.category_name as Category' , 'product p').then(()=>{
        return db.innerJoin('category_product cp','p','cp','product_id').then(()=>{
            return db.innerJoin('state s','p','s','state_id').then(()=>{
                return db.leftJoin('vehicle_fuel_type vft','p','vft','vehicle_fuel_type_id').then(()=>{
                    return db.leftJoin('vehicle_class vc','p','vc','vehicle_class_id').then(()=>{
                        return db.leftJoin('digital_type dt','p','dt','digital_type_id').then(()=>{
                            return db.leftJoin('build_type bt','p','bt','build_type_id').then(()=>{
                                return db.innerJoin('product_image pimag','p','pimag','product_id').then(()=>{
                                    return db.innerJoin('pay_way pw','p','pw','pay_way_id').then(()=>{
                                        return db.innerJoin('category c','cp','c','category_id').then(()=>{
                                            return db.innerJoin('review_product rp','p','rp','product_id').then(()=>{
                                                return db.leftJoin('auction a','p','a','product_id').then(()=>{
                                                    return db.leftJoin('deposite d','a','d','auction_id').then(()=>{
                                                        return db.leftJoin('accept_particpation ap','d','ap','deposite_id').then(()=>{
                                                            return db.where('rp.acceptation', '=', '1').then(()=>{
                                                                return db.and('p.sold', '=', '0').then(()=>{
                                                                    return db.and('pimag.IMAGE_ID', '=', '1').then(()=>{
                                                                        return db.otherOperation('and').then(()=>{
                                                                            return db.openArch().then(()=>{
                                                                                return db.otherWhere('d.percentage_id', '=', '1').then(()=>{
                                                                                    return db.otherOperation('or').then(()=>{
                                                                                        return db.otherWhere('d.percentage_id', 'is', 'null').then(()=>{
                                                                                            return db.closeArch().then(()=>{
                                                                                                return db.otherOperation('and').then(()=>{
                                                                                                    return db.openArch().then(()=>{
                                                                                                        return db.otherWhere('ap.acceptation', '=', '1').then(()=>{
                                                                                                            return db.otherOperation('or').then(()=>{
                                                                                                                return db.otherWhere('ap.acceptation', 'is', 'null').then(()=>{
                                                                                                                    return db.closeArch().then(()=>{
                                                                                                                        return db.all().then(()=>{
                                                                                                                            return db.data
                                                                                                                        })
                                                                                                                    })
                                                                                                                })
                                                                                                            })
                                                                                                        })
                                                                                                    })
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const ALLProductsDetails = async(productId)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('p.product_name as title , p.product_id , a.auction_id ,p.clint_id ,pimag.image as image , p.product_price as price_of_instans , a.initial_price as price_of_auction , p.product_brand , p.product_description as description , p.product_size , p.product_storage , p.product_summary , p.product_material , p.product_color , p.product_payment_date , p.product_description_state , p.vehicle_model , p.vehicle_horse_power , p.vehicle_cc , p.vehicle_structure , p.vehicle_manufacture_year , p.vehicle_manufacture_country , p.vehicle_mileage , p.vehicle_interchange_partNumber , p.vehicle_gear_stick , p.water_resistance , p.screen_resolution , p.screen_Hz , p.build_location , p.build_area , p.building_floor , p.build_decoration , p.build_rooms_number , p.upload_date ,vft.vehicle_fuel_type_name , vc.vehicle_class , dt.digital_type , bt.build_type_name, a.start_day_time as startTime , a.end_day_time as endTime , pw.pay_way_name as payWay , s.state_name as state , c.category_name as Category ' , 'product p').then(()=>{
        return db.innerJoin('category_product cp','p','cp','product_id').then(()=>{
            return db.innerJoin('state s','p','s','state_id').then(()=>{
                return db.leftJoin('vehicle_fuel_type vft','p','vft','vehicle_fuel_type_id').then(()=>{
                    return db.leftJoin('vehicle_class vc','p','vc','vehicle_class_id').then(()=>{
                        return db.leftJoin('digital_type dt','p','dt','digital_type_id').then(()=>{
                            return db.leftJoin('build_type bt','p','bt','build_type_id').then(()=>{
                                return db.leftJoin('product_image pimag','p','pimag','product_id').then(()=>{
                                    return db.leftJoin('pay_way pw','p','pw','pay_way_id').then(()=>{
                                        return db.leftJoin('category c','cp','c','category_id').then(()=>{
                                            return db.leftJoin('auction a','a','p','product_id').then(()=>{
                                                return db.where('p.product_id','=',`${productId}`).then(()=>{
                                                    return db.all().then(()=>{
                                                        return db.data
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const DepositeData = async ()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('d.deposite_id,d.deposite_recipt as recipt , u.user_first_last_name as clint_name , d.auction_id as auction_number , p.product_name as product_name , a.initial_price as price , pr.percentage as the_percentage , (a.initial_price * pr.percentage) as deposit_price','deposite d , clint c , users u , product p , percentage pr , auction a , accept_particpation ap').then(()=>{
        return db.where('p.product_id','=','a.product_id').then(()=>{
            return db.and('d.clint_id','=','c.clint_id').then(()=>{
                return db.and('d.percentage_id','=','pr.percentage_id').then(()=>{
                    return db.and('c.user_id','=','u.user_id').then(()=>{
                        return db.and('d.auction_id','=','a.auction_id').then(()=>{
                            return db.and('ap.deposite_id','=','d.deposite_id').then(()=>{
                                return db.and('ap.acceptation','is','null').then(()=>{
                                    return db.and('d.deposite_recipt','!=',`'null'`).then(()=>{
                                        return db.all().then(()=>{
                                            return db.data
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const UsersData = async()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('u.user_id,u.gender,u.user_first_last_name as userName , u.user_email as email , u.got_banned as Status , u.user_phone1 as phone_1 , u.user_phone2 as phone_2 , c.category_check as Category_check , c.terms_check as terms_check , u.user_ssn as SSN , u.date_created as created_date , u.user_birthday as birthdate , u.user_address as address','users u').then(()=>{
        return db.innerJoin('clint c','u','c','user_id').then(()=>{
            return db.all().then(()=>{
                return db.data
            })
        })
    })
}
const userDataByClientId = async(ClientID)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('u.user_id,u.user_first_last_name as userName , u.user_email as email , u.got_banned as Status , u.user_phone1 as phone_1 , u.user_phone2 as phone_2 , c.category_check as Category_check , c.terms_check as terms_check , u.user_ssn as SSN , u.date_created as created_date , u.user_birthday as birthdate , u.user_address as address','users u').then(()=>{
        return db.innerJoin('clint c','u','c','user_id').then(()=>{
            return db.where('c.clint_id ','=', `${ClientID}`).then(()=>{
                return db.all().then(()=>{
                    return db.data
                })
            })
        })
    })
}
const userDataById = async(userId)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('u.user_id,u.user_first_last_name as userName , u.user_email as email , u.got_banned as Status , u.user_phone1 as phone_1 , u.user_phone2 as phone_2 , c.category_check as Category_check , c.terms_check as terms_check , u.user_ssn as SSN , u.date_created as created_date , u.user_birthday as birthdate , u.user_address as address','users u').then(()=>{
        return db.innerJoin('clint c','u','c','user_id').then(()=>{
            return db.where('u.user_id ','=', `${userId}`).then(()=>{
                return db.all().then(()=>{
                    return db.data
                })
            })
        })
    })
}
const updateUserBlocks = (state,userId)=>{
    db.data.splice(0,(db.data.length+1))
    return db.update('users',`got_banned = ${state}`).then(()=>{
        return db.where('user_id','=',`${userId}`).then(()=>{
            return db.execute().then(()=>{
                return db.data
            })
        })
    })
}   
const AdminData = async()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('a.manage_id, u.user_email , u.got_banned,u.user_phone1,u.user_phone2,a.admin_image as image , u.user_id as id ,u.user_first_last_name as admin_name,u.user_name','admin a , users u').then(()=>{
        return db.where('a.user_id','=','u.user_id').then(()=>{
            return db.all().then(()=>{
                return db.data
            })
        })
    })
}
const AdminDataByUserName = async(username)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('a.manage_id, u.user_email , u.got_banned,u.user_phone1,u.user_phone2,a.admin_image as image , u.user_id as id ,u.user_first_last_name as admin_name','admin a , users u').then(()=>{
        return db.where('a.user_id','=','u.user_id').then(()=>{
            return db.and('u.user_name', '=', `'${username}'`).then(()=>{
                return db.all().then(()=>{
                    return db.data
                })
            })
        })
    })
}
const NewUsers = async()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('u.user_id,u.user_first_last_name as userName , u.user_email as email , u.got_banned as Status , u.user_phone1 as phone_1 , u.user_phone2 as phone_2 , c.category_check as Category_check , c.terms_check as terms_check , u.user_ssn as SSN , u.date_created as created_date , u.user_birthday as birthdate , u.user_address as address','users u').then(()=>{
        return db.innerJoin('clint c','u','c','user_id').then(()=>{
            return db.where('ROWNUM','<=','4').then(()=>{
                return db.orderBY('u.user_id','DESC').then(()=>{
                    return db.all().then(()=>{
                        return db.data
                    })
                })
            })
        })
    })
}
const allTransactionAuction = async()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select(`p.product_id
        ,p.product_name AS title
        ,pimag.image AS image,pw.pay_way_name AS payWay
        ,s.state_name AS state,a.initial_price AS initial_price_of_auction,
        a.start_day_time AS startTime,
        MAX(CASE WHEN a.end_day_time is null THEN b.BID_TIME +  (INTERVAL '1' MINUTE) * a.END_LIVE_AUCTION ELSE a.end_day_time END) AS endTime,
        u2.user_first_last_name AS saller_name,
        MAX(CASE WHEN u1.user_first_last_name = u2.user_first_last_name THEN NULL ELSE u1.user_first_last_name END) AS winner_name,
        MAX(b.bid_money) AS last_price_of_auction,
        a.auction_id AS auction_number `,'auction a').then(()=>{
        return db.leftJoin('deposite d','a','d','auction_id').then(()=>{
            return db.leftJoin('accept_particpation ap','d','ap','deposite_id').then(()=>{
                return db.leftJoin('bid b','d','b','deposite_id').then(()=>{
                    return db.leftJoin('clint c1','d','c1','clint_id').then(()=>{
                        return db.leftJoin('users u1','c1','u1','user_id').then(()=>{
                            return db.leftJoin('product p','a','p','product_id').then(()=>{
                                return db.leftJoin('clint c2','p','c2','clint_id').then(()=>{
                                    return db.leftJoin('users u2','c2','u2','user_id').then(()=>{
                                        return db.leftJoin('state s','p','s','state_id').then(()=>{
                                            return db.leftJoin('product_image pimag','p','pimag','product_id').then(()=>{
                                                return db.leftJoin('pay_way pw','p','pw','pay_way_id').then(()=>{
                                                    return db.leftJoin('percentage per','d','per','percentage_id').then(()=>{
                                                        return db.where('pimag.image_id', '=', '1').then(()=>{
                                                            return db.otherOperation('AND').then(()=>{
                                                                return db.openArch().then(()=>{
                                                                    return db.otherWhere('b.bid_money', 'IN','').then(()=>{
                                                                        return db.openOtherSelect('MAX(b.bid_money)','bid b').then(()=>{
                                                                            return db.innerJoin('deposite d','b','d','deposite_id').then(()=>{
                                                                                return db.innerJoin('auction a','d','a','auction_id').then(()=>{
                                                                                    return db.groupBy('a.auction_id').then(()=>{
                                                                                        return db.closeOtherSelect().then(()=>{
                                                                                            return db.otherOperation('OR').then(()=>{
                                                                                                return db.openArch().then(()=>{
                                                                                                    return db.otherWhere('d.percentage_id', '=', '1').then(()=>{
                                                                                                        return db.and('ap.acceptation', '=', '1').then(()=>{
                                                                                                            return db.closeArch().then(()=>{
                                                                                                                return db.closeArch().then(()=>{
                                                                                                                    return db.groupBy('p.product_id, p.product_name, pimag.image, pw.pay_way_name, s.state_name, a.initial_price, a.start_day_time, a.end_day_time, u2.user_first_last_name, a.auction_id').then(()=>{
                                                                                                                        return db.orderBY('a.auction_id','').then(()=>{
                                                                                                                            return db.all().then(()=>{
                                                                                                                                return db.data
                                                                                                                            })
                                                                                                                        })
                                                                                                                    })
                                                                                                                })
                                                                                                            })
                                                                                                        })
                                                                                                    })
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const insertAdmin = (id,image,manager,workStartDay,userId) =>{
    db.data.splice(0,(db.data.length+1))
        return db.insert('ADMIN',
        'admin_id, admin_image, manage_id, recruitment_day, user_id',
        `${id},'${image}','${manager}',TO_DATE('${workStartDay}', 'YYYY-MM-DD'),'${userId}'`).then(()=>{
            return db.execute().then(()=>{
                return(db.data)
            })
        })
}
const ProductBid = (productId,paywayId)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('p.product_id,b.bid_id,c.clint_id,p.clint_id as ownerProduct,u.user_first_last_name as name , u.user_email , u.user_phone1, b.bid_money as money , b.bid_time','bid b , deposite d , auction a , clint c , users u , product p , pay_way py').then(()=>{
        return db.where('d.clint_id','=','c.clint_id').then(()=>{
            return db.otherOperation('and').then(()=>{
                return db.otherWhere('d.deposite_id','=','b.deposite_id ').then(()=>{
                    return db.otherOperation('and').then(()=>{
                        return db.otherWhere('u.user_id','=','c.user_id').then(()=>{
                            return db.otherOperation('and').then(()=>{
                                return db.otherWhere('d.auction_id','=','a.auction_id ').then(()=>{
                                    return db.otherOperation('and').then(()=>{
                                        return db.otherWhere('p.product_id','=','a.product_id').then(()=>{
                                            return db.otherOperation('and').then(()=>{
                                                return db.otherWhere('py.pay_way_id','=','p.pay_way_id').then(()=>{
                                                    return db.otherOperation('and').then(()=>{
                                                        return db.otherWhere('p.pay_way_id','=',`${paywayId}`).then(()=>{
                                                            return db.otherOperation('and').then(()=>{
                                                                return db.otherWhere('p.product_id','=',productId).then(()=>{
                                                                    return db.orderBY('b.bid_time','DESC').then(()=>{
                                                                        return db.all().then(()=>{
                                                                            return db.data
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const actionProduct = (productId,action)=>{
    db.data.splice(0,(db.data.length+1))
    return db.update('review_product',`review_product.acceptation = ${action}`).then(()=>{
        return db.where('product_id','=',productId).then(()=>{
            return db.execute().then(()=>{
                return db.data
            })
        })
    })
}
const actionDeposit = (depositId,action,maassage,date,username)=>{
    db.data.splice(0,(db.data.length+1))
    if(action === 1){
        return db.update('accept_particpation a',`a.acceptation = ${action}, a.accept_massage = '${maassage}',a.date_of_action = TO_DATE('${date}', 'YYYY-MM-DD HH24:MI:SS'),a.admin_id = (SELECT a.admin_id FROM users u inner JOIN admin a on u.user_id = a.user_id where u.user_name = '${username}'), a.seen = 0 `).then(()=>{
            return db.where('deposite_id','=',depositId).then(()=>{
                return db.execute().then(()=>{
                    return db.data
                })
            })
        })
    }else{
        return db.update('accept_particpation a',`a.acceptation = ${action}, a.refuse_reason = '${maassage}',a.date_of_action = TO_DATE('${date}', 'YYYY-MM-DD HH24:MI:SS'),a.admin_id = (SELECT a.admin_id FROM users u inner JOIN admin a on u.user_id = a.user_id where u.user_name = '${username}'), a.seen = 0 `).then(()=>{
            return db.where('deposite_id','=',depositId).then(()=>{
                return db.execute().then(()=>{
                    return db.data
                })
            })
        })
    }
}
const resonRefuse = (depositId,report)=>{
    db.data.splice(0,(db.data.length+1))
    return db.update('accept_particpation',`accept_particpation.refuse_reason = '${report}'`).then(()=>{
        return db.where('deposite_id','=',depositId).then(()=>{
            return db.execute().then(()=>{
                return db.data
            })
        })
    })
}
const userDataByUserName = (username) =>{
    db.data.splice(0,(db.data.length+1))
    return db.select('c.clint_id, u.user_first_last_name,u.gender,u.user_email,u.user_address, u.user_birthday, u.user_phone1, u.user_phone2,u.user_name,u.date_created,u.user_ssn,u.user_id,u.user_password','users u').then(()=>{
        return db.innerJoin('clint c','u','c','user_id').then(()=>{
            return db.where('u.user_name','=',`'${username}'`).then(()=>{
                return db.all().then(()=>{
                    return db.data
                })
            })
        })
    })
}
const updateUserData = (userFullName,userEmail,userAddress,userPhone1,userPhone2)=>{
    db.data.splice(0,(db.data.length+1))
    return db.update('users u',
    `${userFullName !== '' ? userEmail!== ''|| userAddress!== '' || userPhone1!== '' || userPhone2!== '' ?   `u.user_first_last_name =  '${userFullName}',` : `u.user_first_last_name =  '${userFullName}'` : ''}
    ${userEmail !== '' ? userAddress!== '' || userPhone1!== '' || userPhone2!== '' ? `u.user_email = '${userEmail}',`:`u.user_email = '${userEmail}'` :''}
    ${userAddress !== '' ? userPhone1!== '' || userPhone2!== '' ? `u.user_address = '${userAddress}',`:`u.user_address = '${userAddress}'`:''}
    ${userPhone1 !== '' ? userPhone2!== '' ? `u.user_phone1 = '${userPhone1}',`: `u.user_phone1 = '${userPhone1}'` :''}
    ${userPhone2 !== '' ? `u.user_phone2 = '${userPhone2}'`:''}`).then(()=>{
        return db.where('u.user_id', '=', '51').then(()=>{
            return db.execute().then(()=>{
                return db.data
            })
        })
    })
}
const permissionForAdmin = (username,permissionName)=>{
    return db.insert('admin_permission', 'admin_id , permission_id', `(SELECT admin.admin_id FROM admin inner JOIN users on admin.user_id = users.user_id where users.user_name = '${username}')
    ,(SELECT permission.permission_id FROM permission WHERE permission.permission_name = '${permissionName}')`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const removeAdminPermintionByName = (username)=>{
    db.data.splice(0,(db.data.length+1))
    return db.remove('admin_permission ap').then(()=>{
        return db.where('ap.admin_id','=','').then(()=>{
            return db.openOtherSelect('admin.admin_id','admin').then(()=>{
                return db.innerJoin('users u','admin','u','user_id').then(()=>{
                    return db.where('u.user_name','=',`'${username}'`).then(()=>{
                        return db.closeOtherSelect().then(()=>{
                            return db.execute().then(()=>{
                                return db.data
                            })
                        })
                    })
                })
            })
        })
    })
}
const ownerAdminPermission = (name) =>{
    db.data.splice(0,(db.data.length+1))
    return db.select('p.permission_name','permission p').then(()=>{
        return db.innerJoin('admin_permission ap','p','ap','permission_id').then(()=>{
            return db.innerJoin('admin a','ap','a','admin_id').then(()=>{
                return db.innerJoin('users u','a','u','user_id').then(()=>{
                    return db.where('u.user_name','=',`'${name}'`).then(()=>{
                        return db.all().then(()=>{
                            return db.data
                        })
                    })
                })
            })
        })
    })
}
const buyerPersantge = () =>{
    return db.select('percentage','percentage').then(()=>{
        return db.where('percentage_name', '=' , "'Buyer'").then(()=>{
            return db.all().then(()=>{
                return db.data
            })
        })
    })
}
const sellerPersantge = () =>{
    return db.select('percentage','percentage').then(()=>{
        return db.where('percentage_name', '=' , "'Buyer'").then(()=>{
            return db.all().then(()=>{
                return db.data
            })
        })
    })
}
const BuyerPersantge = () =>{
    return db.select('percentage','percentage').then(()=>{
        return db.where('percentage_name', '=' , "'Seller'").then(()=>{
            return db.all().then(()=>{
                return db.data
            })
        })
    })
}
const getClientId = (username) =>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('c.clint_id','clint c').then(()=>{
        return db.innerJoin('users u','c','u','user_id').then(()=>{
            return db.where('u.user_name', '=', `'${username}'`).then(()=>{
                return db.all().then(()=>{
                    return db.data
                })
            })
        })
    })
}
const getAuctionId = async(productId) =>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('auction_id','auction').then(()=>{
        return db.where('product_id', '=', `${productId}`).then(()=>{
            return db.all().then(()=>{
                return db.data
            })
        })
    })
}
const insertDeposte = (maxId,price,recite,clint_id,presentageId,auction_id)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.insert('deposite',
    'deposite_id,deposite_price,deposite_recipt,percentage_id,clint_id,auction_id',
    `${maxId},${price},'${recite}',${presentageId},${clint_id},${auction_id}`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const updateDeposte = (depositID,pathofData)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.update('deposite d',
    `deposite_recipt = '${pathofData}'`).then(()=>{
        return db.where('d.deposite_id' ,'=',`${depositID}`).then(()=>{
            return db.execute().then(()=>{
                return db.data
            })
        })
    })
}
const insertAcceptParticipation = (partispationId,depositeId)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.insert('accept_particpation','accept_particpation_id,admin_id,deposite_id',`${partispationId},1,${depositeId}`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const checkDeposite = (auctionId,username)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('u.user_first_last_name , ap.acceptation , ap.refuse_reason , ap.accept_massage,p.product_id','deposite d').then(()=>{
        return db.innerJoin('auction a','d','a','auction_id').then(()=>{
            return db.innerJoin('product p','a','p','product_id').then(()=>{
                return db.innerJoin('clint c','d','c','clint_id').then(()=>{
                    return db.innerJoin('accept_particpation ap','d','ap','deposite_id').then(()=>{
                        return db.innerJoin('users u','c','u','user_id').then(()=>{
                            return db.where('d.PERCENTAGE_ID', '=', '2').then(()=>{
                                return db.and('a.auction_id', '=', `${auctionId}`).then(()=>{
                                    return db.and('u.USER_NAME', '=', `'${username}'`).then(()=>{
                                        return db.orderBY('ap.accept_particpation_id', 'desc').then(()=>{
                                            return db.all().then(()=>{
                                                return db.data
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const checkDepositeAccept = (auctionId,username)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('u.user_first_last_name , ap.acceptation, d.deposite_id','deposite d').then(()=>{
        return db.innerJoin('auction a','d','a','auction_id').then(()=>{
            return db.innerJoin('clint c','d','c','clint_id').then(()=>{
                return db.innerJoin('accept_particpation ap','d','ap','deposite_id').then(()=>{
                    return db.innerJoin('users u','c','u','user_id').then(()=>{
                        return db.where('d.PERCENTAGE_ID', '=', '2').then(()=>{
                            return db.and('a.auction_id', '=', `${auctionId}`).then(()=>{
                                return db.and('u.USER_NAME', '=', `'${username}'`).then(()=>{
                                    return db.and('ap.acceptation', '=', '1').then(()=>{
                                        return db.all().then(()=>{
                                            return db.data
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const insertNewBid = (id,price,currentTime,depositeId) =>{
    db.data.splice(0,(db.data.length + 1))
    return db.insert('bid','bid_id,bid_money,bid_time,deposite_id',`${id},${price},TO_DATE('${currentTime}', 'YYYY-MM-DD HH24:MI:SS'),${depositeId}`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const checkIfUserBid = (depositeId,username)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('b.bid_id , b.bid_money , b.bid_time, b.deposite_id','bid b').then(()=>{
        return db.innerJoin('deposite d','b','d','deposite_id').then(()=>{
            return db.innerJoin('clint c','d','c','clint_id').then(()=>{
                return db.where('b.deposite_id', '=', depositeId).then(()=>{
                    return db.and('c.user_id', '=','').then(()=>{
                        return db.openOtherSelect('users.user_id','users').then(()=>{
                            return db.where('users.user_name', '=' ,`'${username}'`).then(()=>{
                                return db.closeOtherSelect().then(()=>{
                                    return db.all().then(()=>{
                                        return db.data
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const updateBid = (money,time,depositeId,bidId)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.update('bid',`bid_money = ${money},bid_time = TO_DATE('${time}', 'YYYY-MM-DD HH24:MI:SS')`).then(()=>{
        return db.where('deposite_id', '=', `${depositeId}`).then(()=>{
            return db.and('bid_id', '=', `${bidId}`).then(()=>{
                return db.execute().then(()=>{
                    return db.data
                })
            })
        })
    })
}
const updateSoldBid = (productId)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.update('product',` sold = 1 `).then(()=>{
            return db.where('product_id', '=', `${productId}`).then(()=>{
                return db.execute().then(()=>{
                    return db.data
                })
            })
        })
    
}
const ownerOfProduct = (productId)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('c.clint_id,u.user_first_last_name, u.user_email, u.user_phone1, p.product_name',` users u `).then(()=>{
        return db.innerJoin('clint c','u','c','user_id').then(()=>{
            return db.innerJoin('product p','c','p','clint_id').then(()=>{
                return db.where('p.product_id', '=', `${productId}`).then(()=>{
                    return db.all().then(()=>{
                        return db.data
                    })
                })
            })
        })
    })
    
}
const contactEmail = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure: true,
    auth: {
        user: "auctionlive0@gmail.com",
        pass: 'pjfygdunsgtjsadz'
    }
});
const userProduct = (userName)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('ap.accept_particpation_id,ap.acceptation as depositAcceptation ,d.deposite_id , rp.acceptation , rp.seen as reviewSeen , ap.seen as depositSeen, p.product_id,p.upload_date,rp.refuse_reason,ap.refuse_reason as acceptPartRefReason, p.product_name , pi.image, d.deposite_recipt as recipt , a.initial_price , d.deposite_price , pe.percentage , pw.pay_way_name','product p').then(()=>{
        return db.innerJoin('review_product rp','p','rp','product_id').then(()=>{
            return db.innerJoin('product_image pi','p','pi','product_id').then(()=>{
                return db.innerJoin('pay_way pw','p','pw','pay_way_id').then(()=>{
                    return db.innerJoin('auction a','p','a','product_id').then(()=>{
                        return db.innerJoin('deposite d','a','d','auction_id').then(()=>{
                            return db.innerJoin('percentage pe','d','pe','percentage_id').then(()=>{
                                return db.innerJoin('accept_particpation ap','d','ap','deposite_id').then(()=>{
                                    return db.innerJoin('clint c','p','c','clint_id').then(()=>{
                                        return db.innerJoin('users u','c','u','user_id').then(()=>{
                                            return db.where('pi.image_id', '=', '1').then(()=>{
                                                return db.and('d.percentage_id', '=', '1').then(()=>{
                                                    return db.and('', '', '').then(()=>{
                                                        return db.openArch().then(()=>{
                                                            return db.otherWhere('ap.acceptation',' is', 'null').then(()=>{
                                                                return db.otherOperation('or').then(()=>{
                                                                    return db.otherWhere('ap.acceptation', '=', '0').then(()=>{
                                                                        return db.closeArch().then(()=>{
                                                                            return db.otherOperation('and').then(()=>{
                                                                                return db.otherWhere('u.user_id', '=','').then(()=>{
                                                                                    return db.openOtherSelect('user_id','users').then(()=>{
                                                                                        return db.where('users.user_name','=',`'${userName}'`).then(()=>{
                                                                                            return db.closeOtherSelect().then(()=>{
                                                                                                return db.all().then(()=>{
                                                                                                    return db.data
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const clientInDeposite = (productid)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('d.clint_id','product p').then(()=>{
        return db.innerJoin('auction a','p','a','product_id').then(()=>{
            return db.innerJoin('deposite d','a','d','auction_id').then(()=>{
                return db.innerJoin('accept_particpation ap','d','ap','deposite_id').then(()=>{
                    return db.where('ap.acceptation', '=', '1').then(()=>{
                        return db.and('p.product_id', '=', `${productid}`).then(()=>{
                            return db.and('d.PERCENTAGE_ID','=','2').then(()=>{
                                return db.all().then(()=>{
                                    return db.data
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const insertReviewReport = (reviewReportId,reviewReport,currentDate,username,reportId)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.insert('review_report','review_report_id,review_report,review_report_date,seen,admin_id,report_id',
    `${reviewReportId},'${reviewReport}',TO_DATE('${currentDate}', 'YYYY-MM-DD HH24:MI:SS'),0,(SELECT a.admin_id FROM admin a where a.user_id = (SELECT u.user_id FROM users u where u.user_name = '${username}')),${reportId}`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const insertRateToSystem = (reportId,clientID,currentDate)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.insert('report','report_id,bid_id,clint_id,report_date,PRODUCT_ID',
    `${reportId},null,${clientID},TO_DATE('${currentDate}', 'YYYY-MM-DD HH24:MI:SS'),null`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const insertRateDetailsToSystem = async(reportId,commonReportId)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.insert('final_report','REPORT_ID,common_report_id,REPORT_DESCRIPTION,RATEING',
    `${reportId},${commonReportId},null,null`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const commenReportIdsType = (rateOrSagId) =>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('common_report_id','common_report').then(()=>{
        return db.where('rep_rat_sugg_id' ,'=' ,rateOrSagId).then(()=>{
            return db.all().then(()=>{
                return db.data
            })
        })
    })
}
const insertRateSeller = (reportId,clientID,currentDate,bid_id)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.insert('report','report_id,bid_id,clint_id,report_date,PRODUCT_ID',
    `${reportId},${bid_id},${clientID},TO_DATE('${currentDate}', 'YYYY-MM-DD HH24:MI:SS'),null`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const insertRateBuyer = (reportId,clientID,currentDate,PRODUCT_ID)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.insert('report','report_id,bid_id,clint_id,report_date,PRODUCT_ID',
    `${reportId},null,${clientID},TO_DATE('${currentDate}', 'YYYY-MM-DD HH24:MI:SS'),${PRODUCT_ID}`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const getDataRate = (username)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('fr.report_id , fr.common_report_id , r.report_date , r.done , r.clint_id , r.bid_id , cr.common_report_id ,cr.rep_rat_sugg_id , rrs.rep_rat_sugg ,cr.common_report','final_report fr').then(()=>{
        return db.innerJoin('report r','fr','r','report_id').then(()=>{
            return db.innerJoin('common_report cr','fr','cr','common_report_id').then(()=>{
                return db.innerJoin('rep_rat_sugg rrs','cr','rrs','rep_rat_sugg_id').then(()=>{
                    return db.innerJoin('clint c','r','c','clint_id').then(()=>{
                        return db.innerJoin('users u','c','u','user_id').then(()=>{
                            return db.where('fr.rateing', 'is', 'null').then(()=>{
                                return db.and('fr.report_description', 'is', 'null').then(()=>{
                                    return db.and('c.user_id', '=','').then(()=>{
                                        return db.openOtherSelect('user_id','users').then(()=>{
                                            return db.where('user_name', '=', `'${username}'`).then(()=>{
                                                return db.closeOtherSelect().then(()=>{
                                                    return db.all().then(()=>{
                                                        return db.data
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const getReportData = (userID)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('*','final_report fr').then(()=>{
        return db.innerJoin('report r','fr','r','report_id').then(()=>{
            return db.innerJoin('review_report rr','r','rr','report_id').then(()=>{
                return db.innerJoin('common_report cr','fr','cr','common_report_id').then(()=>{
                    return db.innerJoin('rep_rat_sugg rrs','cr','rrs','rep_rat_sugg_id').then(()=>{
                        return db.where('rrs.rep_rat_sugg_id', '=', '1').then(()=>{
                            return db.and('r.clint_id', '=','').then(()=>{
                                return db.openOtherSelect('c.clint_id','clint c').then(()=>{
                                    return db.where('c.user_id', '=', `${userID}`).then(()=>{
                                        return db.closeOtherSelect().then(()=>{
                                            return db.orderBY('r.report_date','').then(()=>{
                                                return db.all().then(()=>{
                                                    return db.data
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const updateFinalReport = (rateValue,reportId,commonReportId)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.update('final_report',`rateing = ${rateValue}`).then(()=>{
        return db.where('common_report_id' ,'=', `${commonReportId}`).then(()=>{
            return db.and('report_id', '=', `${reportId}`).then(()=>{
                return db.execute().then(()=>{
                    return db.data
                })
            })
        })
    })
}
const updateFinalReportText = (userOpinion,reportId,commonReportId)=>{
    db.data.splice(0,(db.data.length + 1))
    return db.update('final_report',`report_description = '${userOpinion}'`).then(()=>{
        return db.where('common_report_id' ,'=', `${commonReportId}`).then(()=>{
            return db.and('report_id', '=', `${reportId}`).then(()=>{
                return db.execute().then(()=>{
                    return db.data
                })
            })
        })
    })
}
// (SELECT c.clint_id FROM clint c INNER join users u on u.user_id = c.user_id where u.user_name = '123')
const insertInstantProduct = (id,name,matrial,brand,desc,summery,HomeDecoration,color,price
    ,SIM,size,storage,date,state,DescribeState,carCC,CarModel,CarMile,HorsePower
    ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
    ,FuelType,BuldingArea,TypeBuilding,UploadDate,BuildingFloor,NumbersOfroom
    ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay,client)=>{
        db.data.splice(0,(db.data.length+1))
        return db.insert('product',
        'product_id , product_name , product_price ,product_brand , product_description , product_size , product_storage , product_summary , product_material , product_color , product_payment_date , product_description_state , vehicle_model , vehicle_horse_power , vehicle_cc , vehicle_structure , vehicle_manufacture_year , vehicle_manufacture_country , vehicle_mileage , vehicle_interchange_partNumber , vehicle_gear_stick , water_resistance , screen_resolution , screen_Hz , wireless_carrier , slot_of_card , battery , camera_pixels , RAM , build_location , build_area , building_floor , build_decoration , build_rooms_number , upload_date , vehicle_fuel_type_id , vehicle_class_id , digital_type_id , build_type_id , sold , state_id , pay_way_id, clint_id'
        ,`${id},'${name}',${price},'${brand}','${desc}','${size}','${storage}','${summery}','${matrial}','${color}',${date !== null ? `TO_DATE ('${date}','YYYY-MM-DD')` : null},'${DescribeState}','${CarModel}',${HorsePower},${carCC},'${Structure}','${ManifuctureYear}','${ManifuctureCountry}',${CarMile},${Interchange},${GearStick},${WaterResis},'${ScreenRes}',${ScreenHz},'${Wireless}','${SIM}','${Battery}','${Camera}','${Ram}','${LocationOfBuilding}',${BuldingArea},${BuildingFloor},'${HomeDecoration}',${NumbersOfroom},TO_DATE('${UploadDate}','YYYY-MM-DD HH24:MI:SS'),${FuelType},${Class},${DigitalType},${TypeBuilding},0,${state},${payWay},(SELECT c.clint_id FROM clint c INNER join users u on u.user_id = c.user_id where u.user_name = '${client}')`).then(()=>{
            return db.execute().then(()=>{
                return db.data
            })
        })
}
const insertAuctionProduct = (id,StartAuction,EndAuction,InitialPrice,WaitingTime,productId)=>{
    db.data.splice(0,(db.data.length+1))
    return db.insert('auction',
    'auction_id , start_day_time , end_day_time , initial_price , end_live_auction , product_id'
    ,`${id},TO_DATE ('${StartAuction}','YYYY-MM-DD HH24:MI'),${EndAuction !== null ? `TO_DATE ('${EndAuction}','YYYY-MM-DD HH24:MI')` : null},${InitialPrice},${WaitingTime},${productId}`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const insertCategoryOfProduct=(idProduct,CategoryName)=>{
    db.data.splice(0,(db.data.length+1))
    return db.insert('category_product','product_id , category_id',`${idProduct},(SELECT c.category_id FROM category c where c.category_name = '${CategoryName}')`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}
const insertReviewProduct=(id, product_id)=>{
    db.data.splice(0,(db.data.length+1))
    return db.insert('review_product',
    'review_product_id , acceptation , seen , refuse_reason , accept_massage , DATE_OF_ACTION , admin_id , product_id',
    `${id},null,0,null,null,null,null,${product_id}`).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}

// reports selects
const getEmployeeData = ()=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('a.user_id, a.admin_id, u.user_first_last_name, u.user_email, a.manage_id, u2.user_first_last_name, a.recruitment_day, a.leaving_day, u.user_ssn, u.user_phone1, u.user_phone2, u.user_address, u.gender, u.user_birthday, SUM(s.salary) AS total_salary',` admin a `).then(()=>{
        return db.innerJoin('users u','a','u','user_id').then(()=>{
            return db.innerJoin('salary s','a','s','admin_id').then(()=>{
                return db.leftJoinWithDiffColumn('admin a2','a','a2','manage_id','admin_id').then(()=>{
                    return db.leftJoin('users u2','a2','u2','user_id').then(()=>{
                        return db.where('EXTRACT(YEAR FROM s.salary_day)', '=', '2023').then(()=>{
                            return db.and('','','').then(()=>{
                                return db.openArch().then(()=>{
                                    return db.otherWhere('EXTRACT(month FROM s.salary_day)', '=', '6').then(()=>{
                                        return db.otherOperation('or').then(()=>{
                                            return db.otherWhere('EXTRACT(month FROM s.salary_day)', '=', '5').then(()=>{
                                                return db.closeArch().then(()=>{
                                                    return db.groupBy('a.user_id, a.admin_id, u.user_first_last_name, u.user_email, a.manage_id, u2.user_first_last_name, a.recruitment_day, a.leaving_day, u.user_ssn, u.user_phone1, u.user_phone2, u.user_address, u.gender, u.user_birthday').then(()=>{
                                                        return db.orderBY('a.admin_id','').then(()=>{
                                                            return db.all().then(()=>{
                                                                return db.data
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                                
                            })
                        })
                    })
                })
            })
        })
    })
}
const totalSalaryPay = ()=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select('EXTRACT(MONTH FROM s.SALARY_DAY) AS month, sum(s.SALARY) AS total_SALARY','salary s').then(()=>{
        return db.innerJoin('admin a','s','a','admin_id').then(()=>{
            return db.where('EXTRACT(YEAR FROM s.SALARY_DAY)','=', '2023').then(()=>{
                return db.groupBy('EXTRACT(MONTH FROM s.SALARY_DAY)').then(()=>{
                    return db.orderBY('EXTRACT(MONTH FROM s.SALARY_DAY)','').then(()=>{
                        return db.all().then(()=>{
                            return db.data
                        })
                    })
                })
            })
        })
    })
}
const sellerData = ()=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select(`u.user_id,u.USER_FIRST_LAST_NAME,
    COUNT(p.clint_id) AS total_products_this_upload,
    SUM(CASE WHEN p.pay_way_id = 1 THEN 1 ELSE 0 END) AS instant_products,
    SUM(CASE WHEN p.pay_way_id = 2 THEN 1 ELSE 0 END) AS live_auction_products,
    SUM(CASE WHEN p.pay_way_id = 3 THEN 1 ELSE 0 END) AS schedule_auction_products,
    SUM(CASE WHEN rp.acceptation = 1 THEN 1 ELSE 0 END) AS accept_product ,
    SUM(CASE WHEN rp.acceptation = 1 and (p.pay_way_id = 2 or p.pay_way_id = 3) THEN 1 ELSE 0 END) AS accept_auction_product ,
    SUM(CASE WHEN rp.acceptation = 0 THEN 1 ELSE 0 END) AS not_accept_product ,
    SUM(CASE WHEN rp.acceptation = 0 and (p.pay_way_id = 2 or p.pay_way_id = 3) THEN 1 ELSE 0 END) AS not_accept_auction_product ,
    SUM(CASE WHEN rp.acceptation is null THEN 1 ELSE 0 END) AS wait_in_review_product,
    SUM(CASE WHEN rp.acceptation is null and (p.pay_way_id = 2 or p.pay_way_id = 3) THEN 1 ELSE 0 END) AS wait_in_review_auction_product ,
    SUM(CASE WHEN p.sold = 1 THEN 1 ELSE 0 END) AS total_sold_products`,'clint c').then(()=>{
        return db.innerJoin('users u','c','u','user_id').then(()=>{
            return db.innerJoin('product p','c','p','clint_id').then(()=>{
                return db.innerJoin('review_product rp','p','rp','product_id').then(()=>{
                    return db.groupBy('u.USER_FIRST_LAST_NAME , c.clint_id, u.user_id').then(()=>{
                        return db.orderBY('c.clint_id','').then(()=>{
                            return db.all().then(()=>{
                                return db.data
                            })
                        })
                    })
                })
            })
        })
    })
}
const buyerData = ()=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select(`u.user_id,
    u.USER_FIRST_LAST_NAME,
    COUNT(d.clint_id) AS want_to_pay_deposit,
    SUM(CASE WHEN ap.acceptation = 1 THEN 1 ELSE 0 END) AS accept_deposit,
    SUM(CASE WHEN ap.acceptation = 0 THEN 1 ELSE 0 END) AS not_accept_deposit,
    SUM(CASE WHEN ap.acceptation IS NULL THEN 1 ELSE 0 END) AS wait_in_review_deposit,
    COUNT(DISTINCT a.auction_id) AS user_auction_count,
    SUM(CASE WHEN b.bid_money = max_bid.bid_money THEN 1 ELSE 0 END) AS won_auction`,'deposite d').then(()=>{
        return db.innerJoin('clint c','d','c','clint_id').then(()=>{
            return db.innerJoin('users u','c','u','user_id').then(()=>{
                return db.innerJoin('auction a','d','a','auction_id').then(()=>{
                    return db.innerJoin('accept_particpation ap','d','ap','deposite_id').then(()=>{
                        return db.leftJoin('bid b','d','b','deposite_id').then(()=>{
                            return db.leftJoin(`(
                                SELECT a.auction_id, MAX(b.bid_money) AS bid_money
                                FROM bid b
                                INNER JOIN deposite d ON b.deposite_id = d.deposite_id
                                INNER JOIN auction a ON d.auction_id = a.auction_id
                                GROUP BY a.auction_id
                              ) max_bid`,'a','max_bid','auction_id').then(()=>{
                                return db.where('d.percentage_id','=','2').then(()=>{
                                    return db.groupBy('u.USER_FIRST_LAST_NAME, d.clint_id,u.user_id').then(()=>{
                                        return db.orderBY('d.clint_id','').then(()=>{
                                            return db.all().then(()=>{
                                                return db.data
                                            })
                                        })
                                    })
                                })
                              })
                        })
                    })
                })
            })
        })
    })
}
const buyerDataAnalysis = ()=>{
    db.data.splice(0,(db.data.length + 1))
    return db.select(`u.user_id,
    u.USER_FIRST_LAST_NAME,
    SUM(CASE WHEN b.bid_money = max_bid.bid_money THEN 1 ELSE 0 END) AS won_auction`,'deposite d').then(()=>{
        return db.innerJoin('clint c','d','c','clint_id').then(()=>{
            return db.innerJoin('users u','c','u','user_id').then(()=>{
                return db.innerJoin('auction a','d','a','auction_id').then(()=>{
                    return db.innerJoin('accept_particpation ap','d','ap','deposite_id').then(()=>{
                        return db.leftJoin('bid b','d','b','deposite_id').then(()=>{
                            return db.leftJoin(`(
                                SELECT a.auction_id, MAX(b.bid_money) AS bid_money
                                FROM bid b
                                INNER JOIN deposite d ON b.deposite_id = d.deposite_id
                                INNER JOIN auction a ON d.auction_id = a.auction_id
                                GROUP BY a.auction_id
                              ) max_bid`,'a','max_bid','auction_id').then(()=>{
                                return db.where('d.percentage_id','=','2').then(()=>{
                                    return db.groupBy('u.USER_FIRST_LAST_NAME, d.clint_id,u.user_id').then(()=>{
                                        return db.orderBY('won_auction','DESC').then(()=>{
                                            return db.all().then(()=>{
                                                return db.data
                                            })
                                        })
                                    })
                                })
                              })
                        })
                    })
                })
            })
        })
    })
}

app.post('/insertInstantProduct',(req, res)=>{
    var {name,matrial,brand,desc,summery,HomeDecoration,color,price
        ,SIM,size,storage,date,state,DescribeState,carCC,CarModel,CarMile,HorsePower
        ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
        ,FuelType,BuldingArea,TypeBuilding,UploadDate,BuildingFloor,NumbersOfroom
        ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay,client,CategoryName,imageURL,imageFile} = req.body
        if(matrial==undefined){
            matrial=null
        } else if (brand==undefined) {
            brand=null 
        }else if(desc==undefined){
            desc=null 
        }else if(summery==undefined){
            summery=null
        }else if(color==undefined){
            color=null 
        }else if(SIM==undefined){
            SIM=null
        }else if(price==undefined){
            price=null 
        }else if(HomeDecoration==undefined){
            HomeDecoration=null 
        }else if(size==undefined){
            size=null 
        }else if(HomeDecoration==undefined){
            HomeDecoration=null 
        }else if(storage==undefined){
            storage=null 
        }else if(date==undefined){
            date=null 
        }else if(state==undefined){
            state=null 
        }else if(DescribeState==undefined){
            DescribeState=null 
        }else if(carCC==undefined){
            carCC=null 
        }else if(CarModel==undefined){
            CarModel=null 
        }else if(CarMile==undefined){
            CarMile=null 
        }else if(HorsePower==undefined){
            HorsePower=null 
        }else if(GearStick==undefined){
            GearStick=null 
        }else if(ManifuctureYear==undefined){
            ManifuctureYear=null 
        }else if(ManifuctureCountry==undefined){
            ManifuctureCountry=null 
        }else if(Class==undefined){
            Class=null 
        }else if(Interchange==undefined){
            Interchange=null 
        }else if(Structure==undefined){
            Structure=null 
        }else if(LocationOfBuilding==undefined){
            LocationOfBuilding=null 
        }else if(FuelType==undefined){
            FuelType=null 
        }else if(BuldingArea==undefined){
            BuldingArea=null 
        }else if(TypeBuilding==undefined){
            TypeBuilding=null 
        }else if(UploadDate==undefined){
            UploadDate=null 
        }else if(BuildingFloor==undefined){
            BuildingFloor=null 
        }else if(NumbersOfroom==undefined){
            NumbersOfroom=null 
        }else if(WaterResis==undefined){
            WaterResis=null 
        }else if(ScreenRes==undefined){
            ScreenRes=null 
        }else if(ScreenHz==undefined){
            ScreenHz=null 
        }else if(Wireless==undefined){
            Wireless=null 
        }else if(Battery==undefined){
            Battery=null 
        }else if(Camera==undefined){
            Camera=null 
        }else if(Ram==undefined){
            Ram=null 
        }else if(DigitalType==undefined){
            DigitalType=null 
        }else{
        }
        var productNumber , ReviewNumber = 0
        getmaxId('product_id','product').then((maxIdProduct)=>{
            productNumber = (maxIdProduct[0].NUM + 1)
            insertInstantProduct(
                productNumber,name,matrial,brand,desc,summery,HomeDecoration,color,price
                ,SIM,size,storage,date,state,DescribeState,carCC,CarModel,CarMile,HorsePower
                ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
                ,FuelType,BuldingArea,TypeBuilding,UploadDate,BuildingFloor,NumbersOfroom
                ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay,decrypt(JSON.parse(client))
            ).then(()=>{
                getmaxId('review_product_id','review_product').then((maxIdReview)=>{
                    ReviewNumber  =(maxIdReview[0].NUM + 1)
                    insertReviewProduct(ReviewNumber,productNumber).then(()=>{
                        insertCategoryOfProduct(productNumber,CategoryName).then(async(x)=>{
                            fs.mkdirSync(`public/images/product/${productNumber}`);
                            for (let index = 0; index < imageURL.length; index++) {
                                let buffer = new Buffer.from(imageURL[index].split(',')[1], "base64");
                                const filePath = `/public/images/product/${productNumber}/${index}.png`;
                                fs.writeFileSync(path.join(__dirname, filePath), buffer);
                                const pathOfData = `/images/product/${productNumber}/${index}.png`;
                                try {
                                  await insertProductImage(productNumber, index, pathOfData);
                                  // Do additional processing or error handling if needed
                                } catch (error) {
                                  console.error('Error inserting product image:', error);
                                }
                            }
                            res.send(x)
                        })
                    })

                })
            })
        })
    })

app.post('/insertAuctionProduct',(req, res)=>{
    var {name,matrial,brand,desc,summery,HomeDecoration,color,price
        ,SIM,size,storage,date,state,DescribeState,carCC,CarModel,CarMile,HorsePower
        ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
        ,FuelType,BuldingArea,TypeBuilding,UploadDate,BuildingFloor,NumbersOfroom
        ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay,client
        ,StartAuction,EndAuction,InitialPrice,WaitingTime,CategoryName,imageURL,imageFile} = req.body
        var productNumber,ReviewNumber = 0
        var AuctionNumber = 0
        if(matrial==undefined){
            matrial=null
        } else if (brand==undefined) {
            brand=null 
        }else if(desc==undefined){
            desc=null 
        }else if(summery==undefined){
            summery=null
        }else if(color==undefined){
            color=null 
        }else if(SIM==undefined){
            SIM=null
        }else if(price==undefined){
            price=null 
        }else if(HomeDecoration==undefined){
            HomeDecoration=null 
        }else if(size==undefined){
            size=null 
        }else if(HomeDecoration==undefined){
            HomeDecoration=null 
        }else if(storage==undefined){
            storage=null 
        }else if(date==undefined){
            date=null 
        }else if(state==undefined){
            state=null 
        }else if(DescribeState==undefined){
            DescribeState=null 
        }else if(carCC==undefined){
            carCC=null 
        }else if(CarModel==undefined){
            CarModel=null 
        }else if(CarMile==undefined){
            CarMile=null 
        }else if(HorsePower==undefined){
            HorsePower=null 
        }else if(GearStick==undefined){
            GearStick=null 
        }else if(ManifuctureYear==undefined){
            ManifuctureYear=null 
        }else if(ManifuctureCountry==undefined){
            ManifuctureCountry=null 
        }else if(Class==undefined){
            Class=null 
        }else if(Interchange==undefined){
            Interchange=null 
        }else if(Structure==undefined){
            Structure=null 
        }else if(LocationOfBuilding==undefined){
            LocationOfBuilding=null 
        }else if(FuelType==undefined){
            FuelType=null 
        }else if(BuldingArea==undefined){
            BuldingArea=null 
        }else if(TypeBuilding==undefined){
            TypeBuilding=null 
        }else if(UploadDate==undefined){
            UploadDate=null 
        }else if(BuildingFloor==undefined){
            BuildingFloor=null 
        }else if(NumbersOfroom==undefined){
            NumbersOfroom=null 
        }else if(WaterResis==undefined){
            WaterResis=null 
        }else if(ScreenRes==undefined){
            ScreenRes=null 
        }else if(ScreenHz==undefined){
            ScreenHz=null 
        }else if(Wireless==undefined){
            Wireless=null 
        }else if(Battery==undefined){
            Battery=null 
        }else if(Camera==undefined){
            Camera=null 
        }else if(Ram==undefined){
            Ram=null 
        }else if(DigitalType==undefined){
            DigitalType=null 
        }else{
        }
        getmaxId('product_id','product').then((maxId)=>{
            productNumber = (maxId[0].NUM + 1)
            insertInstantProduct(
                productNumber,name,matrial,brand,desc,summery,HomeDecoration,color,price
                ,SIM,size,storage,date,state,DescribeState,carCC,CarModel,CarMile,HorsePower
                ,GearStick,ManifuctureYear,ManifuctureCountry,Class,Interchange,Structure,LocationOfBuilding
                ,FuelType,BuldingArea,TypeBuilding,UploadDate,BuildingFloor,NumbersOfroom
                ,WaterResis,ScreenRes,ScreenHz,Wireless,Battery,Camera,Ram,DigitalType,payWay,decrypt(JSON.parse(client))
            ).then(()=>{
            insertCategoryOfProduct(productNumber,CategoryName).then(()=>{
                getmaxId('auction_id','auction').then((maxId)=>{
                    AuctionNumber = (maxId[0].NUM + 1)
                    insertAuctionProduct(AuctionNumber,StartAuction,EndAuction,InitialPrice,WaitingTime,productNumber).then(()=>{
                        getmaxId('review_product_id','review_product').then((maxId)=>{
                            ReviewNumber  = (maxId[0].NUM + 1)
                            insertReviewProduct(ReviewNumber , productNumber).then(
                                async (x)=>{
                                fs.mkdirSync(`public/images/product/${productNumber}`);
                                for (let index = 0; index < imageURL.length; index++) {
                                    let buffer = new Buffer.from(imageURL[index].split(',')[1], "base64");
                                    const filePath = `/public/images/product/${productNumber}/${index}.png`;
                                    fs.writeFileSync(path.join(__dirname, filePath), buffer);
                                    const pathOfData = `/images/product/${productNumber}/${index}.png`;
                                    try {
                                    // eslint-disable-next-line no-loop-func
                                    await insertProductImage(productNumber, index, pathOfData)
                                    // Do additional processing or error handling if needed
                                    } catch (error) {
                                    console.error('Error inserting product image:', error);
                                    }
                                }
                                res.send(x)
                            })
                        })
                    })
                })
            })
        })
    })
        
})
const trendProduct = ()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('c.category_name, cp.category_id, COUNT(cp.product_id) AS product_count','category_product cp').then(()=>{
        return db.innerJoin('category c','cp','c','category_id').then(()=>{
            return db.where('c.category_id', '=' , '').then(()=>{
                return db.openOtherSelect('*','').then(()=>{
                    return db.openOtherSelect('cp.category_id','category_product cp').then(()=>{
                        return db.innerJoin('category c','cp','c','category_id').then(()=>{
                            return db.innerJoin('product p','cp','p','product_id').then(()=>{
                                return db.innerJoin('auction a','p','a','product_id').then(()=>{
                                    return db.innerJoin('deposite d','a','d','auction_id').then(()=>{
                                        return db.innerJoin('accept_particpation ap','d','ap','deposite_id').then(()=>{
                                            return db.where('d.percentage_id' ,'=' ,'1').then(()=>{
                                                return db.and('ap.acceptation', '=', '1').then(()=>{
                                                    return db.and('d.clint_id', '=', 'p.clint_id').then(()=>{
                                                        return db.and('ap.date_of_action', '>=', "SYSDATE - INTERVAL '6' MONTH").then(()=>{
                                                            return db.groupBy('cp.category_id').then(()=>{
                                                                return db.orderBY('COUNT(cp.product_id)', 'DESC').then(()=>{
                                                                    return db.closeOtherSelect().then(()=>{
                                                                        return db.where('ROWNUM', '=', '1').then(()=>{
                                                                            return db.closeOtherSelect().then(()=>{
                                                                                return db.groupBy('c.category_name, cp.category_id').then(()=>{
                                                                                    return db.all().then(()=>{
                                                                                        return db.data
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const termsAndCondition = ()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('t.terms_id , t.terms_and_conditions','terms_and_conditions t').then(()=>{
        return db.all().then(()=>{
            return db.data
        })
    })
}
const insertNewCategory = (categoryId , categoryName , categoryImagePath , subCategoryId)=>{
    db.data.splice(0,(db.data.length+1))
    return db.insert('category','category_id , category_name , category_image , sub_category_id',
    `${categoryId} , '${categoryName}' , '${categoryImagePath}', ${subCategoryId} `).then(()=>{
        return db.execute().then(()=>{
            return db.data
        })
    })
}


// Data analysis Select
const saleInEachCategoryAllMonth = (year)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('cat.category_name ,cat.category_id, COALESCE(s.total_sales, 0) AS total_sales, all_months.month, COALESCE(s.total_bid, 0) AS total_bid',`(
        SELECT DISTINCT category_id, category_name
        FROM category
        where category.sub_category_id is null
      ) cat
      CROSS JOIN (
        SELECT LEVEL AS month
        FROM dual
        CONNECT BY LEVEL <= 12
      ) all_months`).then(()=>{
        return db.leftJoinWithDiffColumn(`(SELECT
            c.sub_category_id,
            EXTRACT(MONTH FROM b.bid_time) AS month,
            COUNT(DISTINCT p.product_id) AS total_sales,
            SUM(b.bid_money) AS total_bid
          FROM
            product p
            INNER JOIN category_product cp ON p.product_id = cp.product_id
            INNER JOIN category c ON cp.category_id = c.category_id
            INNER JOIN auction a ON a.product_id = p.product_id
            INNER JOIN deposite d ON a.auction_id = d.auction_id
            INNER JOIN bid b ON d.deposite_id = b.deposite_id
          WHERE
            b.bid_money IN (
              SELECT MAX(bid_money)
              FROM bid b
              INNER JOIN deposite d ON b.deposite_id = d.deposite_id
              INNER JOIN auction a ON d.auction_id = a.auction_id
              GROUP BY a.auction_id
            )
            AND EXTRACT(YEAR FROM b.bid_time) = ${year}
            AND c.SUB_CATEGORY_ID IS NOT NULL
            GROUP BY c.sub_category_id,
            EXTRACT(MONTH FROM b.bid_time)
            ) s`,'cat','s','category_id','SUB_CATEGORY_ID').then(()=>{
            return db.otherOperation('and').then(()=>{
                return db.otherWhere('all_months.month', '=', 's.month').then(()=>{
                    return db.orderBY('cat.category_name,all_months.month','').then(()=>{
                        return db.all().then(()=>{
                            return db.data
                        })
                    })
                })
            })
        })
    })
}
const selleProductOfEachCategory = ()=>{
    db.data.splice(0,(db.data.length+1))
    return db.select('c.category_name, sum(b.bid_money) AS total_price , EXTRACT(MONTH FROM b.bid_time) AS month, COUNT(DISTINCT p.product_id) AS total_sales','product p').then(()=>{
        return db.innerJoin('category_product cp','p','cp','product_id').then(()=>{
            return db.innerJoin('category c','cp','c','category_id').then(()=>{
                return db.innerJoin('auction a','p','a','product_id').then(()=>{
                    return db.innerJoin('deposite d','a','d','auction_id').then(()=>{
                        return db.innerJoin('bid b','d','b','deposite_id').then(()=>{
                            return db.where('b.bid_money','IN','').then(()=>{
                                return db.openOtherSelect('MAX(b.bid_money)','bid b').then(()=>{
                                    return db.innerJoin('deposite d','b','d','deposite_id').then(()=>{
                                        return db.innerJoin('auction a','d','a','auction_id').then(()=>{
                                            return db.groupBy('a.auction_id').then(()=>{
                                                return db.closeOtherSelect().then(()=>{
                                                    return db.and('EXTRACT(YEAR FROM b.bid_time)', '=', '2023').then(()=>{
                                                        return db.groupBy('c.category_name, EXTRACT(MONTH FROM b.bid_time)').then(()=>{
                                                            return db.orderBY('EXTRACT(MONTH FROM b.bid_time)','').then(()=>{
                                                                return db.all().then(()=>{
                                                                    return db.data
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
const amountOfProfitInEachCategory = (CurrentMonth,lastMonth)=>{
    db.data.splice(0,(db.data.length+1))
    return db.select(`c.category_name,
        SUM(CASE WHEN EXTRACT(MONTH FROM ap.DATE_OF_ACTION) = ${CurrentMonth} THEN d.DEPOSITE_PRICE ELSE 0 END) as sales,
        SUM(CASE WHEN EXTRACT(MONTH FROM ap.DATE_OF_ACTION) = ${CurrentMonth} THEN d.DEPOSITE_PRICE ELSE 0 END) -
        SUM(CASE WHEN EXTRACT(MONTH FROM ap.DATE_OF_ACTION) = ${lastMonth} THEN d.DEPOSITE_PRICE ELSE 0 END) AS difference`,'product p').then(()=>{
        return db.innerJoin('category_product cp','p','cp','product_id').then(()=>{
            return db.innerJoin('category c','cp','c','category_id').then(()=>{
                return db.innerJoin('auction a','p','a','product_id').then(()=>{
                    return db.innerJoin('deposite d','a','d','auction_id').then(()=>{
                        return db.innerJoin('accept_particpation ap','d','ap','deposite_id').then(()=>{
                            return db.where('EXTRACT(YEAR FROM ap.DATE_OF_ACTION)', '=', '2022').then(()=>{
                                return db.and('d.PERCENTAGE_ID', '=', '1').then(()=>{
                                    return db.groupBy('c.category_name').then(()=>{
                                        return db.orderBY('c.category_name','').then(()=>{
                                            return db.all().then(()=>{
                                                return db.data
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}


app.post('/insertNewUser',(req,res)=>{
    const {firstname,lastname,username,phone,otherPhone,address,birthday,SSN,email,password,gender,currentDate} = req.body
    let userNumber = 0
    getmaxId('user_id','users').then((maxNumber)=>{
        userNumber = (maxNumber[0].NUM + 1)
        insertUser((maxNumber[0].NUM + 1),firstname,lastname,username,phone,otherPhone,address,birthday,SSN,email,password,gender,currentDate).then((state)=>{
            getmaxId('clint_id','clint').then((maxId)=>{
                insertClient((maxId[0].NUM + 1),userNumber).then((lastState)=>{
                    res.send(lastState)
                })
            })
        })
    })
})
io.on('connection', (socket) => {
    socket.on('newBid',(Data)=>{
        io.emit('newEffect')
        io.emit('updatePrice')
    })
    socket.on('timeOut',(res)=>{
        io.emit('finishAuction',res)
    })
    socket.on('timeOutSchaduelAuction',()=>{
        io.emit('finishSchaduelAuction')
    })
    // socket.on('changeChartYear',(res)=>{
    //     io.emit('changeChartYearRightNow',res)
    // })
    socket.on('RRRUN',()=>{
        socket.emit('fetchNow')
    })
    socket.on('adminAcceptProduct',(clientId)=>{
        socket.join(clientId)
        io.emit('JoinClient',clientId)
    })
});




app.post('/checkUserLogIn',(req,res)=>{
    const {username} = req.body
    const {password} = req.body
    isAdminSystem(username, password).then((data)=>{
        if(data.roll !== ''){
            res.send(data)
        }else{
            isClientSystem(username, password).then((results)=>{
                req.session.data = results
                res.send(results)
            })
        }
    })
})
app.post('/SessionData',(req,res)=>{
    const {roll} = req.body
    const {username} = req.body
    res.send({"roll":decrypt(JSON.parse(roll)), "username":decrypt(JSON.parse(username))})
})
app.post('/SessionUsername',(req,res)=>{
    const {username} = req.body
    res.send({"username":decrypt(JSON.parse(username))})
})
app.post('/permission/page',(req,res)=>{
    const {user} = req.body
    hasPermission(user).then(data=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})

app.get('/getMainCategories',(req,res)=>{
    MainCategory().then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.get('/getAllCategories',(req,res)=>{
    categories().then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
//SubCategory
app.get('/getSubCategory',(req,res)=>{
    SubCategory().then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.get('/getAllCategoriesName',(req,res)=>{
    AllMainCategory().then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})

app.post('/uploadImage',(req,res)=>{
    const {imageUrl} = req.body
    const {name} = req.body
    const {id} = req.body
    let buffer = new Buffer.from(imageUrl.split(',')[1],"base64")
    const filePath = `/public/images/categories/${name}`
    fs.writeFileSync(path.join(__dirname,filePath),buffer)
    const pathofData = `/images/categories/${name}`
    UpdateCategory(id,pathofData).then((results)=>{
        res.send(results)
        db.data.splice(0,(db.data.length+1))
    })
})
app.get('/getAllProducts',(req,res)=>{
    InstantProducts().then((data)=>{
        let id = -1
        let imageArray=[]
        let mainArray=[]
        let firstItem = ''
        let title,Category,payWay,price,desc,state
        data.map((x,i)=>{
            if(id !== x.PRODUCT_ID){
                if(i==0){
                    title = x.TITLE
                    Category = x.CATEGORY
                    payWay = x.PAYWAY
                    price = x.PRICE
                    desc = x.DESCRIPTION
                    state = x.STATE
                    imageArray.push(x.IMAGE)
                    id = x.PRODUCT_ID
                }else{
                    mainArray.push({"id":id,"images":imageArray,"title":title,"Category":Category,"payWay":payWay,"price":price,"desc":desc,"state":state})
                    imageArray = []
                    imageArray.push(x.IMAGE)
                    id = x.PRODUCT_ID
                    title = x.TITLE
                    Category = x.CATEGORY
                    payWay = x.PAYWAY
                    price = x.PRICE
                    desc = x.DESCRIPTION
                    state = x.STATE
                }
            }else{
                imageArray.push(x.IMAGE)
                if(i == data.length-1){
                    mainArray.push({"id":id,"images":imageArray,"title":title,"Category":Category,"payWay":payWay,"price":price,"desc":desc,"state":state})
                }
            }
        })
        db.data.splice(0,(db.data.length+1))
        res.send(mainArray)
    })
})
app.get('/ScheduleProducts',(req,res)=>{
    auctionProducts(3).then((data)=>{
        let id = -1
        let imageArray=[]
        let mainArray=[]
        let firstItem = ''
        let title,Category,payWay,payWayId,price,desc,state,summary
        data.map((x,i)=>{
            if(id !== x.PRODUCT_ID){

                if(i==0){
                    title = x.TITLE
                    Category = x.CATEGORY
                    payWay = x.PAYWAY
                    payWayId = x.PAYWAYID
                    price = x.PRICE
                    desc = x.DESCRIPTION
                    state = x.STATE
                    imageArray.push(x.IMAGE)
                    id = x.PRODUCT_ID
                    brand=x.PRODUCT_BRAND
                    model=x.VEHICLE_MODEL
                    color=x.PRODUCT_COLOR
                    size=x.PRODUCT_SIZE
                    summary = x.PRODUCT_SUMMARY
                    endAuction = x.ENDTIME
                }else{
                    mainArray.push({"id":id,"images":imageArray,
                    "title":title,"Category":Category,
                    "payWay":payWay,"payWayId": payWayId, "price":price,"desc":desc,
                    "state":state,'brand':brand
                    ,'model':model,
                    'color':color,
                    'size':size,
                    'summary':summary,
                    'endAuction':endAuction})
                    imageArray = []
                    imageArray.push(x.IMAGE)
                    id = x.PRODUCT_ID
                    title = x.TITLE
                    Category = x.CATEGORY
                    payWay = x.PAYWAY
                    payWayId = x.PAYWAYID
                    price = x.PRICE
                    desc = x.DESCRIPTION
                    state = x.STATE
                    brand=x.PRODUCT_BRAND
                    model=x.VEHICLE_MODEL
                    color=x.PRODUCT_COLOR
                    size=x.PRODUCT_SIZE
                    summary = x.PRODUCT_SUMMARY
                    endAuction = x.ENDTIME
                }
            }else{
                imageArray.push(x.IMAGE)
                if(i == data.length-1){
                    mainArray.push({"id":id,"images":imageArray,
                    "title":x.TITLE,"Category":x.CATEGORY,
                    "payWay":x.PAYWAY,"payWayId": payWayId,"price":x.PRICE,
                    "desc":x.DESCRIPTION,"state":x.STATE,
                    'brand':x.PRODUCT_BRAND,'model':x.VEHICLE_MODEL,
                    'color':x.PRODUCT_COLOR,'size':x.PRODUCT_SIZE,'summary':summary,'endAuction':endAuction})
                }
            }
        })
        db.data.splice(0,(db.data.length+1))
        res.send(mainArray)

    })
})
app.post('/instantProducts/Id',(req,res)=>{
    const {productId,username} = req.body
    // const productId = 6
    auctionProductsById(1,productId).then((data)=>{
        let id = -1
        let imageArray=[]
        let mainArray=[]
        data.map((x,i)=>{
            if(id !== x.PRODUCT_ID){
                if(i==0){
                    imageArray.push(x.IMAGE)
                    id = x.PRODUCT_ID
                }else{
                    imageArray = []
                    imageArray.push(x.IMAGE)
                }
            }else{
                imageArray.push(x.IMAGE)
                if(i == data.length-1){
                    mainArray.push({
                        "id":x.PRODUCT_ID,"images":imageArray,"title":x.TITLE,"Category":x.CATEGORY,
                        "payWay":x.PAYWAY,"price":x.PRODUCT_PRICE,"desc":x.DESCRIPTION,"state":x.STATE,
                        'brand':x.PRODUCT_BRAND,'model':x.VEHICLE_MODEL,'color':x.PRODUCT_COLOR,
                        'size':x.PRODUCT_SIZE,'store':x.PRODUCT_STORAGE,
                        'summary' : x.PRODUCT_SUMMARY,
                        'material' : x.PRODUCT_MATERIAL,
                        'payment_date' : x.PRODUCT_PAYMENT_DATE,
                        'stateDescription' : x.PRODUCT_DESCRIPTION_STATE,
                        'model' : x.VEHICLE_MODEL,
                        'horsePower' : x.VEHICLE_HORSE_POWER,
                        'cc' : x.VEHICLE_CC,
                        'structure' : x.VEHICLE_STRUCTURE,
                        'manifactureYear' : x.VEHICLE_MANIFACTURE_YEAR,
                        'manifactureCountry' : x.VEHICLE_MANIFACTURE_COUNTRY,
                        'mileage' : x.VEHICLE_MILEAGE,
                        'interchangePartNumber' : x.VEHICLE_INTERCHANGE_PARTNUMBER,
                        'GearStick' : x.VEHICLE_GEAR_STICK,
                        'waterResistance' : x.WATER_RESISTANCE,
                        'ScreenResolution' : x.SCREEN_RESOLUTION,
                        'ScreenHz' : x.SCREEN_HZ,
                        'buildLocation' : x.BUILD_LOCATION,
                        'buildArea' : x.BUILD_AREA,
                        'buildingFloor' : x.BUILDING_FLOOR,
                        'buildDecoration' : x.BUILD_DECORATION,
                        'buildRoomsNumber' : x.BUILD_ROOMS_NUMBER,
                        'uploadData' : x.UPLOAD_DATE,
                        'fuelTypeName' : x.VEHICLE_FUEL_TYPE_NAME,
                        'vehicleClass' : x.VEHICLE_CLASS,
                        'digitalType' : x.DIGITAL_TYPE,
                        'buildTypeName' : x.BUILD_TYPE_NAME,
                        'StartTime' : x.STARTTIME,
                        'endTime' : x.ENDTIME,
                        'slotOfCard': x.SLOT_OF_CARD,
                        'cameraPixiel': x.CAMERA_PIXELS,
                        'ram' : x.RAM,
                        'wirelessCarriar' : x.WIRELESS_CARRIER,
                        'battery' : x.BATTERY,
                        'paywayId' : x.PAY_WAY_ID
                    })
                }
            }
        })
        db.data.splice(0,(db.data.length+1))
            if(username){
                ownerOfProduct(productId).then((output)=>{
                    res.send({mainArray,output})
                })
            }else{
                ownerOfProduct(productId).then((output)=>{
                    res.send({mainArray,output})
                })
            }
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/liveProducts/Id',(req,res)=>{
    const {productId,username} = req.body
    auctionProductsById(2,productId).then((data)=>{
        let id = -1
        let imageArray=[]
        let mainArray=[]
        let currentUserData = []
        let ownerProduct = []

        data.map((x,i)=>{
            if(id !== x.PRODUCT_ID){
                if(i==0){
                    imageArray.push(x.IMAGE)
                    id = x.PRODUCT_ID
                }else{
                    imageArray = []
                    imageArray.push(x.IMAGE)
                }
            }else{
                imageArray.push(x.IMAGE)
                if(i == data.length-1){
                    mainArray.push({
                        "id":x.PRODUCT_ID,"images":imageArray,"title":x.TITLE,"Category":x.CATEGORY,
                        "payWay":x.PAYWAY,"price":x.PRICE,"desc":x.DESCRIPTION,"state":x.STATE,
                        'brand':x.PRODUCT_BRAND,'model':x.VEHICLE_MODEL,'color':x.PRODUCT_COLOR,
                        'size':x.PRODUCT_SIZE,'store':x.PRODUCT_STORAGE,
                        'summary' : x.PRODUCT_SUMMARY,
                        'material' : x.PRODUCT_MATERIAL,
                        'payment_date' : x.PRODUCT_PAYMENT_DATE,
                        'stateDescription' : x.PRODUCT_DESCRIPTION_STATE,
                        'model' : x.VEHICLE_MODEL,
                        'horsePower' : x.VEHICLE_HORSE_POWER,
                        'cc' : x.VEHICLE_CC,
                        'structure' : x.VEHICLE_STRUCTURE,
                        'manifactureYear' : x.VEHICLE_MANUFACTURE_YEAR,
                        'manifactureCountry' : x.VEHICLE_MANUFACTURE_COUNTRY,
                        'mileage' : x.VEHICLE_MILEAGE,
                        'interchangePartNumber' : x.VEHICLE_INTERCHANGE_PARTNUMBER,
                        'GearStick' : x.VEHICLE_GEAR_STICK,
                        'waterResistance' : x.WATER_RESISTANCE,
                        'ScreenResolution' : x.SCREEN_RESOLUTION,
                        'ScreenHz' : x.SCREEN_HZ,
                        'buildLocation' : x.BUILD_LOCATION,
                        'buildArea' : x.BUILD_AREA,
                        'buildingFloor' : x.BUILDING_FLOOR,
                        'buildDecoration' : x.BUILD_DECORATION,
                        'buildRoomsNumber' : x.BUILD_ROOMS_NUMBER,
                        'uploadData' : x.UPLOAD_DATE,
                        'fuelTypeName' : x.VEHICLE_FUEL_TYPE_NAME,
                        'vehicleClass' : x.VEHICLE_CLASS,
                        'digitalType' : x.DIGITAL_TYPE,
                        'buildTypeName' : x.BUILD_TYPE_NAME,
                        'StartTime' : x.STARTTIME,
                        'endTime' : x.ENDTIME,
                        'slotOfCard': x.SLOT_OF_CARD,
                        'cameraPixiel': x.CAMERA_PIXELS,
                        'ram' : x.RAM,
                        'wirelessCarriar' : x.WIRELESS_CARRIER,
                        'battery' : x.BATTERY,
                        'paywayId' : x.PAY_WAY_ID
                    })
                    
                }
            }
        })
        db.data.splice(0,(db.data.length+1))

        if(username !== undefined && mainArray.length !== 0){
            getAuctionId(productId).then((auctionID)=>{
                checkDeposite(auctionID[0].AUCTION_ID,decrypt(JSON.parse(username))).then((results)=>{
                    console.log(currentUserData)
                    results.map(x=>{
                        currentUserData.push(x)
                    })
                    // db.data.splice(0,(db.data.length+1))
                    ownerOfProduct(productId).then((output)=>{
                        output.map(x=>{
                            ownerProduct.push(x)
                        })
                        clientInDeposite(productId).then((clients)=>{
                            res.send({mainArray,currentUserData,ownerProduct,clients})
                            // console.log(clients)
                        })
                    })
                    // res.send({mainArray,currentUserData})
                })
            })
        }else{
            ownerOfProduct(productId).then((output)=>{
                res.send({mainArray,output})
            })
        }
    })
})
app.post('/ScheduleProducts/Id',(req,res)=>{
    const {productId,username} = req.body
    auctionProductsById(3,productId).then((data)=>{
        var id = -1
        var imageArray=[]
        var mainArray=[]
        var currentUserData = []
        var ownerProduct = []
        data.map((x,i)=>{
            if(id !== x.PRODUCT_ID){
                if(i==0){
                    imageArray.push(x.IMAGE)
                    id = x.PRODUCT_ID
                }else{
                    // mainArray.push({"id":id,"images":imageArray,"title":title,"Category":x.CATEGORY,"payWay":x.PAYWAY,"price":x.PRICE,"desc":x.DESCRIPTION,"state":x.STATE,'brand':x.PRODUCT_BRAND,'model':x.VEHICLE_MODEL,'color':x.PRODUCT_COLOR,'size':x.PRODUCT_SIZE,'store':store})
                    imageArray = []
                    imageArray.push(x.IMAGE)
                }
            }else{
                imageArray.push(x.IMAGE)
                if(i == data.length-1){
                    mainArray.push({
                        "id":x.PRODUCT_ID,"images":imageArray,"title":x.TITLE,"Category":x.CATEGORY,
                        "payWay":x.PAYWAY,"price":x.PRICE,"desc":x.DESCRIPTION,"state":x.STATE,
                        'brand':x.PRODUCT_BRAND,'model':x.VEHICLE_MODEL,'color':x.PRODUCT_COLOR,
                        'size':x.PRODUCT_SIZE,'store':x.PRODUCT_STORAGE,
                        'summary' : x.PRODUCT_SUMMARY,
                        'material' : x.PRODUCT_MATERIAL,
                        'payment_date' : x.PRODUCT_PAYMENT_DATE,
                        'stateDescription' : x.PRODUCT_DESCRIPTION_STATE,
                        'model' : x.VEHICLE_MODEL,
                        'horsePower' : x.VEHICLE_HORSE_POWER,
                        'cc' : x.VEHICLE_CC,
                        'structure' : x.VEHICLE_STRUCTURE,
                        'manifactureYear' : x.VEHICLE_MANUFACTURE_YEAR,
                        'manifactureCountry' : x.VEHICLE_MANUFACTURE_COUNTRY,
                        'mileage' : x.VEHICLE_MILEAGE,
                        'interchangePartNumber' : x.VEHICLE_INTERCHANGE_PARTNUMBER,
                        'GearStick' : x.VEHICLE_GEAR_STICK,
                        'waterResistance' : x.WATER_RESISTANCE,
                        'ScreenResolution' : x.SCREEN_RESOLUTION,
                        'ScreenHz' : x.SCREEN_HZ,
                        'buildLocation' : x.BUILD_LOCATION,
                        'buildArea' : x.BUILD_AREA,
                        'buildingFloor' : x.BUILDING_FLOOR,
                        'buildDecoration' : x.BUILD_DECORATION,
                        'buildRoomsNumber' : x.BUILD_ROOMS_NUMBER,
                        'uploadData' : x.UPLOAD_DATE,
                        'fuelTypeName' : x.VEHICLE_FUEL_TYPE_NAME,
                        'vehicleClass' : x.VEHICLE_CLASS,
                        'digitalType' : x.DIGITAL_TYPE,
                        'buildTypeName' : x.BUILD_TYPE_NAME,
                        'StartTime' : x.STARTTIME,
                        'endTime' : x.ENDTIME,
                        'slotOfCard': x.SLOT_OF_CARD,
                        'cameraPixiel': x.CAMERA_PIXELS,
                        'ram' : x.RAM,
                        'wirelessCarriar' : x.WIRELESS_CARRIER,
                        'battery' : x.BATTERY,
                        'paywayId' : x.PAY_WAY_ID
                    })
                }
            }
        })
        db.data.splice(0,(db.data.length+1))
        if(username !== undefined && mainArray.length !== 0){
            getAuctionId(productId).then((auctionID)=>{
                checkDeposite(auctionID[0].AUCTION_ID,decrypt(JSON.parse(username))).then((data)=>{
                    data.map(x=>{
                        currentUserData.push(x)
                    })
                    // db.data.splice(0,(db.data.length+1))
                    ownerOfProduct(productId).then((output)=>{
                        output.map(x=>{
                            ownerProduct.push(x)
                        })
                        clientInDeposite(productId).then((clients)=>{
                            res.send({mainArray,currentUserData,ownerProduct,clients})
                            // console.log(clients)
                        })
                    })
                    // res.send({mainArray,currentUserData})
                })
            })
        }else{
            ownerOfProduct(productId).then((output)=>{
                res.send({mainArray,currentUserData,output})
            })
        }
    })
})
app.get('/getAllProductsForAdmin',(req,res)=>{
    ALLProducts().then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.get('/LiveProducts',(req,res)=>{
    auctionProducts(2).then((data)=>{
        // console.log(data)
        let id = -1
        let imageArray=[]
        let mainArray=[]
        let firstItem = ''
        let title,Category,payWay,price,desc,state,summary,startTime
        data.map((x,i)=>{
            if(id !== x.PRODUCT_ID){
                if(i==0){
                    title = x.TITLE
                    Category = x.CATEGORY
                    payWay = x.PAYWAY
                    payWayId = x.PAYWAYID
                    price = x.PRICE
                    desc = x.DESCRIPTION
                    state = x.STATE
                    imageArray.push(x.IMAGE)
                    id = x.PRODUCT_ID
                    brand=x.PRODUCT_BRAND
                    model=x.VEHICLE_MODEL
                    color=x.PRODUCT_COLOR
                    size=x.PRODUCT_SIZE
                    summary = x.PRODUCT_SUMMARY
                    startTime = x.STARTTIME
                }else{
                    mainArray.push({"id":id,"images":imageArray,"title":title,"Category":Category,"payWay":payWay,"payWayId":payWayId,
                    "price":price,"desc":desc,"state":state,'brand':brand,'model':model,'color':color,'size':size,'summary':summary,'startTime':startTime})
                    imageArray = []
                    imageArray.push(x.IMAGE)
                    id = x.PRODUCT_ID
                    title = x.TITLE
                    Category = x.CATEGORY
                    payWay = x.PAYWAY
                    payWayId = x.PAYWAYID
                    price = x.PRICE
                    desc = x.DESCRIPTION
                    state = x.STATE
                    brand=x.PRODUCT_BRAND
                    model=x.VEHICLE_MODEL
                    color=x.PRODUCT_COLOR
                    size=x.PRODUCT_SIZE
                    summary = x.PRODUCT_SUMMARY
                    startTime = x.STARTTIME
                }
            }else{
                imageArray.push(x.IMAGE)
                if(i == data.length-1){
                    mainArray.push({"id":id,"images":imageArray,"title":x.TITLE,"Category":x.CATEGORY,"payWay":x.PAYWAY,"payWayId":payWayId,
                    "price":x.PRICE,"desc":x.DESCRIPTION,"state":x.STATE,'brand':x.PRODUCT_BRAND,
                    'model':x.VEHICLE_MODEL,'color':x.PRODUCT_COLOR,'size':x.PRODUCT_SIZE,'summary':summary,'startTime':startTime})
                }
            }
        })
        res.send(mainArray)
        db.data.splice(0,(db.data.length+1))

    })
})
app.get('/getDepositeData',(req,res)=>{
    DepositeData().then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
// DepositeData
app.get('/getAllUsres',(req,res)=>{
    UsersData().then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/getUserData',(req,res)=>{
    const {userId} = req.body
    userDataById(userId).then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/userDataByClientId',(req,res)=>{
    const {ClientID} = req.body
    userDataByClientId(ClientID).then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/blockUsers',(req,res)=>{
    const { state } = req.body
    const { userId } = req.body
    updateUserBlocks(state,userId).then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.get('/getAllAdmins',(req,res)=>{
    AdminData().then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/getAllAdmins/username',(req,res)=>{
    const {username} = req.body
    AdminDataByUserName(decrypt(JSON.parse(username))).then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/getProductDetails',(req,res)=>{
    const {productId} = req.body
    ALLProductsDetails(productId).then((data)=>{
        let id = -1
        let imageArray=[]
        let mainArray=[]
        let firstItem = ''
        let title,Category,payWay,price
        ,desc,state,auction,PRODUCT_PAYMENT_DATE,PRODUCT_DESCRIPTION_STATE
        ,VEHICLE_MODEL,VEHICLE_HORSE_POWER,VEHICLE_CC,VEHICLE_STRUCTURE
        ,VEHICLE_MANUFACTURE_YEAR,VEHICLE_MANUFACTURE_COUNTRY
        ,VEHICLE_MILEAGE,VEHICLE_INTERCHANGE_PARTNUMBER,VEHICLE_GEAR_STICK
        ,WATER_RESISTANCE,SCREEN_RESOLUTION,SCREEN_HZ,BUILD_LOCATION
        ,BUILD_AREA,BUILDING_FLOOR,BUILD_DECORATION,BUILD_ROOMS_NUMBER
        ,UPLOAD_DATE,VEHICLE_FUEL_TYPE_NAME,VEHICLE_CLASS,DIGITAL_TYPE
        ,BUILD_TYPE_NAME
        data.map((x,i)=>{
            if(id !== x.PRODUCT_ID){
                if(i==0){
                    imageArray.push(x.IMAGE)
                    id = x.PRODUCT_ID
                    auction = x.AUCTION_ID
                    title = x.TITLE
                    Category = x.CATEGORY
                    payWay = x.PAYWAY
                    price = x.PRICE_OF_INSTANS
                    initial_price=x.PRICE_OF_AUCTION
                    desc = x.DESCRIPTION
                    state = x.STATE
                    desc = x.DESCRIPTION
                    brand=x.PRODUCT_BRAND
                    model=x.VEHICLE_MODEL
                    color=x.PRODUCT_COLOR
                    size=x.PRODUCT_SIZE
                    storage=x.PRODUCT_STORAGE
                    summary=x.PRODUCT_SUMMARY
                    matrial=x.PRODUCT_MATERIAL
                    paymentDate=x.PRODUCT_PAYMENT_DATE
                    productDescripitionState=x.PRODUCT_DESCRIPTION_STATE
                    startTime=x.STARTTIME
                    endTime=x.ENDTIME
                    clientID = x.CLINT_ID

                    PRODUCT_PAYMENT_DATE = x.PRODUCT_PAYMENT_DATE
                    PRODUCT_DESCRIPTION_STATE = x.PRODUCT_DESCRIPTION_STATE
                    VEHICLE_MODEL = x.VEHICLE_MODEL
                    VEHICLE_HORSE_POWER = x.VEHICLE_HORSE_POWER
                    VEHICLE_CC = x.VEHICLE_CC
                    VEHICLE_STRUCTURE =  x.VEHICLE_STRUCTURE
                    VEHICLE_MANUFACTURE_YEAR = x.VEHICLE_MANUFACTURE_YEAR
                    VEHICLE_MANUFACTURE_COUNTRY = x.VEHICLE_MANUFACTURE_COUNTRY
                    VEHICLE_MILEAGE = x.VEHICLE_MILEAGE
                    VEHICLE_INTERCHANGE_PARTNUMBER = x.VEHICLE_INTERCHANGE_PARTNUMBER
                    VEHICLE_GEAR_STICK = x.VEHICLE_GEAR_STICK
                    WATER_RESISTANCE = x.WATER_RESISTANCE
                    SCREEN_RESOLUTION = x.SCREEN_RESOLUTION
                    SCREEN_HZ = x.SCREEN_HZ
                    BUILD_LOCATION = x.BUILD_LOCATION
                    BUILD_AREA = x.BUILD_AREA
                    BUILDING_FLOOR = x.BUILDING_FLOOR
                    BUILD_DECORATION = x.BUILD_DECORATION
                    BUILD_ROOMS_NUMBER = x.BUILD_ROOMS_NUMBER
                    UPLOAD_DATE = x.UPLOAD_DATE
                    VEHICLE_FUEL_TYPE_NAME = x.VEHICLE_FUEL_TYPE_NAME
                    VEHICLE_CLASS = x.VEHICLE_CLASS
                    DIGITAL_TYPE = x.DIGITAL_TYPE
                    BUILD_TYPE_NAME = x.BUILD_TYPE_NAME
                }else{
                    mainArray.push({"id":id,"auction":auction,"clientID":clientID,"title":title,"image":imageArray,"price":price,
                    "initial_price":initial_price,'brand':brand,"desc":desc,'size':size,'storage':storage,'summary':summary,'matrial':matrial,
                    'color':color,'paymentDate':paymentDate,'productDescripitionState':productDescripitionState,'startTime':startTime,'endTime':endTime,
                    "Category":Category,"payWay":payWay,"state":state,'VEHICLE_MODEL':VEHICLE_MODEL,'VEHICLE_HORSE_POWER':VEHICLE_HORSE_POWER,
                    'VEHICLE_CC':VEHICLE_CC,'VEHICLE_STRUCTURE':VEHICLE_STRUCTURE,'VEHICLE_MANUFACTURE_YEAR':VEHICLE_MANUFACTURE_YEAR,
                    'VEHICLE_MANUFACTURE_COUNTRY':VEHICLE_MANUFACTURE_COUNTRY,'VEHICLE_MILEAGE':VEHICLE_MILEAGE,'VEHICLE_INTERCHANGE_PARTNUMBER':VEHICLE_INTERCHANGE_PARTNUMBER
                    ,'VEHICLE_GEAR_STICK':VEHICLE_GEAR_STICK,'WATER_RESISTANCE':WATER_RESISTANCE,'SCREEN_RESOLUTION':SCREEN_RESOLUTION,'SCREEN_HZ':SCREEN_HZ
                    ,'BUILD_LOCATION':BUILD_LOCATION,'BUILD_AREA':BUILD_AREA,'BUILDING_FLOOR':BUILDING_FLOOR,'BUILD_DECORATION':BUILD_DECORATION,'BUILD_ROOMS_NUMBER':BUILD_ROOMS_NUMBER
                    ,'UPLOAD_DATE':UPLOAD_DATE,'VEHICLE_FUEL_TYPE_NAME':VEHICLE_FUEL_TYPE_NAME,'VEHICLE_CLASS':VEHICLE_CLASS,'DIGITAL_TYPE':DIGITAL_TYPE
                    ,'BUILD_TYPE_NAME':BUILD_TYPE_NAME})
                    imageArray = []
                    imageArray.push(x.IMAGE)
                    id = x.PRODUCT_ID
                    title = x.TITLE
                    Category = x.CATEGORY
                    payWay = x.PAYWAY
                    price = x.PRICE_OF_INSTANS
                    initial_price=x.PRICE_OF_AUCTION
                    desc = x.DESCRIPTION
                    state = x.STATE
                    desc = x.DESCRIPTION
                    brand=x.PRODUCT_BRAND
                    model=x.VEHICLE_MODEL
                    color=x.PRODUCT_COLOR
                    size=x.PRODUCT_SIZE
                    storage=x.PRODUCT_STORAGE
                    summary=x.PRODUCT_SUMMARY
                    matrial=x.PRODUCT_MATERIAL
                    paymentDate=x.PRODUCT_PAYMENT_DATE
                    productDescripitionState=x.PRODUCT_DESCRIPTION_STATE
                    startTime=x.STARTTIME
                    endTime=x.ENDTIME

                    PRODUCT_PAYMENT_DATE = x.PRODUCT_PAYMENT_DATE
                    PRODUCT_DESCRIPTION_STATE = x.PRODUCT_DESCRIPTION_STATE
                    VEHICLE_MODEL = x.VEHICLE_MODEL
                    VEHICLE_HORSE_POWER = x.VEHICLE_HORSE_POWER
                    VEHICLE_CC = x.VEHICLE_CC
                    VEHICLE_STRUCTURE =  x.VEHICLE_STRUCTURE
                    VEHICLE_MANUFACTURE_YEAR = x.VEHICLE_MANUFACTURE_YEAR
                    VEHICLE_MANUFACTURE_COUNTRY = x.VEHICLE_MANUFACTURE_COUNTRY
                    VEHICLE_MILEAGE = x.VEHICLE_MILEAGE
                    VEHICLE_INTERCHANGE_PARTNUMBER = x.VEHICLE_INTERCHANGE_PARTNUMBER
                    VEHICLE_GEAR_STICK = x.VEHICLE_GEAR_STICK
                    WATER_RESISTANCE = x.WATER_RESISTANCE
                    SCREEN_RESOLUTION = x.SCREEN_RESOLUTION
                    SCREEN_HZ = x.SCREEN_HZ
                    BUILD_LOCATION = x.BUILD_LOCATION
                    BUILD_AREA = x.BUILD_AREA
                    BUILDING_FLOOR = x.BUILDING_FLOOR
                    BUILD_DECORATION = x.BUILD_DECORATION
                    BUILD_ROOMS_NUMBER = x.BUILD_ROOMS_NUMBER
                    UPLOAD_DATE = x.UPLOAD_DATE
                    VEHICLE_FUEL_TYPE_NAME = x.VEHICLE_FUEL_TYPE_NAME
                    VEHICLE_CLASS = x.VEHICLE_CLASS
                    DIGITAL_TYPE = x.DIGITAL_TYPE
                    BUILD_TYPE_NAME = x.BUILD_TYPE_NAME
                }
            }else{
                imageArray.push(x.IMAGE)
                if(i == data.length-1){
                    mainArray.push({"id":x.PRODUCT_ID,"auction":x.AUCTION_ID,"clientID":x.CLINT_ID,"title":x.TITLE,"image":imageArray,
                    "price":x.PRICE_OF_INSTANS,"initial_price":x.PRICE_OF_AUCTION,'brand':x.PRODUCT_BRAND,"desc":x.DESCRIPTION,'size':x.PRODUCT_SIZE,
                    'storage':x.PRODUCT_STORAGE,'summary':x.PRODUCT_SUMMARY,'matrial':x.PRODUCT_MATERIAL,'color':x.PRODUCT_COLOR,'paymentDate':x.PRODUCT_PAYMENT_DATE,
                    'productDescripitionState':x.PRODUCT_DESCRIPTION_STATE,'startTime':x.STARTTIME,'endTime':x.ENDTIME,"Category":x.CATEGORY,"payWay":x.PAYWAY,
                    "state":x.STATE,'VEHICLE_MODEL':x.VEHICLE_MODEL,'VEHICLE_HORSE_POWER':x.VEHICLE_HORSE_POWER,
                    'VEHICLE_CC':x.VEHICLE_CC,'VEHICLE_STRUCTURE':x.VEHICLE_STRUCTURE,'VEHICLE_MANUFACTURE_YEAR':x.VEHICLE_MANUFACTURE_YEAR,
                    'VEHICLE_MANUFACTURE_COUNTRY':x.VEHICLE_MANUFACTURE_COUNTRY,'VEHICLE_MILEAGE':x.VEHICLE_MILEAGE,'VEHICLE_INTERCHANGE_PARTNUMBER':x.VEHICLE_INTERCHANGE_PARTNUMBER
                    ,'VEHICLE_GEAR_STICK':x.VEHICLE_GEAR_STICK,'WATER_RESISTANCE':x.WATER_RESISTANCE,'SCREEN_RESOLUTION':x.SCREEN_RESOLUTION,'SCREEN_HZ':x.SCREEN_HZ
                    ,'BUILD_LOCATION':x.BUILD_LOCATION,'BUILD_AREA':x.BUILD_AREA,'BUILDING_FLOOR':x.BUILDING_FLOOR,'BUILD_DECORATION':x.BUILD_DECORATION,'BUILD_ROOMS_NUMBER':BUILD_ROOMS_NUMBER
                    ,'UPLOAD_DATE':x.UPLOAD_DATE,'VEHICLE_FUEL_TYPE_NAME':x.VEHICLE_FUEL_TYPE_NAME,'VEHICLE_CLASS':x.VEHICLE_CLASS,'DIGITAL_TYPE':x.DIGITAL_TYPE
                    ,'BUILD_TYPE_NAME':x.BUILD_TYPE_NAME})
                }
            }
        })
        db.data.splice(0,(db.data.length+1))
        res.send(mainArray)

    })
})
app.get('/getNewUsers',(req,res)=>{
    NewUsers().then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/product/bid',(req,res)=>{
    const {productId} = req.body
    const {paywayId} = req.body
    ProductBid(productId,paywayId).then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/insertNewAdmin',(req,res)=>{
    const {firstname,lastname,username,phone,otherPhone,address,birthday,SSN,email,password
        ,gender,currentDate,manager,startDayWork,ImageURL,imageFile} = req.body
    let userNumber = 0
    getmaxId('user_id','users').then((maxNumber)=>{
        userNumber = (maxNumber[0].NUM + 1)
        insertUser((maxNumber[0].NUM + 1),firstname,lastname,username,phone,otherPhone,address,birthday,SSN,email,password,gender,currentDate).then((state)=>{
            getmaxId('admin_id','ADMIN').then((maxId)=>{
                let buffer = new Buffer.from(ImageURL.split(',')[1],"base64")
                const filePath = `/public/images/admin/${imageFile}`
                fs.writeFileSync(path.join(__dirname,filePath),buffer)
                const pathofData = `/images/admin/${imageFile}`
                insertAdmin((maxId[0].NUM + 1),pathofData,manager,startDayWork,userNumber).then((lastState)=>{
                    res.send(lastState)
                })
            })
        })
    })
})
app.get('/getAllTransactionAuction',(req,res)=>{
    allTransactionAuction().then((data)=>{
        res.send(data)
    })
})
app.post('/acceptProduct',(req,res)=>{
    const {productId} = req.body
    actionProduct(productId,1).then((data)=>{
        
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/refuseProduct',(req,res)=>{
    const {productId} = req.body
    actionProduct(productId,0).then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/acceptDeposit',(req,res)=>{
    const {depositId,massage,date,username} = req.body
    actionDeposit(depositId,1,massage,date,decrypt(JSON.parse(username))).then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/refuseDeposit',(req,res)=>{
    const {depositId,massage,date,username,report} = req.body
    actionDeposit(depositId,0,massage,date,decrypt(JSON.parse(username))).then(()=>{
        updateDeposte(depositId,'null').then(()=>{
            getmaxId('accept_particpation_id','accept_particpation').then((maxAcceptId)=>{
                insertAcceptParticipation((maxAcceptId[0].NUM + 1),depositId).then((results)=>{
                    res.send(results)
                })
            })
        })
    })
})
app.post('/resonRefuse',(req,res)=>{
    const {depositId} = req.body
    const {report} = req.body
    resonRefuse(depositId,report).then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/userDataByUsername',(req,res)=>{
    const {username} = req.body
    userDataByUserName(decrypt(JSON.parse(username))).then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/Insert/Permision/Admin',(req,res)=>{
    const {username} = req.body
    const {permissions} = req.body
    permissionForAdmin(username,permissions).then((results)=>{
        res.send(results)
    })
})
app.post('/Delete/Permision/Admin',(req,res)=>{
    const {username} = req.body
    removeAdminPermintionByName(username).then((results)=>{
        res.send(results)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/owner/Permision/Admin',(req,res)=>{
    const {name} = req.body
    ownerAdminPermission(name).then((results)=>{
        res.send(results)
        db.data.splice(0,(db.data.length+1))
    })
})
app.get('/getAllProductsInCategory',(req,res)=>{
    db.data.splice(0,(db.data.length+1))
    ALLProductsInCategories().then((data)=>{
        let id = -1
        let imageArray=[]
        let mainArray=[]
        let title,Category,payWay,price,desc,state,initial_price,brand,model,color,size,storage,summary,matrial
        ,paymentDate,productDescripitionState,startTime,endTime
        data.map((x,i)=>{
            if(id !== x.ID){
                if(i==0){
                    imageArray.push(x.IMAGE)
                    id = x.ID
                    title = x.TITLE
                    Category = x.CATEGORY
                    payWay = x.PAYWAY
                    price = x.PRICE_OF_INSTANS
                    initial_price=x.PRICE_OF_AUCTION
                    desc = x.DESCRIPTION
                    state = x.STATE
                    brand=x.BRAND
                    model=x.VEHICLE_MODEL
                    color=x.PRODUCT_COLOR
                    size=x.PRODUCT_SIZE
                    storage=x.PRODUCT_STORAGE
                    summary=x.PRODUCT_SUMMARY
                    matrial=x.PRODUCT_MATERIAL
                    paymentDate=x.PRODUCT_PAYMENT_DATE
                    productDescripitionState=x.PRODUCT_DESCRIPTION_STATE
                    startTime=x.STARTTIME
                    endTime=x.ENDTIME
                }else{
                    mainArray.push({"id":id,"title":title,"image":imageArray,"price":price,"initial_price":initial_price,'brand':brand,"desc":desc,'size':size,'storage':storage,'summary':summary,'matrial':matrial,'color':color,'paymentDate':paymentDate,'productDescripitionState':productDescripitionState,'startTime':startTime,'endTime':endTime,"Category":Category,"payWay":payWay,"state":state})
                    imageArray = []
                    imageArray.push(x.IMAGE)
                    id = x.ID
                    title = x.TITLE
                    Category = x.CATEGORY
                    payWay = x.PAYWAY
                    price = x.PRICE_OF_INSTANS
                    initial_price=x.PRICE_OF_AUCTION
                    desc = x.DESCRIPTION
                    state = x.STATE
                    brand=x.BRAND
                    model=x.VEHICLE_MODEL
                    color=x.PRODUCT_COLOR
                    size=x.PRODUCT_SIZE
                    storage=x.PRODUCT_STORAGE
                    summary=x.PRODUCT_SUMMARY
                    matrial=x.PRODUCT_MATERIAL
                    paymentDate=x.PRODUCT_PAYMENT_DATE
                    productDescripitionState=x.PRODUCT_DESCRIPTION_STATE
                    startTime=x.STARTTIME
                    endTime=x.ENDTIME
                }
            }else{
                imageArray.push(x.IMAGE)
                if(i == data.length-1 ){
                    mainArray.push({"id":id,"title":title,"image":imageArray,"price":price,"initial_price":initial_price,'brand':brand,"desc":desc,'size':size,'storage':storage,'summary':summary,'matrial':matrial,'color':color,'paymentDate':paymentDate,'productDescripitionState':productDescripitionState,'startTime':startTime,'endTime':endTime,"Category":Category,"payWay":payWay,"state":state})
                }
            }
        })
        res.send(data)
        // console.log(data)
    })
})
app.get('/getPersentage',(req,res)=>{
    buyerPersantge().then((data)=>{
        res.send(data)
    })
})
app.get('/getPersentageSeller',(req,res)=>{
    sellerPersantge().then((data)=>{
        res.send(data)
    })
})
app.get('/getPersentageBuyer',(req,res)=>{
    BuyerPersantge().then((data)=>{
        res.send(data)
    })
})
app.post('/updateNewDeposite',(req,res)=>{
    const {depositID} = req.body
    const {imageURL,imageFile} = req.body
    let buffer = new Buffer.from(imageURL.split(',')[1],"base64")
    const filePath = `/public/images/deposite/recipt/${imageFile.replaceAll(' ', '_')}`
    fs.writeFileSync(path.join(__dirname,filePath),buffer)
    const pathofData = `/images/deposite/recipt/${imageFile.replaceAll(' ', '_')}`
    updateDeposte(depositID,pathofData).then((result)=>{
        res.send(result)
    })
})
app.post('/updateNewDeposite/Paymob',(req,res)=>{
    const {depositID} = req.body
    const {imageURL,imageFile} = req.body
    let buffer = new Buffer.from(imageURL.split(',')[1],"base64")
    const filePath = `/public/images/deposite/recipt/${imageFile.replaceAll(' ', '_')}`
    fs.writeFileSync(path.join(__dirname,filePath),buffer)
    const pathofData = `/images/deposite/recipt/${imageFile.replaceAll(' ', '_')}`
    updateDeposte(depositID,pathofData).then((result)=>{
        res.send(result)
    })
})
app.post('/insertNewDeposite/Paymob',(req,res)=>{
    const {username} = req.body
    const {productId} = req.body
    const {imageUrl,imageFile} = req.body
    const {price} = req.body
    let depositeNumber = 0
    let clientId = 0
    getmaxId('deposite_id','deposite').then((maxNumber)=>{
        depositeNumber = (maxNumber[0].NUM + 1)
        getClientId(decrypt(JSON.parse(username))).then((clintData)=>{
            clientId = (clintData[0].CLINT_ID)
            getAuctionId(productId).then((auctionData)=>{
                let buffer = new Buffer.from(imageUrl.split(',')[1],"base64")
                const filePath = `/public/images/deposite/recipt/${imageFile.replaceAll(' ', '_')}`
                fs.writeFileSync(path.join(__dirname,filePath),buffer)
                const pathofData = `/images/deposite/recipt/${imageFile.replaceAll(' ', '_')}`
                insertDeposte(depositeNumber,price,pathofData,clientId,2,auctionData[0].AUCTION_ID).then(()=>{
                    getmaxId('accept_particpation_id','accept_particpation').then((maxAcceptId)=>{
                        insertAcceptParticipation((maxAcceptId[0].NUM + 1),depositeNumber).then((results)=>{
                            res.send(results)
                        })
                    })
                    
                })
            })
        })
    })
})
app.post('/insertNewDeposite/buyer',(req,res)=>{
    const {clientID} = req.body
    const {productId} = req.body
    const {price} = req.body
    let depositeNumber = 0
    getmaxId('deposite_id','deposite').then((maxNumber)=>{
        depositeNumber = (maxNumber[0].NUM + 1)
        console.log(productId)
        getAuctionId(productId).then((auctionData)=>{
            insertDeposte(depositeNumber,price,null,clientID,1,auctionData[0].AUCTION_ID).then(()=>{
                getmaxId('accept_particpation_id','accept_particpation').then((maxAcceptId)=>{
                    insertAcceptParticipation((maxAcceptId[0].NUM + 1),depositeNumber).then((results)=>{
                        res.send(results)
                    })
                })
                
            })
        })    
    })
})
app.post('/insertNewDeposite',(req,res)=>{
    const {username} = req.body
    const {productId} = req.body
    const {imageFileName} = req.body
    const {imageUrl} = req.body
    const {price} = req.body
    let depositeNumber = 0
    let clientId = 0
    getmaxId('deposite_id','deposite').then((maxNumber)=>{
        depositeNumber = (maxNumber[0].NUM + 1)
        getClientId(decrypt(JSON.parse(username))).then((clintData)=>{
            clientId = (clintData[0].CLINT_ID)
            getAuctionId(productId).then((auctionData)=>{
                let buffer = new Buffer.from(imageUrl.split(',')[1],"base64")
                const filePath = `/public/images/deposite/recipt/${imageFileName}`
                fs.writeFileSync(path.join(__dirname,filePath),buffer)
                const pathofData = `/images/deposite/recipt/${imageFileName}`
                insertDeposte(depositeNumber,price,pathofData,clientId,2,auctionData[0].AUCTION_ID).then(()=>{
                    getmaxId('accept_particpation_id','accept_particpation').then((maxAcceptId)=>{
                        insertAcceptParticipation((maxAcceptId[0].NUM + 1),depositeNumber).then((results)=>{
                            res.send(results)
                        })
                    })
                    
                })
            })
        })
    })
})
app.post('/checkStateOfDeposite',(req,res)=>{
    const {productId,username} = req.body
    getAuctionId(productId).then((auctionID)=>{
        checkDeposite(auctionID[0].AUCTION_ID,decrypt(JSON.parse(username))).then((data)=>{
            res.send(data)
        })
    })
})
app.post('/checkUserDeposite',(req,res)=>{
    const {productId,username} = req.body
    getAuctionId(productId).then((auctionID)=>{
        checkDepositeAccept(auctionID[0].AUCTION_ID,decrypt(JSON.parse(username))).then((data)=>{
            res.send(data)
        })
    })
})
app.post('/insertDeposite',(req,res)=>{
    const {price,time,depositId} = req.body
    let maxId = 0
    getmaxId('bid_id','bid').then((maxNumber)=>{
        maxId = (maxNumber[0].NUM + 1)
        insertNewBid(maxId,price,time,depositId).then((resulte)=>{
            res.send(resulte)
        })
    })
})
app.post('/checkLastUserDeposit',(req,res)=>{
    const {depositID,username} = req.body
    checkIfUserBid(depositID,decrypt(JSON.parse(username))).then((data)=>{
        res.send(data)
    })
})
app.post('/updateBid',(req,res)=>{
    const {money,time,depositeId,bidId} = req.body
    updateBid(money,time,depositeId,bidId).then((data)=>{
        res.send(data)
    })
})
app.post('/updateSoldBid',(req,res)=>{
    const {productId} = req.body
    updateSoldBid(productId).then((data)=>{
        res.send(data)
    })
})
app.post('/Contect',(req,res)=>{
    const {name, sendTo ,email, phone, massage} = req.body
    const mail = {
        from: 'auctionlive0@gmail.com',
        to: sendTo,
        subject: "Contect From Portfolio",
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Phone: ${phone}</p>
               <p>Massage: ${massage}</p>`
    };
    contactEmail.verify((error)=>{
        if(error){
            console.log(error)
        }else{
            console.log("Ready to send")
        }
    })
    contactEmail.sendMail(mail,(error)=>{
        if(error){
            res.send(error);
        }else{
            res.send({code: 200, status:"Massage Sent"})
        }
    })
})
app.post('/Contect/Reporter',(req,res)=>{
    const {sendTo,review} = req.body
    const mail = {
        from: 'auctionlive0@gmail.com',
        to: sendTo,
        subject: "Contect From Portfolio",
        html: `<p>review: ${review}</p>`
    };
    contactEmail.verify((error)=>{
        if(error){
            console.log(error)
        }else{
            console.log("Ready to send")
        }
    })
    contactEmail.sendMail(mail,(error)=>{
        if(error){
            res.send(error);
        }else{
            res.send({code: 200, status:"Massage Sent"})
        }
    })
})
app.post('/user/products',(req,res)=>{
    const {username} = req.body
    userProduct(decrypt(JSON.parse(username))).then((data)=>{
        res.send(data)
        db.data.splice(0,(db.data.length+1))
    })
})
app.post('/insert/rating/form',(req,res)=>{
    const {clientID,currentDate} = req.body
    const {rateId} = req.body
    const IDs = []
    var maxReportId = 0
    getmaxId('report_id','report').then((maxNumber)=>{
        maxReportId = (maxNumber[0].NUM + 1)
        insertRateToSystem(maxReportId,clientID,currentDate).then((status)=>{
            commenReportIdsType(rateId).then((commonReportIds)=>{
                commonReportIds.map((x)=>{
                    IDs.push(x.COMMON_REPORT_ID)
                })
                res.send({IDs,maxReportId})
            })
        })
    })
})
app.post('/insert/review/report',(req,res)=>{
    const {username,reviewReport,currentDate,reportId} = req.body
    var maxReportId = 0
    getmaxId('review_report_id','review_report').then((maxNumber)=>{
        maxReportId = (maxNumber[0].NUM + 1)
        insertReviewReport(maxReportId,reviewReport,currentDate,decrypt(JSON.parse(username)),reportId).then((status)=>{
            res.send(status)
        })
    })
})
app.post('/commen/report/ID',(req,res)=>{
    const {rateId} = req.body
    const IDs = []
    commenReportIdsType(rateId).then((commonReportIds)=>{
        commonReportIds.map((x)=>{
            IDs.push(x.COMMON_REPORT_ID)
        })
        res.send(IDs)
    })
})

app.post('/insert/rating/form/seller',(req,res)=>{
    const {clientID,currentDate,bidId} = req.body
    const rateId = 2
    const IDs = []
    var maxReportId = 0
    getmaxId('report_id','report').then((maxNumber)=>{
        maxReportId = (maxNumber[0].NUM + 1)
        insertRateSeller(maxReportId,clientID,currentDate,bidId).then((status)=>{
            commenReportIdsType(rateId).then((commonReportIds)=>{
                commonReportIds.map((x)=>{
                    IDs.push(x.COMMON_REPORT_ID)
                })
                res.send({IDs,maxReportId})
            })
        })
    })
})
app.post('/insert/rating/form/buyer',(req,res)=>{
    const {clientID,currentDate,productId} = req.body
    const rateId = 2
    const IDs = []
    var maxReportId = 0
    getmaxId('report_id','report').then((maxNumber)=>{
        maxReportId = (maxNumber[0].NUM + 1)
        insertRateBuyer(maxReportId,clientID,currentDate,productId).then((status)=>{
            commenReportIdsType(rateId).then((commonReportIds)=>{
                commonReportIds.map((x)=>{
                    IDs.push(x.COMMON_REPORT_ID)
                })
                res.send({IDs,maxReportId})
            })
        })
    })
})
app.post('/insert/rating/form/final/report',(req,res)=>{
    const {maxReportId,commonReportId} = req.body
    insertRateDetailsToSystem(maxReportId,commonReportId).then((lastState)=>{
        console.log(lastState)
        res.send(lastState)
    })
})
app.post('/rateRequire',(req,res)=>{
    const {username} = req.body
    const rateRequireArray = new Array()
    getDataRate(decrypt(JSON.parse(username))).then((data)=>{
        data.map((value)=>{
            rateRequireArray.push(value)
        })
        res.send({rateRequireArray})
    })
})
app.post('/report/client/send',(req,res)=>{
    const {userID} = req.body
    getReportData(userID).then((data)=>{
        res.send(data)
    })
})
app.post('/ubdate/finalReport',(req,res)=>{
    const {rateVal,reportId,commenReportId,userOpinion} = req.body
    if(rateVal !== undefined){
        updateFinalReport(rateVal,reportId,commenReportId).then((outputState)=>{
            res.send(outputState)
        })
    }else{
        updateFinalReportText(userOpinion,reportId,commenReportId).then((outputState)=>{
            res.send(outputState)
        })
    }
})
app.post('/category/sub/category',(req,res)=>{
    const {categoryName} = req.body
    subOfCategory(categoryName).then((subCategory)=>{
        res.send(subCategory)
    })
})
app.post('/Update/User/Data',(req,res)=>{
    const {userFullName,userEmail,userAddress,userPhone1,userPhone2} = req.body
    updateUserData(userFullName,userEmail,userAddress,userPhone1,userPhone2).then((state)=>{
        res.send(state)
    })
})
app.get('/Terms/Condition',(req,res)=>{
    termsAndCondition().then((rules)=>{
        res.send(rules)
    })
})
app.get('/Trinding/Product',(req,res)=>{
    trendProduct().then((results)=>{
        res.send(results)
    })
})
app.post('/New/Category',(req,res)=>{
    const {categoryName , subCategoryId , ImageURL , imageFile} = req.body
    let maxNmberId = 0
    getmaxId('category_id','category').then((maxId)=>{
        maxNmberId = (maxId[0].NUM + 1)
        let buffer = new Buffer.from(ImageURL.split(',')[1],"base64")
        const filePath = `/public/images/category/${imageFile}`
        fs.writeFileSync(path.join(__dirname,filePath),buffer)
        const pathofData = `/images/category/${imageFile}`
        insertNewCategory(maxNmberId , categoryName , pathofData , subCategoryId).then((state)=>{
            res.send(state)
        })
    })
})
app.post('/update/finalReport/Angry',(req,res)=>{
    const {rateVal , reportId , commenReportId , userOpinion} = req.body
    if(rateVal !== null){
        updateFinalReport(rateVal,reportId,commenReportId).then((outputState)=>{
            res.send(outputState)
        })
    }else{
        updateFinalReportText(userOpinion,reportId,commenReportId).then((outputState)=>{
            res.send(outputState)
        })
    }
})

// route of Data analysis
app.post('/Number/Product/Category/Sell',(req,res)=>{
    const {year} = req.body
    saleInEachCategoryAllMonth(year).then((results)=>{
        res.send(results)
    })
})
app.get('/Profit/Last/Month',(req,res)=>{
    const currentMonth = new Date().getMonth()+1
    const lastMonth = currentMonth - 1
    amountOfProfitInEachCategory(currentMonth ,lastMonth).then((results)=>{
        res.send(results)
    })
})
app.get('/Employee/Data',(req,res)=>{
    var emplyeeData = []
    var SaleryData = []
    var sellerInfo = []
    var buyerInfo = []
    var buyerInfoAnalysis = []
    getEmployeeData().then((results)=>{
        results.map((x)=>{
            emplyeeData.push(x)
        })
        totalSalaryPay().then((Salery)=>{
            Salery.map((x)=>{
                SaleryData.push(x)
            })
            sellerData().then((seller)=>{
                seller.map((x)=>{
                    sellerInfo.push(x)
                })
                buyerData().then((buyer)=>{
                    seller.map((x)=>{
                        buyerInfo.push(x)
                    })
                    buyerDataAnalysis().then((buyerAnalysis)=>{
                        buyerAnalysis.map((x)=>{
                            buyerInfoAnalysis.push(x)
                        })
                        res.send({'emplyees':emplyeeData,'salery':SaleryData,'sellers':sellerInfo,'buyers':buyerInfo,'buyersAnaliysis':buyerInfoAnalysis})
                    })
                })
            })
        })
    })
})
app.get('/Employee/Salary',(req,res)=>{
    totalSalaryPay().then((results)=>{
        res.send(results)
    })
})
app.get('/Seller/Data',(req,res)=>{
    sellerData().then((results)=>{
        res.send(results)
    })
})
app.get('/Buyer/Data',(req,res)=>{
    buyerData().then((results)=>{
        res.send(results)
    })
})
// app.post('/checkProductIfSold',async(req,res)=>{
//     const {productId} = req.body
//     const {paywayId} = req.body
//     let clientArray = new Array()
//     const rateId = [4,3]
//     // updateSoldBid(productId).then(()=>{
//         await ProductBid(productId,paywayId).then(async(data)=>{
//             res.send(data)
//             // await Promise.all(
//             //     data.map(async(cli)=>{
//             //         console.log(cli.CLINT_ID)
//             //         var maxReportId = 0
//             //         const dateTime = new Date()
//             //             getmaxId('report_id','report').then(async(maxNumber)=>{
//             //                 console.log(maxNumber)
//             //                 // maxReportId = (maxNumber[0].NUM + 1)
//             //                 // await insertRateToSystem(maxReportId,cli.CLINT_ID,`${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${dateTime.getDate()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`).then(async(status)=>{
//             //                 //      res.send(status)
//             //                 // })
//             //             })
                    
//             //     })
//             // )
//             // userDataByClientId(data[0].OWNERPRODUCT).then((clientData)=>{
                
//             // })
//         })
//     // })
// })

app.get('/Trind/Product',(req,res)=>{
    trendProduct().then((data)=>{
        res.send(data)
    })
})


server.listen(5000, ()=>{
    console.log('http://localhost:5000')
})