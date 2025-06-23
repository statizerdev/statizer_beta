// components/demo-card.tsx
'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export function DemoCard({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    toast.success('Email copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      onClick={handleCopy}
      className="cursor-pointer flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl transition hover:bg-white/10"
    >
      <div className="flex items-center gap-2 text-white/80 text-sm">
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span>{copied ? 'Copied!' : email}</span>
      </div>
    </div>
  )
}
