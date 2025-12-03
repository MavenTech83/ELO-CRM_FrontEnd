import { Link } from 'react-router-dom'
import type Oportunidade from '../../../models/Oportunidade'

interface CardOportunidadeProps {
    oportunidade: Oportunidade
}

function CardOportunidade({ oportunidade }: CardOportunidadeProps) {
    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>
                
            <div>
                <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                    <img
                        src={oportunidade.usuario?.foto}
                        className='h-12 rounded-full'
                        alt={oportunidade.usuario?.nome} />
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {oportunidade.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4'>
                    <h4 className='text-lg font-semibold uppercase'>
                        {oportunidade.descricao} 
                    </h4>
                    <p className='text-sm text-gray-600'>
                        Status: {oportunidade.status}
                    </p>
                    <p className='text-sm text-gray-600'>
                        Valor Potencial: {oportunidade.valorPotencial} 
                    </p>
                    <p className='text-sm text-gray-600'>
                        Cliente: {oportunidade.cliente?.nome || 'Não informado'} 
                    </p>
                    <p className='text-sm text-gray-600'>
                        Tipo: {oportunidade.tipoOportunidade?.descricao || 'Não informado'} 
                    </p>
                    <p className='text-sm text-gray-600'>
                        Data: {new Intl.DateTimeFormat("pt-BR", {
                            dateStyle: 'full',
                            timeStyle: 'medium',
                        }).format(new Date(oportunidade.dataCricao))} 
                    </p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/editaroportunidade/${oportunidade.id}`} 
                    className='w-full text-white bg-indigo-400 
                    hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletaroportunidade/${oportunidade.id}`} 
                    className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardOportunidade