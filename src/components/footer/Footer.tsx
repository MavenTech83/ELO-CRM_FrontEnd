import {  GithubLogoIcon, LinkedinLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";

function Footer() {

  let data = new Date().getFullYear();

  return (
    <>
      <div className="bg-[#04111F] p-4 text-center border-t border-gray-700">
        <div className="h-20 container mx-auto text-sm">
          <p className="text-gray-400 mb-1">
          Elo CRM | Copyright: {data}
          </p>

          

          <p className="text-lg text-gray-400">
            Acesse nossas redes sociais
          </p>

          <div className="flex justify-center gap-2 mt-2 ">
            <LinkedinLogoIcon className="text-gray-400" size={28} weight="light" />
            <GithubLogoIcon className="text-gray-400" size={28} weight="light" />
            <WhatsappLogoIcon className="text-gray-400" size={28} weight="light" />
          </div>

        </div>
      </div>
    </>
  )
}

export default Footer;
