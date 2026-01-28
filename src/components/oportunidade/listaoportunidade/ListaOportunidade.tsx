import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import type Oportunidade from "../../../models/Oportunidade";
import CardOportunidade from "../cardoportunidade/CardOportunidade";
import { buscarOportunidades } from "../../../services/OportunidadeService";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import ModalCliente from "../../cliente/modalcliente/ModalCliente";
import ModalOportunidade from "../modaloportunidade/ModalOportunidade";
import DetalhesOportunidade from "../detalhesoportunidades/DetalhesOportunidade";

// function ListaOportunidade({ onSelect }: ListaOportunidadeProps) {
function ListaOportunidade() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]) 
    const { usuario, handleLogout } = useContext(AuthContext)
    
    // Estados para os filtros
    const [filtroTexto, setFiltroTexto] = useState<string>('')
    const [filtroStatus, setFiltroStatus] = useState<string>('')
    const [filtroValorMin, setFiltroValorMin] = useState<string>('')
    const [filtroValorMax, setFiltroValorMax] = useState<string>('')
    const [selectedCard, setSelectedCard] = useState<Oportunidade | null>(null);

    // token
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info' )
            navigate('/')
        }
    }, [token])

   useEffect(() => {
    buscarTodasOportunidades()    
    }, [])


    async function buscarTodasOportunidades() { 
    try {
        setIsLoading(true)

        await buscarOportunidades((dados: any) => {
            console.log("API em lista:", dados)

            if (Array.isArray(dados)) {
                dados.forEach((oportunidade: Oportunidade) => {
                    const chave = `status-op-${oportunidade.id}`
                    if (!localStorage.getItem(chave)) {
                        localStorage.setItem(chave, 'Aberta')
                    }
                })
                setOportunidades(dados)
            } 
            else if (Array.isArray(dados.content)) {
                dados.content.forEach((oportunidade: Oportunidade) => {
                    const chave = `status-op-${oportunidade.id}`
                    if (!localStorage.getItem(chave)) {
                        localStorage.setItem(chave, 'Aberta')
                    }
                })
                setOportunidades(dados.content)
            }
            else {
                setOportunidades([])
            }
        }, { headers: { Authorization: token } })

    } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
        }
    } finally {
        setIsLoading(false)
    }
}

    // Função de filtro
    const oportunidadesFiltradas = oportunidades.filter((oportunidade) => {
    const matchTexto = !filtroTexto || 
        oportunidade.descricao?.toLowerCase().includes(filtroTexto.toLowerCase())
    
    const statusSalvo = localStorage.getItem(`status-op-${oportunidade.id}`) || 'Aberta'
    const matchStatus = !filtroStatus || statusSalvo === filtroStatus
    
    let valorNum = 0
    if (typeof oportunidade.valorPotencial === 'string') {
        valorNum = parseFloat(oportunidade.valorPotencial.replace(/[^\d,.-]/g, '').replace(',', '.'))
    } else {
        valorNum = Number(oportunidade.valorPotencial) || 0
    }
    
    const matchValorMin = !filtroValorMin || 
        valorNum >= parseFloat(filtroValorMin || '0')
    
    const matchValorMax = !filtroValorMax || 
        valorNum <= parseFloat(filtroValorMax || '999999999')
    
    return matchTexto && matchStatus && matchValorMin && matchValorMax
})

    return (
        <>
        <section className=" h-[75vh] rounded-4xl p-3">
            <div className="flex gap-3 h-full w-full">
                {/* CONTEÚDO 1 - LISTAR DADOS */}
                <div className="bg-white/10 rounded-3xl p-4 flex flex-col h-full w-3/5 gap-1 overflow-hidden">
                    <div className="flex items-center justify-between mb-4 flex-none gap-4">
                        <h2 className="text-3xl font-bold text-amber-50">
                            Oportunidades
                        </h2>
                        <section className="flex gap-4 w-2/3">
                            <ModalCliente/>
                            <ModalOportunidade onSuccess={buscarTodasOportunidades} />
                        </section>
                        
                    </div>

                    <div className="flex overflow-y-auto min-h-0 space-y-2 pr-2">
                        {/* LOADING */}
                        {isLoading && (
                            <div className="flex justify-center w-full my-8">
                            <SyncLoader
                                color="#bce7fb"
                                size={32}
                            />
                            </div>
                        )}

                        {/* MENSAGEM QUANDO NÃO TEM RESULTADOS */}
                        {(!isLoading && oportunidadesFiltradas.length === 0) && ( 
                            <div className="text-center my-8">
                                <span className="text-xl">Nenhuma Oportunidade foi encontrada!</span>
                            </div>
                        )}
                        
                        {/* LISTA DE OPORTUNIDADES */}
                        {(!isLoading && oportunidadesFiltradas.length > 0) && (
                            <div className="grid grid-cols-2 gap-3 w-full">
                                {oportunidadesFiltradas.map((oportunidade) => ( 
                                    <div 
                                        key={oportunidade.id} 
                                        onClick={() => setSelectedCard(oportunidade)}
                                        className="cursor-pointer hover:scale-[0.98] transition-transform"
                                    >
                                        <CardOportunidade oportunidade={oportunidade}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            {/* CONTEÚDO 2 - FILTROS E DADOS */}
            <div className="flex flex-col bg-white/10 rounded-2xl h-full w-2/5 overflow-hidden">
                <section className="flex flex-col">
                    <div className="rounded-2xl p-4 animate-fadeIn">
                    <h3 className="text-lg font-semibold mb-3">Filtrar Oportunidades</h3> 
                    
                    {/* {/* Busca por texto */}
                    <div className="mb-3">
                        <label htmlFor="filtro-texto" className="block text-sm font-medium mb-1">
                            Buscar por descrição
                        </label>
                        <input
                            id="filtro-texto"
                            type="text"
                            placeholder="Digite para buscar..."
                            value={filtroTexto}
                            onChange={(e) => setFiltroTexto(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Campo de busca por descrição"
                        />
                    </div>

                    {/* Filtro por Status */}
                    <div className="mb-3">
                        <label htmlFor="filtro-status" className="block text-sm font-medium mb-1">
                            Filtrar por status
                        </label>
                        <select
                            id="filtro-status"
                            value={filtroStatus}
                            onChange={(e) => setFiltroStatus(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Selecionar status da oportunidade"
                        >
                            <option value="" className="text-black">Todos os status</option>
                            <option value="Aberta" className="text-black">Aberta</option>
                            <option value="Fechada" className="text-black">Fechada</option>
                            <option value="Perdida" className="text-black">Perdida</option>
                        </select>
                    </div>

                    {/* Filtros por Valor */}
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label htmlFor="filtro-valor-min" className="block text-sm font-medium mb-1">
                                Valor mínimo
                            </label>
                            <input
                                id="filtro-valor-min"
                                type="number"
                                placeholder="0"
                                value={filtroValorMin}
                                onChange={(e) => setFiltroValorMin(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                aria-label="Valor mínimo da oportunidade"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="filtro-valor-max" className="block text-sm font-medium mb-1">
                                Valor máximo
                            </label>
                            <input
                                id="filtro-valor-max"
                                type="number"
                                placeholder="999999"
                                value={filtroValorMax}
                                onChange={(e) => setFiltroValorMax(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                aria-label="Valor máximo da oportunidade"
                            />
                        </div>
                    </div>

                    {/* Botão para limpar filtros */}
                    <button
                        onClick={() => {
                            setFiltroTexto('')
                            setFiltroStatus('')
                            setFiltroValorMin('')
                            setFiltroValorMax('')
                        }}
                        className="mt-3 w-full bg-indigo-900 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors hover:scale-[0.98]"
                        aria-label="Limpar todos os filtros"
                    >
                        Limpar Filtros
                    </button>
                </div>
                </section>
                <section className="p-4">
                    <hr className="text-white/60 p-2"/>
                        <DetalhesOportunidade oportunidade={selectedCard} />
                </section>
            </div>
        </div>
        </section>
        </>
    )
}

export default ListaOportunidade;