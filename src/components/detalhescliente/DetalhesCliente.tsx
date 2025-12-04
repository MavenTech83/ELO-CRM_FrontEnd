import type Cliente from "../../models/Cliente";

interface Props {
  cliente: Cliente | null;
}

export default function DetalhesOportunidade({ cliente }: Props) {
  if (!cliente) {
    return (
      <div className="h-full flex items-center justify-center ">
        Selecione um cliente ao lado
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fadeIn">
      <h1 className="text-2xl font-bold">
        {cliente.nome}
      </h1>

      <p><b>E-mail:</b> {cliente.email}</p>
      <p><b>Endereço:</b> {cliente.endereco}</p>
      <p><b>Telefone:</b> {cliente.telefone}</p>
      <p><b>Oportunidade:</b> {cliente.oportunidade?.descricao || "Não informado"}</p>
      <p><b>Tipo Oportunidade:</b> {cliente.oportunidade?.valorPotencial || "Não informado"}</p>
      <p><b>Tipo Oportunidade:</b> {cliente.oportunidade?.status || "Não informado"}</p>

      
    </div>
  );
}
