
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
import Clientes from "./pages/clientes/Clientes"
import SobreProjeto from "./pages/sobreprojeto/SobreProjeto"
import DeletarOportunidadePage from "./pages/oportunidades/DeletarOportunidadePage"
import EditarClientePage from "./pages/clientes/EditarClientePage"
import DeletarClientePage from "./pages/clientes/DeletarClientePage"
import SobreNos from "./pages/sobrenos/SobreNos"
import Cadastro from "./pages/cadastro/Cadastro"
import SobreNosPublica from "./pages/sobrenospublica/SobreNosPublica"
import SobreProjetoPublica from "./pages/sobreprojetopublica/sobreprojetopublica"



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
							<Route path="/deletaroportunidade/:id" element={<DeletarOportunidadePage />} />
							<Route path="/perfil" element={<Perfil />} />
							<Route path="/clientes" element={<Clientes />} />
							<Route path="/editarcliente/:id" element={<EditarClientePage />} />
							<Route path="/deletarcliente/:id" element={<DeletarClientePage />} />
							<Route path="/sobrenos" element={<SobreNos />} />
							<Route path="/sobreprojeto" element={<SobreProjeto />} />
							<Route path="/sobreprojetopublica" element={<SobreProjetoPublica />} />
							<Route path="/cadastro" element={<Cadastro />} />
							<Route path="/sobrenospublica" element={<SobreNosPublica />} />
							
					</Routes>
				</BrowserRouter>
				</AuthProvider>
  	
		</>
	)
}

export default App