export interface Produtos {
  codigo: number;
  descricao: string;
  categoria: number;
  qtdEstoque: number;
  estoqueMinimo: number;
  ativo: boolean
  created_at: string;
  updated_at: string;
}