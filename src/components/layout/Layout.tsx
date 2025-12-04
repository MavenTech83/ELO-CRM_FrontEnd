import type { ReactNode } from "react";
import Sidebar from "../sidebar/SideBar";
import Footer from "../footer/Footer";

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<div className="h-screen w-full flex flex-col items-center pt-[5vh] bg-(--color-picton-blue-100)">
				{/* footer dentro da tela expansivel*/}
				{/* DIV PRINCIPAL “FLUTUANDO”
	<div className="w-[80vw] sm:h-screen md:h-[90vh] sm:mt-0
		rounded-3xl shadow-3xl bg-(--color-picton-blue-800)/50 
		overflow-auto md:overflow-hidden flex">

		NavBar
		<nav>
			<Sidebar />
		</nav>

		Wrap do conteúdo + footer
		<div className="flex-1 flex flex-col">

			Conteúdo dinâmico
			<main className="flex-1 p-6 h-[70vh]">
				{children}
			</main>

			Footer
			<footer className="text-center bg-(--color-picton-blue-900)/60">
				Elo CRM | Copyright: {data}
				<p className="text-lg text-gray-400">
				Acesse nossas redes sociais
			</p>

			<div className="flex justify-center gap-2 mt-2 ">
				<LinkedinLogoIcon className="text-gray-400" size={28} weight="light" />
				<GithubLogoIcon className="text-gray-400" size={28} weight="light" />
				<WhatsappLogoIcon className="text-gray-400" size={28} weight="light" />
			</div>
			</footer>

		</div>
	</div> */}

				{/* Footer fixa na pagina */}
				{/* DIV PRINCIPAL “FLUTUANDO” */}
				{/* DIV PRINCIPAL – versão corrigida */}
				{/* DIV PRINCIPAL “FLUTUANDO” */}
				<div className="w-[80vw] sm:h-screen md:h-[80vh] sm:mt-0 rounded-3xl shadow-3xl bg-(--color-picton-blue-800)/50 overflow-auto md:overflow-hidden flex min-h-0">
					{/* Sidebar */}
					<nav>
						<Sidebar />
					</nav>

					{/* Conteúdo principal */}
					<div className="flex flex-col flex-1 min-h-0">
						<main className="flex-1 p-4 min-h-0 overflow-y-auto">
							{children}
						</main>
					</div>




				</div>
				<footer className="pt-2">
					<Footer />
				</footer>

			</div>
		</>

	);
}
