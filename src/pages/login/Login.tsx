import { Link } from "react-router-dom";

export default function Login() {
 

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://i.pinimg.com/originals/88/15/63/881563d6444b370fa4ceea0c3183bb4c.gif')" }}
    >
      {/* Overlay opcional */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl w-80 text-white">
          <h1 className="text-3xl font-bold mb-4">Login</h1>

          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Usuário"
              className="p-3 rounded bg-white/30 placeholder-white/70"
            />
            <input
              type="password"
              placeholder="Senha"
              className="p-3 rounded bg-white/30 placeholder-white/70"
            />
            
            <Link to="/home" className="p-3 rounded bg-blue-500 hover:bg-blue-600">
                Entrar
            </Link>
                       
           
          </form>
        </div>
      </div>
    </div>
  );
}