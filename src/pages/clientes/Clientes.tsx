import { useState } from "react";
import ListaClientes from "../../components/cliente/listaclientes/ListaClientes"
import Layout from "../../components/layout/Layout"
import type Cliente from "../../models/Cliente";

function Clientes() {
  const [selectedCard, setSelectedCard] = useState<Cliente | null>(null);

  return (
    <Layout>
		  <ListaClientes />
    </Layout>
  )
}

export default Clientes