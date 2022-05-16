import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const temTabelaCategorias = await knex.schema.hasTable("categorias");

  if (!temTabelaCategorias) {
    return knex.schema.createTable("categorias", (table) => {
      table.increments();


      table.string("descricao").notNullable();
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("categorias")) {
    return knex.schema.dropTable("categorias");
  }
}
