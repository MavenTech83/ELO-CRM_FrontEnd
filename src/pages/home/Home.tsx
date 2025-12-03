function Home() {
  return (
    <div 
      className="flex justify-center" 
      style={{
        // 1. Define a URL da imagem de fundo
        backgroundImage: `url(https://ik.imagekit.io/hnkqnvn7cu/Whisk_emzxyzm5cjn1iwy40czhdtyti2nxqtl2ato10sy.gif)`,
        // 2. Garante que a imagem cubra toda a área sem distorcer
        backgroundSize: 'cover', 
        // 3. Centraliza a imagem no container
        backgroundPosition: 'center', 
        // 4. Define uma altura para a seção Home (ex: tela inteira)
        height: '80vh', 
        
        // 5. Opcional: Adiciona um tom escuro sobre a imagem para melhor leitura do texto branco
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        backgroundBlendMode: 'darken'
      }}
    >
      <div className=" container grid grid-cols-2 text-white">

        <div className="flex flex-col gap-4 items-center justify-center py-4">
          <h2 className="text-5xl font-bold text-center">Seja Bem Vindo!</h2>

          <p className="text-xl text-center">
            Centralize dados, automatize renovações e construa relacionamentos duradouros com seus clientes.
          </p>

          <div className="flex justify-around gap-4">
            <div className="rounded border-2 py-3 px-8 
                    border-cyan-400 text-cyan-400 font-semibold 
                    hover:bg-cyan-400 hover:text-gray-900 transition duration-300 cursor-pointer">
              Nova Oportunidade
            </div>
          </div>
        </div>
        
        {/* A coluna da imagem foi removida, pois a imagem agora é o background */}
        {/* ou pode ser mantida vazia para manter o layout de 2 colunas: */}
        <div className="hidden md:block">
          {/* Esta coluna pode ser deixada vazia ou usada para outro conteúdo */}
        </div>

      </div>
    </div>
  )
}

export default Home