exports.up = function(knex) {
  return knex.schema.createTable('products', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
    table.string('image');
    table.string('category');
    table.integer('quantity');
    table.integer('price');
  })
  .createTable('sessions', table => {
    table.increments('id').primary();
    table.integer('total');
    table.timestamp('created_at');
    table.string('token');
  })
  .createTable('order_details', table => {
    table.increments('id').primary();
    table.string('contact');
    table.string('shipping');
    table.integer('tracking');
    table.timestamp('time');
    table.integer('total');
  })
  .createTable('cart_items', table => {
    table.increments('id').primary();
    table.integer('quantity');
    table.timestamp('created_at');
    table.timestamp('modified_at');
    table.integer('product_id').references('id').inTable('products').notNull().onDelete('cascade');
    table.integer('session_id').references('id').inTable('sessions').notNull().onDelete('cascade');
  })
  .createTable('order_items', table => {
    table.increments('id').primary();
    table.integer('quantity');
    table.timestamp('created_at');
    table.integer('order_id').references('id').inTable('order_details').notNull().onDelete('cascade');
    table.integer('product_id').references('id').inTable('products').notNull().onDelete('cascade');
  })
};

exports.down = function(knex) {
  return Promise.all([
    knex.dropTable('cart_items'),
    knex.dropTable('order_items'),
    knex.dropTable('order_details'),
    knex.dropTable('products'),
    knex.dropTable('sessions')
  ])
};
