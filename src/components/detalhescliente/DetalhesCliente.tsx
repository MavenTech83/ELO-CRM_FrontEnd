import type Cliente from "../../models/Cliente";

interface Props {
  cliente: Cliente | null;
}

export default function DetalhesCliente({ cliente }: Props) {
  if (!cliente) {
    return (
      <div className="h-full flex items-center justify-center text-amber-50">
        Selecione um cliente ao lado
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fadeIn text-amber-50">
      <h1 className="text-2xl font-bold text-amber-50">
        {cliente.nome}
      </h1>

      <p><b>E-mail:</b> {cliente.email}</p>
      <p><b>Endereço:</b> {cliente.endereco || "Não informado"}</p>
      <p><b>Telefone:</b> {cliente.telefone || "Não informado"}</p>
      <p><b>Oportunidade:</b> {cliente.oportunidade?.descricao || "Não informado"}</p>
      <p><b>Tipo Oportunidade:</b> {cliente.oportunidade?.tipoOportunidade || "Não informado"}</p>

      
    </div>
  );
}