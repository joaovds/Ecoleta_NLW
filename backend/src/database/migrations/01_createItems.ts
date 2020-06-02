import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('tb_items', (table) => {
    table.increments('cd_items').primary();

    table.string('image').notNullable();
    table.string('title', 100).notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('tb_items');
}
