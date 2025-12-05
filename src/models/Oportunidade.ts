import type Cliente from "./Cliente";
import type { TipoOportunidade } from "./TipoOportunidade";


export default interface Oportunidade {
    id?: number;
    descricao: string;
    status: string | boolean;  
    valorPotencial: string | number;  
    dataCriacao: string;
    tipoOportunidade: TipoOportunidade | null ;
    cliente: Cliente | null;
}