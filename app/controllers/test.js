
//////// Start Oauth CallBack
module.exports.protected = async(req, res, next )=>{

    const user = await dbconnect.findOne({where:{email: req.user.email}});
    console.log(user);
    console.log(req.cookies.register);
    if (req.cookies.register ) {      
      if (user) {
          res.render('alert',{
            email:req.user.email,
            text:"Your Mail Id is Already Register",
          })
      } else {
          const info ={
            user_name: req.user.displayName,
            email: req.user.email,
          }
          const datastore= await dbconnect.create(info);  
          if (datastore) {
            res.redirect('/')
          } else {
            res.status(500).send('Ops... ')
          }
        }
    }else{
      if (user == null) {
        const info ={
          user_name: req.user.displayName,
          email: req.user.email,
        }
        const datastore= await dbconnect.create(info);  
        if (datastore) {
          res.cookie('email', req.user.email, { maxAge: 20000, httpOnly: true });
          res.redirect('/testsession');
        } else {
          res.status(500).send('Ops... ')
        }
      }else{
        res.cookie('email', req.user.email, { maxAge: 20000, httpOnly: true });
        res.redirect('/testsession');
      }
    }
  }
//////// End Oauth CallBack








// //////////////////////  hashed password


const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Mock user-entered password for encryption
const userEnteredPassword = req.body.password;

// Encrypt the password
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encryptedPassword = cipher.update(userEnteredPassword, 'utf-8', 'hex');
encryptedPassword += cipher.final('hex');

console.log('Encrypted Password:', encryptedPassword);

// Decrypt the password
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf-8');
decryptedPassword += decipher.final('utf-8');

console.log('Decrypted Password:', decryptedPassword);


///////////////////////

















// Start Add PermissionMaster
module.exports.addPermissionMaster = async(req, res, next)=>{
  try {
          const info= {
              permissionName: req.body.permissionName,
          }
          //add new PermissionMaster in DB
          const datastore = await PermissionMaster.create(info);
          if (datastore) {
              const databaseUserGroup =datastore.dataValues.id;
              logMsg.info({message:"addGroupPermission Add Successfully!", PrimaryId:databaseUserGroup,});
              res.send({ status: 200, message: "Success", data: datastore });
          } else {
              logMsg.info({status:500,message:"addPermissionMaster Not Added!"});
              res.status(500).send({status:500,message:"addPermissionMaster Not Added!"})
          }
  } catch (error) {
      logMsg.info("addPermissionMaster ->Internal Server Error!", error);
      console.error(error);
      res.status(500).send('addPermissionMaster ->Internal Server Error!', error);
  }

}
// End Add PermissionMaster



// Start Edit PermissionMaster
module.exports.editPermissionMaster = async(req, res, next)=>{
  try {
      const permissionMasterId = req.body.permissionMasterId;
      const permissionMaster = await PermissionMaster.findOne({where:{id:permissionMasterId}});
      //check if Permission Master exists in DB or Not
     if (permissionMaster) {
          const info= {
              permissionMasterId : permissionMasterId,
              permissionName: req.body.permissionName,
          }
          //add new UserGroup in DB
          const datastore = await PermissionMaster.update(info,{where:{id:permissionMasterId}});
          if (datastore) {
              const databaseUserGroup =datastore[0];
              logMsg.info({message:"editPermissionMaster Add Successfully!", PrimaryId:databaseUserGroup,});
              res.send({ status: 200, message: "editPermissionMaster Add Successfully!" });
          } else {
              logMsg.info({status:500,message:"editPermissionMaster Not Added!"});

              res.status(500).send({status:500,message:"editPermissionMaster Not Added!"})
          }
     } else {
      logMsg.info({status:500,message:"Enter permissionMaster no match with in DB!"});

      res.status(500).send({status:500,message:"Enter permissionMaster no match with in DB!"})
     }
  } catch (error) {
      logMsg.info("editPermissionMaster ->Internal Server Error!", error);
      console.error(error);
      res.status(500).send('editPermissionMaster ->Internal Server Error!', error);
  }

}
// End Edit PermissionMaster