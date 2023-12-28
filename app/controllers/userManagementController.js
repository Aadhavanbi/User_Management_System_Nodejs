const {User, BusinessGroup,  Address, UserToGroup, AddressType, Business, City, State, Country, HistoryRecord, GroupPermission, PermissionMaster } = require('../models')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {logMsg} = require('../services/logger')
const {isValidEmail,isPasswordStrong} = require('../services/mailpasswordFormat.Helpper');
const nodeMailerService = require('../services/nodeMailer')
var jwt = require('jsonwebtoken');
const secretKeyJwt = process.env.SECRETKEY;
const generateCode = require('random-code-generate');
const generateRandomString = require('../services/generateRandomString.helpper');


// Start Add New Business
module.exports.addBusiness= async(req, res, next)=>{
    try {
        //this will generate random string 
        const secretketgenerate = generateRandomString(8);
        const info= {
            businessName : req.body.businessName,
            uniqueBusinessKey : secretketgenerate
        }
        //add a new business in database
        const datastore = await Business.create(info);
        if (datastore) {
            const databaseBusinessID = datastore.dataValues.id;
            const databaseBusinessName = datastore.dataValues.businessName;
            logMsg.info({message:"Business Add Successfully!", PrimaryId:databaseBusinessID, businessName:databaseBusinessName});
            res.send({ status: 200, message: "Success", data: datastore });
        } else {
            logMsg.info({status:500,message:"Business Not Added!", businessName:info.businessName});
            res.status(500).send({message:"Business Not Added!", businessName:info.businessName})
        }
    } catch (error) {
        logMsg.info("addBusiness ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('addBusiness ->Internal Server Error!', error);
    }
}
// End Add New Business


// Start Update User the User Is exists 
module.exports.editBusiness= async(req, res, next)=>{
    try{
        const id =req.body.id;
        //find the business by id user entered
        const business= await Business.findOne({where:{id:id}});

        if (business) {   
            const info ={
                businessName:req.body.businessName,
            }
            // this will update the new data into database
            const businessUpdate = await Business.update(info,{where:{id:id}})
            //check if update
            if (businessUpdate) {
                const databaseBusinessId = businessUpdate[0];
                logMsg.info({status:200,message:"User is Update", PrimaryId:databaseBusinessId});
                res.send({status:200,message:"User is Update"})
            }else{
                logMsg.info({message:"Business Data is not Update in Database", userName: info.businessName});
                res.send({message:"Business Data is not Update in Database"})
            }
        }else{
            logMsg.info({ status: 400, message: `Entered Id not Added -> ${req.body.id}`  });
            res.status(400).send({ status: 400, message: `Entered Id not Added -> ${req.body.id}`});
        }
    } catch (error) {
        logMsg.info("editBusiness ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('editBusiness ->Internal Server Error', error);
    }
    // res.end()
}
// End Update User the User Is exists 



// Start Remove the Business
module.exports.removeBusiness= async(req, res, next)=>{
    try{
        const BusinessId = req.params.id
        if(BusinessId){
            const info ={
                isActive :0,
            }
            const business = await Business.update(info,{where:{id:BusinessId}})
            if (business) {
                logMsg.info({ status: 200, message: `Business Remove Successfully` });
                res.status(200).send({ status: 200, message: `Business Remove Successfully`  });
            }else{
                logMsg.info({ status: 400, message: `Business Remove Failed` });
                res.status(400).send({ status: 400, message: `Business Remove Failed`  });
            }

        }else{
            logMsg.info({ status: 400, message: `Entered BusinessId is not Register -> ${req.params.id}`  });
            res.status(400).send({ status: 400, message: `Entered BusinessId is not Register -> ${req.params.id}`  });

        }
    } catch (error) {
        logMsg.info("removeBusiness ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('removeBusiness ->Internal Server Error', error);
    }
    // res.end()
}
// End Remove the Business 


// Start Get All Business 
module.exports.getAllBusiness= async(req, res, next)=>{
    try{
        //find all business
        const business= await Business.findAll();
        if (business.length > 0) {   
            logMsg.info({status:200,message:"Success", data: business});
            res.send({status:200,message:"Success", data: business})
        }else{
            logMsg.info({ status: 400, message: `No Business there First Add Business `  });
            res.status(400).send({ status: 400, message: `No Business there First Add Business`});
        }

    } catch (error) {
        logMsg.info("getAllBusiness ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('getAllBusiness ->Internal Server Error', error);
    }
    // res.end()
}
// End Get All Business



// Start Get One Business 
module.exports.getBusiness= async(req, res, next)=>{
    try{
        const businessId = req.query.getBusiness
        // find one business from DB
        const business= await Business.findOne({where:{id:businessId}});
        //check if there
        if (business) {   
            logMsg.info({status:200,message:"Success", data: business});
            res.send({status:200,message:"Success", data: business})
        }else{
            logMsg.info({ status: 400, message: `No Business there First Add Business `  });
            res.status(400).send({ status: 400, message: `No Business there First Add Business`});
        }

    } catch (error) {
        logMsg.info("getAllBusiness ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('getAllBusiness ->Internal Server Error', error);
    }
    // res.end()
}
// End Get One Business



// Start Add the New User 
module.exports.addUser = async (req, res, next) => {
    try {
        //this get the email already exixts
        const user= await User.findOne({where:{email: req.body.email}});

        // only enter this if email is already not exists in DB
        if (!user) {   

            const email = req.body.email;
            //this check Valid Email Or Not
            if (await isValidEmail(email) == false) {
                logMsg.info({status:404, message:'Invalid email format'});
                return res.status(400).send({ status: 400, message: 'Invalid email format' });
            }

            const mobileNumber = req.body.mobileNumber;
            //this check MobileNumber Length is == 10
            if (mobileNumber.length != 10) {
                logMsg.info({status:400, message:'Mobile Number Must be Ten Digit'});
                return res.status(400).send({ status: 400, message: 'Mobile Number Must be Ten Digit' });
            }

            const password = req.body.password;
            //this check Password is Strong
            if (!isPasswordStrong(password)) {
                logMsg.info({status:400, message:'Password Strength is Weak  Do the Password Like This Arun@12345'});
                return res.status(400).send({ status: 400, message: 'Password Strength is Weak  Do the Password Like This Arun@12345' });
            }

            const businessId = req.body.businessId;
            
            const business = await Business.findOne({where:{id:businessId}})
            //this will check user entered BusinessId Already added or not
            if (business) {
                const uniqueBusinessKey = business.dataValues.uniqueBusinessKey;
                //Encrypt the password and store in DB
                const encryptedPassword = await bcrypt.hash(password, saltRounds)
                const info = {
                    businessId:businessId,
                    userName: req.body.userName,
                    email: email,
                    gender: req.body.gender,
                    mobileNumber: mobileNumber,
                    dateOfBirth: req.body.dateOfBirth,
                    password: encryptedPassword,
                    role: req.body.role,
                    uniqueBusinessKey: uniqueBusinessKey
                }
                    const datastore = await User.create(info);
                if (datastore) {
                    const databaseuserid = datastore.dataValues.id;
                    const databaseuseremail =datastore.dataValues.email;
                    logMsg.info({message:"User Add Successfully!" , PrimaryId:databaseuserid, Email: databaseuseremail});
                    res.send({ status: 200, message: "Success", data: datastore });
                    // res.redirect('/')
                } else {
                    logMsg.info({message:"User Not Added!", Email: email});
                    res.status(500).send({message:"User Not Added!", Email: email})
                }
            }else{
                res.status(400).send({ status: 400, message: `Business is Not there First Add Business `  });
            }
        }else{
            logMsg.info({status: 400, message: `Email Already Exists -> ${req.body.email}`});
            res.status(400).send({ status: 400, message: `Email Already Exists -> ${req.body.email}`  });
        }
    } catch (error) {
        logMsg.info("AddUser ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('Internal Server Error', error);
    }
}
// End Add the New User 




// Start get All User in Business 
module.exports.getAllUserInBusiness = async (req, res, next) => {
    try {
        const businessId =req.query.businessId;
        
        //get the All user in business get by businessId
        const user = await User.findAll({where:{businessId:businessId}})
        if (user.length > 0) {
            logMsg.info({status:200, message:"Get All User Successfully", PrimaryId:businessId});
            res.status(200).send({status:200, message:"Get All User Successfully", data:user});
        }else{
            logMsg.info({status:400, message:"Failed to get User , No User in this Business", PrimaryId:businessId});
            res.status(400).send({status:400, message:"Failed to get User , No User in this Business", PrimaryId:businessId});
        }
    } catch (error) {
        logMsg.info("getAllUserInBusiness ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('getAllUserInBusiness ->Internal Server Error', error);
    }
}
// End get All User in Business 




// Start Update User the User Is exists 
module.exports.editUser= async(req, res, next)=>{
    try{
        console.log("hi");
        const id =req.body.userId;
        console.log(id);
        const editUser= await User.findOne({where:{email: req.body.email}});
        if (editUser) {   
             
            const email = req.body.email;
            //Check Mail Format
            if (!isValidEmail(email)) {
                logMsg.info({status:404, message:'Invalid email format'});
                return res.status(400).send({ status: 400, message: 'Invalid email format' });
            }

            const mobileNumber = req.body.mobileNumber;
            //Check Mobile Number Length
            if (mobileNumber.length != 10) {
                logMsg.info({status:400, message:'Mobile Number Must be Ten Digit'});
                return res.status(400).send({ status: 400, message: 'Mobile Number Must be Ten Digit' });
            }

            const password = req.body.password;
            //Check Password Strength
            if (!isPasswordStrong(password)) {
                logMsg.info({status:400, message:'Password Strength is Weak  Do the Password Like This Arun@12345'});
                return res.status(400).send({ status: 400, message: 'Password Strength is Weak  Do the Password Like This Arun@12345' });
            }
            
            //Encrypt password And Store IN DB
            const encryptedPassword = await bcrypt.hash(password, saltRounds)

            const info ={
                    businessId:req.body.businessId,
                    userName: req.body.userName,
                    email: email,
                    gender: req.body.gender,
                    mobileNumber: mobileNumber,
                    dateOfBirth: req.body.dateOfBirth,
                    password: encryptedPassword,
                    role: req.body.role,
            }

            const userUpdate = await User.update(info,{where:{id:id}})
            if (userUpdate) {
                // const databaseUserId = userUpdate.dataValues.id;
                logMsg.info({status:200,message:"User is Update", PrimaryId:info.email});
                res.send({status:200,message:"User is Update",})
            }else{
                logMsg.info({message:"User Data is not Update in Database", userName: info.userName});
                res.send({message:"User Data is not Update in Database"})
            }
        }else{
            logMsg.info({ status: 400, message: `Entered Mail is not Register -> ${req.body.email}`  });
            res.status(400).send({ status: 400, message: `Entered Mail is not Register -> ${req.body.email}`  });

        }

    } catch (error) {
        logMsg.info("editUser ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('editUser ->Internal Server Error', error);
    }
    // res.end()
}
// End Update User the User Is exists 




// Start Update User the User Is exists 
module.exports.removeUser= async(req, res, next)=>{
    try{
        const userId = req.params.id
        if(userId){
            const info ={
                isActive :0,
            }
            const user = await User.update(info,{where:{id:userId}})
            if (user) {
                logMsg.info({ status: 200, message: `User Remove Successfully` });
                res.status(200).send({ status: 200, message: `User Remove Successfully`  });
            }else{
                logMsg.info({ status: 400, message: `User Remove Failed` });
                res.status(400).send({ status: 400, message: `User Remove Failed`  });
            }

        }else{
            logMsg.info({ status: 400, message: `Entered Mail is not Register -> ${req.body.email}`  });
            res.status(400).send({ status: 400, message: `Entered Mail is not Register -> ${req.body.email}`  });

        }
    } catch (error) {
        logMsg.info("removeUser ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('removeUser ->Internal Server Error', error);
    }
}
// End Update User the User Is exists 



// Start Add New Group
module.exports.addBusinessGroup = async(req, res, next) =>{
    try {
        const businessId = req.body.businessId;
        const business = await Business.findOne({where:{id:businessId}})

        // check user enter Business is exists in DB 
        if (business) {
            const uniqueBusinessKey = business.dataValues.uniqueBusinessKey;

            const info= {
                businessId : businessId,
                groupName : req.body.groupName,
                uniqueBusinessKey: uniqueBusinessKey
            }
            //add Group for Business in DB
            const datastore = await BusinessGroup.create(info);
            if (datastore) {
                const databasegroupId = datastore.dataValues.id;
                logMsg.info({status:200,message:"businessGroup Add Successfully!", PrimaryId:databasegroupId, groupName: info.groupName});
                res.send({ status: 200, message: "Success", data: datastore });
            } else {
                logMsg.info({status:500,message:"businessGroup Not Added!", groupName: info.groupName});
                res.status(500).send({status:500,message:"businessGroup Not Added!", groupName: info.groupName})
            }
        } else {
            logMsg.info({status:500,message:"Enter business Not Added!", businessId: businessId});
            res.status(500).send({status:500,message:"Enter business Not Added!", businessId: businessId})
        }
        
    } catch (error) {
        logMsg.info("AddGroup ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('AddGroup ->Internal Server Error!', error);
    }

}
// End Add New Group



// Start Add New Group
module.exports.getAllBusinessGroup = async(req, res, next) =>{
    try {
        const businessId = req.query.businessId;
        
        //get all the BusinessGroup in business
        const businessGroup = await BusinessGroup.findAll({where:{businessId:businessId}})
        if (businessGroup.length > 0) {
            logMsg.info({status:200, message:"Get All businessGroup Successfully", PrimaryId:businessId});
            res.status(200).send({status:200, message:"Get All businessGroup Successfully", data:businessGroup});
        } else {
            logMsg.info({status:400, message:"Failed to get BusinessGroup , No BusinessGroup in this Business", PrimaryId:businessId});
            res.status(400).send({status:400, message:"Failed to get BusinessGroup , No BusinessGroup in this Business", PrimaryId:businessId});
        }

        
    } catch (error) {
        logMsg.info("getAllBusinessGroup ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('getAllBusinessGroup ->Internal Server Error!', error);
    }

}
// End Add New Group


// Start Get All Users in Business Group
module.exports.getAllUserInBusinessGroup = async(req, res, next) =>{
    try {
        
        const businessGroupID = req.query.businessGroupID;
        //get the User list by Business id to get all 
        const getUserId = await UserToGroup.findAll({ where: { groupId: businessGroupID } });

        if (getUserId.length > 0) { 
            const users = [];

            //foreach the UserInGroup by Id and find the user in User Table and push in the users array
            for (const userId of getUserId) {
                const userIda = userId.dataValues.id;
                const user = await User.findAll({ where: { id: userIda } });
                users.push(user);
            }

            res.send({status:200,message: "SuccesFully ", data: users });
        } else {
            res.status(404).send({ message: 'No users found for the given Group ID' });
        }
       
    } catch (error) {
        logMsg.info("getAllBusinessGroup ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('getAllBusinessGroup ->Internal Server Error!', error);
    }

}
// EndGet All Users in Business Group



// Start Edit Business Group
module.exports.editBusinessGroup = async(req, res, next) =>{
    try {
        const info= {
            id: req.body.id,
            businessId : req.body.businessId,
            groupName : req.body.groupName,
        }
        //Update the Group Data in DB
        const datastore = await BusinessGroup.update(info,{where:{id:info.id}});
        if (datastore) {
            const databaseGroupId = datastore[0];
            logMsg.info({status:200,message:"businessGroup Add Successfully!", PrimaryId:databaseGroupId, groupName: info.groupName});
            res.send({ status: 200, message: "Success", data: datastore });
        } else {
            logMsg.info({status:500,message:"businessGroup Not Added!", groupName: info.groupName});

            res.status(500).send({status:500,message:"businessGroup Not Added!", groupName: info.groupName})
        }
    } catch (error) {
        logMsg.info("AddGroup ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('AddGroup ->Internal Server Error!', error);
    }

}
// End Edit Business Group


// Start Edit Business Group
module.exports.removeBusinessGroup = async(req, res, next) =>{
    try {

        const businessGroupId = req.params.id;

        const info= {
            isActive :0
        }
        //Update the Group Data in DB
        const datastore = await BusinessGroup.update(info,{where:{id:businessGroupId}});
        if (datastore) {
            logMsg.info({status:200,message:"BusinessGroup Remove Successfully!"});
            res.send({ status: 200, message: "BusinessGroup Remove Successfully!", data: datastore });
        } else {
            logMsg.info({status:500,message:"BusinessGroup Remove Failed!"});
            res.status(500).send({status:500,message:"BusinessGroup Remove Failed!"})
        }
    } catch (error) {
        logMsg.info("removeBusinessGroup ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('removeBusinessGroup ->Internal Server Error!', error);
    }

}
// End Edit Business Group



// Start Join the User with Group
module.exports.addUserToGroup = async(req, res, next)=>{

    try {
        const businessId = req.body.businessId;
        
        const business = await Business.findOne({where:{id:businessId}});
        //check if Business Already exists in DB or Not
       if (business) {
            const uniqueBusinessKey = business.dataValues.uniqueBusinessKey;
            const info= {
                businessId : businessId,
                groupId : req.body.groupId,
                userId : req.body.userId,
                groupPostion : req.body.groupPostion,
                uniqueBusinessKey : uniqueBusinessKey
            }
            //add new UserGroup in DB
            const datastore = await UserToGroup.create(info);
            if (datastore) {
                const databaseUserGroup =datastore.dataValues.id;
                logMsg.info({message:"UserGroup Add Successfully!", PrimaryId:databaseUserGroup,});
                res.send({ status: 200, message: "Success", data: datastore });
                // res.redirect('/')
            } else {
                logMsg.info({status:500,message:"UserGroup Not Added!"});

                res.status(500).send({status:500,message:"UserGroup Not Added!"})
            }
       } else {
        
       }
    } catch (error) {
        logMsg.info("UserGroup ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('UserGroup ->Internal Server Error!', error);
    }

}
// End Join the User with Group


// Start Join the edit User with Group
module.exports.editUserToGroup = async(req, res, next)=>{

    try {
        
        const info= {
            id: req.body.id,
            businessId : req.body.businessId,
            groupId : req.body.groupId,
            userId : req.body.userId,
            groupPostion : req.body.groupPostion,
        }
        //update the UserGroup 
        const datastore = await UserToGroup.update(info,{where:{id:info.id}});
        if (datastore) {
            const databaseUserGroup =datastore[0];
            logMsg.info({message:"UserGroup Add Successfully!", PrimaryId:databaseUserGroup,});
            res.send({ status: 200, message: "Success", data: datastore });
            // res.redirect('/')
        } else {
            logMsg.info({status:500,message:"UserGroup Not Added!"});

            res.status(500).send({status:500,message:"UserGroup Not Added!"})
        }
    } catch (error) {
        logMsg.info("UserGroup ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('UserGroup ->Internal Server Error!', error);
    }

}
// End Join edit the User with Group




// Start Add GroupPermission
module.exports.addGroupPermission = async(req, res, next)=>{
    try {
        const businessId = req.body.businessId;
        
        const business = await Business.findOne({where:{id:businessId}});
        //check if Business Already exists in DB or Not
       if (business) {
            const uniqueBusinessKey = business.dataValues.uniqueBusinessKey;
            const info= {
                businessId : businessId,
                userGroupId: req.body.userGroupId,
                groupPermissionName : req.body.groupPermissionName,
                uniqueBusinessKey : uniqueBusinessKey
            }
            //add new UserGroup in DB
            const datastore = await GroupPermission.create(info);
            if (datastore) {
                const databaseUserGroup =datastore.dataValues.id;
                logMsg.info({message:"addGroupPermission Add Successfully!", PrimaryId:databaseUserGroup,});
                res.send({ status: 200, message: "Success", data: datastore });
                // res.redirect('/')
            } else {
                logMsg.info({status:500,message:"addGroupPermission Not Added!"});

                res.status(500).send({status:500,message:"addGroupPermission Not Added!"})
            }
       } else {
        logMsg.info({status:500,message:"Enter business no match with in DB!"});
        res.status(500).send({status:500,message:"Enter business no match with in DB!"})
       }
    } catch (error) {
        logMsg.info("addGroupPermission ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('addGroupPermission ->Internal Server Error!', error);
    }

}
// End Add GroupPermission



// Start Edit GroupPermission
module.exports.editGroupPermission = async(req, res, next)=>{
    try {
        const businessId = req.body.businessId;
        const business = await Business.findOne({where:{id:businessId}});
        //check if Business Already exists in DB or Not
       if (business) {
        const groupPermissionId = req.body.groupPermissionId;
        const groupPermission = await  GroupPermission.findOne({where:{id:groupPermissionId}})
            if (groupPermission) {
                const uniqueBusinessKey = business.dataValues.uniqueBusinessKey;
            const info= {
                id: groupPermissionId,
                businessId : businessId,
                userGroupId: req.body.userGroupId,
                groupPermissionName : req.body.groupPermissionName,
            }
            //add new UserGroup in DB
            const datastore = await GroupPermission.update(info,{where:{id:groupPermissionId}});
            if (datastore) {
                const databaseUserGroup =datastore[0];
                logMsg.info({message:"addGroupPermission Add Successfully!", PrimaryId:databaseUserGroup,});
                res.send({ status: 200, message: "Success", data: datastore });
                // res.redirect('/')
            } else {
                logMsg.info({status:500,message:"addGroupPermission Not Added!"});

                res.status(500).send({status:500,message:"addGroupPermission Not Added!"})
            }
            } else {
                logMsg.info({status:500,message:"GroupPermissionId  Not Match with DB id's!"});
                res.status(500).send({status:500,message:"GroupPermissionId  Not Match with DB id's!"})
            }
       } else {
        logMsg.info({status:500,message:"Enter business no match with in DB!"});
        res.status(500).send({status:500,message:"Enter business no match with in DB!"})
       }
    } catch (error) {
        logMsg.info("addGroupPermission ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('addGroupPermission ->Internal Server Error!', error);
    }

}
// End Edit GroupPermission



// Start View PermissionMaster
module.exports.getAllPermissionMaster = async(req, res, next)=>{
    try {

        //    if (req.headers.permissionmaster === "get") {

            const datastore = await PermissionMaster.findAll();
            if (datastore.length > 0) {
                const databaseUserGroup =datastore[0].dataValues.id;
                logMsg.info({message:"addGroupPermission Add Successfully!", PrimaryId:databaseUserGroup,});
                res.send({ status: 200, message: "Success", data: datastore });
            } else {
                logMsg.info({status:500,message:"Permission Master Have No Data Add the Data!"});
                res.status(500).send({status:500,message:"Permission Master Have No Data Add the Data!"})
            }
        //    }
    } catch (error) {
        logMsg.info("getAllPermissionMaster ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('getAllPermissionMaster ->Internal Server Error!', error);
    }
  
  }
  // End View PermissionMaster





// Start Add the AddressType 
module.exports.addAddressType = async(req, res, next)=>{
    try {
        const info= {
            addressType : req.body.addressType,
        }
        //add new Address Type in DB
        const datastore = await AddressType.create(info);
        if (datastore) {

            const databaseAddressTypeId = datastore.dataValues.id;
            logMsg.info({status:200,message:"AddressType Add Successfully!", PrimaryId:databaseAddressTypeId});
            res.send({ status: 200, message: "Success", data: datastore });
            // res.redirect('/')
        } else {
            logMsg.info({staus:500,message:"AddressType Not Added!",});
            res.status(500).send({staus:500,message:"AddressType Not Added!",})
        }
    } catch (error) {
        logMsg.info("AddressType ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('AddressType ->Internal Server Error!', error);
    }
}
// Start Add the AddressType 




// Start Add New Group
module.exports.getAllAddressType = async(req, res, next) =>{
    try {
        const Address = req.query.getAllAddressType;
        // get is not mandatory give any thing to check 
        if (Address == 'get') {
            //get all the BusinessGroup in business
        const addressType = await AddressType.findAll()
        if (addressType.length > 0) {
            logMsg.info({status:200, message:"Get All AddressType Successfully"});
            res.status(200).send({status:200, message:"Get All AddressType Successfully", data:addressType});
        } else {
            logMsg.info({status:400, message:"Failed to get AddressType , No AddressType in there first add AddressType" });
            res.status(400).send({status:400, message:"Failed to get AddressType , No AddressType in there first add AddressType"});
        }
        }else{
            logMsg.info({status:400, message:"Failed to get Address Types , Type 'get' to get all Address Types"});
            res.status(400).send({status:400, message:"Failed to get Address Types , Type 'get' to get all Address Types"}); 
        }

    } catch (error) {
        logMsg.info("getAllAddressType ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('getAllAddressType ->Internal Server Error!', error);
    }

}
// End Add New Group




// Start Add new Address 
module.exports.addAddress = async(req, res, next) =>{
    try {
        const info= {
            userId : req.body.userId,
            addressTypeId : req.body.addressTypeId,
            cityId : req.body.cityId,
            stateId : req.body.stateId,
            countryId : req.body.countryId,
        }
        //add new Address in DB
        const datastore = await Address.create(info);
        if (datastore) {
            const databaseAddressId = datastore.dataValues.id
            logMsg.info({status:200,message:"Address Add Successfully!", PrimaryId: databaseAddressId});
          res.send({ status: 200, message: "Success", data: datastore });
            // res.redirect('/')
        } else {
            logMsg.info({status:500,message:"Address Not Added!",});

            res.status(500).send({status:500,message:"Address Not Added!",})
        }
    } catch (error) {
        logMsg.info("AddAddress ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('AddAddress ->Internal Server Error!', error);
    }
}
// End Add new Address 


// Start get State
module.exports.getAllCountry =async(req, res, next)=>{
    try{
        const enteredString = req.query.getAllCountry; 

        if (enteredString == "get") {
            //get all data in DB
            const countryList = await Country.findAll();
            if (countryList) {
                res.send({ status: 200, message: "Success", data: countryList });
            }else{
                res.send({ status: 404, message: "Failed to Fetch the State Data!" });
            }
        }
    }catch (error) {
        logMsg.info("getAllCountry ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('getAllCountry ->Internal Server Error!', error);
      }
  

}
// End get State



// Start get State
module.exports.getState =async(req, res, next)=>{
      try{
        const countryId= req.query.countryId;
        const country = await Country.findOne({where:{id:countryId}});
       
        if (country) {

            //get state by countryId
            const stateList = await State.findAll({where:{countryId:countryId}})
    
          if (stateList) {
                res.send({ status: 200, message: "Success", data: stateList });
            }else{
                res.send({ status: 404, message: "Failed to Fetch the State Data!" });
            }
        } else {
            res.send({ status: 404, message: "Given CountryId is no Matchs in DB!" });
        }

      }catch (error) {
            logMsg.info("getState ->Internal Server Error!", error);
            console.error(error);
            res.status(500).send('getState ->Internal Server Error!', error);
        }
    

}
// End get State



// End get State
module.exports.getCity =async(req, res, next)=>{
    try{
        const stateId= req.query.stateId;
        //this find is for 
        const state = await State.findOne({where:{id:stateId}});
        
        if (state) {
            const stateName =state.dataValues.stateName;
            //get city by stateId 
            const cityList = await City.findAll({where:{stateId:stateId}})

            if (cityList) {
                res.send({ status: 200, message: "Success", data: cityList });
            }else{
                res.send({ status: 404, message: "Failed to Fetch the City Data!" });
            }
        }else{
            res.send({ status: 404, message: "State Id is Not Match in DB!" });
        }

      }catch (error) {
            logMsg.info("getCity ->Internal Server Error!", error);
            console.error(error);
            res.status(500).send('getCity ->Internal Server Error!', error);
        }
    
   

}
// End get State



// Start Update Address Data 
module.exports.editAddress = async(req, res, next) =>{
    try {
        const info= {
            id : req.body.id, 
            userId : req.body.userId,
            addressTypeId : req.body.addressTypeId,
            cityId : req.body.cityId,
            stateId : req.body.stateId,
            countryId : req.body.countryId,
        }
        // update the Address detials in DB with new Data
        const datastore = await Address.update(info,{where:{id:info.id}});
        if (datastore) {
            const databaseAddressId = datastore[0]
            logMsg.info({status:200,message:"Address Add Successfully!", PrimaryId: databaseAddressId});
          res.send({ status: 200, message: "Success", data: datastore });
            // res.redirect('/')
        } else {
            logMsg.info({status:500,message:"Address Not Added!",});

            res.status(500).send({status:500,message:"Address Not Added!",})
        }
        res.end()
    } catch (error) {
        logMsg.info("AddAddress ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('AddAddress ->Internal Server Error!', error);
    }
}
// End Update Address Data 



// Start Remove Address
module.exports.removeAddress = async(req, res, next) =>{
    try {
       const id = req.params.id; 
        const info= {
            isActive:0
        }
        // Remove the Address it mean in DB isActive will change into 0
        const datastore = await Address.update(info,{where:{id:id}});
        if (datastore) {
            logMsg.info({status:200,message:"Address Remove Successfully!"});
          res.send({ status: 200, message: "Address Remove Successfully!", data: datastore });
            // res.redirect('/')
        } else {
            logMsg.info({status:500,message:"Address Not Remove!",});

            res.status(500).send({status:500,message:"Address Not Remove!",})
        }
        res.end()
    } catch (error) {
        logMsg.info("AddAddress ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('AddAddress ->Internal Server Error!', error);
    }
}
// End Remove Address



// Start User Login
module.exports.login = async(req, res, next)=>{
    try{
        const email = req.body.email;
        const password= req.body.password;
        const dataDBUser = await User.findOne({where:{email: email}})
    
        if (dataDBUser) {
            // In DB Password is hashing that user login password and DB Stored Hashing Password will compare
            const comparison = await bcrypt.compare(password, dataDBUser.dataValues.password)
        
            if (comparison ) { 
                req.session.userId = dataDBUser.id
        
                //this line will create a JWToken in login 
                jwt.sign({ dataDBUser }, secretKeyJwt, { expiresIn: '3000s' }, (err, token) => {
                    if (err) {
                    logMsg.info(`JWT Token Generate Problem! Error: ${err}`);
                    throw err;
                    }
                    // res.redirect('/profile')
                    logMsg.info("JWT Generate token Succesfully!");
                    res.send({ status: 200, message: "Success", data: token  });
                    
                });
                logMsg.info("Enter Data and DB Data are same!");
                // res.send({ status: 200, message: "Login Success", data: dataDBUser });
                // res.redirect('/dashboard');
        
            }else{
                logMsg.info({message:"Enter Password not Same in DB !" , PrimaryId :dataDBUser.dataValues.id , Email: email});
                res.send({ status: 404, message: "Login Failed", data: "Enter Password not Same in DB !" });
            }
        }else{
                logMsg.info({message:"Enter Email not in DB ,First Register!", Email:email });
                res.send({ status: 404, message: "Login Failed", data: "Enter Email not in DB ,First Register!" });
        }
    }catch (error) {
        logMsg.info("Login ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('Login ->Internal Server Error', error);
    }
}
// End User Login


// Start Reset Password OTP send Area
module.exports.resetPassword = async(req, res, next)=>{
    try{
        // this generat the otp here
        let OTP = generateCode.generateOtp()

        // set Otp in session
        req.session.otp = OTP;
    
        const email = req.body.email;
        const subject = "Reset Password";
        const text = `OTP for Change Password - ${OTP}`
    
        const user = await User.findOne({where:{email: email}})
        if (user) {
            //send the otp to user Mail 
            nodeMailerService.sendMail(email, subject, text, (error, result) => {
                if (error) {
                logMsg.info({error:error, enterEmail: email});
                  res.status(500).send({ message: 'Error sending email', error });
                } else {
                logMsg.info({result});
                  res.send({result, otp :OTP});
                }
              });
        }else{
            logMsg.info({message:"Your Mail is Not Register, First Register!", enterEmail: email});
            res.send({message:"Your Mail is Not Register, First Register" , enterEmail: email})
        }
    
        // res.send({message:"OTP Send Successfully" , otp: OTP,email:email})
    } catch (error) {
        logMsg.info("resetPassword ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('resetPassword ->Internal Server Error', error);
    }

  

}
// End Reset Password OTP send Area


// Start Reset Password OTP to Change the password
module.exports.conformOTP =async(req, res, next)=>{
    try{
        const {email, otp,newPassword}=req.body;

        //get the otp in session for compare and reset the password
        const otpInSession = req.session.otp;

        const user = await User.findOne({where:{email:email}})

        
        if (user) {
            if (otpInSession == otp) {
                logMsg.info({status:200, message:'OTP verify Successfully!'});
                res.send({status:200, message: 'OTP verify Successfully!' });
            }else{
                logMsg.info({status:400, message:'OTP is incorrect', otp: otp});
                res.send({ message: 'OTP is incorrect', otp: otp });
            }
        }else{
            logMsg.info({status:400, message:'Email is Not Exists' , user: email});
            res.send({ message: 'Email is Not Exists', user: email });
        }
    } catch (error) {
        logMsg.info("changePasswordWithOTP ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('changePasswordWithOTP ->Internal Server Error', error);
    }
}
// End Reset Password OTP to Change the password




// Start Change the password
module.exports.changePasswordAfterOTPCheck =async(req, res, next)=>{
    try{
        const {email,newPassword, conformPassword}=req.body;

        const user = await User.findOne({where:{email:email}})

        
        if (user) {
            //this checks new Password and New Conform Password are equal
            if (newPassword === conformPassword) {
                // Check Password is Strong
                if (!isPasswordStrong(newPassword)) {
                    logMsg.info({status:400, message:'Password Strength is Weak  Do the Password Like This Arun@12345'});
                    return res.status(400).send({ status: 400, message: 'Password Strength is Weak  Do the Password Like This Arun@12345' });
                }
                
                //Encrypt password And Store IN DB
                const encryptedPassword = await bcrypt.hash(newPassword, saltRounds)
    
                const info ={
                        password: encryptedPassword,
                }
    
                const userUpdate = await User.update(info,{where:{email:email}})
                if (userUpdate) {
                    logMsg.info({status:200,message:"User is Password Change SuccessFully!", PrimaryId:email});
                    res.send({status:200,message:"User is Password Change SuccessFully!"})
                }else{
                    logMsg.info({message:"User Data is not Update in Database", PrimaryId: email });
                    res.send({message:"User Data is not Update in Database"})
                }
            }else{
                logMsg.info({status:400, message:'New Password and Conform Password Not Same '});
                res.send({status:400, message: 'New Password and Conform Password Not Same', });
            }
        }else{
            logMsg.info({status:400, message:'Email is Not Exists' , user: email});
            res.send({ message: 'Email is Not Exists', user: email });
        }
    } catch (error) {
        logMsg.info("changePasswordWithOTP ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('changePasswordWithOTP ->Internal Server Error', error);
    }
}
// End Change the password







module.exports.profile= async(req, res, next)=>{

    const userId = req.userId;
    const { userName, email } = req.body;
  
    // Find the user by ID (you may use a database query in a real application)
    const userIndex = User.findIndex((user) => user.id === userId);
  
    if (userIndex === -1) {
      res.status(404).json({ error: 'User not found' });
    } else {
      // Update user profile information
      User[userIndex] = { ...User[userIndex], userName, email };
      res.send({ message: 'Profile updated successfully', user: User[userIndex] });
      
    }
}
// Start Dashboard
module.exports.dashboard = async(req, res, next) =>{
    const userId =req.session.userId
    const user = await User.findOne({where:{id:userId}})
    res.send(`<h1>Welcome to the Dashboard, User ${user.dataValues.userName}!</h1><a href="/logout">Logout</a>`);

}
// End Dashboard

module.exports.logined = async(req, res, next)=>{
    res.send('<button><a href="/dash">dashboard</a></button>')
}