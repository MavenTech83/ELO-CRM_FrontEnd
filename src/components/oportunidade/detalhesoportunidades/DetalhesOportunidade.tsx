import type Oportunidade from "../../../models/Oportunidade";

interface Props {
  oportunidade: Oportunidade | null;
}

export default function DetalhesOportunidade({ oportunidade }: Props) {
  if (!oportunidade) {
    return (
      <div className="h-full flex items-center justify-center ">
        Selecione uma oportunidade ao lado
      </div>
    );
  }

  const data = new Date(oportunidade.dataCriacao);
  const dataValida = isNaN(data.getTime()) ? null : data;

  return (
    <div className="space-y-3 animate-fadeIn">
      <h1 className="text-2xl font-bold">
        {oportunidade.descricao}
      </h1>

      <p><b>Status:</b> {oportunidade.status}</p>
      <p><b>Valor Potencial:</b> {oportunidade.valorPotencial}</p>
      <p><b>Cliente:</b> {oportunidade.cliente?.nome || "Não informado"}</p>
      <p><b>Tipo:</b> {oportunidade.tipoOportunidade?.descricao || "Não informado"}</p>

      <p>
        <b>Data:</b>{" "}
        {dataValida
          ? new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "full",
              timeStyle: "short",
            }).format(dataValida)
          : "Data inválida"}
      </p>
    </div>
  );
}
