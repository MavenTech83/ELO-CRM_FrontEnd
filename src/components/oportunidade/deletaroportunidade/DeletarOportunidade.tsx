import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Oportunidade from "../../../models/Oportunidade";
import { ClipLoader } from "react-spinners";
import {
  buscarOportunidadePorId,
  deletarOportunidade as deletarOportunidadeService
} from "../../../services/OportunidadeService";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";

function DeletarOportunidade() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [oportunidade, setOportunidade] = useState<Oportunidade>({} as Oportunidade);

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // status salvo localmente pelo select
  const statusLocal = localStorage.getItem(`status-op-${oportunidade.id}`);

  async function buscarPorId(id: string) {
    try {
      await buscarOportunidadePorId(id, setOportunidade, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado para realizar esta operação.", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarOportunidade() {
    setIsLoading(true);

    if (!id) {
      ToastAlerta("ID da oportunidade não encontrado.", "erro");
      setIsLoading(false);
      return;
    }

    try {
      await deletarOportunidadeService(id, {
        headers: {
          Authorization: token,
        },
      });
      ToastAlerta("Oportunidade excluída com sucesso.", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Ocorreu um erro ao realizar a exclusão.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/oportunidades");
  }

  return (
    <div className="container w-5/6 mx-auto p-20">
      <h1 className="text-4xl text-center my-4">Deletar Oportunidade</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja excluir a Oportunidade do sistema?
      </p>

      <div className="bg-white/20 border-e-4 border-b-4 border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 font-bold text-2xl">Oportunidade</header>

        <hr className="border" />

        <div className="p-4">
          <p className="text-2xl font-semibold mb-2">{oportunidade.descricao}</p>

          <p className="text-xl">
            Status: {statusLocal || "Não informado"}
          </p>

          <p className="text-xl">
            Valor Potencial: {oportunidade.valorPotencial || "Não informado"}
          </p>

          <p className="text-xl">
            Cliente: {oportunidade.cliente?.nome || "Não informado"}
          </p>

          <p className="text-xl">
            Tipo: {oportunidade.tipoOportunidade?.descricao || "Não informado"}
          </p>
        </div>

        <hr className="border" />

        <div className="flex">
          <button
            className="hover:bg-white/50 w-full py-2 border-e-2"
            onClick={retornar}
          >
            Não
          </button>

          <button
            className="hover:bg-white/50 w-full py-2 border-e-2r flex justify-center"
            onClick={deletarOportunidade}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarOportunidade;
