exports.up = function(knex) {
  return knex.schema.createTable('products', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
    table.string('image');
    table.string('category');
    table.integer('stock');
    table.integer('price');
  })
  .createTable('users', table => {
    table.increments('id').primary();
    table.string('username').unique();
    table.string('password');
    table.string('permissions');
    table.string('email');
  })
  .createTable('carts', table => {
    table.increments('id').primary();
    table.timestamp('created_at').notNull().defaultTo(knex.fn.now());
  })
  .createTable('orders', table => {
    table.increments('id').primary();
    table.string('contact');
    table.string('shipping');
    table.integer('tracking');
    table.string('status');
    table.timestamp('ordered_at').notNull().defaultTo(knex.fn.now());
    table.integer('total');
  })
  .createTable('cart_items', table => {
    table.increments('id').primary();
    table.integer('quantity');
    table.timestamp('created_at').notNull().defaultTo(knex.fn.now());
    table.timestamp('modified_at').notNull().defaultTo(knex.fn.now());
    table.integer('product_id').references('id').inTable('products').notNull().onDelete('cascade');
    table.integer('cart_id').references('id').inTable('carts').notNull().onDelete('cascade');
    table.unique(['product_id', 'cart_id'])
  })
  .createTable('order_items', table => {
    table.increments('id').primary();
    table.integer('quantity');
    table.timestamp('created_at').notNull().defaultTo(knex.fn.now());
    table.integer('order_id').references('id').inTable('orders').notNull().onDelete('cascade');
    table.integer('product_id').references('id').inTable('products').notNull().onDelete('cascade');
  })
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('cart_items'),
    knex.schema.dropTable('order_items'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('products'),
    knex.schema.dropTable('carts')
  ])
};
