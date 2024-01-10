const superAdminModel = require('../models/superAdmin.model');
const branchManagerModel = require('../models/branchManager.model');
const salesPersonModel = require('../models/salesPerson.model');

const signAccessToken = require('../utils/token');

async function loginUser(req,res){
    // try{
        const {id, role, password} = req.body;
        
        if(role === 'superAdmin'){
            console.log(role);
            const superAdmin = await superAdminModel.findOne({where : {id:id}});
            if(!superAdmin){
                res.status(404).json({"message": "User Not Found"});
                return;
            }
            if(superAdmin.password !== password){
                res.status(401).json({"message": "Incorrect Password!"});
                return;
            }
            const accessToken = await signAccessToken(id,role);
            res.cookie('accessToken',accessToken,{httpOnly : true, sameSite: 'None', secure: true});
            res.status(200).json({"message":"Login Successfull!"});
        } else if(role === 'branchManager'){
            const branchManager = await branchManagerModel.findOne({where : {id: id}});
            if(!branchManager){
                res.status(404).json({"message": "User Not Found"});
                return;
            }
            if(branchManager.password !== password){
                res.status(401).json({"message": "Incorrect Password!"});
                return;
            }
            const accessToken = await signAccessToken(id,role);
            res.cookie('accessToken',accessToken,{httpOnly : true, sameSite: 'None', secure: true});
            res.status(200).json({"message":"Login Successfull!"});
        } else if(role === 'salesPerson'){
            const salesPerson = await salesPersonModel.findOne({where : {id : id}});
            if(!salesPerson){
                res.status(404).json({"message": "User Not Found"});
                return;
            }
            if(salesPerson.password !== password){
                res.status(401).json({"message": "Incorrect Password!"});
                return;
            }
            const accessToken = await signAccessToken(id,role);
            res.cookie('accessToken',accessToken,{httpOnly : true, sameSite: 'None', secure: true});
            res.status(200).json({"message":"Login Successfull!"});
        } else{
            res.status(400).json({"message":"Enter Correct Role"});
        }
    // }
    // catch(err){

        // res.status(500).json({"message": "Server Error!"})
    // }  
}

module.exports = loginUser;