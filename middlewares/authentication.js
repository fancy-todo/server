const jwt = require ('jsonwebtoken')
// belum findOne User

module.exports = (req, res, next) => {
   try {
      const accessToken = req.headers.token
      let decoded = jwt.verify(accessToken, process.env.SECRET);
      if (decoded) {
         req.currentUserId = decoded.id
         next()
      }
   }
   catch (err) {
      next(err)
   }
}