import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white text-sm">
        
       
        {/* Links à direita */}
        <div className="fixed right-5 top-5 gap-2">
          <Link
            to="/sobrenospublica"
            className="pt-3 px-3 hover:text-(--color-picton-blue-600) text-gray-400 transition"
          >
            Sobre Nós
          </Link>

          <Link
            to="/sobreprojetopublica"
            className="pt-3 px-3 hover:text-(--color-picton-blue-600) text-gray-400 transition"
          >
            O Projeto
          </Link>

          <Link to="/" className="hover:text-(--color-picton-blue-600) text-gray-400 text-xl transition border p-2 hover:scale-[0.98] rounded-xl">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
