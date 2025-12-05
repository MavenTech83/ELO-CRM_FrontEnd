import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type Usuario from "../../models/Usuario";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";


export default function Cadastro() {

	// Objeto responsável por redirecionar o usuário para uma outra rota
	const navigate = useNavigate();
	
	// Controlar a exibição do Loader (animação de carregamento)
	const [isLoading, setIsLoading] = useState<boolean>(false);
	
	// Validar a digitação da senha do usuário
	const [confirmarSenha, setConfirmarSenha] = useState<string>("");

	// Guardar os dados do usuário
	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: "",
		usuario: "",
		senha: "",
		foto: ""
	})

	useEffect( () => {
		if(usuario.id !== 0){
			retornar();
		}
	}, [usuario])

	function retornar(){
		navigate("/");
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value
		})
	}

	function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
		setConfirmarSenha(e.target.value);
	}

	async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
		e.preventDefault();

		setIsLoading(true);

		if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){

			try{

				await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
				ToastAlerta('Usuário cadastrado com sucesso!','sucesso');

			}catch(error){
				ToastAlerta('Erro ao cadastrar o usuário!','erro');
			}

		}else{
			ToastAlerta("Dados do usuário inconsistentes! Verifique as informações do cadastro.","info");
			setUsuario({
				...usuario,
				senha: ''
			});
			setConfirmarSenha('');
		}

		setIsLoading(false);
	}

	console.log(JSON.stringify(usuario));
	console.log("Confirmar Senha: " + confirmarSenha);

	return (
		<>
			<div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://ik.imagekit.io/hnkqnvn7cu/Whisk_emzxyzm5cjn1iwy40czhdtyti2nxqtl2ato10sy.gif')" }}
    >
      {/* Overlay opcional */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex items-center justify-center h-full">
			<div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl w-120 text-white">
			
				<h1 className="text-3xl font-bold text-cyan-400 text-center pb-[5vh]">ELO CRM</h1>
				
		
				<form className="flex flex-col space-y-4"
					onSubmit={cadastrarNovoUsuario}
				>
					<h2 className="text-slate-900 text-3xl">Cadastrar</h2>
					<div className="flex flex-col w-full">
						<label htmlFor="nome">Nome</label>
						<input
							type="text"
							id="nome"
							name="nome"
							placeholder="Nome"
							className="border-2 border-slate-400 rounded p-2"
							value={usuario.nome}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="usuario">Usuario</label>
						<input
							type="text"
							id="usuario"
							name="usuario"
							placeholder="Usuario"
							className="border-2 border-slate-400 rounded p-2"
							value={usuario.usuario}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="foto">Foto</label>
						<input
							type="text"
							id="foto"
							name="foto"
							placeholder="Foto"
							className="border-2 border-slate-400 rounded p-2"
							value={usuario.foto}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="senha">Senha</label>
						<input
							type="password"
							id="senha"
							name="senha"
							placeholder="Senha"
							className="border-2 border-slate-400 rounded p-2"
							value={usuario.senha}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="confirmarSenha">Confirmar Senha</label>
						<input
							type="password"
							id="confirmarSenha"
							name="confirmarSenha"
							placeholder="Confirmar Senha"
							className="border-2 border-slate-400 rounded p-2"
							value={confirmarSenha}
							onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
						/>
					</div>
					<div className="flex justify-around w-full gap-8">
						<button
							type="reset"
							className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
							onClick={retornar}
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="rounded text-white bg-indigo-400 hover:bg-indigo-900
                       w-1/2 py-2 flex justify-center"
						>
							{
								isLoading ?

									<ClipLoader
										color="#ffffff"
										size={24}
									/>

								:

									<span>Cadastrar</span>

							}
							
						</button>
					</div>
				</form>
				</div>
			</div>
		</div>
		</>
	)
}
