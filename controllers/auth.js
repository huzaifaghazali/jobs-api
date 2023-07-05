const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  // throw error if one of the values is missing
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide name, email and password');
  }

  const salt = await bcrypt.genSalt(10); // generate random bytes
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = {name, email, password:hashedPassword};

  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('login user');
};

module.exports = {
  register,
  login,
};
