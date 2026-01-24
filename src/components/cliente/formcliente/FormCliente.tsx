import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"
import type Cliente from "../../../models/Cliente"
import { cadastrarCliente, atualizarCliente, buscarClientePorId } from "../../../services/ClienteService"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { AuthContext } from "../../../contexts/AuthContext"
import { ClipLoader } from "react-spinners"

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
                         navigate('/clientes');
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
                        navigate('/clientes');
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
        <div>
        {/* // <div className="bg-gradient-to-b from-[#167cf1] to-[#005de3] px-8 py-6"> */}
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
        <div className="container flex flex-col  items-center border rounded-2xl border-e-4 border-b-4 ">
            <h1 className="text-4xl text-center">
                {isEdicao ? "Editar Cliente" : "Cadastrar Cliente"}
            </h1>
            <hr className="text-black w-full p-5"/>
            <form className="flex flex-col w-full gap-4 items-center" onSubmit={gerarNovoCliente}>
    
                {/* NOME */}
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="nome">Nome do Cliente</label>
                    <input
                        type="text"
                        placeholder="Nome completo"
                        name="nome"
                        required
                        className="border-2 rounded p-2"
                        value={cliente.nome || ""}
                        onChange={atualizarEstado}
                    />
                </div>
    
                {/* EMAIL */}
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="cliente@email.com"
                        name="email"
                        required
                        className="border-2 rounded p-2"
                        value={cliente.email || ""}
                        onChange={atualizarEstado}
                    />
                </div>
    
                {/* TELEFONE */}
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="telefone">Telefone</label>
                    <input
                        type="text"
                        placeholder="(00) 00000-0000"
                        name="telefone"
                        className="border-2 rounded p-2"
                        value={cliente.telefone || ""}
                        onChange={atualizarEstado}
                    />
                </div>
    
                {/* ENDEREÇO */}
                <div className="flex flex-col gap-2 w-1/2 pb-10">
                    <label htmlFor="endereco">Endereço</label>
                    <input
                        type="text"
                        placeholder="Rua, número, bairro..."
                        name="endereco"
                        className="border-2 rounded p-2"
                        value={cliente.endereco || ""}
                        onChange={atualizarEstado}
                    />
                </div>
                <hr className="w-full p-2"/>
                {/* BOTÕES */}
                <div className="flex pb-6 gap-10">
                    <button
                    type="submit"
                    className="rounded disabled:bg-slate-200 border bg-cyan-500/20 hover:bg-cyan-500
                               font-bold py-2 px-4 justify-center"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ClipLoader color="#0b5c81" size={24} />
                    ) : (
                        <span>{isEdicao ? "Atualizar" : "Cadastrar"}</span>
                    )}
                </button>
    
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded border bg-red-500/20 hover:bg-red-500
                                   text-black font-bold mx-auto py-2 px-4 justify-center"
                    >
                        Cancelar
                    </button>
                )}
                </div>
                
            </form>
        </div>
    );
}

export default FormCliente;