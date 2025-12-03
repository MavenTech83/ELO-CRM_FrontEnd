function Navbar() {
    return (
      <>
        <div className="bg-[#04111F] p-4 border-b border-cyan-400">
        <div className="h-10 container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-cyan-400">ELO CRM</div>
          <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-cyan-400 text-gray-400 ">Oportunidades</a>
            <a href="#" className="hover:text-cyan-400 text-gray-400">Clientes</a>
            <a href="#" className="hover:text-cyan-400 text-gray-400">Cadastrar Cliente</a>
            <a href="#" className="hover:text-cyan-400 text-gray-400">Perfil</a>
            <a href="#" className="hover:text-cyan-400 text-gray-400">Sair</a>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default Navbar;
