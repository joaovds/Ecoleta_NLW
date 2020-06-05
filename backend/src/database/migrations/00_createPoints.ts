import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('tb_points', (table) => {
    table.increments('cd_points').primary();

    table.string('image').notNullable();
    table.string('name', 80).notNullable();
    table.string('email', 100).notNullable();
    table.string('whatsapp', 20).notNullable();

    table.decimal('latitude', 10, 7).notNullable();
    table.decimal('longitude', 10, 7).notNullable();

    table.string('city', 50).notNullable();
    table.string('uf', 2).notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('tb_points');
}
