const superAdminModel = require('../models/superAdmin.model');
const branchManagerModel = require('../models/branchManager.model');
const salesPersonModel = require('../models/salesPerson.model');

async function registerUser(req,res){
    const admin = req.admin;
    const {id,role,userName,password,contactNo} = req.body;
    const checkBranchManager = await branchManagerModel.findOne({where:{id}});
    const checkSalesPerson = await salesPersonModel.findOne({where:{id}});
    if(checkBranchManager || checkSalesPerson){
        res.status(400).json({"message":"User-Id already exists"});
        return;
    }
    if(admin.role === 'superAdmin'){
        if(role === 'branchManager'){
            const newBranchManager = await branchManagerModel.create({
                id,
                role,
                userName,
                password,
                contactNo,
            })
            await newBranchManager.save();
            res.status(201).json({"message":"Branch-Manager Created Successfully"});
        } else if(role === 'salesPerson'){
            const newsalesPerson = await salesPersonModel.create({
                id,
                role,
                userName,
                password,
                contactNo
            });
            await newsalesPerson.save();
            res.status(201).json({"message":"Sales Person Created Successfully"});
        }
    }  else if(admin.role === 'branchManager'){
        
        const newsalesPerson = await salesPersonModel.create({
            id,
            role,
            userName,
            password,
            contactNo,
            branchManagerAssociated: admin.aud
        });
        await newsalesPerson.save();
        res.status(201).json({"message":"Sales Person Created Successfully"});
        // const branchManager = await branchManagerModel.findOne({
        //     where:{id:admin.id}
        // })
        // const salesPersonsAssociated = branchManager.salesPersonsAssociated;
        // salesPersonsAssociated.push(id);
        // await branchManagerModel.update({salesPersonsAssociated},{where:{id:admin.id}, returning:true})
    }
}

module.exports = registerUser;



