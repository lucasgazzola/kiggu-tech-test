'use client'

import { toast } from 'sonner'

type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning'

interface ToastOptions {
  type?: ToastType
  title?: string
  description?: string
  duration?: number
}

export default function useToast() {
  function showToast(options: ToastOptions) {
    const { type = 'default', title, description, duration } = options
    switch (type) {
      case 'success':
        toast.success(title || '', { description, duration })
        break
      case 'error':
        toast.error(title || '', { description, duration })
        break
      case 'info':
        toast.info(title || '', { description, duration })
        break
      case 'warning':
        toast.warning(title || '', { description, duration })
        break
      default:
        toast(title || '', { description, duration })
    }
  }

  return { toast: showToast }
}
