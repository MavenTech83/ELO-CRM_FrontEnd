import { Link } from "react-router-dom";

export default function Login() {
 

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://ik.imagekit.io/hnkqnvn7cu/Whisk_emzxyzm5cjn1iwy40czhdtyti2nxqtl2ato10sy.gif')" }}
    >
      {/* Overlay opcional */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl w-80 text-white">
          
              <h1 className="text-3xl font-bold text-cyan-400 text-center pb-[5vh]">ELO CRM</h1>

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
            
            <Link to="/home" className="p-3 rounded bg-blue-500 hover:bg-blue-600 text-center">
                Entrar
            </Link>
                       
           
          </form>
        </div>
      </div>
    </div>
  );
}