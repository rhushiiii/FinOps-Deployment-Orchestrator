import { LucideIcon } from 'lucide-react'

export interface NavItemProps {
  icon?: LucideIcon
  label: string
  active?: boolean
  badge?: string
  onClick?: () => void
}

export interface StatCardProps {
  icon: LucideIcon
  value: string
  label: string
  change: string
  changeColor?: string
}

export interface FeatureProps {
  icon: LucideIcon
  title: string
  description: string
}

export interface StatProps {
  value: string
  label: string
  change: string
}

export interface ServiceProps {
  name: string
  status: 'healthy' | 'warning' | 'error'
  lastCheck: string
}

export interface TimelineEventProps {
  time: string
  event: string
  type: 'info' | 'error' | 'critical'
}

export interface AuthModalProps {
  mode: 'signin' | 'signup'
  onClose: () => void
  onSwitchMode: (mode: 'signin' | 'signup') => void
}

export interface FormData {
  email: string
  password: string
  name: string
}
