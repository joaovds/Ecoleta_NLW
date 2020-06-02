import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('tb_points_items', (table) => {
    table.increments('cd_points_items').primary();

    table
      .integer('id_points')
      .unsigned()
      .references('cd_points')
      .inTable('tb_points');

    table
      .integer('id_items')
      .unsigned()
      .references('cd_items')
      .inTable('tb_items');
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('tb_points_items');
}
