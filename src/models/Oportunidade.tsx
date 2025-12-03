export default interface Oportunidade{
    id: number;
    descricao: string;
    status: string;
    valorPotencial: string;
    dataCricao: string;
    tipoOportunidade: string | null;
    cliente: string;
}