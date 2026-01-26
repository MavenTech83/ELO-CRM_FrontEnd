import type { ReactNode } from "react";
import Sidebar from "../sidebar/SideBar";
import Footer from "../footer/Footer";

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<div className="h-screen w-full flex flex-col items-center pt-[5vh] bg-(--color-picton-blue-100) text-amber-50">
			
				{/* DIV PRINCIPAL “FLUTUANDO” */}
				<div className="w-[80vw] sm:h-screen md:h-[80vh] sm:mt-0 rounded-3xl shadow-3xl bg-(--color-picton-blue-800) overflow-auto md:overflow-hidden flex min-h-0">
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
