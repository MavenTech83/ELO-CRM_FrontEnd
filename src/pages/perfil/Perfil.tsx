import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout/Layout"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
	const navigate = useNavigate()

	const { usuario } = useContext(AuthContext)

	useEffect(() => {
		if (usuario.token === "") {
			ToastAlerta("Você precisa estar logado", 'info')
			navigate("/")
		}
	}, [usuario.token])

	return (
		<Layout>
		  	<div className="flex-1 transition-all duration-300">
					<div className="flex flex-col">
  						<div className="pt-1">
							{/* SEÇÃO PAI NÃO MODIFICAR */}
							<section className=" h-[75vh] rounded-4xl p-3">
								<div className="flex flex-col gap-4 h-full">
									{/* CONTEÚDO 1 - LISTAR DADOS */}
									<div className="p-4 flex h-full bg-white/20 rounded-4xl">
										<div className="w-1/2 h-full backdrop-blur-sm p-2 flex flex-col items-center justify-center">
											<img
											className="w-100 h-100 rounded-full object-cover border-4 border-(--color-picton-blue-800)"
											src={usuario.foto}
											alt={`Foto de perfil de ${usuario.nome}`}
											/>
										</div>
										
										<div
											className="w-1/2 content-center border-s border-white/50 p-10"
										>
											<div className="h-13 pb-3">
												<h2 className="text-xl ">Nome:</h2>
												<h3 className="text-3xl font-bold ">{usuario.nome}</h3>
											</div> 
											<div className="h-13 pb-3 pt-6">
												<h3 className="text-xl">Email:</h3>
												<h3 className="text-2xl font-bold ">{usuario.usuario}</h3>
											</div> 
										</div>
									</div>
									{/* CONTEÚDO 2 - FILTROS E DADOS */}
									{/* <div className="flex flex-col bg-white/20 rounded-2xl h-1/3 overflow-hidden">
										parte 2
									</div> */}
								</div>
							</section>
						</div>
					</div>
			</div>
		
		</Layout>
	)
}

export default Perfil
