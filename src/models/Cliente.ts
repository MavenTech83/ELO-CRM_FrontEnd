import type Oportunidade from "./Oportunidade";

export default interface Cliente {
    id: number | undefined;
    nome: string;
    email: string;
    telefone: string;
    endereco: string | null;
    oportunidade: Oportunidade | null;
}