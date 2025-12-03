import Layout from "../../components/layout/Layout"

function Usuarios() {
  return (
    <Layout>
        
        <div className="h-full flex items-center justify-center gap-2">
                {/* <!-- Coluna 1 --> */}
                <div className="bg-white/20 p-4 pb-2 rounded-4xl shadow h-full">
                    Membro time 1
                </div>

                {/* <!-- Coluna 2 --> */}
                <div className="bg-white/20 p-4 pb-2 rounded-4xl shadow h-full">
                     Membro time 2
                </div>

                 {/* <!-- Coluna 3 --> */}
                <div className="bg-white/20 p-4 pb-2 rounded-4xl shadow h-full">
                     Membro time 3
                </div>

                 {/* <!-- Coluna 4 --> */}
                <div className="bg-white/20 p-4 pb-2 rounded-4xl shadow h-full">
                     Membro time 4
                </div>

                 {/* <!-- Coluna 5 --> */}
                <div className="bg-white/20 p-4 pb-2 rounded-4xl shadow h-full">
                     Membro time 5
                </div>
        </div>

    </Layout>
  )
}

export default Usuarios