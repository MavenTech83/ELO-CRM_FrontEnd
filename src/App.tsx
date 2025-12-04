
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Oportunidades from "./pages/oportunidades/Oportunidades"
import Perfil from "./pages/perfil/Perfil"
import Clientes from "./pages/clientes/Clientes"
import SobreNos from "./pages/sobrenos/SobreNos"
import Home from "./pages/home/Home"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastContainer } from "react-toastify"
import Editar from "./pages/editar/Editar"
import Deletar from "./pages/deletar/Deletar"

function App() {
	return (
		<>
				<AuthProvider>
				<ToastContainer />
				<BrowserRouter>
					<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/home" element={< Home />} />
							<Route path="/oportunidades" element={< Oportunidades />} />
							<Route path="/editaroportunidade/:id" element={<Editar />} />
							<Route path="/deletaroportunidade/:id" element={<Deletar />} />
							<Route path="/perfil" element={<Perfil />} />
							<Route path="/clientes" element={<Clientes />} />
							<Route path="/sobrenos" element={<SobreNos />} />
					</Routes>
				</BrowserRouter>
				</AuthProvider>
  	
		</>
	)
}

export default App