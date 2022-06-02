const jwt = require('jsonwebtoken');
var express = require('express')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.username;

    // console.log(token);
    if (token == "" || token == null) {
    //   throw 'Invalid Token';
      res.status(403).json({
        message: 'Invalid Token!'
      });
    } else {
      next();
    }
  } catch(err) {
    const { message, name } = err;
    res.status(401).json({
      error: { message, name }
    });
  }
};