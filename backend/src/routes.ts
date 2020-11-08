import { Router } from 'express'
import connection from './database/connection';
import ProductsController from './controllers/ProductsController'

const router = Router()
const productsController = new ProductsController()

router.use('/products', (req, res, next) => {
  const apikey = req.headers['x-api-key']
  if (!apikey || apikey !== 'apitoken') {
    return res.status(401).send()
  }

  next()
})

router.get('/', (req, res) => {
  res.status(200).send('API Fullstack Job Test - DomPixel running')
})

router.post('/products', productsController.create)
router.put('/products/:productId', productsController.update)
router.delete('/products/:productId', productsController.delete)
router.get('/products/:productId', productsController.getOne)
router.get('/products', productsController.getAll)

export default router
