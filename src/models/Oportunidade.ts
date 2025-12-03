import type TipoOportunidade from "./TipoOportunidade";
import type Cliente from "./Cliente";

export default interface Oportunidade {
    id: number;
    descricao: string;
    status: string;
    valorPotencial: string;
    dataCricao: string;
    tipoOportunidade: TipoOportunidade | null;
    cliente: Cliente | null;
}