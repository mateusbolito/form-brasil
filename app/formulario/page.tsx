"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IOrderData } from "@/types/get-order";
import {
  Barcode,
  Check,
  Save,
  X,
  ArrowLeftCircle,
  Trash,
  Pencil,
  Keyboard,
  Lock,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { postFormularioCarregamento } from "@/services/sendFormQuery";
import { toast } from "sonner";
import { FaPrint } from "react-icons/fa";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export default function FormularioCarregamento() {
  const [loteInput, setLoteInput] = useState("");
  const [lotes, setLotes] = useState<{ seq: number; lote: string }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<IOrderData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalEncerrar, setOpenModalEncerrar] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [loteExpandidoIndex, setLoteExpandidoIndex] = useState<number | null>(
    null
  );
  const [dadosFaturamento, setDadosFaturamento] = useState({
    quantidade: "",
    placa: "",
    transportadora: "",
    localImpressao: "",
    observacao: "",
  });
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("formularioData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (formData?.items[0]) {
      const item = formData.items[0];
      const formulario = item.FORMULARIO?.[0];

      if (formulario) {
        setDadosFaturamento({
          quantidade: formulario.ZP_QTDECAR || "",
          placa: formulario.ZP_PLACA || "",
          transportadora: formulario.ZP_TRANSP || "",
          localImpressao: formulario.ZP_LOCIMP || "",
          observacao: formulario.ZP_OBS || "",
        });
      }

      if (formulario?.LOTES?.length) {
        const lotesConvertidos = formulario.LOTES.map(
          (lote: string, index: number) => ({
            seq: index + 1,
            lote,
          })
        );
        setLotes(lotesConvertidos);
      }
    }
  }, [formData]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    setIsWideScreen(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsWideScreen(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleSaveLote = () => {
    if (!loteInput.trim()) return;

    if (editingIndex !== null) {
      const updatedLotes = [...lotes];
      updatedLotes[editingIndex].lote = loteInput;
      setLotes(updatedLotes);
      setLoteInput("");
      setEditingIndex(null);
      setIsModalOpen(false);
    } else {
      setLotes((prev) => {
        const novosLotes = [...prev, { seq: prev.length + 1, lote: loteInput }];
        setTimeout(() => {
          scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
        return novosLotes;
      });
      setLoteInput("");
      setModalConfirmation(true);
    }
  };

  const handleEditLote = (index: number) => {
    setLoteInput(lotes[index].lote);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteLote = (index: number) => {
    const updatedLotes = lotes
      .filter((_, i) => i !== index)
      .map((lote, i) => ({
        ...lote,
        seq: i + 1,
      }));
    setLotes(updatedLotes);
  };

  const handleBarcodeDetected = (code: string) => {
    setLoteInput(code);
    setIsScannerOpen(false);
    setIsModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDadosFaturamento((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (status: "E" | "A") => {
    try {
      const item = formData?.items?.[0];
      if (!item) {
        toast.error("Dados do formulário não encontrados.");
        return;
      }

      const dadosFormulario = {
        ZP_FILIAL: "02",
        ZP_CODFORM: "FORMCARREGA0001",
        ZP_CODUSER: "000000",
        ZP_PEDIDO: item.ZQ_PEDIDO || "",
        ZP_OP: item.ZQ_OP || "",
        ZP_DATA: item.ZQ_DTENTR || new Date().toISOString().split("T")[0],
        ZP_NOTA: item.ZQ_NF || "",
        ZP_QTDECAR: parseInt(dadosFaturamento.quantidade) || 0,
        ZP_PLACA: dadosFaturamento.placa || "",
        ZP_TRANSP: dadosFaturamento.transportadora || "",
        ZP_LOCIMP: dadosFaturamento.localImpressao || "",
        ZP_OBS: dadosFaturamento.observacao || "",
        ZP_STATUS: status, // <-- status dinâmico
        ZP_LOTE: lotes.map((l) => l.lote),
      };

      await postFormularioCarregamento(dadosFormulario);
      toast.success(
        `Formulário ${status === "A" ? "encerrado" : "salvo"} com sucesso!`
      );
    } catch {
      toast.error("Erro ao enviar formulário");
    }
  };

  const isEncerrado =
    formData?.items?.[0]?.FORMULARIO?.[0]?.ZP_STATUS === "Encerrado";

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  function formatarLote(lote: string) {
    if (!lote) {
      return "";
    }
    if (isWideScreen) {
      return lote;
    }

    if (lote.length > 8) {
      return lote.substring(0, 8) + "...";
    }

    return lote;
  }

  const handlePrintPDF = async () => {
    if (!formData) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.top = "-10000px";
    iframe.style.left = "-10000px";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.opacity = "0";

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=794px" />
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 10px;
          padding: 24px;
          margin: 0;
          width: 794px; /* A4 width at 96dpi */
          height: 100%;
          background: white;
        }
        h2 {
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 16px;
        }
        h3 {
          text-align: center;
          font-weight: bold;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          padding: 4px 0;
          margin: 20px 0 8px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          margin-bottom: 10px;
        }
        .section {
          margin-top: 16px;
        }
        table {
          width: 100%;
          font-size: 9px;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 4px;
          text-align: left;
        }
        .text-center {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div style="display: flex;">
        <img src="/logo-raft.png" style="width: 10rem; height: 4rem;" />
        <h2 style="margin: 0 auto;">
          Carregamento
        </h2>
      </div>
      <div class="grid">
        <div><strong>OP:</strong> ${formData.items[0]?.ZQ_OP}</div>
        <div><strong>Nota Fiscal:</strong> ${formData.items[0]?.ZQ_NF}</div>
        <div><strong>Código FE:</strong> ${formData.items[0]?.ZQ_CODFE}</div>
        <div><strong>Descrição:</strong> ${formData.items[0]?.ZQ_CODDES}</div>
        <div><strong>Cliente:</strong> ${formData.items[0]?.ZQ_CLIENTE}</div>
        <div><strong>Pedido:</strong> ${formData.items[0]?.ZQ_PEDIDO}</div>
        <div><strong>Quantidade:</strong> ${formData.items[0]?.ZQ_QTDE}</div>
        <div><strong>Entrega:</strong> ${formData.items[0]?.ZQ_DTENTR}</div>
        <div><strong>Local Entrega:</strong> ${
          formData.items[0]?.ZQ_LOCENT
        }</div>
      </div>

      <h3>DADOS PARA FATURAMENTO</h3>
      <div class="grid">
        <div><strong>Qtd:</strong> ${dadosFaturamento.quantidade}</div>
        <div><strong>Placa:</strong> ${dadosFaturamento.placa}</div>
        <div><strong>Transportadora:</strong> ${
          dadosFaturamento.transportadora
        }</div>
        <div><strong>Local Impressão:</strong> ${
          dadosFaturamento.localImpressao
        }</div>
      </div>
      <div style="margin-top: 4px;"><strong>Obs. Faturamento:</strong> ${
        dadosFaturamento.observacao
      }</div>

      <h3>CARREGAMENTO</h3>
      <table>
        <thead>
          <tr>
            <th class="text-center">SEQ</th>
            <th class="text-center">LOTE</th>
          </tr>
        </thead>
        <tbody>
          ${lotes
            .map(
              (item) => `
            <tr>
              <td class="text-center">${item.seq}</td>
              <td>${item.lote}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </body>
  </html>
`);

    doc.close();

    // Espera o DOM do iframe renderizar
    await new Promise((res) => setTimeout(res, 300));

    const canvas = await html2canvas(iframe.contentDocument!.body, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("formulario-carregamento.pdf");

    document.body.removeChild(iframe);
  };

  return (
    <div className="container mx-auto max-w-4xl p-6 min-h-screen pb-28">
      <Dialog open={modalEncerrar} onOpenChange={setOpenModalEncerrar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex gap-1">
              Encerrar formulário
            </DialogTitle>
          </DialogHeader>
          <p className="text-base">
            Deseja encerrar o formulário de carregamento? Esta ação não pode ser
            desfeita!
          </p>
          <div className="flex justify-end mt-4 gap-2">
            <Button
              onClick={() => {
                setOpenModalEncerrar(false);
              }}
              className="bg-gray-400 text-white text-base cursor-pointer"
            >
              <X size={18} />
              Cancelar
            </Button>
            <Button
              onClick={() => {
                handleSubmit("E");
              }}
              className="bg-blue-500 text-white ml-2 cursor-pointer hover:opacity-40 text-base"
            >
              <Check size={18} />
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={modalConfirmation} onOpenChange={setModalConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex gap-1">
              <Keyboard size={18} />
              Novo lote
            </DialogTitle>
          </DialogHeader>
          <p className="text-base">Deseja inserir um novo lote?</p>
          <div className="flex justify-end mt-4 gap-2">
            <Button
              onClick={() => {
                setModalConfirmation(false);
                setLoteInput("");
              }}
              className="rounded-lg bg-gray-400 text-white text-base cursor-pointer"
            >
              <X size={18} />
              Fechar
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setModalConfirmation(false);
              }}
              size={"large"}
              className="rounded-lg flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19] bg-white transition-all hover:bg-[#1D4D19] hover:text-white"
            >
              <Keyboard size={18} />
              DIGITAR
            </Button>
            <Button
              size={"large"}
              onClick={() => {
                setIsScannerOpen(true);
                setModalConfirmation(false);
              }}
              className="flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19] rounded-lg bg-white transition-all hover:bg-[#1D4D19] hover:text-white"
            >
              <Barcode size={18} /> CARREGAR
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: isMobile ? "0px" : "24px",
          borderRadius: "8px",
          boxShadow: isMobile ? "none" : "0 0 10px rgba(0,0,0,0.1)",
          width: "100%",
        }}
      >
        <h2 className="flex text-3xl font-bold mb-4 mt-7 gap-4">
          <button
            onClick={() => router.push("/busca")}
            className="cursor-pointer "
          >
            <ArrowLeftCircle />
          </button>
          Formulário de Carregamento
        </h2>
        <span className="border-t-2 flex border-t-gray-100"></span>

        <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
          <div className="w-full md:w-1/2 cursor-not-allowed">
            <label className="block text-sm font-medium text-left">
              Ordem de Produção
            </label>
            <Input
              type="text"
              className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              placeholder="Digite ou escaneie"
              value={formData?.items[0]?.ZQ_OP}
              disabled
            />
          </div>
          <div className="w-full md:w-1/2 cursor-not-allowed">
            <label className="block text-sm font-medium text-left">
              Pedido de Venda
            </label>
            <Input
              type="text"
              className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              placeholder="Digite ou escaneie"
              value={formData?.items[0]?.ZQ_PEDIDO}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
          <div className="w-full md:w-1/2 cursor-not-allowed">
            <label className="block text-sm font-medium text-left">
              Código FE
            </label>
            <Input
              type="text"
              className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              placeholder="Digite o código FE"
              value={formData?.items[0]?.ZQ_CODFE}
              disabled
            />
          </div>
          <div className="w-full md:w-1/2 cursor-not-allowed">
            <label className="block text-sm font-medium text-left">
              Descrição
            </label>
            <Input
              type="text"
              className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              placeholder="Digite a descrição"
              value={formData?.items[0]?.ZQ_CODDES}
              disabled
            />
          </div>
        </div>

        <div className="w-full cursor-not-allowed">
          <label className="block text-sm font-medium text-left">Cliente</label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite o nome do cliente"
            value={formData?.items[0]?.ZQ_CLIENTE}
            disabled
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
          <div className="w-full md:w-1/2 cursor-not-allowed">
            <label className="block text-sm font-medium text-left">
              Nota Fiscal
            </label>
            <Input
              type="text"
              className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              placeholder="Digite o número da nota fiscal"
              value={formData?.items[0]?.ZQ_NF}
              disabled
            />
          </div>
          <div className="w-full md:w-1/2 cursor-not-allowed">
            <label className="block text-sm font-medium text-left">
              Qtd. Pedido de Venda
            </label>
            <Input
              type="text"
              className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              placeholder="Quantidade de pedido"
              value={formData?.items[0]?.ZQ_QTDE}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
          <div className="w-full md:w-1/2 cursor-not-allowed">
            <label className="block text-sm font-medium text-left">
              Data de Entrega
            </label>
            <Input
              type="date"
              className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              placeholder="Digite o código FE"
              value={formData?.items[0]?.ZQ_DTENTR}
              disabled
            />
          </div>
          <div className="w-full md:w-1/2 cursor-not-allowed">
            <label className="block text-sm font-medium text-left">
              Local Entrega
            </label>
            <Input
              type="text"
              className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              placeholder="Local de entrega"
              value={formData?.items[0]?.ZQ_LOCENT}
              disabled
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-left">
            Observações
          </label>
          <textarea
            className="w-full border h-[80px]  p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200 cursor-not-allowed disabled:bg-[#f8f9fa]  disabled:opacity-50"
            placeholder="Observações adicionais"
            value={formData?.items[0]?.ZQ_OBS}
            disabled
            rows={4}
          />
        </div>

        <h2 className="flex text-3xl font-bold mb-4 mt-7">
          Dados Para Faturamento
        </h2>
        <span className="border-t-2 flex border-t-gray-100"></span>
        <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-left">
              Quantidade
            </label>
            <Input
              className="mt-[15px]"
              name="quantidade"
              type="number"
              onChange={handleInputChange}
              value={dadosFaturamento.quantidade}
              disabled={isEncerrado}
            />
          </div>

          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-left">Placa</label>
            <Input
              className="mt-[15px]"
              name="placa"
              type="text"
              onChange={handleInputChange}
              value={dadosFaturamento.placa}
              disabled={isEncerrado}
            />
          </div>

          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-left">
              Transportadora
            </label>
            <Input
              className="mt-[15px]"
              name="transportadora"
              type="text"
              onChange={handleInputChange}
              value={dadosFaturamento.transportadora}
              disabled={isEncerrado}
            />
          </div>

          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-left">
              Local de Impressão NFe
            </label>
            <Input
              className="mt-[15px]"
              name="localImpressao"
              type="text"
              onChange={handleInputChange}
              value={dadosFaturamento.localImpressao}
              disabled={isEncerrado}
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-left">
            Observação de Faturamento
          </label>
          <textarea
            name="observacao"
            className="w-full mt-[15px] border h-[80px] p-2 rounded border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-200 disabled:cursor-not-allowed disabled:bg-[#f8f9fa] disabled:opacity-50"
            placeholder="Observações sobre o faturamento"
            rows={4}
            onChange={handleInputChange}
            value={dadosFaturamento.observacao}
            disabled={isEncerrado}
          />
        </div>

        <h2 className="flex text-3xl font-bold mb-4 mt-7">Carregamento </h2>
        <span className="border-t-2 flex border-t-gray-100"></span>
        <div className="w-full mt-4">
          <div className="flex gap-2">
            {!isEncerrado && (
              <Button
                size={"large"}
                onClick={() => setIsScannerOpen(true)}
                className="flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19] rounded-lg bg-white transition-all hover:bg-[#1D4D19] hover:text-white"
              >
                <Barcode size={18} /> CARREGAR
              </Button>
            )}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                {!isEncerrado && (
                  <Button
                    size={"large"}
                    className="rounded-lg flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19] bg-white transition-all hover:bg-[#1D4D19] hover:text-white"
                  >
                    <Keyboard size={18} />
                    DIGITAR
                  </Button>
                )}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex gap-1">
                    <Keyboard size={18} />
                    {editingIndex !== null ? "Editar" : "Digitar"} Lote
                  </DialogTitle>
                </DialogHeader>
                <p className="text-base">Número do Lote</p>
                <Input
                  type="text"
                  placeholder="Digite o lote..."
                  value={loteInput}
                  onChange={(e) => setLoteInput(e.target.value)}
                  className="w-full border p-2 rounded border-gray-200"
                  autoFocus
                />
                <p className="text-xs">
                  Digite o número do lote no formato indicado
                </p>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={() => {
                      setIsModalOpen(false);
                      setLoteInput("");
                    }}
                    className="bg-gray-400 text-white text-base cursor-pointer"
                  >
                    <X size={18} />
                    Cancelar
                  </Button>
                  <DialogClose>
                    <Button
                      onClick={handleSaveLote}
                      className="bg-blue-500 text-white ml-2 cursor-pointer hover:opacity-40 text-base"
                    >
                      <Check size={18} />
                      Confirmar
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-auto mt-4"
            style={{ maxHeight: "400px" }}
          >
            <table className="min-w-full  border-gray-200">
              <thead className="sticky bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-2 py-1 text-left w-16">
                    SEQ
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-left min-w-[100px]">
                    LOTE
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-left w-24">
                    AÇÃO
                  </th>
                </tr>
              </thead>
              <tbody>
                {lotes.map((item, index) => (
                  <tr key={index} className="border-gray-300">
                    <td className="border-r border-l border-b border-gray-300 px-2 py-1">
                      {item.seq}
                    </td>
                    <td
                      className="border-r border-b border-gray-300 px-2 py-1 whitespace-nowrap overflow-x-auto max-w-[240px]"
                      onClick={() =>
                        setLoteExpandidoIndex(
                          loteExpandidoIndex === index ? null : index
                        )
                      }
                    >
                      <div className="max-w-[85px] sm:max-w-none overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                        {loteExpandidoIndex === index
                          ? item.lote
                          : item.lote.length > 8
                          ? formatarLote(item.lote)
                          : item.lote}
                      </div>
                    </td>

                    <td className="border-b border-r border-gray-300 px-2 py-1 flex gap-2">
                      <Button
                        onClick={() => handleEditLote(index)}
                        className="text-yellow-400 hover:bg-[#d4decf] hover:text-yellow-500 cursor-pointer"
                        disabled={isEncerrado}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        onClick={() => handleDeleteLote(index)}
                        className="text-red-600 hover:bg-[#d4decf] cursor-pointer"
                        disabled={isEncerrado}
                      >
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {!isEncerrado && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <div className="flex gap-2">
                <Button
                  size={"large"}
                  onClick={() => handleSubmit("A")}
                  className="flex items-center gap-2 cursor-pointer px-6 py-3 font-bold text-white rounded-lg bg-blue-500 transition-all hover:opacity-75 hover:text-white"
                >
                  <Save size={18} /> SALVAR
                </Button>
                <Button
                  onClick={() => setOpenModalEncerrar(true)}
                  size={"large"}
                  className="flex items-center gap-2 cursor-pointer px-6 py-3 font-bold text-white rounded-lg bg-orange-500 transition-all hover:bg-[#1D4D19] hover:text-white print:hidden"
                >
                  <Lock size={18} /> ENCERRAR
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center mt-3 print:hidden">
        <Button
          onClick={handlePrintPDF}
          className="bg-slate-400 text-white rounded-lg cursor-pointer font-bold uppercase text-[16px] mt-8 hover:opacity-75"
        >
          <FaPrint />
          Imprimir PDF
        </Button>
      </div>

      {isScannerOpen && (
        <BarcodeScanner
          onDetected={handleBarcodeDetected}
          onClose={() => setIsScannerOpen(false)}
        />
      )}
    </div>
  );
}
