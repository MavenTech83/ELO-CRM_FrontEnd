import { useNavigate } from "react-router-dom";
import type Oportunidade from "../../models/Oportunidade";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { buscarOportunidades } from "../../services/OportunidadeService";
import Layout from "../../components/layout/Layout";
import ModalCliente from "../../components/cliente/modalcliente/ModalCliente";
import ModalOportunidade from "../../components/oportunidade/modaloportunidade/ModalOportunidade";
import { SyncLoader } from "react-spinners";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import ToDoList from "../../components/todolist/ToDoList";
import MetricsCards from "../../components/dashboard/MetricsCards";
import GraficoGanhos from "../../components/dashboard/GraficoGanhos";

function Home() {
	const navigate = useNavigate()
	
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]) 
	const { usuario, handleLogout } = useContext(AuthContext)

	// token
    const token = usuario.token

	const valores = useMemo(() => {
	return oportunidades
		.map(op => Number(op.valorPotencial))
		.filter(valor => !isNaN(valor));
	}, [oportunidades]);
	
	useEffect(() => {
	if (token) {
		buscarTodasOportunidades();
	}
	}, [token]);

	
	async function buscarTodasOportunidades() { 
		try {
			setIsLoading(true)
	
			await buscarOportunidades((dados: any) => {
				if (Array.isArray(dados)) {
					dados.forEach((oportunidade: Oportunidade) => {
						const chave = `status-op-${oportunidade.id}`
						if (!localStorage.getItem(chave)) {
							localStorage.setItem(chave, 'Aberta')
						}
					})
					setOportunidades(dados)
				} 
				else if (Array.isArray(dados.content)) {
					dados.content.forEach((oportunidade: Oportunidade) => {
						const chave = `status-op-${oportunidade.id}`
						if (!localStorage.getItem(chave)) {
							localStorage.setItem(chave, 'Aberta')
						}
					})
					setOportunidades(dados.content)
				}
				else {
					setOportunidades([])
				}
			}, { headers: { Authorization: token } })
	
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			}
		} finally {
			setIsLoading(false)
		}
	}

	const chartStyles = {
		'& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
			stroke: 'white',
			fill: 'white',
		},
		'& .MuiChartsLegend-root': {
			color: 'white',
		},
		'& .MuiChartsLegend-mark': {
			backgroundColor: 'white',
		},
	};
	
	const dadosGrafico = useMemo(() => {
	return oportunidades
		.map((op) => ({
		label: op.descricao || `Op ${op.id}`,
		valor: Number(op.valorPotencial),
		}))
		.filter((item) => !isNaN(item.valor));
	}, [oportunidades]);

	const totalGanhos = useMemo(() => {
	return dadosGrafico.reduce((acc, item) => acc + item.valor, 0);
	}, [dadosGrafico]);

	const mediaGanhos = useMemo(() => {
	return dadosGrafico.length > 0
		? totalGanhos / dadosGrafico.length
		: 0;
	}, [totalGanhos, dadosGrafico.length]);

	const maiorGanho = useMemo(() => {
	return dadosGrafico.length > 0
		? Math.max(...dadosGrafico.map(item => item.valor))
		: 0;
	}, [dadosGrafico]);

	const formatarMoeda = (valor: number) =>
	valor.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});

	const dadosStatus = useMemo(() => {
	let abertas = 0;
	let fechadas = 0;
	let perdidas = 0;

	oportunidades.forEach((op) => {
		const status = localStorage.getItem(`status-op-${op.id}`);

		if (status === 'Fechada') fechadas++;
		else if (status === 'Perdida') perdidas++;
		else abertas++; // default
	});

  return [
    { id: 0, value: abertas, label: 'Abertas' },
    { id: 1, value: fechadas, label: 'Fechadas' },
    { id: 2, value: perdidas, label: 'Perdidas' },
  ];
}, [oportunidades]);

const dadosBarraPorMes = useMemo(() => {
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const contagem = Array(12).fill(0);

  oportunidades.forEach((op) => {
    if (!op.dataCriacao) return;

    const data = new Date(op.dataCriacao);
    const mes = data.getMonth(); // 0-11

    if (!isNaN(mes)) {
      contagem[mes]++;
    }
  });

  return meses.map((mes, index) => ({
    mes,
    total: contagem[index],
  }));
}, [oportunidades]);


	return (
		<>
			<Layout>
				<div className="flex-1 transition-all duration-300 ">
					<div className="flex flex-col">
  						<div className="pt-1">
							{/* SEÇÃO PAI NÃO MODIFICAR */}
							<section className=" h-[75vh] rounded-4xl p-3">
								{/* <ListaOportunidade /> */}
								<div className="flex gap-4 h-full">
									{/* CONTEÚDO 1 - LISTAR DADOS */}
									<div className="bg-white/10 rounded-3xl p-4 pt-4 flex flex-col w-2/3 overflow-hidden">
										<div className="flex items-center justify-between mb-2 flex-none">
											<section className="flex gap-2 w-full">
												<ModalCliente/>
												<ModalOportunidade />
											</section>
										</div>
										{/* div conteudo altura */}
										<div className="flex flex-col gap-2 h-full">
											{/* teste listar start */}
											<div className="bg-white/10 rounded-3xl p-4 flex flex-col gap-1 border">
												<div className="flex overflow-y-auto min-h-0 space-y-2 pr-2">
													{/* LOADING */}
													{isLoading && (
														<div className="flex justify-center w-full my-8">
														<SyncLoader
															color="#bce7fb"
															size={32}
														/>
														</div>
													)}
																										
													{/* LISTA DE OPORTUNIDADES */}
													{(!isLoading && dadosGrafico.length > 0) && (
														<div className="w-full h-80">
															<div className="flex gap-4">
																<MetricsCards
																	total={totalGanhos}
																	media={mediaGanhos}
																	maior={maiorGanho}
																	formatarMoeda={formatarMoeda}
																/>

																</div>
																<GraficoGanhos
																	labels={dadosGrafico.map(d => d.label)}
																	valores={dadosGrafico.map(d => d.valor)}
																	chartStyles={chartStyles}
																/>

														</div>
														
													)}

												</div>
											</div>
											<div className="bg-white/10 border rounded-2xl text-white h-1/2">
												<BarChart
													xAxis={[
														{
														scaleType: 'band',
														data: dadosBarraPorMes.map((d) => d.mes),
														tickLabelStyle: { fill: 'white' },
														},
													]}
													yAxis={[
														{
														tickLabelStyle: { fill: 'white' },
														},
													]}
													series={[
														{
														data: dadosBarraPorMes.map((d) => d.total),
														label: 'Total de Oportunidades',
														},
													]}
													sx={chartStyles}
													width={500}
													height={200}
												/>

											</div>
												
										</div>
									</div>
									{/* CONTEÚDO 2 - FILTROS E DADOS */}
									<div className="flex flex-col bg-white/10 rounded-2xl h-full w-1/3 overflow-hidden">
										<section className="flex flex-col p-2">
											<div className="bg-white/10 border rounded-2xl">
												{dadosStatus.some(item => item.value > 0) && (
													<PieChart
													series={[
														{
														data: dadosStatus,
														},
													]}
													sx={{
														'& .MuiChartsLegend-root': {
														color: 'white',
														},
													}}
													width={150}
													height={200}
													/>
													)}
											</div>
											 
										</section>
										<section className="p-2 h-full">
											<div className="bg-white/10 border rounded-2xl h-full">
												<ToDoList />
											</div>
										</section>
									</div>
								</div> 
							</section>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Home