const express = require ('express')
const router = express.Router()
const todosController = require ('../controllers/todosController')
const authentication = require ('../middlewares/authentication')
const authorization = require ('../middlewares/authorization')

router.post('/', authentication, todosController.add)
router.get('/', todosController.findAll)
router.get('/mytodo', authentication, todosController.myTodo)
router.get('/:id', todosController.findOne)
router.put('/:id', authentication, authorization, todosController.update)
router.patch('/:id', authentication, authorization, todosController.updateStatus)
router.delete('/:id', authentication, authorization, todosController.deleteOne)

module.exports = router