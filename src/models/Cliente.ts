import type Oportunidade from "./Oportunidade";

export default interface Cliente {
    id?: number;
    nome: string;
    email: string;
    telefone?: string;
    endereco?: string | null;
    oportunidade?: Oportunidade[] | null;
}