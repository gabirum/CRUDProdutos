import Knex from 'knex'
import knex from 'knex'
import { attachPaginate } from 'knex-paginate'

import config from '../../knexfile'

let connection: Knex

if (process.env.NODE_ENV == 'test') {
  connection = knex(config.test)
} else {
  connection = knex(config.development)
}
attachPaginate()

export default connection
