import { Link } from 'react-router-dom'
import type Oportunidade from '../../../models/Oportunidade'

interface CardOportunidadeProps {
    oportunidade: Oportunidade
}

function CardOportunidade({ oportunidade }: CardOportunidadeProps) {
    return (
        <div className='flex flex-col rounded overflow-hidden justify-between pb-2 max-w-xl  border-amber-50 text-amber-50 (--color-picton-blue-200)'>
                
            <div>
                <div className='bg-white/20 rounded-2xl border border-e-4 border-b-4 '>
                    <header className='p-3 px-4 '>
                        <p className="font-medium">{oportunidade.descricao}</p>
                    </header>
                    <hr className='border'/>
                    <div className="flex">
                    <Link 
                        to={`/editaroportunidade/${oportunidade.id}`} 
                        className="w-full rounded-bl-2xl hover:bg-white/50 border-e-2 flex items-center justify-center py-2 "
                    >
                        <button>Editar</button>
                    </Link>
                    <Link 
                        to={`/deletaroportunidade/${oportunidade.id}`} 
                        className="rounded-br-2xl hover:bg-white/50 w-full flex items-center justify-center "
                    >
                        <button>Deletar</button>
                    </Link>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default CardOportunidade