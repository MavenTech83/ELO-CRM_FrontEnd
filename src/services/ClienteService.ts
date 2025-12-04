import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Buscar todos os clientes
export const buscarClientes = async (setDados: Function, header: Object) => {
    const resposta = await api.get('/clientes', header);
    setDados(resposta.data);
}

// Buscar cliente por ID
export const buscarClientePorId = async (id: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`/clientes/${id}`, header);
    setDados(resposta.data);
}

// Buscar clientes por nome
export const buscarClientesPorNome = async (nome: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`/clientes/busca?nome=${nome}`, header);
    setDados(resposta.data);
}

// Cadastrar cliente
export const cadastrarCliente = async (dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post('/clientes', dados, header);
    setDados(resposta.data);
}

// Atualizar cliente
export const atualizarCliente = async (dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put('/clientes', dados, header);
    setDados(resposta.data);
}

// Deletar cliente
export const deletarCliente = async (id: string, header: Object) => {
    await api.delete(`/clientes/${id}`, header);
}