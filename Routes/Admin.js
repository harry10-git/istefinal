///IMPORTING PACKAGES
const AdminBro=require('adminjs')
const AdminBroExpress=require('@adminjs/express')
const AdminBroMongoose=require('@adminjs/mongoose')
const mongoose = require('mongoose');

///CALLING ALL MODELS
const Board=require('../Models/Board')
const Event=require('../Models/Events')
const Acumen=require('../Models/Acumen')
const Timer=require('../Models/Timer')
const MC=require('../Models/MCWC').MCData
const WC=require('../Models/MCWC').WCData

/// INITIALISING ADMINBRO
AdminBro.registerAdapter({
    Database:AdminBroMongoose.Database,
    Resource:AdminBroMongoose.Resource
    
})

/// SETTING UP ADMINBRO BY CONNECTING TO DATABASE, LOGO AND NAME OF ISTE MANIPAL
const adminOptions = {
    databases: [mongoose],
    rootpath:'/admin',
    branding:{
        logo:'https://media-exp1.licdn.com/dms/image/C510BAQEQs_7u1dJOEQ/company-logo_200_200/0/1555923562100?e=2147483647&v=beta&t=_vgXyUtUP00j4S5TTWq_mGr0aI_ADt4qJJbG-zQ8ObQ',
        companyName:'ISTE Manipal'
    },
  }



const adminBro=new AdminBro(
    adminOptions
)

///ADMIN CREDENTIALS
const Admin={
    email:'admin@istemanipal.com',
    password:'studentchapteriste'

}

/// SETTING UP AUTHENTICATIONS
const authenticate = async (email, password) => {
    if (email === Admin.email && password === Admin.password) {
      return Promise.resolve(Admin)
    }
    return null
  }

const router=AdminBroExpress.buildAuthenticatedRouter(
adminBro,
    {
       
        cookieName:'Woman',
        cookiePassword:'secrethaipatanahi',
        authenticate:async(email,password)=>{
            if(email===Admin.email && password===Admin.password){
                return Admin
            }else{
                return null
            }
        
        },
    
    },
    

)


//const router=AdminBroExpress.buildRouter(adminBro)
module.exports=router