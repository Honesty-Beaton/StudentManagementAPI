const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(403).json({ message: 'Access denied' });

        const { role } = jwt.verify(token, "38930289sjkdfjksldf902348i9024");
        if (role !== 'admin') return res.status(403).json({ message: 'Admin access required' });

        next();
    } catch {
        res.status(403).json({ message: 'Invalid token' });
    }
};

const verifyUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            console.log("No token provided.");
            return res.status(403).json({ message: "Access denied" });
        }

        const decoded = jwt.verify(token, "38930289sjkdfjksldf902348i9024");
        console.log("Decoded Token:", decoded); // Debugging: Check user inside token

        if (!decoded.id) {
            console.log("Access blocked: No user ID found.");
            return res.status(403).json({ message: "Unauthorized - valid user required." });
        }

        req.user = decoded; // Attach user details to request
        next();
    } catch (error) {
        console.log("Token verification error:", error.message);
        res.status(403).json({ message: "Invalid token" });
    }
};


const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Access denied' });

    const decoded = jwt.verify(token, "38930289sjkdfjksldf902348i9024");
    req.user = decoded; // Attach decoded user info to the request object

    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyAdmin, verifyUser, verifyToken};
