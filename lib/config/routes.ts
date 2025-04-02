import {
  BellActiveIcon,
  HouseActiveIcon,
  SearchActiveIcon,
  UserActiveIcon,
  WalletActiveIcon,
} from 'assets/icons/index'
import {
  Bell,
  House,
  Search,
  User,
  Wallet,
  type LucideIcon,
} from 'lucide-react-native'
import { FC } from 'react'
import type { SvgProps } from 'react-native-svg'

interface Route {
  path: string
  name: string
  icon: LucideIcon
  activeIcon: FC<SvgProps>
}

export const CLIENT_ROUTES: Route[] = [
  {
    name: 'Meu Status',
    icon: User,
    activeIcon: UserActiveIcon,
    path: '(cliente)/meu-status',
  },
  {
    name: 'Pagamento',
    icon: Wallet,
    activeIcon: WalletActiveIcon,
    path: '(cliente)/pagamento',
  },
  {
    name: 'Início',
    icon: House,
    activeIcon: HouseActiveIcon,
    path: '(cliente)',
  },
  {
    name: 'Empresas',
    icon: Search,
    activeIcon: SearchActiveIcon,
    path: '(cliente)/empresas',
  },
  {
    name: 'Notificações',
    icon: Bell,
    activeIcon: BellActiveIcon,
    path: '(cliente)/notificacoes',
  },
]
