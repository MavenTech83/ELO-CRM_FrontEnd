import type Cliente from "./Cliente";
import type { TipoOportunidade } from "./TipoOportunidade";


export default interface Oportunidade {
    id: number;
    descricao: string;
    status: string;
    valorPotencial: string;
    dataCriacao: string;
    tipoOportunidade: TipoOportunidade | null ;
    cliente: Cliente | null;
}
