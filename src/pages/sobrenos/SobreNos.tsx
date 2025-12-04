import Layout from '../../components/layout/Layout'

function SobreNos() {
  return (
    <Layout>
  <div className="h-full bg-amber-200 flex justify-center p-4">

    {/* WRAPPER PRINCIPAL */}
    <div className="flex flex-col h-full w-full max-w-full">

      {/* TÍTULO */}
      <div className="text-center mb-6 text-(--color-picton-blue-950) w-full">
        <h2 className="text-7xl font-bold mb-4">Sobre Nós</h2>
        <p className="text-2xl font-semibold">
          Conheça as Devas que idealizaram o Elo CRM!
        </p>
      </div>

      {/* COLUNAS */}
      <div className="flex h-full w-full max-w-full gap-4 items-stretch justify-center overflow-hidden">

        {/* COLUNA 1 */}
        <div className="bg-white/20 p-8 pb-2 rounded-4xl shadow flex-1 min-w-0 
                        flex flex-col items-center justify-center 
                        hover:bg-(--color-picton-blue-200) transition">

          <img src="https://i.imgur.com/pSbJzUC.jpeg"
               className="w-32 h-32 rounded-full object-cover border-4 border-(--color-picton-blue-800) mb-6" />
          
          <h3 className="text-2xl font-bold">Ana Lemos</h3>
          <p className="text-center text-sm mb-4">QA | Documentação</p>

          <div className="flex gap-4 mt-2">
            <a className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700)">
              LinkedIn
            </a>
            <a className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700)">
              GitHub
            </a>
          </div>
        </div>

         {/* COLUNA 2 */}
        <div className="bg-white/20 p-8 pb-2 rounded-4xl shadow flex-1 min-w-0 
                        flex flex-col items-center justify-center 
                        hover:bg-(--color-picton-blue-200) transition">

          <img src="https://i.imgur.com/pSbJzUC.jpeg"
               className="w-32 h-32 rounded-full object-cover border-4 border-(--color-picton-blue-800) mb-6" />
          
          <h3 className="text-2xl font-bold">Ana Lemos</h3>
          <p className="text-center text-sm mb-4">QA | Documentação</p>

          <div className="flex gap-4 mt-2">
            <a className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700)">
              LinkedIn
            </a>
            <a className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700)">
              GitHub
            </a>
          </div>
        </div>

         {/* COLUNA 3 */}
        <div className="bg-white/20 p-8 pb-2 rounded-4xl shadow flex-1 min-w-0 
                        flex flex-col items-center justify-center 
                        hover:bg-(--color-picton-blue-200) transition">

          <img src="https://i.imgur.com/pSbJzUC.jpeg"
               className="w-32 h-32 rounded-full object-cover border-4 border-(--color-picton-blue-800) mb-6" />
          
          <h3 className="text-2xl font-bold">Ana Lemos</h3>
          <p className="text-center text-sm mb-4">QA | Documentação</p>

          <div className="flex gap-4 mt-2">
            <a className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700)">
              LinkedIn
            </a>
            <a className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700)">
              GitHub
            </a>
          </div>
        </div>

         {/* COLUNA 4 */}
        <div className="bg-white/20 p-8 pb-2 rounded-4xl shadow flex-1 min-w-0 
                        flex flex-col items-center justify-center 
                        hover:bg-(--color-picton-blue-200) transition">

          <img src="https://i.imgur.com/pSbJzUC.jpeg"
               className="w-32 h-32 rounded-full object-cover border-4 border-(--color-picton-blue-800) mb-6" />
          
          <h3 className="text-2xl font-bold">Ana Lemos</h3>
          <p className="text-center text-sm mb-4">QA | Documentação</p>

          <div className="flex gap-4 mt-2">
            <a className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700)">
              LinkedIn
            </a>
            <a className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700)">
              GitHub
            </a>
          </div>
        </div>

         {/* COLUNA 5 */}
        <div className="bg-white/20 p-8 pb-2 rounded-4xl shadow flex-1 min-w-0 
                        flex flex-col items-center justify-center 
                        hover:bg-(--color-picton-blue-200) transition">

          <img src="https://i.imgur.com/pSbJzUC.jpeg"
               className="w-32 h-32 rounded-full object-cover border-4 border-(--color-picton-blue-800) mb-6" />
          
          <h3 className="text-2xl font-bold">Ana Lemos</h3>
          <p className="text-center text-sm mb-4">QA | Documentação</p>

          <div className="flex gap-4 mt-2">
            <a className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700)">
              LinkedIn
            </a>
            <a className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700)">
              GitHub
            </a>
          </div>
        </div>

      </div>

    </div>
  </div>
</Layout>

  )
}

export default SobreNos