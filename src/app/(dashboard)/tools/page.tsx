'use client'

import { BadgeCheck } from 'lucide-react'
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"

const tools = [
  {
    name: 'MakeItWav',
    description: 'Convert YouTube videos to high-quality WAV files instantly with accurate filenames.',
    link: 'https://makeitwav.vercel.app', 
  },
  {
    name: 'CoverFinder',
    description: 'Find the best album or single cover arts directly using AI-powered search.',
    link: 'https://coverfinder-app.vercel.app', 
  },
]

export default function ToolsPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Our Tools</h1>
             <Separator className="mb-6 bg-white/10" />
      <div className="grid gap-8 md:grid-cols-2">
        {tools.map((tool, index) => (
          <Link
            key={index}
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 shadow-xl p-6 backdrop-blur-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <BadgeCheck className="w-6 h-6 text-sky-400 transition-transform group-hover:scale-110" />
              <h2 className="text-xl font-semibold">{tool.name}</h2>
            </div>
            <p className="text-sm text-white/80">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
