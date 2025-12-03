import type Cliente from "./Cliente";


export default interface Oportunidade{
    id: number;
    descricao: string;
    status: string;
    valorPotencial: string;
    dataCricao: string;
    tipoOportunidade: TipoOportunidade | null;
    usuario: Usuario | null;
    cliente: Cliente | null;
}