import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout/Layout"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"
import type Usuario from "../../models/Usuario"
import { atualizar } from "../../services/Service"
import {  PencilIcon } from "@phosphor-icons/react"
import type UsuarioLogin from "../../models/UsuarioLogin"

function Perfil() {
	const navigate = useNavigate()

	// const { usuario } = useContext(AuthContext)
	const { usuario, updateUsuario } = useContext(AuthContext)
	// edicao perfil
	const [editando, setEditando] = useState(false)

	const [usuarioEditado, setUsuarioEditado] = useState<UsuarioLogin>({
	...usuario,
	})
	// senha 
	const [senhaAtual, setSenhaAtual] = useState("")

	useEffect(() => {
		if (usuario.token === "") {
			ToastAlerta("Você precisa estar logado", 'info')
			navigate("/")
		}
	}, [usuario.token])

	// edicao 
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
	setUsuarioEditado({
		...usuarioEditado,
		[e.target.name]: e.target.value,
	})
	}

	// salvar
	async function salvarAlteracoes() {
	try {
		const usuarioParaEnviar = {
		...usuarioEditado,
		senha: senhaAtual,
		}

		await atualizar(
		"/usuarios/atualizar",
		usuarioParaEnviar,
		updateUsuario,
		{
			headers: {
			Authorization: usuario.token,
			},
		}
		)
		ToastAlerta("Perfil atualizado com sucesso!", "sucesso")
		setEditando(false)
	} catch (error) {
		ToastAlerta("Erro ao atualizar perfil", "error")
	}
	}

	return (
		<Layout>
		  	<div className="flex-1 transition-all duration-300">
					<div className="flex flex-col">
  						<div className="pt-1">
							{/* SEÇÃO PAI NÃO MODIFICAR */}
							<section className=" h-[75vh] rounded-4xl p-3">
								<div className="flex flex-col gap-4 h-full">
									{/* CONTEÚDO 1 - LISTAR DADOS */}
									<div className="p-4 flex h-full bg-white/10 rounded-4xl">
										<div className="w-1/2 h-full backdrop-blur-sm p-2 flex flex-col items-center justify-center bg-white rounded-s-lg">
										{/* alinhamento horizontal */}
										{/* <div className="h-2/3 backdrop-blur-sm m-4 mb-0 flex flex-col items-center justify-center rounded-t-lg bg-white p-8"> */}
											<img
											className="w-80 h-80 rounded-full object-cover border-10 border-(--color-picton-blue-800)"
											src={usuario.foto}
											alt={`Foto de perfil de ${usuario.nome}`}
											/>
										</div>
										
										{/* <div className="h-1/3 backdrop-blur-sm m-4 mt-0 flex flex-col rounded-b-lg bg-white/20"> */}
										<div className="w-1/2 content-center border-s border-white/50 p-10 rounded-e-lg bg-white/20">
											<div className="h-full">
												<div className="w-full flex justify-end pe-4">
														{!editando && (
														<button
														onClick={() => setEditando(true)}
														className="text-white hover:text-blue-700"
														>
														<PencilIcon size={32} />
														Editar
														</button>
													
												)}
												
											</div>
												{editando ? (
													<div className="h-full flex flex-col justify-evenly p-5">
														
															<div className="flex flex-col">
																<span className="text-xl">Nome: </span>
																<input
																	type="text"
																	name="nome"
																	value={usuarioEditado.nome}
																	onChange={handleChange}
																	className="mt-5 border border-white rounded-md p-2 w-2/3 mx-auto" 
																/>
															</div>

															<div className="flex flex-col">
																<span className="text-xl">E-mail: </span>
																<input
																type="email"
																name="usuario"
																value={usuarioEditado.usuario}
																onChange={handleChange}
																className="mt-5 border border-white rounded-md p-2 w-2/3 mx-auto" 
															/>
															</div>

															<div className="flex flex-col">
																<span className="text-xl">Confirme sua senha: </span>
																<input
																	type="password"
																	placeholder="Confirme sua senha"
																	value={senhaAtual}
																	onChange={(e) => setSenhaAtual(e.target.value)}
																	className="mt-5 border border-white rounded-md p-2 w-2/3 mx-auto" 
																/>
															</div>
														
														{/* salvar e cancelar */}
														<div className="flex gap-4 justify-center">
															<button
															onClick={salvarAlteracoes}
															className="rounded text-white  border-white border bg-emerald-400 hover:bg-emerald-600 w-1/2 py-2"
															>
															Salvar
															</button>

															<button
															onClick={() => {
																setUsuarioEditado(usuario)
																setEditando(false)
															}}
															className="rounded text-white bg-red-400 border-white border hover:bg-red-600 w-1/2 py-2"
															>
															Cancelar
															</button>
														</div>
													</div>
												) : (
													<div className="w-full flex flex-col pt-15 h-full gap-5">
														<div className="flex-col w-1/2 content-center">
															<span className="text-xl">Nome: </span>
															<h3 className="text-3xl font-bold">{usuario.nome}</h3>
														</div>

														<div className="flex-col w-1/2 content-center">
															<span className="text-xl">E-mail: </span>
															<h3 className="text-3xl font-bold ">{usuario.usuario}</h3>
														</div>
													</div>
													
												)}

											</div>
										</div>
									</div>
								
								</div>
							</section>
						</div>
					</div>
			</div>
		
		</Layout>
	)
}

export default Perfil
