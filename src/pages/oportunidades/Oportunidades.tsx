import { useState } from "react";
import Layout from "../../components/layout/Layout"
import ListaOportunidade from "../../components/oportunidade/listaoportunidade/ListaOportunidade"
import DetalhesOportunidade from "../../components/oportunidade/detalhesoportunidades/DetalhesOportunidade";
import type Oportunidade from "../../models/Oportunidade";


function Oportunidades() {
  const [selectedCard, setSelectedCard] = useState<Oportunidade | null>(null);

  return (
    <Layout>
      <div className="h-full flex items-stretch gap-2 min-h-0">

        {/* Coluna 1 */}
        <div className="w-1/2 p-4 pb-2 rounded-4xl shadow min-h-0 overflow-y-auto">
          <ListaOportunidade onSelect={setSelectedCard} />
        </div>

        {/* Coluna 2 */}
        <div className="w-1/2 p-4 pb-2 rounded-4xl shadow min-h-0 overflow-y-auto">
          <DetalhesOportunidade oportunidade={selectedCard} />
        </div>

      </div>

    </Layout>
  )
}

export default Oportunidades