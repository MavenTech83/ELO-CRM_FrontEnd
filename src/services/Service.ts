
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Função para cadastrar usuário sem token
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function ) => { 
    const resposta = await api.post(url, dados); // faz uma requisição POST para a URL fornecida com os dados fornecidos
    setDados(resposta.data); // atualiza o estado com os dados da resposta, variável de estado passada como parâmetro
}

// Função para login sem token
export const login = async (url: string, dados: Object, setDados: Function ) => { 
    const resposta = await api.post(url, dados); // faz uma requisição POST para a URL fornecida com os dados fornecidos
    setDados(resposta.data); // atualiza o estado com os dados da resposta, variável de estado passada como parâmetro
    return resposta.data; 
  }
  
// Função para consultar com token
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
  }
  
  // Função para cadastrar com token
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
  }

  // Função para atualizar com token
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
  }
  
  // Função para deletar com token
  export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header);
  }