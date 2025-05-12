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
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(403).json({ message: 'Access denied' });

        const { role } = jwt.verify(token,"38930289sjkdfjksldf902348i9024");
        if (role !== 'user') return res.status(403).json({ message: 'Only users can book tickets' });

        next();
    } catch {
        res.status(403).json({ message: 'Invalid token' });
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
