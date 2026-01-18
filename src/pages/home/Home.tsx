import Layout from "../../components/layout/Layout"
import { useNavigate } from "react-router-dom"
import type Oportunidade from "../../models/Oportunidade"
import ListaOportunidade from "../../components/oportunidade/listaoportunidade/ListaOportunidade"
import 'reactjs-popup/dist/index.css';
import ModalOportunidade from "../../components/oportunidade/modaloportunidade/ModalOportunidade";
import ModalCliente from "../../components/cliente/modalcliente/ModalCliente";
import Filtro from "../../components/filtro/Filtro";
import { useState } from "react";
import DetalhesOportunidade from "../../components/oportunidade/detalhesoportunidades/DetalhesOportunidade";

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
								<div className="grid grid-cols-[3fr_1fr] gap-4 h-full">
									{/* CONTEÚDO 1 - LISTAR DADOS */}
									<div className="bg-white/20 rounded-3xl p-4 flex flex-col h-full w-full gap-1 overflow-hidden">
										<div className="flex items-center justify-between mb-4 flex-none">
											<h2 className="text-3xl font-bold text-amber-50">
												Oportunidades
											</h2>
											<section className="flex gap-4 w-2/3">
												<ModalCliente/>
												<ModalOportunidade />
											</section>
											
										</div>

										<div className="flex-1 overflow-y-auto min-h-0 space-y-2 pr-2">
											<ListaOportunidade onSelect={setSelectedCard} />
										</div>
									</div>
									{/* CONTEÚDO 2 - FILTROS E DADOS */}
									<div className="flex flex-col bg-white/20 rounded-2xl h-full overflow-hidden">
										<section className="flex flex-col">
											<Filtro onSelect={handleSelectOportunidade} />
										</section>
										<section className="p-4">
											<hr className="text-white/60 p-2"/>
											 <DetalhesOportunidade oportunidade={selectedCard} />
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