const express = require ('express')
const router = express.Router()
const todosRouter = require ('./todos')
const usersRouter = require ('./users')
const weathersRouter = require ('./weathers')

router.use('/todos', todosRouter)
router.use('/users', usersRouter)
router.use('/weathers', weathersRouter)


module.exports = router