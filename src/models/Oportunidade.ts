import type Cliente from "./Cliente";

export default interface Oportunidade {
    id?: number;
    descricao: string;
    status: string | boolean;  
    valorPotencial: string | number;  
    dataCriacao: string;
    tipoOportunidade: string; 
    cliente: Cliente | null;
}