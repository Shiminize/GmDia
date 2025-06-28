/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('products', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.decimal('price', 10, 2).notNullable().defaultTo(0);
    table.string('imageUrl').notNullable();
    table.string('category').notNullable();
    table.specificType('metalOptions', 'text[]');
    table.specificType('diamondShapeOptions', 'text[]');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
