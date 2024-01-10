const sequelize = require('sequelize');


var mysqlconnection = new sequelize('gamersempdb','root','12345678',{host:'localhost', dialect:'mysql'})
// mysqlconnection.connect((err)=>{
//     if(err){
//         console.log('error in DB connection: '+ JSON.stringify(err,undefined,2));
//     }else{
//         console.log('DB connected Successfully');
//     }
// })
module.exports=mysqlconnection

