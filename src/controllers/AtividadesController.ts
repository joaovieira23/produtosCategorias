import api from '../services/api';

export interface Atividade {
  id: number,
  local: string,
  data_entrega: string,
  hora_entrega: string,
  status: string,
  atividade: 1,
  created_at: string,
  updated_at: string
}

class AtividadesController {
  async getAtividades() {
    const data = await api.get('/atividades')
    console.warn('data', data)

    return data;
  }

}

export default new AtividadesController();