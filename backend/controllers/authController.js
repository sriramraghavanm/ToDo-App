const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ user: { id } }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    console.log('🔐 Registration attempt:', req.body.email); // Debug log
    
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      console.log('❌ Registration failed: Missing email or password');
      return res.status(400).json({ 
        msg: 'Email and password are required' 
      });
    }

    if (password.length < 6) {
      console.log('❌ Registration failed: Password too short');
      return res.status(400).json({ 
        msg: 'Password must be at least 6 characters' 
      });
    }

    console.log('📧 Checking if user exists:', email); // Debug log
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('❌ Registration failed: User already exists');
      return res.status(400).json({ 
        msg: 'User already exists with this email' 
      });
    }

    console.log('👤 Creating new user...'); // Debug log
    // Create user
    const user = await User.create({
      email,
      password
    });

    console.log('✅ User created successfully:', user._id); // Debug log

    // Generate token
    const token = generateToken(user._id);
    console.log('🔑 Token generated successfully'); // Debug log

    const response = {
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email
      }
    };

    console.log('✅ Registration successful, sending response'); // Debug log
    res.status(201).json(response);

  } catch (error) {
    console.error('💥 Registration error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      msg: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    console.log('🔐 Login attempt:', req.body.email); // Debug log
    
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      console.log('❌ Login failed: Missing email or password');
      return res.status(400).json({ 
        msg: 'Email and password are required' 
      });
    }

    console.log('📧 Finding user...'); // Debug log
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('❌ Login failed: User not found');
      return res.status(401).json({ 
        msg: 'Invalid credentials' 
      });
    }

    console.log('🔍 Verifying password...'); // Debug log
    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('❌ Login failed: Invalid password');
      return res.status(401).json({ 
        msg: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken(user._id);
    console.log('✅ Login successful'); // Debug log

    const response = {
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email
      }
    };

    res.json(response);

  } catch (error) {
    console.error('💥 Login error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      msg: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  register,
  login
};