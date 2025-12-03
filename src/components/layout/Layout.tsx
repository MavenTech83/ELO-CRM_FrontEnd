import type { ReactNode } from "react";
import Sidebar from "../sidebar/SideBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
        {/* DIV PRINCIPAL “FLUTUANDO” */}
        <div className="w-[80vw] sm:h-screen md:h-[90vh] sm:mt-0  
        rounded-3xl shadow-3xl gap-2  bg-(--color-picton-blue-800)/50 overflow-auto md:overflow-hidden flex justify-start">
        
        {/* NavBar */}
        <Sidebar />
        {/* Conteúdo dinâmico (páginas entram aqui) */}
        <main className="flex-1 p-6">
            {children}
        </main>

      {/* Footer fixo */}
      {/* <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        © 2025 Meu Projeto
      </footer> */}

    </div>
    
    
    </>
  
  );
}
