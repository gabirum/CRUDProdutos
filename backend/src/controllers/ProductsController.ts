import { Request, Response } from 'express'
import connection from '../database/connection';
import { IWithPagination } from 'knex-paginate'

interface Product {
  id: number
  name: string
  category: string
  price: number
  created_at: string
}

export default class ProductsController {

  async create(req: Request, res: Response): Promise<Response> {
    const { name, category, price } = req.body

    try {
      await connection('products').insert({ name, category, price })
    } catch (err) {
      console.error(err);
      return res.status(422).json({message: 'Não foi possível criar o produto.'})
    }

    return res.status(201).json({message: 'Produto criado.'})
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.productId
    const { name, category, price } = req.body

    try {
      await connection('products')
        .where({ id })
        .update({ name, category, price })

      return res.status(200).json({message: 'Produto atualizado.'})
    } catch (err) {
      return res.status(422).json({message: 'Não foi possível atualizar o produto.'})
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.productId

    try {
      await connection('products').where({ id }).delete()

      return res.status(200).json({message: 'Produto deletado.'})
    } catch (err) {
      return res.status(422).json({message: 'Não foi possível deletar o produto.'})
    }
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const id = req.params.productId

    try {
      const product: Product = await connection('products')
        .where({ id })
        .select('*')
        .first()

      if (product === undefined) {
        return res.status(404).json({message: 'Não foi possível encontrar o produto.'})
      }

      return res.status(200).json({ ...product })
    } catch (err) {
      return res.status(404).json({message: 'Não foi possível encontrar o produto.'})
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const perPage = req.query['perPage'] || 10
    const currentPage = req.query['currentPage'] || 1

    const paginatedProducts: IWithPagination<Product[]> = await connection(
      'products'
    )
      .select('*')
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      })

    return res.status(200).json(paginatedProducts)
  }
}
