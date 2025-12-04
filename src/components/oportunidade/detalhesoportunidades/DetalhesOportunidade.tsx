import type Oportunidade from "../../../models/Oportunidade";
import AtualizacaoStatusSelect from "../../statusoportunidade/StatusOportunidade";

interface Props {
  oportunidade: Oportunidade | null;
}

export default function DetalhesOportunidade({ oportunidade }: Props) {
  if (!oportunidade) {
    return (
      <div className="h-full flex items-center justify-center  text-amber-50 (--color-picton-blue-200) ">
        Selecione uma oportunidade ao lado
      </div>
    );
  }

  const data = new Date(oportunidade.dataCriacao);
  const dataValida = isNaN(data.getTime()) ? null : data;

  return (
    <div className="space-y-3 animate-fadeIn  ">
      <h1 className="text-2xl font-bold  text-amber-50 (--color-picton-blue-200)">
        {oportunidade.descricao}
      </h1>

      <div>
        <b>Status:</b>
        <div className="mt-1 max-w-xs">
          <AtualizacaoStatusSelect
            oportunidadeId={oportunidade.id || 0}
            currentStatus={oportunidade.status as any}
            onUpdated={(newStatus) => console.log("Status atualizado:", newStatus)}
          />
        </div>
      </div>

      <p><b>Valor Potencial:</b> {oportunidade.valorPotencial}</p>
      <p><b>Cliente:</b> {oportunidade.cliente?.nome || "Não informado"}</p>
      <p>
  <b>Tipo:</b>{" "}
  {typeof (oportunidade as any).tipoOportunidade === "string"
    ? (oportunidade as any).tipoOportunidade
    : oportunidade.tipoOportunidade?.descricao || "Não informado"}
</p>

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