import { useState } from "react";
import Layout from "../../components/layout/Layout"
import ListaOportunidade from "../../components/oportunidade/listaoportunidade/ListaOportunidade"
import DetalhesOportunidade from "../../components/oportunidade/detalhesoportunidades/DetalhesOportunidade";
import type Oportunidade from "../../models/Oportunidade";
import ModalOportunidade from "../../components/oportunidade/modaloportunidade/ModalOportunidade";



function Oportunidades() {
  const [selectedCard, setSelectedCard] = useState<Oportunidade | null>(null);

  return (
    <Layout>
      {/* <div className="h-full flex items-stretch gap-2 min-h-0"> */}

        {/* Coluna 1 */}
        {/* <div className="p-4 pb-2 rounded-4xl shadow min-h-0 overflow-y-auto"> */}
          <ListaOportunidade />
        {/* </div> */}

        {/* Coluna 2 */}
        {/* <div className="w-1/2">
          <div className="p-4 pb-2 bg-white/20 rounded-4xl shadow min-h-0 h-2/3 overflow-y-auto">
            <DetalhesOportunidade oportunidade={selectedCard} />
          </div>
            <div className="h-1/3 p-4 rounded-4xl overflow-y-auto flex justify-center items-center">
            <ModalOportunidade />
          </div>
        </div> */}
        

      {/* </div> */}

    </Layout>
  )
}

export default Oportunidades