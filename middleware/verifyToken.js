import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('error in verifyToken', err)
    res.status(401).json({ message: 'Token is not valid' });
  }
};


