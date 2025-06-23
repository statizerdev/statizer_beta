'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  BarChart,
  Sparkles,
  Code,
  Menu,
  ChevronLeft,
  Wrench,
  Users,
  Compass,
  ListMusic
} from 'lucide-react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

const navSections = [
  {
    title: 'Dashboard',
    items: [
      { href: '/dashboard', label: 'Home', icon: Compass },
      { href: '/statistics', label: 'Statistics (Spotify)', icon: BarChart },
      { href: '/playlist-finder', label: 'Playlist Finder (Spotify)', icon: ListMusic},
      { href: '/features', label: 'Features', icon: Sparkles },
    ],
  },
  {
    title: 'News',
    items: [
      { href: '/changelog', label: 'Statizer News', icon: Code },
    ],
  },
  {
    title: 'Tools',
    items: [
      { href: '/tools', label: 'Tools', icon: Wrench },
    ],
  },
  {
    title: 'Our Partners',
    items: [
      { href: '/partners', label: 'Partners', icon: Users },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(false) // csak mobilon van hatással

  useEffect(() => {
    const stored = localStorage.getItem('isSidebarOpen')
    if (stored !== null) {
      setIsOpen(stored === 'true')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('isSidebarOpen', isOpen.toString())
  }, [isOpen])

  // Mobil nézet felismerése
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const handleMouseEnter = () => {
    if (!isMobile && !isLocked) {
      setIsOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile && !isLocked) {
      setIsOpen(false)
    }
  }

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex flex-col min-h-screen bg-zinc-900 text-white p-4 transition-all duration-300 shadow-md ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Toggle button (mobilon kötelező maradni) */}
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          setIsLocked(true) // Mobilon a manuális toggle lockolja a menüt
        }}
        className="mb-6 p-2 rounded hover:bg-zinc-800 transition-all"
      >
        {isOpen ? <ChevronLeft /> : <Menu />}
      </button>

      {/* Logo */}
      <div className="flex items-center justify-center mb-4">
        <Image
          src="/statizer-logo.png"
          alt="Statizer"
          width={isOpen ? 140 : 32}
          height={32}
          className="object-contain transition-all"
        />
      </div>

      {navSections.map((section, index) => (
        <div key={section.title} className="mb-4">
          {isOpen && (
            <div className="px-2 mb-2 text-xs font-semibold text-white/50 uppercase tracking-wide">
              {section.title}
            </div>
          )}
          <nav className="flex flex-col gap-1">
            {section.items.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 p-2 rounded transition-all hover:bg-zinc-800 ${pathname === href ? 'bg-zinc-800' : ''
                  }`}
              >
                <Icon className="w-5 h-5" />
                {isOpen && <span className="text-sm font-medium">{label}</span>}
              </Link>
            ))}
          </nav>
          {index < navSections.length - 1 && (
            <Separator className="my-2 bg-white/10" />
          )}
        </div>
      ))}
    </aside>
  )
}
