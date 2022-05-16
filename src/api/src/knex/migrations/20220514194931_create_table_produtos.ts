import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const temTabelaProdutos = await knex.schema.hasTable("produtos");

  if (!temTabelaProdutos) {
    return knex.schema.createTable("produtos", (table) => {
      table.increments();


      table.string("descricao").notNullable();
      table
        .integer("categoria")
        .notNullable()
        .references("id")
        .inTable("categorias")
        .onDelete("cascade");

      table.integer("qtdEstoque").notNullable();
      table.integer("estoqueMinimo").notNullable();
      table.boolean("ativo").notNullable();

      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("produtos")) {
    return knex.schema.dropTable("produtos");
  }
}
