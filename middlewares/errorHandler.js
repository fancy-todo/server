module.exports = (err, req, res, next) => {
   // console.log(err);
   let status = 500
   let message = err.message

   if (err.name == `SequelizeValidationError`) {
      status = 400
      let errors = []
      for (let i = 0; i <= err.errors.length - 1; i++) {
         errors.push(err.errors[i].message)
      }
      res.status(status).json({ errors: errors })
   }
   if (err.code === 404) {
      status = 404
      message = err.message
      res.status(status).json({ msg: message })
   }
   if (err.code === 400) {
      status = 400
      res.status(status).json({msg : `cannot make request because field doesn't met requirements`})
   }
   if (err.code === 401) {
      status = 401
      message = `you're not allowed to make this request`
      res.status(status).json({msg : message})
   }
   if (err.name == 'JsonWebTokenError') {
      status = 401
      res.status(status).json({ msg: message })
   }
   else {
      res.status(status).json({ msg: message })
   }
}