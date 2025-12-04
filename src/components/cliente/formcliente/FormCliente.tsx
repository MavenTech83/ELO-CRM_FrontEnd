import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"
import type Cliente from "../../../models/Cliente"
import { cadastrarCliente, atualizarCliente, buscarClientePorId } from "../../../services/ClienteService"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { AuthContext } from "../../../contexts/AuthContext"

interface FormClienteProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    clienteParaEditar?: Cliente | null;
    isModal?: boolean;
}

function FormCliente({
    onSuccess,
    onCancel,
    clienteParaEditar = null,
    isModal = false
}: FormClienteProps) {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [cliente, setCliente] = useState<Cliente>({
        nome: "",
        email: "",
        telefone: "",
        endereco: ""
    })

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    // Determine if it's an edit operation: via props (modal) or via URL (page)
    const isEdicao = clienteParaEditar !== null || id !== undefined;

    async function buscarClientePorIdLocal(clienteId: string | number) {
        try {
            await buscarClientePorId(String(clienteId), setCliente, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
                ToastAlerta("Sessão expirada! Por favor, faça login novamente.", 'info')
                navigate("/")
            } else {
                ToastAlerta("Erro ao buscar cliente.", 'erro')
                console.error(error)
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate("/")
        }
    }, [token, navigate])

    useEffect(() => {
        // If editing via props (modal)
        if (clienteParaEditar) {
            setCliente({
                ...clienteParaEditar,
                telefone: clienteParaEditar.telefone || "",
                endereco: clienteParaEditar.endereco || ""
            });
        }
        // If editing via URL (page)
        else if (id !== undefined) {
            buscarClientePorIdLocal(id)
        }
    }, [id, clienteParaEditar])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoCliente(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        // Preparar dados para envio - formato limpo
        const clienteParaEnviar: Partial<Cliente> = {
            nome: cliente.nome.trim(),
            email: cliente.email.trim()
        };

        // Adicionar id somente se for edição
        if (isEdicao && cliente.id) {
            clienteParaEnviar.id = cliente.id;
        }

        // Adicionar telefone somente se tiver valor válido
        if (cliente.telefone && cliente.telefone.trim() !== "") {
            clienteParaEnviar.telefone = cliente.telefone.trim();
        }

        // Adicionar endereco somente se tiver valor válido
        if (cliente.endereco && cliente.endereco.trim() !== "") {
            clienteParaEnviar.endereco = cliente.endereco.trim();
        }

        console.log("📤 Dados que serão enviados:", clienteParaEnviar);

        try {
            if (isEdicao) {
                await atualizarCliente(clienteParaEnviar, setCliente, {
                    headers: { Authorization: token }
                })
                ToastAlerta("O Cliente foi atualizado com sucesso!", 'sucesso')

                setTimeout(() => {
                    setIsLoading(false);
                    if (isModal && onSuccess) {
                        onSuccess();
                    } else if (onSuccess) {
                        onSuccess();
                    } else {
                        navigate('/clientes');
                    }
                }, 1500);

            } else {
                await cadastrarCliente(clienteParaEnviar, setCliente, {
                    headers: { Authorization: token }
                })
                ToastAlerta("O Cliente foi cadastrado com sucesso!", 'sucesso')

                setTimeout(() => {
                    setIsLoading(false);
                    if (onSuccess) {
                        onSuccess();
                    } else {
                        navigate('/clientes');
                    }
                }, 1500);
            }
        } catch (error: any) {
            setIsLoading(false)
            console.error("❌ Erro completo:", error);
            console.error("❌ Resposta do servidor:", error.response?.data);
            
            if (error.toString().includes("401")) {
                handleLogout()
                ToastAlerta("Sessão expirada! Por favor, faça login novamente.", 'info')
                navigate("/")
            } else if (error.response?.status === 400) {
                // Erro 400 - Bad Request
                const mensagemErro = error.response?.data?.message || 
                                    error.response?.data?.error || 
                                    "Dados inválidos. Verifique os campos e tente novamente.";
                ToastAlerta(mensagemErro, 'erro')
            } else {
                ToastAlerta(isEdicao ? "Erro ao atualizar o cliente!" : "Erro ao cadastrar o cliente!", 'erro')
            }
        }
    }

    // Conditional styling based on whether it's a modal or a page
    const containerClass = isModal
        ? "p-6"
        : "bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-md mx-auto my-8";

    const headerComponent = !isModal ? (
        <div className="bg-gradient-to-b from-[#167cf1] to-[#005de3] px-8 py-6">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isEdicao ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        )}
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        {isEdicao ? 'Editar Cliente' : 'Novo Cliente'}
                    </h2>
                    <p className="text-indigo-100 text-sm">
                        {isEdicao ? 'Atualize as informações do cliente' : 'Preencha os dados para criar um novo cliente'}
                    </p>
                </div>
            </div>
        </div>
    ) : null;


    return (
        <div className={containerClass}>
            {headerComponent}

            {/* Formulário */}
            <div className={isModal ? "" : "p-8"}>
                <form className="space-y-6" onSubmit={gerarNovoCliente}>
                    {/* Campo Nome */}
                    <div className="space-y-2">
                        <label
                            htmlFor="nome"
                            className="block text-sm font-bold text-slate-700"
                        >
                            Nome do Cliente *
                        </label>
                        <input
                            type="text"
                            placeholder="Digite o nome completo"
                            name='nome'
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 text-slate-900 font-medium"
                            value={cliente.nome || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            required
                        />
                    </div>

                    {/* Campo Email */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold"
                            style={{ color: "var(--cor-texto-principal)" }}
                        >
                            E-mail do Cliente *
                        </label>
                        <input
                            type="email"
                            placeholder="Digite o e-mail"
                            name='email'
                            className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 outline-none font-medium
                                   placeholder-cor-texto-secundario text-cor-texto-principal
                                   focus:border-cor-primaria focus:ring-2 focus:ring-cor-primaria focus:ring-opacity-20"
                            style={{
                                borderColor: "var(--cor-borda)",
                                backgroundColor: "var(--cor-fundo-claro)",
                                color: "var(--cor-texto-preto)",
                            }}
                            value={cliente.email || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            required
                        />
                    </div>

                    {/* Campo Telefone - OPCIONAL */}
                    <div className="space-y-2">
                        <label
                            htmlFor="telefone"
                            className="block text-sm font-semibold text-slate-700"
                        >
                            Telefone
                        </label>
                        <input
                            type="tel"
                            placeholder="(00) 00000-0000"
                            name='telefone'
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 text-slate-900 font-medium"
                            value={cliente.telefone || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    {/* Campo Endereço - OPCIONAL */}
                    <div className="space-y-2">
                        <label
                            htmlFor="endereco"
                            className="block text-sm font-semibold text-slate-700"
                        >
                            Endereço
                        </label>
                        <input
                            type="text"
                            placeholder="Digite o endereço"
                            name='endereco'
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 text-slate-900 font-medium"
                            value={cliente.endereco || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-slate-100">
                        <button
                            type='submit'
                            className='flex-1 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-b from-[#167cf1] to-[#005de3] hover:from-indigo-700 hover:to-[#005de3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="24"
                                        visible={true}
                                    />
                                    <span className="ml-3">Processando...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {isEdicao ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
                                </>
                            )}
                        </button>

                        {onCancel && (
                            <button
                                type='button'
                                className='flex-1 inline-flex items-center justify-center px-8 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-500 focus:ring-offset-2 text-lg'
                                onClick={onCancel}
                                disabled={isLoading}
                            >
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormCliente;