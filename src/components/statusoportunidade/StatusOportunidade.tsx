import { useState } from "react";

/* Tipos possíveis de status */ 
type StatusKey = "Aberta" | "Fechada" | "Perdida";

/* Props recebidas do componente pai */
type Props = {
  oportunidadeId: number; // id da oportunidade
  currentStatus?: StatusKey; // status inicial
  onUpdated?: (newStatus: StatusKey) => void; // callback para o pai
  readOnly?: boolean; // bloqueia alterações
};

/* Status válidos para validar localStorage */
const VALID_STATUSES = ["Aberta", "Fechada", "Perdida"] as const;

export default function AtualizacaoStatusSelect({
  oportunidadeId,
  currentStatus = "Aberta", // valor padrão
  onUpdated = () => {}, // função padrão vazia
  readOnly = false, // padrão editável
}: Props) {

  // Status atual do select (carrega do localStorage ou usa o props)
  const [status, setStatus] = useState<StatusKey>(() => {
    const saved = localStorage.getItem(`status-op-${oportunidadeId}`); // busca salvo
    if (saved && VALID_STATUSES.includes(saved as StatusKey)) return saved as StatusKey; // valida
    return currentStatus; // senão usa o props
  });

  const [pendingStatus, setPendingStatus] = useState<StatusKey | null>(null); // status antes de confirmar
  const [showConfirm, setShowConfirm] = useState(false); // controla modal
  const [loading, setLoading] = useState(false); // mostra "salvando..."
  const [lostReason, setLostReason] = useState(""); // campo motivo da perda
  const [error, setError] = useState<string | null>(null); // erro simples

  // Opções do select
  const STATUS_OPTIONS = [
    { key: "Aberta", label: "Aberta" },
    { key: "Fechada", label: "Fechada" },
    { key: "Perdida", label: "Perdida" },
  ];

  // Quando troca o status no select
  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (readOnly) return; // bloqueado
    const selected = e.target.value as StatusKey; // pega valor
    if (selected === status) return; // se já está igual, ignora

    setPendingStatus(selected); // guarda o novo temporariamente
    setShowConfirm(true); // abre modal
  }

  // Confirma mudança de status
  async function confirmChange() {
    if (!pendingStatus) return; // segurança

    // valida motivo quando for "Perdida"
    if (pendingStatus === "Perdida" && lostReason.trim().length < 3) {
      setError("Por favor, informe a razão da perda."); // erro
      return;
    }

    setLoading(true); // inicia loading
    setError(null); // limpa erro anterior

    try {
      await new Promise((r) => setTimeout(r, 600)); // simula request

      setStatus(pendingStatus); // aplica novo status
      localStorage.setItem(`status-op-${oportunidadeId}`, pendingStatus); // salva
      onUpdated(pendingStatus); // avisa o pai

      // limpa controles do modal
      setLostReason("");
      setPendingStatus(null);
      setShowConfirm(false);
    } catch {
      setError("Erro ao atualizar status."); // erro genérico
    } finally {
      setLoading(false); // finaliza loading
    }
  }

  // Cancela troca
  function cancelChange() {
    setShowConfirm(false); // fecha modal
    setPendingStatus(null); // limpa valor
    setLostReason(""); // limpa motivo
    setError(null); // limpa erro
  }

  return (
    <div className="flex flex-col gap-2 w-full ">

      {/* Select principal */}
      <select 
  value={status}
  onChange={handleSelectChange}
  disabled={readOnly || loading}
  className="border p-2 border-white rounded bg-black/30 text-white"
>
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* mensagens */}
      {loading && <p className="text-sm text-gray-500 mt-2">Salvando...</p>}
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      {/* Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Fundo escuro */}
          <div
            className="absolute inset-0 bg-slate/500"
            onClick={cancelChange} // fecha ao clicar fora
          />

          {/* Caixa do modal */}
          <div className="relative bg-white text-black w-full max-w-md p-6 rounded-lg shadow-lg">
            
            <h3 className="text-lg font-semibold mb-2">Confirmar alteração</h3>

            <p className="text-sm mb-4">
              Alterar para <strong>{pendingStatus}</strong>?
            </p>

            {/* Campo motivo da perda */}
            {pendingStatus === "Perdida" && (
              <div className="mb-3">
                <label className="text-sm font-medium">Razão da perda</label>
                <textarea
                  value={lostReason} // texto digitado
                  onChange={(e) => setLostReason(e.target.value)} // atualiza
                  className="w-full border rounded-md p-2 text-sm mt-1"
                  rows={4}
                />
              </div>
            )}

            {/* Botões */} 
            <div className="flex justify-end gap-2"> 
              <button
                onClick={cancelChange} // cancela troca
                className="px-4 py-2 rounded-md border bg-red-500/20 hover:bg-red-500"
              >
                Cancelar
              </button>
              <button
                onClick={confirmChange} // confirma troca
                className="px-4 py-2 rounded-md border bg-cyan-500/20 hover:bg-cyan-500"
                disabled={loading} // desabilita durante loading
              >
                Confirmar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
