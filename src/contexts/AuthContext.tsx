import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";





interface AuthContexProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContexProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""

    })

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Implementaçao da Função de Login, autenticaçao no backend
    async function handleLogin(usuarioLogin: UsuarioLogin){
        setIsLoading(true);

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario,);
            ToastAlerta("Usuario autenticado com sucesso", "sucesso");
        } catch (error) {
            ToastAlerta("Os dados do usuario estão incosistentes!", "erro")

        }
        
        setIsLoading(false);
    }

    // Implementaçao da funcao de logout
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        });
    }

    return(
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
            </AuthContext.Provider>
    )

}