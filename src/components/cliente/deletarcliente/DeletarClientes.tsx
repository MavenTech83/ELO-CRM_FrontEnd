import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Cliente from "../../../models/Cliente"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { AuthContext } from "../../../contexts/AuthContext"
import { ClipLoader } from "react-spinners"

function DeletarCliente() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [cliente, setCliente] = useState<Cliente>({} as Cliente)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    
    const { id } = useParams<{ id: string }>()

    async function buscarClientePorId(id: string) {
        try {
            await buscar(`/clientes/${id}`, setCliente, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate("/")
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarClientePorId(id)
        }
    }, [id])

    async function deletarCliente() {
        setIsLoading(true)

        try {
            await deletar(`/clientes/${id}`, {
                headers: { Authorization: token }
            })
            ToastAlerta("Cliente excluído com sucesso!", 'sucesso')

        } catch (error: any) {
            if(error.toString().includes("401")){
                handleLogout()
            } else {
                ToastAlerta("Erro ao excluir o cliente!", 'erro')
                console.error(error)
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar(){
        navigate("/clientes")
    }

    return (
        <div className='container w-2/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Cliente</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja excluir o Cliente do sistema?
            </p>

            <div className='bg-white/20 border-e-4 border-b-4 border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 font-bold text-2xl'>
                    Cliente
                </header>

                <hr className='border' />

                <div className="p-4">
                    <p className='text-xl font-semibold mb-2'>
                        {cliente.nome || 'Nome não informado'}
                    </p>
                    <p className='text-sm text-gray-600'>
                        E-mail: {cliente.email || 'Não informado'}
                    </p>
                    <p className='text-sm text-gray-600'>
                        Telefone: {cliente.telefone || 'Não informado'}
                    </p>
                    <p className='text-sm text-gray-600'>
                        Endereço: {cliente.endereco || 'Não informado'}
                    </p>
                </div>

                <hr className='border' />

                <div className="flex">
                    <button 
                        className='hover:bg-white/50 w-full py-2 border-e-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='hover:bg-white/50 w-full py-2 border-e-2r flex items-center justify-center'
                        onClick={deletarCliente}
                        disabled={isLoading}
                    >
                        {isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarCliente
