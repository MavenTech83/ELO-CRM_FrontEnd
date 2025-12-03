import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import ClipLoader from "react-spinners/ClipLoader";

export default function Login() {
 
  const navigate = useNavigate()

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin)

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    useEffect( () => {
        if (usuario.token !== ""){
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        })
    }

    function login(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        handleLogin(usuarioLogin);
    }
    
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

          <form onSubmit={login} className="flex flex-col space-y-4">
            <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Usuario"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogin.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            /> 
            <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
            
            <button className="p-3 rounded bg-blue-500 hover:bg-blue-600" type="submit">
              {
                  isLoading ?

                  <ClipLoader
                    color="#ffffff"
                    size={24}
                  />

                  :

            <span>Entrar</span>

              }
            </button>
          </form>      
        </div>
      </div>
    </div>
  );
}