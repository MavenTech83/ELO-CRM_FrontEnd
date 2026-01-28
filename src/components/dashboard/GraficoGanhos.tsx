import { LineChart } from '@mui/x-charts';

interface Props {
  labels: string[];
  valores: number[];
  chartStyles: any;
}

export default function GraficoGanhos({
  labels,
  valores,
  chartStyles,
}: Props) {
  if (valores.length === 0) {
    return (
      <div className="text-center text-white opacity-70 py-10">
        Nenhuma oportunidade com valor potencial disponível
      </div>
    );
  }

  return (
    <LineChart
      xAxis={[
        {
          scaleType: 'band',
          data: labels,
          tickLabelStyle: { fill: 'white' },
        },
      ]}
      series={[
        {
          data: valores,
          area: true,
          label: 'Projeção Ganhos',
        },
      ]}
      sx={chartStyles}
      height={200}
      width={500}
    />
  );
}
