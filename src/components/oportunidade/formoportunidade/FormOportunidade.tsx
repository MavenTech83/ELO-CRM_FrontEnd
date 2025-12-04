import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Oportunidade from "../../../models/Oportunidade";
import type Cliente from "../../../models/Cliente";
import type TipoOportunidade from "../../../models/TipoOportunidade";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import {
    buscarOportunidadePorId as buscarOportunidadePorIdService,
    cadastrarOportunidade as cadastrarOportunidadeService,
    atualizarOportunidade as atualizarOportunidadeService
} from "../../../services/OportunidadeService";
import {
    buscarTipoOportunidadePorId as buscarTipoOportunidadePorIdService,
    buscarTiposOportunidade as buscarTiposOportunidadeService
} from "../../../services/TipoOportunidadeService";
import {
    buscarClientePorId as buscarClientePorIdService,
    buscarClientes as buscarClientesService
} from "../../../services/ClienteService";
import AtualizacaoStatusSelect from "../../statusoportunidade/StatusOportunidade";

function FormOportunidade() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [tiposOportunidade, setTiposOportunidade] = useState<TipoOportunidade[]>([])

    const [clientes, setClientes] = useState<Cliente[]>([])

    const [tipoOportunidade, setTipoOportunidade] = useState<TipoOportunidade>({
        id: 0,
        descricao: '',
    })

    const [cliente, setCliente] = useState<Cliente>({
        id: 0,
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        oportunidade: null,
    })

    const [oportunidade, setOportunidade] = useState<Oportunidade>({
        id: 0,
        descricao: '',
        status: '',
        valorPotencial: '',
        dataCriacao: '',
        tipoOportunidade: null,
        cliente: null,
    })

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarOportunidadePorId(id: string) {
        try {
            await buscarOportunidadePorIdService(id, setOportunidade, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTipoOportunidadePorId(id: string) {
        try {
            await buscarTipoOportunidadePorIdService(id, setTipoOportunidade, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarClientePorId(id: string) {
        try {
            await buscarClientePorIdService(id, setCliente, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTiposOportunidade() {
        try {
            await buscarTiposOportunidadeService(setTiposOportunidade, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarClientes() {
        try {
            await buscarClientesService(setClientes, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info');
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarTiposOportunidade()
        buscarClientes()

        if (id !== undefined) {
            buscarOportunidadePorId(id)
        }
    }, [id])

    useEffect(() => {
        setOportunidade({
            ...oportunidade,
            tipoOportunidade: tipoOportunidade,
            cliente: cliente,
        })
    }, [tipoOportunidade, cliente])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setOportunidade({
            ...oportunidade,
            [e.target.name]: e.target.value,
            tipoOportunidade: tipoOportunidade,
            cliente: cliente,
        });
    }

    function retornar() {
        navigate('/oportunidades');
    }

    async function gerarNovaOportunidade(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizarOportunidadeService(oportunidade, setOportunidade, {
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta('Oportunidade atualizada com sucesso', 'sucesso')

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar a Oportunidade', 'erro')
                }
            }

        } else {
            try {
                await cadastrarOportunidadeService(oportunidade, setOportunidade, {
                    headers: {
                        Authorization: token,
                    },
                })

                ToastAlerta('Oportunidade cadastrada com sucesso', 'sucesso');

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar a Oportunidade', 'erro');
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoDados = tipoOportunidade.descricao === '' || cliente.nome === '';


    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Oportunidade' : 'Cadastrar Oportunidade'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4"
                onSubmit={gerarNovaOportunidade}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição da Oportunidade</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        name="descricao"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={oportunidade.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label>Status</label>
                    <div className="mt-1">
                        <AtualizacaoStatusSelect
                            oportunidadeId={oportunidade.id || 0}
                            currentStatus={(oportunidade.status as any) || "Aberta"}
                            onUpdated={(newStatus) => {
                                setOportunidade(prev => ({ ...prev, status: newStatus }));
                            }}
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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p>Tipo de Oportunidade</p>
                    <select name="tipoOportunidade" id="tipoOportunidade"
                        className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarTipoOportunidadePorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Tipo</option>

                        {tiposOportunidade.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>{tipo.descricao}</option>
                        ))}

                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <p>Cliente</p>
                    <select name="cliente" id="cliente"
                        className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarClientePorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Cliente</option>

                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                        ))}

                    </select>
                </div>

                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoDados}
                >
                    {isLoading ?
                        <ClipLoader
                            color="#ffffff"
                            size={24}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }

                </button>
            </form>
        </div>
    );
}

export default FormOportunidade;