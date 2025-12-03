import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Oportunidade from "../../../models/Oportunidade"
import { ClipLoader } from "react-spinners"
import { buscarOportunidadePorId } from "../../../services/OportunidadeService"

function DeletarOportunidade() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [oportunidade, setOportunidade] = useState<Oportunidade>({} as Oportunidade)
    const { id } = useParams<{ id: string }>()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscarOportunidadePorId(id, setOportunidade, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado para realizar esta operação.')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarOportunidade() {
        setIsLoading(true)
        try {
            await deletarOportunidadeService(id, {
                headers: {
                    'Authorization': token
                }
            })
            ToastAlerta('Oportunidade excluída com sucesso.')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Ocorreu um erro ao realizar a exclusão.')
            }
        }
        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/oportunidades")
    }
    
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Oportunidade</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja excluir a Oportunidade do sistema?
            </p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Oportunidade
                </header>
                <div className="p-4">
                    <p className='text-xl font-semibold mb-2'>
                        {oportunidade.descricao}
                    </p>
                    <p className='text-sm text-gray-600'>
                        Status: {oportunidade.status || 'Não informado'}
                    </p>
                    <p className='text-sm text-gray-600'>
                        Valor Potencial: {oportunidade.valorPotencial || 'Não informado'}
                    </p>
                    <p className='text-sm text-gray-600'>
                        Cliente: {oportunidade.cliente?.nome || 'Não informado'}
                    </p> 
                    <p className='text-sm text-gray-600'>
                        Tipo: {oportunidade.tipoOportunidade?.descricao || 'Não informado'}
                    </p> 
                </div>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                        hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarOportunidade}>
                        { isLoading ? 
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

export default DeletarOportunidade