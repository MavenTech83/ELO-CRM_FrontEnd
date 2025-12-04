import { useState } from "react";
import Layout from "../../components/layout/Layout"
import ListaOportunidade from "../../components/oportunidade/listaoportunidade/ListaOportunidade"
import DetalhesOportunidade from "../../components/oportunidade/detalhesoportunidades/DetalhesOportunidade";
import type Oportunidade from "../../models/Oportunidade";

function Oportunidades() {
  const [selectedCard, setSelectedCard] = useState<Oportunidade | null>(null);
  
  return (
    <Layout>
        <div className="h-full flex items-center justify-center gap-2 p-4">
                {/* Coluna Principal - Lista */}
                <div className="bg-white/20 w-full p-4 rounded-4xl shadow flex flex-col" style={{ maxHeight: 'calc(100vh - 120px)' }}>
                    <div className="overflow-y-auto flex-1 pr-3" style={{ paddingBottom: '4rem' }}>
                        <ListaOportunidade onSelect={setSelectedCard} />
                    </div>
                </div>
        </div>

        {/* Modal/Sidebar Lateral para Detalhes */}
        {selectedCard && (
            <div 
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end"
                onClick={() => setSelectedCard(null)}
            >
                <div 
                    className="bg-white w-full max-w-md h-full overflow-y-auto p-6 shadow-2xl animate-slideInRight"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setSelectedCard(null)}
                        className="absolute top-4 right-4 text-2xl hover:text-indigo-900"
                        aria-label="Fechar detalhes"
                    >
                        ✕
                    </button>
                    <DetalhesOportunidade oportunidade={selectedCard} />
                </div>
            </div>
        )}
    </Layout>
  )
}

export default Oportunidades