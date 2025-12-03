import { HandshakeIcon, HeartIcon,HouseIcon, ListIcon, SignOutIcon, UserIcon, UsersFourIcon } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

	const {usuario, handleLogout } = useContext(AuthContext)

	function logout(){
		handleLogout()
		ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
		navigate('/')
	}


  return (
    <>
      <div className={`h-screen  rounded-3xl bg-(--color-picton-blue-950) text-white flex flex-col p-4 transition-all duration-300 
      ${isOpen ? "w-64" : "w-20"}`}>

      {/* Botão de expandir/recolher */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 flex items-center gap-2 hover:bg-(--color-picton-blue-800) p-2 rounded-lg"
      >
       <ListIcon size={24} />
        {isOpen && <span className="text-lg font-semibold">Menu</span>}
      </button>

      {/* Navegação */}
      <nav className="flex flex-col gap-3">

        <Link to='/home'>
          <SidebarItem icon={<HouseIcon size={22} />} label="Home" isOpen={isOpen} />
        </Link>
        
        <Link to='/perfil'>
          <SidebarItem icon={<UserIcon size={22} />} label="Perfil" isOpen={isOpen} />
        </Link>
        
        <Link to='/clientes'>
          <SidebarItem icon={<UsersFourIcon size={22} />} label="Clientes" isOpen={isOpen} />
        </Link>
        
        <Link to='/oportunidades'>
           <SidebarItem icon={<HandshakeIcon size={22} />} label="Oportunidade" isOpen={isOpen} />
        </Link>

        <Link to='/sobrenos'>
           <SidebarItem icon={<HeartIcon size={22} />} label="Sobre Nós" isOpen={isOpen} />
        </Link>
       
        <Link to='/' onClick={logout}>
           <SidebarItem icon={<SignOutIcon size={32} />} label="Sair" isOpen={isOpen} />
        </Link>
       

      </nav>

    </div>
    
    </>
    
  );
}

type PropsItem = {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
};

function SidebarItem({ icon, label, isOpen }: PropsItem) {
  return (
    <div
      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-(--color-picton-blue-800) transition-colors"
    >
      {icon}
      {isOpen && <span className="text-base">{label}</span>}
    </div>
  );
}
