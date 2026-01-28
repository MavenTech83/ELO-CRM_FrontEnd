interface Props {
  total: number;
  media: number;
  maior: number;
  formatarMoeda: (valor: number) => string;
}

export default function MetricsCards({
  total,
  media,
  maior,
  formatarMoeda,
}: Props) {
  return (
    <div className="flex gap-4 mb-2">
      <div className="bg-white/10 rounded-2xl p-4 text-white w-1/3">
        <p className="text-sm opacity-70">Total de Ganhos</p>
        <p className="text-2xl font-bold">{formatarMoeda(total)}</p>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 text-white w-1/3">
        <p className="text-sm opacity-70">Média por Oportunidade</p>
        <p className="text-2xl font-bold">{formatarMoeda(media)}</p>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 text-white w-1/3">
        <p className="text-sm opacity-70">Maior Oportunidade</p>
        <p className="text-2xl font-bold">{formatarMoeda(maior)}</p>
      </div>
    </div>
  );
}
