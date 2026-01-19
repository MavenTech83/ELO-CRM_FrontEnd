import { FaChartLine, FaClipboardList, FaDatabase, FaJava, FaReact, FaRocket, FaUsers } from "react-icons/fa";
import Layout from "../../components/layout/Layout";

function SobreProjeto() {
return (
    <Layout>
          <div className="h-full w-full flex flex-col text-(--color-picton-blue-900) p-4 gap-4">
               <div className="flex flex-col items-center justify-center gap-6 pt-4">
                    <div className="w-full rounded-2xl text-center p-4 text-(--color-picton-blue-950) bg-white/90">
                         {/* Título */}
                        <div className="text-center">
                            <FaRocket className="text-4xl mx-auto" />
                            <h1 className="text-4xl font-bold mb-2">
                                ELO CRM
                            </h1>
                            <h2 className="text-2xl font-bold">
                                "Conectando Pessoas e Oportunidades"
                            </h2>
                            <p className="text-xls max-w-xl mx-auto">
                                O ELO CRM foi desenvolvido para facilitar a gestão de clientes, oportunidades
                                e processos comerciais de forma intuitiva, organizada e eficiente. Pensado para
                                equipes modernas que buscam centralizar dados e melhorar a produtividade.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl text-center mb-2 mt-2 text-(--color-picton-blue-950) bg-white/90">
                 {/* Funcionalidades */}
                <div className="w-full">
                    <h3 className="text-center text-xl font-bold p-2 bg-(--color-picton-blue-900) text-white rounded shadow">
                        Funcionalidades
                    </h3>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-2 shadow text-center text-lg">
                            <FaUsers className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold text-xl mb-1">Gestão de Usuários</h3>
                            <p>Cadastro, atualização e visualização de usuários.</p>
                        </div>

                        <div className="bg-white p-3 shadow text-center text-lg">
                            <FaChartLine className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold text-xl mb-1">Gestão de Oportunidades</h3>
                            <p>Registro e acompanhamento completo das negociações.</p>
                        </div>

                        <div className="bg-white p-3 shadow text-center text-lg">
                             <FaClipboardList className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold text-xl mb-1">Controle Financeiro</h3>
                            <p>Cálculos automáticos e precisos sem erros manuais.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full rounded-2xl text-center mb-2 mt-2 text-(--color-picton-blue-950) bg-white/90">
                 {/* Tecnologias */}
                 <div className="w-full">
                    <h3 className="text-center text-xl font-bold bg-(--color-picton-blue-900) text-white py-2 rounded shadow">
                        Tecnologias Utilizadas
                    </h3>

                    <div className="grid grid-cols-3 gap-4 ">
                        <div className="bg-white p-3 shadow text-center text-lg">
                            <FaJava className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold text-xl mb-1">Back-End</h3>
                            <p>Java • Spring Boot • JPA • Hibernate • JWT</p>
                        </div>

                        <div className="bg-white p-3 shadow text-center text-lg">
                             <FaDatabase className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold text-xl mb-1">Banco de Dados</h3>
                            <p>MySQL estruturado</p>
                        </div>

                        <div className="bg-white p-3 shadow text-center text-lg">
                            <FaReact className="text-4xl text-(--color-picton-blue-900) mb-4 mx-auto" />
                            <h3 className="font-bold text-xl mb-1">Front-End</h3>
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
