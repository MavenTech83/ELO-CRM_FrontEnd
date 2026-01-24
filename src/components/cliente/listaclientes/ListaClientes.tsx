import { useNavigate } from "react-router-dom";
import CardClientes from "../cardclientes/CardClientes"
import { useContext, useEffect, useState, useCallback } from "react";

import type Cliente from "../../../models/Cliente";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { AuthContext } from "../../../contexts/AuthContext";
import { SyncLoader } from "react-spinners";
import ModalCliente from "../modalcliente/ModalCliente";
import DetalhesCliente from "../detalhescliente/DetalhesCliente";
import ModalOportunidade from "../../oportunidade/modaloportunidade/ModalOportunidade";

interface ListaClienteProps {
  onSelect: (cliente: Cliente) => void;
}

// export default function ListaClientes({onSelect}: ListaClienteProps) {
export default function ListaClientes() {
    const navigate = useNavigate()
    const [selectedCard, setSelectedCard] = useState<Cliente | null>(null);
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [clientes, setClientes] = useState<Cliente[]>([])
    const { usuario, handleLogout } = useContext(AuthContext)

    const [filtroTexto, setFiltroTexto] = useState<string>("")

    const token = usuario.token

    useEffect(() => {
            if (token === '') {
                ToastAlerta('Você precisa estar logado!', 'info' )
                navigate('/')
            }
        }, [token])

    const buscarClientes = useCallback(async () => {
        try {
            setIsLoading(true)

            await buscar("/clientes", setClientes, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
                ToastAlerta("Sessão expirada! Por favor, faça login novamente.", 'info')
                navigate("/")
            } else {
                ToastAlerta("Erro ao buscar clientes.", 'erro')
                console.error(error)
            }
        } finally {
            setIsLoading(false)
        }
    }, [token, handleLogout, navigate]) // Added navigate to useCallback dependencies

    // Função para ser chamada quando um novo cliente é adicionado
    const handleClienteAdded = useCallback(() => {
        buscarClientes(); // Recarrega a lista de clientes
        ToastAlerta("Cliente cadastrado com sucesso!", 'sucesso');
    }, [buscarClientes]);

    useEffect(() => {
        buscarClientes()
    }, [buscarClientes])

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate("/")
        }
    }, [token, navigate])

    const clientesFiltrados = clientes.filter((cliente) => {
  if (!filtroTexto) return true

  const texto = filtroTexto.toLowerCase()

  return (
    cliente.nome?.toLowerCase().includes(texto) ||
    cliente.email?.toLowerCase().includes(texto) ||
    cliente.telefone?.toLowerCase().includes(texto)
  )
})

    return (
        <>
             <section className=" h-[75vh] rounded-4xl p-3">
            <div className="flex gap-3 h-full w-full">
            {/* CONTEÚDO 1 - LISTAR DADOS */}
            <div className="bg-white/10 rounded-3xl p-4 flex flex-col h-full w-3/5 gap-1 overflow-hidden">
                <div className="flex items-center justify-between mb-4 flex-none gap-4">
                    <h2 className="text-3xl font-bold text-amber-50">
                        Clientes
                    </h2>
                    <section className="flex gap-4 w-2/3">
                        <ModalCliente onClienteAdded={buscarClientes} />
                        <ModalOportunidade /> 
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
                   {(!isLoading && clientes.length === 0) && ( 
                        <div className="text-center my-8">
                            <span className="text-xl">Nenhum cliente foi encontrado!</span>
                        </div>
                    )}
                    
                    {/* LISTA DE Clientes */}
                    {(!isLoading && clientesFiltrados.length > 0) && (
                        <div className="grid grid-cols-2 gap-3 w-full">
                           {
                            
                            clientesFiltrados.map((cliente) => (
                                <div 
                                key={cliente.id} 
                                onClick={() => setSelectedCard(cliente)}
                                className="cursor-pointer hover:scale-[0.98] transition-transform"
                                >
                                <CardClientes cliente={cliente}/>
                                </div>
                            ))
                        }
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
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Buscar cliente
                        </label>
                        <input
                            type="text"
                            placeholder="Digite nome, email ou telefone..."
                            value={filtroTexto}
                            onChange={(e) => setFiltroTexto(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                </section>
                <section className="p-4">
                    <hr className="text-white/60 p-2"/>
                       <DetalhesCliente cliente={selectedCard} />
                </section>
            </div>
        </div>
        </section>
                    
       {/* {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader
                        color="#bce7fb"
                        size={32}
                    />
                </div>
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    {(!isLoading && clientes.length === 0) && ( 
                        <span className="text-3xl text-center my-8">
                            Nenhuma Oportunidade foi encontrada!
                        </span>
                    )}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Buscar cliente
                        </label>
                        <input
                            type="text"
                            placeholder="Digite nome, email ou telefone..."
                            value={filtroTexto}
                            onChange={(e) => setFiltroTexto(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="overflow-y-auto grid grid-cols-2 gap-3" >
                        {
                            
                            clientesFiltrados.map((cliente) => (
                                <div 
                                key={cliente.id} 
                                onClick={() => onSelect(cliente)}
                                className="cursor-pointer hover:scale-[0.98] transition-transform"
                                >
                                <CardClientes cliente={cliente}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div> */}
        </>
    )
    
}