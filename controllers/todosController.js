const { Todo } = require('../models')
const { User } = require('../models')

class TodoController {
   static add(req, res, next) {
      console.log(req.currentUserId, `ini current USER IDDDDDDDDDDDDD`);

      let newTodo = {
         title: req.body.title,
         description: req.body.description,
         status: req.body.status,
         due_date: req.body.due_date,
         UserId: req.currentUserId
      }

      Todo.create(newTodo)
         .then(data => {
            // console.log(data);
            res.status(201).json(data)
         })
         .catch(err => {
            next(err)
         })
   }

   static findAll(req, res, next) {
      Todo.findAll({
         include: {
            model: User
         }
      })
         .then(data => {
            res.status(200).json(data)
         })
         .catch(err => {
            next(err)
         })
   }

   static findOne(req, res, next) {
      Todo.findOne({
         where: {
            id: req.params.id
         },
         include: {
            model: User
         }
      })
         .then(data => {
            // console.log(data);   
            if (data) {
               res.status(200).json(data)
            }
            else {
               next({ code: 404, message: `data with id ${req.params.id} doesn't exists` })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static update(req, res, next) {
      if (!req.body.title || !req.body.description) {
         next({ code: 400 })
      }
      let newUpdate = {
         title: req.body.title,
         description: req.body.description,
         status: req.body.status,
         due_date: req.body.due_date
      }
      Todo.update(newUpdate, {
         where: {
            id: req.params.id
         }
      })
         .then(data => {
            if (data[0] < 1) {
               next({ code: 404, message: `data with id ${req.params.id} doesn't exists` })
            }
            else {
               res.status(200).json({ msg: `data with id ${req.params.id} has been updated` })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static deleteOne(req, res, next) {
      Todo.destroy({
         where: {
            id: req.params.id
         },
         returning: true
      })
         .then(data => {
            console.log(data);

            if (data < 1) {
               next({ code: 404, message: `data with id ${req.params.id} doesn't exists` })
            }
            else {
               res.status(200).json({ msg: `data with id ${req.params.id} has been deleted` })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static updateStatus(req, res, next) {
      if (!req.body.status) {
         next({ code: 400 })
      }

      let newStatus = {
         status: req.body.status
      }
      Todo.update(newStatus, {
         where: {
            id: req.params.id
         },
         returning: true
      })
         .then(data => {
            if (data[0] == 0) {
               next({ code: 404, message: `data with id ${req.params.id} doesn't exists` })
            }
            else {
               res.status(201).json(data)
            }
         })
         .catch(err => [
            res.status(500).json({ msg: err.message })
         ])
   }

   static myTodo(req, res, next) {
      console.log(`masuk sini`);
      
      Todo.findAll({
         where: {
            UserId: req.currentUserId
         }
      })
         .then(data => {
            res.status(200).json(data)
         })
         .catch (err => {
            next(err)
         })
   }
}

module.exports = TodoController