import Layout from "../../components/layout/Layout"

function Clientes() {
  return (
    <Layout>
        <div className="h-full flex items-center justify-center gap-2">
                {/* <!-- Coluna 1 --> */}
                <div className="bg-white/20 w-1/2 p-4 pb-2 rounded-4xl shadow h-full">
                    Clientes
                </div>

                {/* <!-- Coluna 2 --> */}
                <div className="bg-white/20 w-1/2 p-4 pb-2 rounded-4xl shadow h-full">
                    Conteúdo 2
                </div>
        </div>

    </Layout>
  )
}

export default Clientes