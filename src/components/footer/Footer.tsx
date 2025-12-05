import {  GithubLogoIcon, LinkedinLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Footer() {

  let data = new Date().getFullYear();

  return (
    <>
      <div className="w-screen bg-[#04111F] pt-4 fixed bottom-0 left-0">
        <div className="h-10 container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-cyan-400 mb-5">ELO CRM: | Copyright: {data}</div>
          <div className="flex justify-end gap-2 mb-5">
            <Link to='https://github.com/MavenTech83'>
                <LinkedinLogoIcon className="text-cyan-400" size={28} weight="light" />
            </Link>
            
            <Link to='https://github.com/MavenTech83'>
              <GithubLogoIcon className="text-cyan-400" size={28} weight="light" />
            </Link>

            <Link to='https://github.com/MavenTech83'>
              <WhatsappLogoIcon className="text-cyan-400" size={28} weight="light" />
            </Link>
                  
            
          </div>
        </div>
      </div>
          
    </>
  )
}

export default Footer;
