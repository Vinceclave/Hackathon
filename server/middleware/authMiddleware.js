// /server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  // Retrieve token from Authorization header (expects 'Bearer <token>')
  const token = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ') 
                ? req.headers['authorization'].split(' ')[1] 
                : null;

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token not provided' });
  }

  // Verify the token with the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    // Store the user data in the request object for use in subsequent middleware/routes
    req.user = user;
    next();  // Continue to the next middleware or route handler
  });
};

module.exports = authenticateJWT;
