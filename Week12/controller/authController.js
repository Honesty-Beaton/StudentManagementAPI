const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Authenticate qa user
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
 
  if (!user || !pwd) {
    return res.status(400).json({ message: "Username and password are required." });
  }
 
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
 
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const token = jwt.sign({ id: foundUser._id, role: foundUser.role }, "38930289sjkdfjksldf902348i9024", { expiresIn: '1h' });
    res.json({ success: `User ${user} is logged in.`, token, role: foundUser.role });
  } else {
    res.sendStatus(401);
  }
};
 
module.exports = handleLogin;