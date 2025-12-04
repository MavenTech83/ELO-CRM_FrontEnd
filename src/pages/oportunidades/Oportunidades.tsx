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
        <div className="h-screen flex items-center justify-center gap-2">
                {/* <!-- Coluna 1 --> */}
                <div className="w-1/2 p-4 pb-2 rounded-4xl shadow overflow-y-auto scroll-smooth min-h-0">
                     <ListaOportunidade onSelect={setSelectedCard} />
                </div>

                {/* <!-- Coluna 2 --> */}
               <div className=" h-full w-1/2 gap-2">
                  <div className=" bg-white/20 p-4 rounded-4xl shadow overflow-y-auto">
                      <DetalhesOportunidade oportunidade={selectedCard} />
                  </div>
                  <div className=" p-4 rounded-4xl overflow-y-auto flex justify-center items-center">
                        <ModalOportunidade />
                  </div>
                  
              </div>
              
        </div>
    </Layout>
  )
}

export default Oportunidades