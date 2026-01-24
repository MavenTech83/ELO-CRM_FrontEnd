import Layout from "../../components/layout/Layout"
import { useNavigate } from "react-router-dom"
import type Oportunidade from "../../models/Oportunidade"
import ListaOportunidade from "../../components/oportunidade/listaoportunidade/ListaOportunidade"
import 'reactjs-popup/dist/index.css';
import ModalOportunidade from "../../components/oportunidade/modaloportunidade/ModalOportunidade";
import ModalCliente from "../../components/cliente/modalcliente/ModalCliente";
import { useState } from "react";
import DetalhesOportunidade from "../../components/oportunidade/detalhesoportunidades/DetalhesOportunidade";
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart, PieChart} from "@mui/x-charts";
function Home() {
	const navigate = useNavigate()
	 

	const handleSelectOportunidade = (oportunidade: Oportunidade) => {
		console.log("Oportunidade selecionada:", oportunidade.id)
	}
	const [selectedCard, setSelectedCard] = useState<Oportunidade | null>(null);

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
									<div className="bg-white/10 rounded-3xl p-4 flex flex-col h-full w-2/3 gap-1 overflow-hidden">
										<div className="flex items-center justify-between mb-4 flex-none">
											{/* <h2 className="text-3xl font-bold text-amber-50">
												Oportunidades
											</h2> */}
											<section className="flex gap-4 w-2/3">
												<ModalCliente/>
												<ModalOportunidade />
											</section>
											
										</div>

										<div className="flex flex-col gap-2">
											{/* <ListaOportunidade onSelect={setSelectedCard} /> */}
												<div className="bg-white/10 border rounded-2xl text-white" >
													<LineChart
														xAxis={[{ data: [1, 2, 3, 5, 8, 10],tickLabelStyle: { fill: 'white' } }]}
														yAxis={[{ tickLabelStyle: { fill: 'white' } }]}
														series={[
															{
															data: [2, 5.5, 2, 8.5, 1.5, 5],
															area: true,
															label: 'Oportunidades Fechadas'
															},
														]}
														sx={{
															'& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
															stroke: 'white',
															},
															'& .MuiChartsLegend-root': {
															color: 'white',
															},
															'& .MuiChartsLegend-mark': {
															backgroundColor: 'white',
															},
														}}
														height={200}
													/>
													

												</div>
												<div className="bg-white/10 border rounded-2xl text-white">
													<BarChart
														xAxis={[{ data: ['Jan', 'Fev', 'Mar'], tickLabelStyle: { fill: 'white' } }]}
														yAxis={[{ tickLabelStyle: { fill: 'white' } }]}
														series={[{ data: [10, 20, 30], label: 'Total Oportunidades' }]}
														sx={{
															'& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
															stroke: 'white',
															},
															'& .MuiChartsLegend-root': {
															color: 'white',
															},
															'& .MuiChartsLegend-mark': {
															backgroundColor: 'white',
															},
														}}
														width={500}
														height={300}
													/>
												</div>
												
										</div>
									</div>
									{/* CONTEÚDO 2 - FILTROS E DADOS */}
									<div className="flex flex-col bg-white/10 rounded-2xl h-full w-1/3 overflow-hidden">
										<section className="flex flex-col p-2">
											<div className="bg-white/10 border rounded-2xl">
												<PieChart
												series={[
													{
													data: [
														{ id: 0, value: 10, label: 'Abertas' },
														{ id: 1, value: 15, label: 'Fechadas' },
														{ id: 2, value: 20, label: 'Perdidas' },
													],
													},
												]}
												width={150}
												height={200}
												/>
											</div>
											 
										</section>
										<section className="p-4 ">
											<div className="bg-white/10 border rounded-2xl h-full">
												Anotações:
											</div>
											{/* <hr className="text-white/60 p-2"/>
											 <DetalhesOportunidade oportunidade={selectedCard} /> */}
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