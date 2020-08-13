import { clusterApiUrl } from "@solana/web3.js"

export const ENVIRONMENT_TYPE_POPUP = "popup"
export const ENVIRONMENT_TYPE_BACKGROUND = "background"
export const ENVIRONMENT_TYPE_NOTIFICATION = "notification" // will be supported soon
export const INPAGE_MESSAGE_STREAM = "sol.inpage"
export const CONTENT_MESSAGE_STREAM = "sol.cs"
export const MUX_PROVIDER_SUBSTREAM = "sol.provider"
export const MUX_CONTROLLER_SUBSTREAM = "sol.controller"
export const CHROME_CONN_CS = "sol.cs"

export const DEFAULT_NETWORK: Network = { title: "Devnet", endpoint: clusterApiUrl("devnet") }
export const AVAILABLE_NETWORKS: Network[] = [
  { title: "Mainnet Beta", endpoint: clusterApiUrl("mainnet-beta") },
  { title: "Devnet", endpoint: clusterApiUrl("devnet") },
  { title: "Testnet", endpoint: clusterApiUrl("testnet") },
]
export type RequestAccountsResp = {
  accounts: string[]
}

export type SignTransactionResp = {
  signature: string
}

export type Network = {
  title: string
  endpoint: string
}

export type VersionedData = {
  version: string
  data: StoredData
}

export type StoredData = {
  secretBox: SecretBox | undefined
  accountCount: number
  selectedNetwork: Network
  selectedAccount: string
  authorizedOrigins: string[]
}

export type PopupState = {
  walletState: "locked" | "unlocked" | "uninitialized"
  accounts: string[]
  selectedAccount: string
  selectedNetwork: Network
  availableNetworks: Network[]
  pendingTransactions: PendingSignTransaction[]
  pendingRequestAccounts: PendingRequestAccounts[]
  authorizedOrigins: string[]
}

export type WallActions =
  | "wallet_requestPermissions"
  | "wallet_signTransaction"
  | "wallet_requestAccounts"
  | "wallet_getCluster"
  | "wallet_getState"

export type PopupActions =
  | "popup_getState"
  | "popup_createWallet"
  | "popup_unlockWallet"
  | "popup_authoriseTransaction"
  | "popup_declineTransaction"
  | "popup_authoriseRequestAccounts"
  | "popup_declineRequestAccounts"
  | "popup_addWalletAccount"
  | "popup_sendToken"
  | "popup_changeNetwork"
  | "popup_changeAccount"

export type PendingSignTransaction = {
  message: string
  details?: TransactionDetails
  tabId: string
}

export type TransactionDetails = TransactionDetailsSOLTransfer | TransactionDetailsSPLTransfer

export type TransactionDetailsSOLTransfer = {
  type: "sol_transfer"
  params: {
    from: string
    to: string
    amount: number
  }
}

export type TransactionDetailsSPLTransfer = {
  type: "spl_transfer"
  params: {
    from: string
    to: string
    owner: string
    amount: number
    mint: Mint
  }
}

export type Mint = {
  publicKey?: string
  name?: string
  symbol?: string
  decimals?: number
}

export type PendingRequestAccounts = {
  tabId: string
  origin: string
}

export type SecretBox = {
  nonce: string
  kdf: string // pbkdf2
  encryptedBox: string
  salt: string
  iterations: number
  digest: string //sha256
}

export type State = {
  locked: boolean
}

export type Notification =
  | NotificationNetworkChanged
  | NotificationAccountsChanged
  | NotificationPopupStateChanged
  | NotificationStateChanged

export type NotificationNetworkChanged = {
  type: "clusterChanged"
  data: Network
}

export type NotificationAccountsChanged = {
  type: "accountsChanged"
  data: string[]
}

export type NotificationPopupStateChanged = {
  type: "popupStateChanged"
  data: PopupState
}

export type NotificationStateChanged = {
  type: "stateChanged"
  data: State
}
