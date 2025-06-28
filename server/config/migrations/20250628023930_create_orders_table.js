/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('orders', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.jsonb('orderItems').notNullable();
    table.jsonb('shippingAddress').notNullable();
    table.string('paymentMethod').notNullable();
    table.jsonb('paymentResult');
    table.decimal('taxPrice', 10, 2).notNullable().defaultTo(0.0);
    table.decimal('shippingPrice', 10, 2).notNullable().defaultTo(0.0);
    table.decimal('totalPrice', 10, 2).notNullable().defaultTo(0.0);
    table.boolean('isPaid').notNullable().defaultTo(false);
    table.timestamp('paidAt');
    table.boolean('isDelivered').notNullable().defaultTo(false);
    table.timestamp('deliveredAt');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
