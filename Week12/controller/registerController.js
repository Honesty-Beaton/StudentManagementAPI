const User = require('../model/user');
const bcrypt = require('bcrypt');
 
// Register a new user
const handleNewUser = async (req, res) => {
  const { name, email, user, pwd, role, jwt } = req.body;
  
  if (!user || !pwd ||!name ||!email) {
    return res.status(400).json({ message: "Name, email, username and password are required." });
  }
 
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.status(409).json({ message: "Duplicate username." });

  const duplicateEmail = await User.findOne({email: email}).exec();
  if(duplicateEmail) return res.status(409).json({message: "Duplicate email address. "});
 
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10); // 10 is the salt round
    const result = await User.create({ name: name, email: email, username: user, password: hashedPwd, role: role || "user" });
    
    // Generate JWT Token for New User
    const token = jwt.sign(
        { id: result._id, role: result.role },
        "38930289sjkdfjksldf902348i9024",
        { expiresIn: "1h" }
    );

    console.log(result);
    res.status(201).json({ success: `New user ${user} created with email address ${email}.`, token, role: result.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
module.exports = handleNewUser;