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
          <ListaOportunidade />
    </Layout>
  )
}

export default Oportunidades