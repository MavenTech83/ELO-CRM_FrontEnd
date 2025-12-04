import { FaChartLine, FaClipboardList, FaDatabase, FaJava, FaReact, FaRocket, FaUsers } from "react-icons/fa";
import Layout from "../../components/layout/Layout";

function SobreProjeto() {
return (
    <Layout>
        <div className="h-full w-full flex items-center justify-center overflow-hidden p-2">
            {/* Container que escala automaticamente para caber */}
            <div className="w-full h-full flex flex-col justify-between items-center 
                            max-h-full max-w-full overflow-hidden scale-[0.90] md:scale-100">
                                
                {/* Título */}
                <div className="text-center">
                    <FaRocket className="text-2xl text-(--color-picton-blue-900)  mx-auto" />
                    <h1 className="text-2xl font-bold mb-2">
                        ELO CRM
                    </h1>
                    <h2 className="text-1xl font-bold">
                        "Conectando Pessoas e Oportunidades"
                    </h2>
                    <p className="text-sm max-w-xl mx-auto">
                        O ELO CRM foi desenvolvido para facilitar a gestão de clientes, oportunidades
                        e processos comerciais de forma intuitiva, organizada e eficiente. Pensado para
                        equipes modernas que buscam centralizar dados e melhorar a produtividade.
                    </p>
                </div>

                {/* Funcionalidades */}
                <div className="w-full">
                    <h3 className="text-center text-xl font-bold bg-(--color-picton-blue-900) text-white py-1 rounded shadow">
                        Funcionalidades
                    </h3>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-2 shadow text-center text-sm">
                            <FaUsers className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold mb-1">Gestão de Usuários</h3>
                            <p>Cadastro, atualização e visualização de usuários.</p>
                        </div>

                        <div className="bg-white p-3 shadow text-center text-sm">
                            <FaChartLine className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold mb-1">Gestão de Oportunidades</h3>
                            <p>Registro e acompanhamento completo das negociações.</p>
                        </div>

                        <div className="bg-white p-3 shadow text-center text-sm">
                             <FaClipboardList className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold mb-1">Controle Financeiro</h3>
                            <p>Cálculos automáticos e precisos sem erros manuais.</p>
                        </div>
                    </div>
                </div>

                {/* Tecnologias */}
                <div className="w-full">
                    <h3 className="text-center text-xl font-bold bg-(--color-picton-blue-900) text-white py-2 rounded shadow">
                        Tecnologias Utilizadas
                    </h3>

                    <div className="grid grid-cols-3 gap-4 ">
                        <div className="bg-white p-3 shadow text-center text-sm">
                            <FaJava className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold mb-1">Back-End</h3>
                            <p>Java • Spring Boot • JPA • Hibernate • JWT</p>
                        </div>

                        <div className="bg-white p-3 shadow text-center text-sm">
                             <FaDatabase className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold mb-1">Banco de Dados</h3>
                            <p>MySQL estruturado</p>
                        </div>

                        <div className="bg-white p-3 shadow text-center text-sm">
                            <FaReact className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold mb-1">Front-End</h3>
                            <p>React • TypeScript • Tailwind</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </Layout>
    );
}

export default SobreProjeto;
