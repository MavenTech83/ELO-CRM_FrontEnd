import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import Navbar from "../../components/navbar/Navbar"


export default function SobreNosPublica() {

     const desenvolvedoras = [
          {
               id: 1,
               nome: "Ana Lemos",
               foto: "https://i.imgur.com/pSbJzUC.jpeg",
               // descricao: "QA | Documentação",
               linkedin: "https://www.linkedin.com/in/analemos-3nj0y/",
               github: "https://github.com/carol1692"
          },
          {
               id: 2,
               nome: "Jéssica Tinguely",
               foto: "https://i.imgur.com/89PgWiM.jpeg",
               // descricao: "Tech Lead",
               linkedin: "https://www.linkedin.com/in/jessicatinguely/",
               github: "https://github.com/jessicatinguely"
          },
          {
               id: 3,
               nome: "Letícia Campos",
               foto: "https://i.imgur.com/qAHNKrs.jpeg",
               // descricao: "Dev",
               linkedin: "https://www.linkedin.com/in/leticiafccampos/?locale=pt",
               github: "https://github.com/lefcc"
          },
          {
               id: 4,
               nome: "Nádia Caricatto",
               foto: "https://i.imgur.com/PBPngga.jpeg",
               // descricao: "Dev",
               linkedin: "https://www.linkedin.com/in/nadiacaricatto/",
               github: "https://github.com/nadiacaricatto"
          },
          {
               id: 5,
               nome: "Thalita Lima",
               foto: "https://i.imgur.com/ONYV61m.jpeg",
               // descricao: "Dev",
               linkedin: "https://www.linkedin.com/in/thalita-lima-/",
               github: "https://github.com/Thalima23"
          }


     ]
     return (
					
		<div
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        // style={{ backgroundImage: "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHMxeWllcHh4cnlhcWV4dGg3M3docDc4c2xvd21nbGF4ZjlmdHp1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jaOXKCxtBPLieRLI0c/giphy.gif')" }}
        style={{ backgroundImage: "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMW1iN2FqN2ZweXF0djduN2s1djlydXM0OW9xeXZtdmE3dXNlc2c1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7b8jdNUoFBdcoILjjv/giphy.gif')" }}
        >
        <Navbar />
            {/* Overlay opcional */}
            <div className="absolute inset-0 bg-black/40"></div>
        
      {/* Conteúdo */}
      <div className="relative z-10 flex items-center justify-center h-full">
        
        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl text-white w-[80vw]">
          <div className="flex flex-col space-y-4">
             <div className="flex flex-col w-full">
                <div className="flex">
                    <div className="rounded-tl-2xl rounded-bl-2xl text-center mb-2 mt-2 text-(--color-picton-blue-950) bg-white w-1/3">
                        <img src="https://ik.imagekit.io/lefcc/ELO%20CRM/logo_elo2223.png?updatedAt=1764871666869" className="bg-white rounded-2xl mb-4 ps-10" alt="" />
                    </div>
                  
                    <div className="rounded-tr-2xl rounded-br-2xl text-center content-center mb-2 mt-2 text-(--color-picton-blue-950) bg-white w-2/3">
                              
                        <h2 className='text-4xl font-bold mb-4 '>
                            Sobre Nós
                        </h2>
                        <p className='text-2xl font-semibold'>
                            Conheça as Devas que idealizaram o Elo CRM!
                        </p>
                    </div> 
                </div>
                </div>
                
          
            <div className="h-full grid grid-cols-5 rounded-2xl text-center mb-2 mt-2 text-(--color-picton-blue-950)">
                    {desenvolvedoras.map((dev) => (
                    <div className="h-full w-full justify-between p-2 items-start (--color-picton-blue-200)" key={dev.id}>
                              <div className="bg-white/50 h-full backdrop-blur-sm rounded-lg p-2 flex flex-col items-center justify-center gap-6 hover:bg-white transition">
                              <img
                                   src={dev.foto}
                                   
                                   alt={`Foto de ${dev.nome}`}
                                   className="w-32 h-32 rounded-full object-cover border-4 border-(--color-picton-blue-800)"
                              />
                              <div className="text-center h-13">
                                   <h3 className="text-2xl font-bold ">{dev.nome}</h3>
                              </div> 
                              
                              {/* <p className="text-center text-sm">{dev.descricao}</p> */}

                              {/* Links */}
                              <div className="flex gap-4 mt-2 items-baseline">
                                   <a
                                        href={dev.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-(--color-picton-blue-900) text-(--color-picton-blue-50) px-4 py-2 rounded-lg font-semibold hover:bg-(--color-picton-blue-700) transition"
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
                    </div>
                         ))}
                    
          </div>
          </div>      
        </div>
      </div>
    </div>		
    )
}