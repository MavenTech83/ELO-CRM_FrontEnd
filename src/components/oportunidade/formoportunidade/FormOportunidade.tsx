// src/components/.../FormOportunidade.tsx
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import type Oportunidade from "../../../models/Oportunidade";
import type Cliente from "../../../models/Cliente";
import type { TipoOportunidade } from "../../../models/TipoOportunidade"; // ajuste se seu model exporta default

import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import {
  buscarOportunidadePorId as buscarOportunidadePorIdService,
  cadastrarOportunidade as cadastrarOportunidadeService,
  atualizarOportunidade as atualizarOportunidadeService
} from "../../../services/OportunidadeService";
import {
  buscarTiposOportunidade as buscarTiposOportunidadeService
} from "../../../services/TipoOportunidadeService";
import {
  buscarClientePorId as buscarClientePorIdService,
  buscarClientes as buscarClientesService
} from "../../../services/ClienteService";
import AtualizacaoStatusSelect from "../../statusoportunidade/StatusOportunidade";
import TIPOS_FALLBACK from "../../../data/TiposOportunidade";



export default function FormOportunidade() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // listas
  const [tiposOportunidade, setTiposOportunidade] = useState<TipoOportunidade[]>(TIPOS_FALLBACK);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  // estados selecionados
  const [tipoOportunidade, setTipoOportunidade] = useState<TipoOportunidade>({ id: 0, descricao: "" });
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    oportunidade: null,
  });

  // oportunidade (state usado no formulário)
  const [oportunidade, setOportunidade] = useState<Oportunidade>({
    id: 0,
    descricao: "",
    status: "Aberta",
    valorPotencial: "",
    dataCriacao: "",
    tipoOportunidade: null,
    cliente: null,
  });

  // ------------------- services -------------------
  async function buscarOportunidadePorId(idParam: string) {
    try {
      await buscarOportunidadePorIdService(idParam, setOportunidade, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
      else console.error(error);
    }
  }


  async function buscarClientePorId(idCli: string) {
    try {
      await buscarClientePorIdService(idCli, setCliente, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
      else console.error(error);
    }
  }

  async function buscarTiposOportunidade() {
    try {
      await buscarTiposOportunidadeService(setTiposOportunidade, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
      else {
        console.warn("Falha ao buscar tipos; mantendo fallback.", error);
        setTiposOportunidade(TIPOS_FALLBACK);
      }
    }
  }

  async function buscarClientes() {
    try {
      await buscarClientesService(setClientes, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
      else console.error(error);
    }
  }

  // ------------------- effects -------------------
  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    // carrega listas sempre
    buscarTiposOportunidade();
    buscarClientes();

    // se for edição, busca a oportunidade
    if (id !== undefined) buscarOportunidadePorId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // sempre que a oportunidade for carregada, mapeia cliente e tipo para os estados locais
  useEffect(() => {
    if (!oportunidade) return;

    if (oportunidade.cliente) {
      setCliente(oportunidade.cliente);
    }

    const tipoFromApi: any = (oportunidade as any).tipoOportunidade;
    if (typeof tipoFromApi === "string" && tipoFromApi.trim() !== "") {
      const found = tiposOportunidade.find(
        t => t.descricao.trim().toLowerCase() === tipoFromApi.trim().toLowerCase()
      );
      if (found) setTipoOportunidade(found);
      else setTipoOportunidade({ id: 0, descricao: tipoFromApi });
    } else if (tipoFromApi && typeof tipoFromApi === "object") {
      setTipoOportunidade(tipoFromApi as TipoOportunidade);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oportunidade, tiposOportunidade]);

  // sincroniza oportunidade quando tipo ou cliente mudam
  useEffect(() => {
    setOportunidade(prev => ({
      ...prev,
      tipoOportunidade: tipoOportunidade && tipoOportunidade.id !== 0 ? tipoOportunidade : null,
      cliente: cliente && cliente.id !== 0 ? cliente : null,
    }));
  }, [tipoOportunidade, cliente]);
  

  // ------------------- handlers -------------------
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setOportunidade(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
        tipoOportunidade: tipoOportunidade && tipoOportunidade.id !== 0 ? tipoOportunidade : null,
        cliente: cliente && cliente.id !== 0 ? cliente : null,
      }));
  }

  function retornar() {
    navigate("/oportunidades");
  }

  async function gerarNovaOportunidade(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
  
    
    const payload: any = { ...oportunidade };
  
    // tipoOportunidade -> enviar como string 
    payload.tipoOportunidade = tipoOportunidade?.descricao ?? (typeof payload.tipoOportunidade === "string" ? payload.tipoOportunidade : "");
  
    // valorPotencial -> número sem formatação
    const rawValor = String(payload.valorPotencial ?? "").replace(/\s+/g, "").replace(",", ".");
    payload.valorPotencial = Number(rawValor);
    if (isNaN(payload.valorPotencial)) payload.valorPotencial = 0;
  
    // status -> normalizar para boolean se o backend quiser boolean
    if (typeof payload.status === "string") {
      const s = payload.status.trim().toLowerCase();
      payload.status = (s === "aberta" || s === "true" || s === "1");
    }
  
    // cliente 
    if (cliente && cliente.id && cliente.id !== 0) {
      payload.cliente = { id: cliente.id };
    } else {
      payload.cliente = null;
    }
  
    // dataCriacao -> garantir formato YYYY-MM-DD
    if (!payload.dataCriacao) {
      payload.dataCriacao = new Date().toISOString().slice(0, 10); // hoje YYYY-MM-DD
    }
  
  
    // validação mínima (evita 400 por campos faltando)
    if (!payload.descricao || payload.descricao.trim() === "") {
      ToastAlerta("A descrição é obrigatória", "info");
      setIsLoading(false);
      return;
    }
    if (!payload.tipoOportunidade || payload.tipoOportunidade.trim() === "") {
      ToastAlerta("Selecione um tipo de oportunidade", "info");
      setIsLoading(false);
      return;
    }
    if (!payload.cliente) {
      ToastAlerta("Selecione um cliente", "info");
      setIsLoading(false);
      return;
    }
  
    try {
      if (id !== undefined) {
        const res = await atualizarOportunidadeService(payload, setOportunidade, {
          headers: { Authorization: token }
        });
        console.log("Resposta update:", res);
        ToastAlerta("Oportunidade atualizada com sucesso", "sucesso");
      } else {
        const res = await cadastrarOportunidadeService(payload, setOportunidade, {
          headers: { Authorization: token }
        });
        console.log("Resposta create:", res);
        ToastAlerta("Oportunidade cadastrada com sucesso", "sucesso");
      }
      retornar();
    } catch (error: any) {
      console.error("Erro axios (detalhe):", error);
      if (error.response) {
        // Mostra detalhes que a API pode ter retornado
        console.error("Status:", error.response.status);
        console.error("Response data:", error.response.data);
        ToastAlerta(`Erro ${error.response.status}: ${JSON.stringify(error.response.data)}`, "erro");
      } else {
        ToastAlerta("Erro ao salvar a Oportunidade (sem resposta do servidor)", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }  

  // botão habilitado apenas quando tipo e cliente selecionados
  const carregandoDados = tipoOportunidade.descricao === "" || cliente.nome === "";

  // ------------------- render -------------------
  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Oportunidade" : "Cadastrar Oportunidade"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaOportunidade}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição da Oportunidade</label>
          <input
            type="text"
            placeholder="Descrição"
            name="descricao"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={oportunidade.descricao}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Status</label>
          <div className="mt-1">
            <AtualizacaoStatusSelect
              oportunidadeId={oportunidade.id || 0}
              currentStatus={(oportunidade.status as any) || "Aberta"}
              onUpdated={newStatus => setOportunidade(prev => ({ ...prev, status: newStatus }))}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="valorPotencial">Valor Potencial</label>
          <input
            type="text"
            placeholder="Valor Potencial"
            name="valorPotencial"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={oportunidade.valorPotencial}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Tipo de Oportunidade</p>
          <select
            name="tipoOportunidade"
            id="tipoOportunidade"
            className="border p-2 border-slate-800 rounded"
            value={tipoOportunidade.id || ""}
            onChange={e => {
              const idSel = Number(e.currentTarget.value);
              const found = tiposOportunidade.find(t => t.id === idSel);
              if (found) setTipoOportunidade(found);
              else setTipoOportunidade({ id: 0, descricao: "" });
            }}
          >
            <option value="" disabled>
              Selecione um Tipo
            </option>
            {tiposOportunidade.map(tipo => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.descricao}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p>Cliente</p>
          <select
            name="cliente"
            id="cliente"
            className="border p-2 border-slate-800 rounded"
            value={cliente.id || ""}
            onChange={e => buscarClientePorId(e.currentTarget.value)}
          >
            <option value="" disabled>
              Selecione um Cliente
            </option>
            {clientes.map(cli => (
              <option key={cli.id} value={cli.id}>
                {cli.nome}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
          disabled={carregandoDados || isLoading}
        >
          {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>}
        </button>
      </form>
    </div>
  );
}
