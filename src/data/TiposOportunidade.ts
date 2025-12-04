import type { TipoOportunidade } from "../models/TipoOportunidade";

const TIPOS_FALLBACK: TipoOportunidade[] = [
  { id: 1, descricao: "Residencial" },
  { id: 2, descricao: "Automóvel" },
  { id: 3, descricao: "Vida" },
  { id: 4, descricao: "Empresarial" },
  { id: 5, descricao: "Saúde" },
  { id: 6, descricao: "Viagem" },
  { id: 7, descricao: "Responsabilidade Civil" },
  { id: 8, descricao: "Transporte / Frota" },
  { id: 9, descricao: "Cyber" },
  { id: 10, descricao: "Pet" }
];

export default TIPOS_FALLBACK;
