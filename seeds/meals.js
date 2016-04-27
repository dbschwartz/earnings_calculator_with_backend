
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('meals').del(),
    // Inserts seed entries
    knex('meals').insert({
      base_price: 25.50,
      tax_rate: 8.25,
      tip_rate: 15
    }),
    knex('meals').insert({
      base_price: 30,
      tax_rate: 8.25,
      tip_rate: 20
    })
  );
};
