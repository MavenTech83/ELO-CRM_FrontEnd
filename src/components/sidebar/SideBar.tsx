import { CoffeeIcon, HandshakeIcon, HeartIcon,HouseIcon, ListIcon, ProjectorScreenIcon, SignOutIcon, UserIcon, UsersFourIcon } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { UseLocalStorageState } from "../../utils/UseLocalStorageState";



export default function Sidebar() {
  const [isOpen, setIsOpen] = UseLocalStorageState<boolean>(
    "sidebar-open",
    true
  );

  const navigate = useNavigate();

	const {handleLogout } = useContext(AuthContext)

	function logout(){
		handleLogout()
		ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
		navigate('/')
	}


  return (
    <div className={`h-screen rounded-3xl bg-(--color-picton-blue-950) text-white flex flex-col p-4 transition-all duration-300 
      ${isOpen ? "w-64" : "w-20"}`}>
        <img src="https://ik.imagekit.io/lefcc/ELO%20CRM/logo_elo2223.png?updatedAt=1764871666869" className="bg-white rounded-2xl" alt="" />
      {/* Botão de expandir/recolher */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="mb-6 flex items-center gap-2 hover:bg-(--color-picton-blue-800) active:bg-(--color-picton-blue-800) p-2 rounded-lg"
      >
        <ListIcon size={34} />
        {isOpen && <span className="text-lg font-semibold">Menu</span>}
      </button>

      {/* Navegação */}
      <nav className="flex flex-col gap-3">

        <NavLink to="/home">
          {({ isActive }) => (
            <SidebarItem icon={<HouseIcon size={32} />} label="Home" isOpen={isOpen} active={isActive} />
          )}
        </NavLink>

        <NavLink to="/perfil">
          {({ isActive }) => (
            <SidebarItem icon={<UserIcon size={32} />} label="Perfil" isOpen={isOpen} active={isActive} />
          )}
        </NavLink>

        <NavLink to="/clientes">
          {({ isActive }) => (
            <SidebarItem icon={<UsersFourIcon size={32} />} label="Clientes" isOpen={isOpen} active={isActive} />
          )}
        </NavLink>

        {/* <NavLink to="/oportunidades">
          {({ isActive }) => (
            <SidebarItem icon={<HandshakeIcon size={32} />} label="Oportunidade" isOpen={isOpen} active={isActive} />
          )}
        </NavLink> */}

        <NavLink to="/sobrenos">
          {({ isActive }) => (
            <SidebarItem icon={<HeartIcon size={32} />} label="Sobre Nós" isOpen={isOpen} active={isActive} />
          )}
        </NavLink>

        <NavLink to="/sobreprojeto">
          {({ isActive }) => (
            <SidebarItem icon={<CoffeeIcon size={32} />} label="Sobre Projeto" isOpen={isOpen} active={isActive} />
          )}
        </NavLink>

        {/* Botão de logout */}
        <button onClick={logout}>
          <SidebarItem
            icon={<SignOutIcon size={32} />}
            label="Sair"
            isOpen={isOpen}
            active={false}
          />
        </button>

      </nav>
    </div>
  );
}

type PropsItem = {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  active: boolean;
};

function SidebarItem({ icon, label, isOpen, active }: PropsItem) {
  return (
    <div
      className={`
        flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors
        ${active ? "bg-(--color-picton-blue-800) text-(--color-picton-blue-500)" : "hover:bg-(--color-picton-blue-800)"}
      `}
    >
      {/* Ícone com cor diferente se ativo */}
      <div className={active ? "text-(--color-picton-blue-500)" : ""}>
        {icon}
      </div>

      {isOpen && <span className="text-base">{label}</span>}
    </div>
  );
}
