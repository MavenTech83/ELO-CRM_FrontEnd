import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import type Oportunidade from "../../../models/Oportunidade";
import CardOportunidade from "../cardoportunidade/CardOportunidade";
import { buscarOportunidades } from "../../../services/OportunidadeService";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface ListaOportunidadeProps {
  onSelect: (oportunidade: Oportunidade) => void;
}

function ListaOportunidade({ onSelect }: ListaOportunidadeProps) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]) 
    const { usuario, handleLogout } = useContext(AuthContext)
    
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info' )
            navigate('/')
        }
    }, [token])

   useEffect(() => {
    buscarTodasOportunidades()    
}, []) // <-- resolvido


    async function buscarTodasOportunidades() { 
    try {
        setIsLoading(true)

        await buscarOportunidades((dados: any) => {
            console.log("API em lista:", dados)

            if (Array.isArray(dados)) {
                setOportunidades(dados)
            } 
            else if (Array.isArray(dados.content)) {
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
                    <div className="overflow-y-auto" >
                        {
                            
                            oportunidades.map((oportunidade) => ( 
                                <div 
                                key={oportunidade.id} 
                                onClick={() => onSelect(oportunidade)}
                                className="cursor-pointer hover:scale-[0.98] transition-transform"
                                >
                                <CardOportunidade oportunidade={oportunidade}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaOportunidade;