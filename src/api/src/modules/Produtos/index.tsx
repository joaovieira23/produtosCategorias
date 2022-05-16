import { Request, Response } from "express";
import { Produtos } from "../../@types/Produtos";
import knex from "../../db";


export async function postProdutos(req: Request, res: Response) {
  const { descricao, categoria, qtdEstoque, estoqueMinimo, ativo } = req.body as {
    descricao: string;
    categoria: number;
    qtdEstoque: number;
    estoqueMinimo: number;
    ativo: boolean
  };

  const transaction = await knex.transaction();

  const insertProduto = await transaction("produtos")
    .insert([{ descricao, categoria, qtdEstoque, estoqueMinimo, ativo }])
    .returning('*')

  await transaction.commit();

  if (insertProduto) {
    return res.status(201).send(insertProduto);
  }
}

export async function getProduto(req: Request, res: Response) {

  const transaction = await knex.transaction();

  const protudo = await transaction("produtos")
    .select('*');

  await transaction.commit();

  return res.status(201).send(protudo);
}

export async function putProduto(req: Request, res: Response) {
  const { id, descricao, categoria, qtdEstoque, estoqueMinimo, ativo } = req.body as {
    id: number;
    descricao: string;
    categoria: number;
    qtdEstoque: number;
    estoqueMinimo: number;
    ativo: boolean
  };

  if (id) {
    await knex<Produtos>("produtos")
      .where("id", "=", id)
      .update({
        descricao,
        categoria,
        qtdEstoque,
        estoqueMinimo,
        ativo
      });
  }

  return res.status(204).end();
}

export async function deleteProduto(req: Request, res: Response) {
  const { id } = req.body as {
    id: number;
  };

  if (id) {
    await knex<Produtos>("produtos")
      .where("id", "=", id)
      .delete()
  }

  return res.status(204).end();
}


