import { Request, Response } from "express";
import { Categorias } from "../../@types/Categorias";
import knex from "../../db";


export async function postCategorias(req: Request, res: Response) {
  const { id, descricao } = req.body as {
    id: number;
    descricao: string;
  };

  const transaction = await knex.transaction();

  const insertCategoria = await transaction("categorias")
    .insert([{ id, descricao }])
    .returning('*')

  await transaction.commit();

  if (insertCategoria) {
    return res.status(201).send(insertCategoria);
  }
}

export async function getCategoria(req: Request, res: Response) {
  // const { id } = req.query as {
  //   id: string;
  // };

  const transaction = await knex.transaction();

  const categoria = await transaction("categorias")
    .select('*')

  transaction.commit();

  return res.status(201).send(categoria);

}

export async function putCategoria(req: Request, res: Response) {
  const { id, descricao } = req.body as {
    id: number;
    descricao: string;
  };

  if (id) {
    await knex<Categorias>("categorias")
      .where("id", "=", id)
      .update({
        descricao
      });
  }

  return res.status(204).end();
}

export async function deleteCategoria(req: Request, res: Response) {
  const { id } = req.body as {
    id: number;
  };

  if (id) {
    await knex<Categorias>("categorias")
      .where("id", "=", id)
      .delete()
  }

  return res.status(204).end();
}


