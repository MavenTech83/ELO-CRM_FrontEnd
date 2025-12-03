
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Footer from "./components/footer/Footer"
// import Navbar from "./components/navbar/Navbar"
// import Home from "./pages/home_jessica/Home"
import Login from "./pages/login/Login"
import Oportunidades from "./pages/oportunidades/Oportunidades"
import Perfil from "./pages/perfil/Perfil"
import Clientes from "./pages/clientes/Clientes"
import SobreNos from "./pages/sobrenos/SobreNos"
import Home from "./pages/home/Home"

function App() {
	return (
		<>
		<div className="h-screen w-full flex justify-center items-center bg-(--color-picton-blue-100) ">
				<BrowserRouter>
					<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/home" element={< Home />} />
							<Route path="/oportunidades" element={< Oportunidades />} />
							<Route path="/perfil" element={<Perfil />} />
							<Route path="/clientes" element={<Clientes />} />
							<Route path="/sobrenos" element={<SobreNos />} />

					</Routes>
				</BrowserRouter>
            </div> 
		{/* < Navbar/>
		< Home />
		< Footer/> */}
		

		</>
	)
}

export default App