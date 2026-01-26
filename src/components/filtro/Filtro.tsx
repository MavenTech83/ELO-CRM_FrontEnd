import React, { useState } from 'react'
import type Oportunidade from '../../models/Oportunidade';

interface ListaOportunidadeProps {
  onSelect: (oportunidade: Oportunidade) => void;
}

export default function Filtro({ onSelect }: ListaOportunidadeProps) {
    const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]) 
    const [filtroTexto, setFiltroTexto] = useState<string>('')
    const [filtroStatus, setFiltroStatus] = useState<string>('')
    const [filtroValorMin, setFiltroValorMin] = useState<string>('')
    const [filtroValorMax, setFiltroValorMax] = useState<string>('')
    // const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false)

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
    //    BOTÃO FILTRAR 
        <div>
            {/* <div className="mb-4">
                <button
                    onClick={() => setMostrarFiltros(!mostrarFiltros)}
                    className="w-full bg-indigo-900/70 border-indigo-900 text-white py-3 rounded-2xl hover:bg-indigo-800 transition-colors font-semibold"
                    aria-label="Abrir filtros"
                >
                    {mostrarFiltros ? '🔼 Ocultar Filtros' : '🔽 Filtrar Oportunidades'}
                </button>
            </div> */}

            {/* SEÇÃO DE FILTROS (COLAPSÁVEL) */}
            {/* {mostrarFiltros && ( */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-3">Filtrar Oportunidades</h3>
                    
                    {/* Busca por texto */}
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
                            <option value="">Todos os status</option>
                            <option value="Aberta">Aberta</option>
                            <option value="Fechada">Fechada</option>
                            <option value="Perdida">Perdida</option>
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
                        className="mt-3 w-full bg-indigo-900 text-white py-2 border rounded-lg hover:bg-indigo-800 transition-colors"
                        aria-label="Limpar todos os filtros"
                    >
                        Limpar Filtros
                    </button>
                </div>
           
            {/* )} */}
            </div>
    )}

