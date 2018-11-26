const { findUserByToken } = require('../controllers/users')



function isAuthenticated() {
  return async function (req, res, next) {


    if (req.headers.authorization != undefined) {
      let user
      try {
        user = await findUserByToken(req.headers.authorization)
        console.log(user);

      } catch (error) {
        res.status(401).send({ Message: "Authorozation required1" })
      }
      if (user) {
        req.user = user;
        next();
      }
      else res.status(401).send({ Message: "Authorozation required2" })
    }
    else
      res.status(401).send({ Message: "Authorozation required3" })

  }
}
function isAuthenticatedOptional() {
  return async function (req, res, next) {


    if (req.headers.authorization != undefined) {
      let user
      try {
        user = await findUserByToken(req.headers.authorization)
      } catch (error) {
        console.log("in a guest session.")
      }
      if (user) {
        req.user = user;
      }
    }
    
    next();
  }
}

module.exports = {
  isAuthenticated,
  isAuthenticatedOptional
}
