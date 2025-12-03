import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Buscar todos os tipos de oportunidade
export const buscarTiposOportunidade = async (setDados: Function, header: Object) => {
    const resposta = await api.get('/tiposoportunidade', header);
    setDados(resposta.data);
}

// Buscar tipo por ID
export const buscarTipoOportunidadePorId = async (id: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`/tiposoportunidade/${id}`, header);
    setDados(resposta.data);
}

// Cadastrar tipo de oportunidade
export const cadastrarTipoOportunidade = async (dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post('/tiposoportunidade', dados, header);
    setDados(resposta.data);
}

// Atualizar tipo de oportunidade
export const atualizarTipoOportunidade = async (dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put('/tiposoportunidade', dados, header);
    setDados(resposta.data);
}

// Deletar tipo de oportunidade
export const deletarTipoOportunidade = async (id: string, header: Object) => {
    await api.delete(`/tiposoportunidade/${id}`, header);
}