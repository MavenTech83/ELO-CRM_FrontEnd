import {
    FaUsers, FaChartLine, FaClipboardList, FaReact, FaJava, FaDatabase, FaRocket
} from "react-icons/fa";

function SobreProjeto() {
    return (
        <div className="text-gray-700 bg-[#81d6f8] pt-10">

            {/* Introdução */}
            <section className="px-6 py-12 max-w-5xl mx-auto text-center flex flex-col items-center">
                <div className="bg-white rounded-2xl p-6 hover:shadow-black/20 transition shadow-lg">
                    <FaRocket className="text-4xl text-blue-700 mb-4 mx-auto" />
                    <h3 className="text-3xl font-bold mb-4">ELO CRM — "Conectando Pessoas e Oportunidades"</h3>
                    <p className="text-lg">
                        O ELO CRM foi desenvolvido para facilitar a gestão de clientes, oportunidades
                        e processos comerciais de forma intuitiva, organizada e eficiente.
                        Pensado para equipes modernas que buscam centralizar dados e melhorar a produtividade.
                    </p>
                </div>
            </section>

            {/* Funcionalidades */}
            <h1
                className="text-center w-full bg-blue-500 text-3xl font-bold py-6 shadow-lg"
            >
                Funcionalidades
            </h1>

            <section className="px-8 py-12 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-white rounded-2xl p-6 text-center hover:shadow-black/20 transition shadow-lg">
                        <FaUsers className="text-4xl text-blue-700 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2">Gestão de Usuários</h3>
                        <p>Cadastro, atualização e visualização de usuários do sistema.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 text-center hover:shadow-black/20 transition shadow-lg">
                        <FaChartLine className="text-4xl text-blue-700 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2">Gestão de Oportunidades</h3>
                        <p> Permite registrar, atualizar e acompanhar cada negociação, com informações completas sobre o tipo de negócio e o andamento da proposta.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 text-center hover:shadow-black/20 transition shadow-lg">
                        <FaClipboardList className="text-4xl text-blue-700 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2">Controle Financeiro Preciso</h3>
                        <p> Assegura cálculos exatos e consistentes, mantendo os valores corretos em cada operação e evitando erros manuais.</p>
                    </div>

                </div>
                
            </section>

            {/* Tecnologias */}
            <h1
                className="text-center w-full bg-blue-500 text-3xl font-bold py-6 shadow-lg"

            >
                Tecnologias Utilizadas
            </h1>

            <section className="px-8 py-12 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-white rounded-2xl p-6 text-center hover:shadow-black/20 transition shadow-lg">
                        <FaJava className="text-4xl text-blue-700 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2">Back-End</h3>
                        <p>Java • Spring Boot • JPA • Hibernate • Segurança com JWT.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 text-center hover:shadow-black/20 transition shadow-lg">
                        <FaDatabase className="text-4xl text-blue-700 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2">Banco de Dados</h3>
                        <p>MySQL para persistência estruturada das informações.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 text-center hover:shadow-black/20 transition shadow-lg">
                        <FaReact className="text-4xl text-blue-700 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2">Front-End</h3>
                        <p>React • TypeScript • Tailwind CSS para interface moderna e rápida.</p>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default SobreProjeto;
