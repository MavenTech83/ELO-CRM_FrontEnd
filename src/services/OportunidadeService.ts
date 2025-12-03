import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Buscar todas as oportunidades
export const buscarOportunidades = async (setDados: Function, header: Object) => {
    const resposta = await api.get('/oportunidades', header);
    setDados(resposta.data);
}

// Buscar oportunidades por usuário
export const buscarOportunidadesPorUsuario = async (usuarioId: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`/oportunidades/usuario/${usuarioId}`, header);
    setDados(resposta.data);
}

// Buscar oportunidades por status
export const buscarOportunidadesPorStatus = async (status: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`/oportunidades/status/${status}`, header);
    setDados(resposta.data);
}

// Buscar oportunidades por tipo
export const buscarOportunidadesPorTipo = async (tipoId: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`/oportunidades/tipo/${tipoId}`, header);
    setDados(resposta.data);
}

// Buscar oportunidades por cliente
export const buscarOportunidadesPorCliente = async (clienteId: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`/oportunidades/cliente/${clienteId}`, header);
    setDados(resposta.data);
}

// Buscar oportunidades por faixa de valor
export const buscarOportunidadesPorValor = async (valorMin: string, valorMax: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`/oportunidades/valor?min=${valorMin}&max=${valorMax}`, header);
    setDados(resposta.data);
}

// Buscar uma oportunidade específica por ID
export const buscarOportunidadePorId = async (id: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`/oportunidades/${id}`, header);
    setDados(resposta.data);
}

// Cadastrar oportunidade
export const cadastrarOportunidade = async (dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post('/oportunidades', dados, header);
    setDados(resposta.data);
}

// Atualizar oportunidade
export const atualizarOportunidade = async (dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put('/oportunidades', dados, header);
    setDados(resposta.data);
}

// Deletar oportunidade
export const deletarOportunidade = async (id: string, header: Object) => {
    await api.delete(`/oportunidades/${id}`, header);
}