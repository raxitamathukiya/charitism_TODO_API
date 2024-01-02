const jwt = require('jsonwebtoken');
const {loginModel}=require('../model/login.model')


const authMiddleware = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.SecretKey);
    
    const { userId } = decodedToken;
  
    const user = await loginModel.findOne({_id:userId});
  
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized error' });
  }
};

module.exports = {authMiddleware};