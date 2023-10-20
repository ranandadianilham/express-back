const express = require('express')
const User = require('../models/user');
const { verifyToken } = require('../utils/jwtUtils');


const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ','');
  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    res.status(401).send('Invalid token');
    return;
  }
  const userId = decodedToken.id;
  const user = User.findByPk(userId);
  user.then((response) => {
    req.user = response.dataValues;
    req.token = token;
    next();
  }).catch(() => {
    res.status(404).send('User not found, Please login');
    return;
  });
};

module.exports = auth;