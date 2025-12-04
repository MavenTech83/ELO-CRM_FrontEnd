
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Oportunidades from "./pages/oportunidades/Oportunidades"
import Perfil from "./pages/perfil/Perfil"
// import Clientes from "./pages/clientes/Clientes"
// import SobreNos from "./pages/sobrenos/SobreNos"
import Home from "./pages/home/Home"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastContainer } from "react-toastify"
import Editar from "./pages/oportunidades/EditarOportunidadePage"

import Home_leticia from "./pages/home/Home_leticia"
import Clientes from "./pages/clientes/Clientes"
import SobreProjeto from "./pages/sobre_projeto/SobreProjeto"
import SobreNos from "./pages/sobrenos/SobreNos"
import DeletarOportunidadePage from "./pages/oportunidades/DeletarOportunidadePage"
import EditarClientePage from "./pages/clientes/EditarClientePage"
import DeletarClientePage from "./pages/clientes/DeletarClientePage"

function App() {
	return (
		<>
				<AuthProvider>
				<ToastContainer />
				<BrowserRouter>
					<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/home" element={< Home />} />
							<Route path="/home-le" element={< Home_leticia />} />
							<Route path="/oportunidades" element={< Oportunidades />} />
							<Route path="/editaroportunidade/:id" element={<Editar />} />
							<Route path="/deletaroportunidade/:id" element={<DeletarOportunidadePage />} />
							<Route path="/perfil" element={<Perfil />} />
							<Route path="/clientes" element={<Clientes />} />
							<Route path="/editarcliente/:id" element={<EditarClientePage />} />
							<Route path="/deletarcliente/:id" element={<DeletarClientePage />} />
							<Route path="/sobrenos" element={<SobreNos />} />
							<Route path="/sobreprojeto" element={<SobreProjeto />} />
					</Routes>
				</BrowserRouter>
				</AuthProvider>
  	
		</>
	)
}

export default App