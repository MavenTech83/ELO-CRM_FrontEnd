import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import type Oportunidade from "../../../models/Oportunidade";
import CardOportunidade from "../cardoportunidade/CardOportunidade";
import { buscarOportunidades } from "../../../services/OportunidadeService";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaOportunidade() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]) 
    const { usuario, handleLogout } = useContext(AuthContext)
    
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarTodasOportunidades()    
    }, [oportunidades.length]) 

    async function buscarTodasOportunidades() { 
        try {
            setIsLoading(true)
            await buscarOportunidades(setOportunidades, { 
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

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
                    {(!isLoading && oportunidades.length === 0) && ( 
                        <span className="text-3xl text-center my-8">
                            Nenhuma Oportunidade foi encontrada!
                        </span>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8 p-4">
                        {
                            oportunidades.map((oportunidade) => ( 
                                <CardOportunidade key={oportunidade.id} oportunidade={oportunidade}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaOportunidade;