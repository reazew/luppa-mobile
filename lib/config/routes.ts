import {
  BellActiveIcon,
  HouseActiveIcon,
  MegaphoneActiveIcon,
  SearchActiveIcon,
  StoreActiveIcon,
  UserActiveIcon,
  UsersRoundActiveIcon,
  WalletActiveIcon,
} from 'assets/icons'
import {
  Bell,
  House,
  Megaphone,
  Search,
  Store,
  User,
  UsersRound,
  Wallet,
  type LucideIcon,
} from 'lucide-react-native'
import { FC } from 'react'
import type { SvgProps } from 'react-native-svg'

interface Route {
  path: string
  name: string
  title: string
  icon: LucideIcon
  activeIcon: FC<SvgProps>
}

export const CLIENT_TABS: Route[] = [
  {
    name: 'meu-status',
    title: 'Meu Status',
    icon: User,
    activeIcon: UserActiveIcon,
    path: '(cliente)/meu-status',
  },
  {
    name: 'pagamento',
    title: 'Pagamento',
    icon: Wallet,
    activeIcon: WalletActiveIcon,
    path: '(cliente)/pagamento',
  },
  {
    name: 'inicio',
    title: 'Início',
    icon: House,
    activeIcon: HouseActiveIcon,
    path: '(cliente)/inicio',
  },
  {
    name: 'empresas',
    title: 'Empresas',
    icon: Search,
    activeIcon: SearchActiveIcon,
    path: '(cliente)/empresas',
  },
  {
    name: 'notificacoes',
    title: 'Notificações',
    icon: Bell,
    activeIcon: BellActiveIcon,
    path: '(cliente)/notificacoes',
  },
]

export const BUSINESS_TABS: Route[] = [
  {
    name: 'campanhas',
    title: 'Campanhas',
    icon: Megaphone,
    activeIcon: MegaphoneActiveIcon,
    path: '(empresa)/campanhas',
  },
  {
    name: 'pagamento',
    title: 'Pagamento',
    icon: Wallet,
    activeIcon: WalletActiveIcon,
    path: '(empresa)/pagamento',
  },
  {
    name: 'inicio',
    title: 'Início',
    icon: House,
    activeIcon: HouseActiveIcon,
    path: '(empresa)/inicio',
  },
  {
    name: 'clientes',
    title: 'Clientes',
    icon: UsersRound,
    activeIcon: UsersRoundActiveIcon,
    path: '(empresa)/clientes',
  },
  {
    name: 'empresa',
    title: 'Empresas',
    icon: Store,
    activeIcon: StoreActiveIcon,
    path: '(empresa)/empresa',
  },
]
