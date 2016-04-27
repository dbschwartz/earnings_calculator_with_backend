
exports.up = function(knex, Promise) {
  return knex.schema.createTable('meals', function(table){
    table.increments();
    table.decimal('base_price');
    table.decimal('tax_rate');
    table.decimal('tip_rate');
  });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('meals');
};
