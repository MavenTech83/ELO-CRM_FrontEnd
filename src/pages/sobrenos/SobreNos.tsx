import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import Layout from "../../components/layout/Layout"

function SobreNos() {

     const desenvolvedoras = [
          {
               id: 1,
               nome: "Ana Lemos",
               foto: "https://i.imgur.com/pSbJzUC.jpeg",
               descricao: "QA | Documentação",
               linkedin: "https://www.linkedin.com/in/analemos-3nj0y/",
               github: "https://github.com/carol1692"
          },
          {
               id: 2,
               nome: "Jéssica Tinguely",
               foto: "https://i.imgur.com/89PgWiM.jpeg",
               descricao: "Tech Lead",
               linkedin: "https://www.linkedin.com/in/jessicatinguely/",
               github: "https://github.com/jessicatinguely"
          },
          {
               id: 3,
               nome: "Letícia Campos",
               foto: "https://i.imgur.com/qAHNKrs.jpeg",
               descricao: "Dev",
               linkedin: "https://www.linkedin.com/in/leticiafccampos/?locale=pt",
               github: "https://github.com/lefcc"
          },
          {
               id: 4,
               nome: "Nádia Caricatto",
               foto: "https://i.imgur.com/PBPngga.jpeg",
               descricao: "Dev",
               linkedin: "https://www.linkedin.com/in/nadiacaricatto/",
               github: "https://github.com/nadiacaricatto"
          },
          {
               id: 5,
               nome: "Thalita Lima",
               foto: "https://i.imgur.com/ONYV61m.jpeg",
               descricao: "Dev",
               linkedin: "https://www.linkedin.com/in/thalita-lima-/",
               github: "https://github.com/Thalima23"
          }


     ]
     return (
     <Layout>
     
     <div className="bg-white/20 h-full p-2 pb-2 rounded-4xl shadow mb-2 ">
          <div>
              <div className="h-full flex flex-col items-center justify-center gap-4 ">
          <div className="text-center mb-2 mt-2 text-(--color-picton-blue-950)">
          <h2 className='text-4xl font-bold mb-4 '>
               Sobre Nós
          </h2>
          <p className='text-2xl font-semibold'>
               Conheça as Devas que idealizaram o Elo CRM!
          </p>
     </div> 

          </div>
          <div className="grid grid-cols-5 justify-between gap-2 p-2 h-[50vh] items-start  text-amber-50 (--color-picton-blue-200)">
               {desenvolvedoras.map((dev) => (
                    <div className="bg-(--color-picton-blue-150) backdrop-blur-sm rounded-lg p-2 flex flex-col items-center justify-center gap-6 hover:bg-(--color-picton-blue-200) transition">
                         <img
                              src={dev.foto}
                              alt={`Foto de ${dev.nome}`}
                              className="w-32 h-32 rounded-full object-cover border-4 border-(--color-picton-blue-800)"
                         />
                         <div className="text-center h-13">
                              <h3 className="text-2xl font-bold ">{dev.nome}</h3>
                         </div>
                         
                         <p className="text-center text-sm">{dev.descricao}</p>

                         {/* Links */}
                         <div className="flex gap-4 mt-2 items-baseline">
                              <a
                                   href={dev.linkedin}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-2xl font-semibold hover:bg--(--color-picton-blue-700) transition"
                              >
                                   <LinkedinLogoIcon size={32} />
                              </a>
                              <a
                                   href={dev.github}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700) transition"
                              >
                                   <GithubLogoIcon size={32} />
                              </a>
                         </div>
                    </div>
               ))}
          </div>

     </div>
</div>
          
          </Layout>
     )
}

export default SobreNos