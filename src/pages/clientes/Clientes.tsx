import { useState } from "react";
import ListaClientes from "../../components/cliente/listaclientes/ListaClientes"
import Layout from "../../components/layout/Layout"
import type Cliente from "../../models/Cliente";
import DetalhesCliente from "../../components/cliente/detalhescliente/DetalhesCliente";
import ModalCliente from "../../components/cliente/modalcliente/ModalCliente";

function Clientes() {
  const [selectedCard, setSelectedCard] = useState<Cliente | null>(null);

  return (
    <Layout>
        <div className="h-full flex items-center justify-center gap-2">
                {/* <!-- Coluna 1 --> */}
				<div className="h-full w-1/2">
					<div className="p-2 rounded-4xl shadow h-full overflow-y-auto scroll-smooth">
						<h1 className="text-2xl font-bold text-amber-50">Clientes</h1>
						<ListaClientes onSelect={setSelectedCard}/>
					</div>
				</div>

                {/* <!-- Coluna 2 --> */}
				<div className=" h-full w-1/2 gap-2">
						<div className="h-2/3 bg-white/20 p-4 rounded-4xl shadow overflow-y-auto">
						<DetalhesCliente cliente={selectedCard} />
						</div>
						<div className="h-1/3 p-4 rounded-4xl overflow-y-auto flex justify-center items-center">
							<ModalCliente />
						</div>
				</div>
        </div>

    </Layout>
  )
}

export default Clientes