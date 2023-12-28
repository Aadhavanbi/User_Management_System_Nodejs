const {logMsg} = require('../services/logger')
const jwt = require('jsonwebtoken');

const secretKeyJwt =process.env.SECRETKEY

module.exports.isAuthenticated = async(req, res, next)=>{
    if (req.session && req.session.userId) {
      return next();
    } 
    else {
      res.redirect('/logined');
    }
}



module.exports.jwtTokenCheck = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'] || req.headers['auth'];

    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const token = bearer[0]; // Change from [0] to [1]

      jwt.verify(token, secretKeyJwt, (err, decoded) => {
        if (err) {
          logMsg.info('Token is Invalid!');
          res.status(403).json({status: 403, message: 'Token is Invalid', });
        } else {
          // Token is valid, add decoded data to request object
          req.decoded = decoded;

          // if (decoded.dataDBUser.role == "admin") {
            logMsg.info('Token is Verified, Proceed to Profile!');
            next();
          // }else{
            // logMsg.info("Normal User Can't Access it Only Admin Can Access");
            // res.status(403).json({ status: 403, message: "Normal User Can't Access it Only Admin Can Access",});
          // }
         
        }
      });
    } else {
      logMsg.info('Token is Missing or Invalid!');
      res.status(403).json({ status: 403, message: 'Token is Missing or Invalid',});
    }
  } catch (error) {
    logMsg.info('VerifyToken -> Internal Server Error!');
    console.error('Error in verifyToken:', error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};