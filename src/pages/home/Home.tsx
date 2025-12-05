import Layout from "../../components/layout/Layout"
import { useNavigate } from "react-router-dom"
import type Oportunidade from "../../models/Oportunidade"
import ListaOportunidade from "../../components/oportunidade/listaoportunidade/ListaOportunidade"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormOportunidade from "../../components/oportunidade/formoportunidade/FormOportunidade";
import FormCliente from "../../components/cliente/formcliente/FormCliente";

function Home() {
	const navigate = useNavigate()

	const handleSelectOportunidade = (oportunidade: Oportunidade) => {
		console.log("Oportunidade selecionada:", oportunidade.id)
	}

	return (
		<>
			<Layout>
				<div className="flex-1 transition-all duration-300">
					<div className="flex flex-col">

						{/* SEÇÃO SUPERIOR ... (mantém igual) */}
						<div className="grid grid-cols-2 gap-2 w-full">
						
						
							
						</div>

						{/* SEÇÃO INFERIOR */}
						<div className="pt-1">
							<section className="bg-white/20 h-[60vh] rounded-4xl p-3">
								<div className="grid grid-cols-[3fr_1fr] gap-4 h-full">

									<div className="bg-(--color-picton-blue-800) rounded-3xl p-4 flex flex-col h-full w-full gap-1 overflow-hidden">
										<div className="flex items-center justify-between mb-4 flex-none">
											<h2 className="text-3xl font-bold text-(--color-picton-blue-950)  text-amber-50 (--color-picton-blue-200)">
												Oportunidades
											</h2>


											<Popup
												trigger={
													<button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl text-base font-semibold shadow-md">
														Cadastrar Nova oportunidade
													</button>
												}
												modal
												nested
												contentStyle={{
													borderRadius: '1rem',
													width: 'auto',     // Ajusta largura automática
													maxWidth: '800px'  // Limite máximo para não estourar
												}}
											>

												<div>
													<FormOportunidade />
												</div>
											</Popup>

										</div>

										<div className="flex-1 overflow-y-auto min-h-0 space-y-2 pr-2">
											<ListaOportunidade onSelect={handleSelectOportunidade} />
										</div>
									</div>

									<div className="flex items-center justify-center h-full overflow-hidden">

										<Popup
											trigger={
												<button
													className="bg-(--color-picton-blue-950) hover:bg-(--color-picton-blue-800) hover:border-2 hover:border-(--color-picton-blue-950)  text-white px-8 py-6 rounded-2xl text-xl font-semibold shadow-md flex flex-col items-center justify-center gap-1"
												>
													<span>Cadastrar Novo</span>
													<span className="text-2xl">Cliente</span>
												</button>
											}
											modal
											nested
											contentStyle={{
												borderRadius: '1rem',
												width: 'auto',
												maxWidth: '800px'
											}}
										>
											{/* O COMPONENTE DO FORMULÁRIO ENTRA AQUI */}
											<div>
												<FormCliente />
											</div>
										</Popup>
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