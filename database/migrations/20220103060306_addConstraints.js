
exports.up = function(knex) {
  return knex.schema.raw(`
    ALTER TABLE products 
    ADD CONSTRAINT stock_is_positive
    CHECK (stock >= 0)
  `);
};

exports.down = function(knex) {
  return knex.schema.raw(`
    ALTER TABLE products
    DROP CONSTRAINT stock_is_positive
  `)
};
