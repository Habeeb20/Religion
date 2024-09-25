import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Check for the presence of the Authorization header and extract the token
  const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;
  

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

 

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token data to the request object
    next(); // Call the next middleware or route handler
  } catch (err) {
    console.error('Token verification error:', err); // Log the error for debugging
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
