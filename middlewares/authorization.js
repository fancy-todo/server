const { Todo } = require ('../models')

module.exports = (req, res, next) => {
   Todo.findOne({
      where : {
         id : req.params.id
      }
   })
      .then (data => {
         console.log(data);
         
         if (!data) {
            next({code : 404})
         }
         else {
            if (data.UserId !== req.currentUserId) {
               next({code : 401})
            }
            else {
               next()
            }
         }
      })
      .catch (err => {
         next(err)
      })
}