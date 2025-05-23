const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register User
exports.registerUser = async (req, res) => {
    const { name, email, phone, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ msg: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        role,
      });
  
      await user.save();
      res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  };
  

// Login User
exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    if (user.role !== role)
      return res.status(400).json({ msg: "Incorrect role selected" });

    res.json({
      msg: "Login successful",
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
