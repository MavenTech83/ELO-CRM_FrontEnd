import { useNavigate } from "react-router-dom";
import CardClientes from "../cardclientes/CardClientes"
import { useContext, useEffect, useState, useCallback } from "react";

import type Cliente from "../../../models/Cliente";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { AuthContext } from "../../../contexts/AuthContext";
import { SyncLoader } from "react-spinners";

interface ListaClienteProps {
  onSelect: (cliente: Cliente) => void;
}

export default function ListaClientes({onSelect}: ListaClienteProps) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [clientes, setClientes] = useState<Cliente[]>([])
    const { usuario, handleLogout } = useContext(AuthContext)
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

    return (
        <>
       {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader
                        color="#312e81"
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
                    <div className="overflow-y-auto" >
                        {
                            
                            clientes.map((cliente) => ( 
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
            </div>
        </>
    )
    
}