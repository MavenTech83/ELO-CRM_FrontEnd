import type Cliente from "../../../models/Cliente";
import type Oportunidade from "../../../models/Oportunidade";

interface Props {
  cliente: Cliente | null;
}

export default function DetalhesCliente({ cliente }: Props) {
  if (!cliente) {
    return (
      <div className="h-full flex items-center justify-center text-amber-50 text-2xl">
        Selecione um cliente ao lado
      </div>
    );
  }
      console.log(cliente)
  return (
    <div className="space-y-3 animate-fadeIn text-amber-50 ">
      <h1 className="text-2xl font-bold text-amber-50 ">
        {cliente.nome}
      </h1>
      <div>
        <p><b>E-mail:</b> {cliente.email}</p>
        <p><b>Endereço:</b> {cliente.endereco || "Não informado"}</p>
        <p><b>Telefone:</b> {cliente.telefone || "Não informado"}</p>
        <b>Oportunidades:</b>
       {cliente.oportunidade.length > 0 ? (
          cliente.oportunidade.map((oportunidadeCliente) => (
            	<ol className="mt-2 bg-white/20 border rounded-lg">
					<div key={oportunidadeCliente.id}>
						<li className="ms-4">
							<details className="group">
							<summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
								<span>{oportunidadeCliente?.descricao || "Não informado"}</span>
								<span className="transition-transform group-open:rotate-180">▼</span>
							</summary>
							<div className="px-4 pb-4 text-sm text-white">
								{/* <p className="ps-4"><b>Status:</b> {oportunidadeCliente?.status || "Não informado"}</p> */}
								<p className="ps-4"><b>Valor Potencial:</b> R$ {oportunidadeCliente?.valorPotencial || "Não informado"}</p>
							</div>
							</details>
						</li>
					</div>
         		 </ol>
          ))
        ) : (
		<ul className="mt-2 ps-4 pt-0.5 bg-white/20 border rounded-lg">
			<li className="ms-4">
				<p className="m-2">Nenhuma oportunidade encontrada...</p>
			</li>
		</ul>
          
        )}
        

        
        
        
      </div>
      

      
    </div>
  );
}