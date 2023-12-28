const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const Mycontroller = require('../controllers/userManagementController');
const { jwtTokenCheck, isAuthenticated} = require('../services/authentication.helpper')
// const mailFormatCheck = require('../services/mailFormat.Helpper')



/**
 * @swagger
 * /addBusiness:
 *   post:
 *     summary: Create a new Business
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:    
 *               businessName:
 *                 type: string
 *                 default: businessname                 
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/addBusiness',  Mycontroller.addBusiness);



/**
 * @swagger
 * /editBusiness:
 *   post:
 *     summary: Update Business Data
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:   
 *               id:
 *                 type: integer 
 *               businessName:
 *                 type: string
 *                 default: businessname                 
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/editBusiness',jwtTokenCheck, Mycontroller.editBusiness);


/**
 * @swagger
 * /removeBusiness/{id}:
 *   delete:
 *     summary: Delete Resource by ID
 *     description: Deletes a resource identified by the provided ID.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the resource to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: No content, indicating a successful deletion
 *       '404':
 *         description: Resource not found
 */
router.delete('/removeBusiness/:id',jwtTokenCheck, Mycontroller.removeBusiness)



/**
 * @swagger
 * /getAllBusiness:
 *   get:
 *     summary: Get All Business
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - in: query
 *         name: getAllBusiness
 *         description:  Retrieve All Business.
 *         required: true
 *         schema:
 *           type: string
 *           default: get
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.get('/getAllBusiness',jwtTokenCheck, Mycontroller.getAllBusiness);



/**
 * @swagger
 * /getBusiness:
 *   get:
 *     summary: Get One Business
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - in: query
 *         name: getBusiness
 *         description: Retrieve Business 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.get('/getBusiness',jwtTokenCheck, Mycontroller.getBusiness);


/**
 * @swagger
 * /addUser:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessId:
 *                 type: integer
 *                 default: 1
 *               userName:
 *                 type: string
 *                 default: user
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *                 default: user@gmail.com
 *               gender:
 *                 type: string
 *                 default: unknown       
 *               mobileNumber:
 *                 type: string
 *                 default: 123
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               password:
 *                 type: string
 *                 default: pass
 *               role:
 *                 type: string
 *                 default: user
 *               createdBy:
 *                 type: integer
 *               createdAt:
 *                  type: string
 *                  format: date-time
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/addUser',jwtTokenCheck ,Mycontroller.addUser)  



/**
 * @swagger
 * /getAllUserInBusiness:
 *   get:
 *     summary: Create a new user
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - in: query
 *         name: businessId
 *         description: ID of the country to retrieve states for.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.get('/getAllUserInBusiness' , jwtTokenCheck, Mycontroller.getAllUserInBusiness)  

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     description: Create a new user with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: user@gmail.com
 *               password:
 *                 type: string
 *                 default: pass
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/login', Mycontroller.login)


/**
 * @swagger
 * /editUser:
 *   post:
 *     summary: "Update User Data"
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 required: true
 *               businessId:
 *                 type: integer
 *                 default: 1
 *               userName:
 *                 type: string
 *                 default: user
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *                 default: user@gmail.com
 *               gender:
 *                 type: string
 *                 default: unknown       
 *               mobileNumber:
 *                 type: string
 *                 default: 123
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               password:
 *                 type: string
 *                 default: pass
 *               role:
 *                 type: string
 *                 default: user
 *               updatedBy: 
 *                 type: integer
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: "User data updated successfully"
 */
router.post('/editUser',jwtTokenCheck, Mycontroller.editUser)
 

/**
 * @swagger
 * /removeUser/{id}:
 *   delete:
 *     summary: Delete Resource by ID
 *     description: Deletes a resource identified by the provided ID.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the resource to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: No content, indicating a successful deletion
 *       '404':
 *         description: Resource not found
 */
router.delete('/removeUser/:id',jwtTokenCheck, Mycontroller.removeUser)



/**
 * @swagger
 * /addBusinessGroup:
 *   post:
 *     summary: Create a new Business Group 
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:    
 *               businessId:
 *                 type: string
 *                 default: 1
 *               GroupName:
 *                 type: string
 *                 default: groupname
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/addBusinessGroup',jwtTokenCheck, Mycontroller.addBusinessGroup)


/**
 * @swagger
 * /getAllBusinessGroup:
 *   get:
 *     summary: get All BusinessGroup in in Business by Id
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - in: query
 *         name: businessId
 *         description: ID of the country to retrieve states for.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.get('/getAllBusinessGroup',jwtTokenCheck, Mycontroller.getAllBusinessGroup)

/**
 * @swagger
 * /getAllUserInBusinessGroup:
 *   get:
 *     summary: All Users in Business Group
 *     description: All Users in Business Group with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - in: query
 *         name: businessGroupID
 *         description: ID of the country to retrieve states for.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.get('/getAllUserInBusinessGroup',jwtTokenCheck, Mycontroller.getAllUserInBusinessGroup)



/**
 * @swagger
 * /editBusinessGroup:
 *   post:
 *     summary: Update Business Group
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:  
 *               id:
 *                 type: integer  
 *               businessId:
 *                 type: integer
 *                 default: 1
 *               groupName:
 *                 type: string
 *                 default: groupname
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/editBusinessGroup',jwtTokenCheck, Mycontroller.editBusinessGroup)


/**
 * @swagger
 * /removeBusinessGroup/{id}:
 *   delete:
 *     summary: Delete the Business Group
 *     description: Deletes a resource identified by the provided ID.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the resource to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: No content, indicating a successful deletion
 *       '404':
 *         description: Resource not found
 */
router.delete('/removeBusinessGroup/:id',jwtTokenCheck, Mycontroller.removeBusinessGroup)




/**
 * @swagger
 * /resetPassword:
 *   post:
 *     summary: Reset Password
 *     description: Create a new user with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: user@gmail.com
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/resetPassword', Mycontroller.resetPassword)



/**
 * @swagger
 * /conformOTP:
 *   post:
 *     summary: Change the Password Using OTP
 *     description: Create a new user with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: user@gmail.com
 *               otp:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/conformOTP', Mycontroller.conformOTP)



/**
 * @swagger
 * /changePasswordAfterOTPCheck:
 *   post:
 *     summary: Change the Password Using OTP
 *     description: Create a new user with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: user@gmail.com
 *               newPassword:
 *                 type: string
 *               conformPassword:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/changePasswordAfterOTPCheck', Mycontroller.changePasswordAfterOTPCheck)


/**
 * @swagger
 * /addUserToGroup:
 *   post:
 *     summary: (Master Data) Create a new User Group join 
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessId:
 *                 type: integer
 *               groupId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               groupPostion:
 *                 type: string
 *                 default: member
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/addUserToGroup',jwtTokenCheck, Mycontroller.addUserToGroup)


/**
 * @swagger
 * /editUserToGroup:
 *   post:
 *     summary: Update User Group
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               businessId:
 *                 type: integer
 *               groupId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               groupPostion:
 *                 type: string
 *                 default: member
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/editUserToGroup',jwtTokenCheck, Mycontroller.editUserToGroup)



/**
 * @swagger
 * /addGroupPermission:
 *   post:
 *     summary: (Master Data) Create a new User Group join 
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessId:
 *                 type: integer
 *               userGroupId:
 *                 type: integer
 *               groupPermissionName:
 *                 type: string
 *               createdBy:
 *                 type: integer
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/addGroupPermission',jwtTokenCheck, Mycontroller.addGroupPermission)


/**
 * @swagger
 * /editGroupPermission:
 *   post:
 *     summary: (Master Data) Create a new User Group join 
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupPermissionId:
 *                 type: integer
 *               businessId:
 *                 type: integer
 *               UserGroupId:
 *                 type: integer
 *               groupPermissionName:
 *                 type: string
 *               updatedBy:
 *                 type: integer
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/editGroupPermission',jwtTokenCheck, Mycontroller.editGroupPermission)



/**
 * @swagger
 * /getAllPermissionMaster:
 *   get:
 *     summary: (Master Data) Create a new User Group join 
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - name: PermissionMaster
 *         in: header
 *         description: this get the all Permission Master
 *         type: string 
 *         default: get
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.get('/getAllPermissionMaster', Mycontroller.getAllPermissionMaster)






/**
 * @swagger
 * /addAddressType:
 *   post:
 *     summary: (Master Data) Create a New Address Type
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressType:
 *                 type: string
 *                 default: addresstype
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/addAddressType',jwtTokenCheck, Mycontroller.addAddressType)


/**
 * @swagger
 * /getAllAddressType:
 *   get:
 *     summary: Get all Address Type 
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - in: query
 *         name: getAllAddressType
 *         description: ID of the country to retrieve states for.
 *         required: true
 *         schema:
 *           type: string
 *           default: get
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.get('/getAllAddressType',jwtTokenCheck, Mycontroller.getAllAddressType)



/**
 * @swagger
 * /addAddress:
 *   post:
 *     summary: Create a New Address
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               addressTypeId:
 *                 type: integer
 *               cityId:
 *                 type: integer
 *               stateId:
 *                 type: integer
 *               countryId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/addAddress',jwtTokenCheck, Mycontroller.addAddress)


/**
 * @swagger
 * /getAllCountry:
 *   get:
 *     summary: (Master Data)Find All Country
 *     description: Retrieve states based on the provided countryId.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - in: query
 *         name: getAllCountry
 *         description: ID of the country to retrieve states for.
 *         required: true
 *         schema:
 *           type: string
 *           default: get
 *     responses:
 *       '200':
 *         description: States retrieved successfully.
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.get('/getAllCountry',jwtTokenCheck, Mycontroller.getAllCountry);



/**
 * @swagger
 * /getState:
 *   get:
 *     summary: (Master Data) Find States by Country Id
 *     description: Retrieve states based on the provided countryId.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - in: query
 *         name: countryId
 *         description: ID of the country to retrieve states for.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: States retrieved successfully.
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.get('/getState',jwtTokenCheck, Mycontroller.getState);



/**
 * @swagger
 * /getCity:
 *   get:
 *     summary: (Master Data) Find City by State Id
 *     description: Retrieve states based on the provided countryId.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - in: query
 *         name: stateId
 *         description: ID of the country to retrieve states for.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: States retrieved successfully.
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.get('/getCity',jwtTokenCheck, Mycontroller.getCity);



 
/**
 * @swagger
 * /editAddress:
 *   post:
 *     summary: Create a New Address
 *     description: Create a new user with the specified details.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               addressTypeId:
 *                 type: integer
 *               cityId:
 *                 type: integer
 *               stateId:
 *                 type: integer
 *               countryId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */
router.post('/editAddress',jwtTokenCheck, Mycontroller.editAddress)



/**
 * @swagger
 * /removeAddress/{id}:
 *   delete:
 *     summary: Delete Address in DB
 *     description: Deletes a resource identified by the provided ID.
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the resource to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: No content, indicating a successful deletion
 *       '404':
 *         description: Resource not found
 */
router.delete('/removeAddress/:id',jwtTokenCheck, Mycontroller.removeAddress)










router.get('/dash', isAuthenticated, Mycontroller.dashboard)

router.get ('/logined', Mycontroller.logined)







module.exports = router