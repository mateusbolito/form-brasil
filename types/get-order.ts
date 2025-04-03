export interface IOrderData {
  items: Item[]
  _messages: Message[]
}

export interface Item {
  ZQ_FILIAL: string
  ZQ_ORDEM: string
  ZQ_ATRASO: string
  ZQ_DTPROD: string
  ZQ_EMBLAG: string
  ZQ_TIPOPRO: string
  ZQ_TIPOACA: string
  ZQ_OP: string
  ZQ_PEDIDO: string
  ZQ_CLIENTE: string
  ZQ_QTDE: string
  ZQ_CODFE: string
  ZQ_CODDES: string
  ZQ_LOCENT: string
  ZQ_DTENTR: string
  ZQ_CORA: string
  ZQ_CORB: string
  ZQ_CORC: string
  ZQ_ESPESA: string
  ZQ_ESPESB: string
  ZQ_ESPESC: string
  ZQ_PRODUCA: string
  ZQ_QTDEPRO: string
  ZQ_PINTURA: string
  ZQ_QTDPINT: string
  ZQ_EXPEDIC: string
  ZQ_QTDEXPE: string
  ZQ_NF: string
  ZQ_QTDNF: string
  ZQ_OBS: string
  ZQ_TIPO2: string
  ZQ_STATUS: string
  USUARIO: Usuario[]
  FORMULARIO: Formulario[]
}

export interface Usuario {
  ZO_CODUSER: string
  ZO_USER: string
  ZO_EMAIL: string
  ZO_CODFORM: string
  ZO_DESCRI: string
  ZO_ALTERA: string
  ZO_VISUALI: string
  ZO_INCLUI: string
  ZO_EXCLUI: string
}

export interface Formulario {
  ZP_CODFORM: string
  ZP_PEDIDO: string
  ZP_OP: string
  ZP_DATA: string
  ZP_NOTA: string
  ZP_QTDECAR: string
  ZP_PLACA: string
  ZP_TRANSP: string
  ZP_LOCIMP: string
  ZP_OBS: string
  ZP_CODUSER: string
  ZP_STATUS: string
  ZP_REVISAO: string
  LOTES: string[]
}

export interface Message {
  code: string
  message: string
  detailedMessage: string
}
