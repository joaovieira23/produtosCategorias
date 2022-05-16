import { Router } from "express";
import { postCategorias, deleteCategoria, getCategoria, putCategoria } from "./modules/Categorias";
import { postProdutos, deleteProduto, getProduto, putProduto } from "./modules/Produtos";

const router = Router();

//Categorias
router.post("/categorias", postCategorias);
router.get("/categorias", getCategoria);
router.delete("/categorias", deleteCategoria);
router.put("/categorias", putCategoria);

//Produto
router.post("/produtos", postProdutos);
router.get("/produtos", getProduto);
router.delete("/produtos", deleteProduto);
router.put("/produtos", putProduto);


export default router;
