exports.up = function (knex) {
  return knex.schema.createTable('articles', (table) => {
    table.increments().unique();
    table.text('author').notNullable();
    table.text('title').notNullable();
    table.text('body', 'longtext').notNullable();
    table.timestamp('created').defaultTo(knex.fn.now());
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable('articles');
};
