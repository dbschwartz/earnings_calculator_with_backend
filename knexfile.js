//Update with your config settings.

module.exports = {

  test: {
    client: 'pg',
    connection: 'postgres://localhost/earnings_calculator_test'
  },

  development: {
    client: 'pg',
    connection: 'postgres://localhost/earnings_calculator'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};