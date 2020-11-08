import { resolve } from 'path'

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, 'src', 'database', 'dev.sqlite'),
    },
    migrations: {
      directory: resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: ':memory:',
    migrations: {
      directory: resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: true,
  },
}
