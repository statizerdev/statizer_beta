'use client'

import { motion } from 'framer-motion'
import { Search, LayoutDashboard, Wrench, Newspaper, ListMusic, Users } from 'lucide-react'
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to Statizer</h1>
      <p className="text-zinc-400 mb-10">
        Your central hub for artist insights, tools, and smart discovery.
      </p>
      <Separator className="mb-6 bg-white/10" />
      <div className="grid md:grid-cols-2 gap-6">

        {/* 🔍 Quick Search */}
        <motion.div
          className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-md backdrop-blur-md hover:bg-white/10 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <Search className="w-6 h-6 text-white/80" />
            <h2 className="text-lg font-semibold">Quick Search</h2>
          </div>
          <p className="text-sm text-white/70 mb-2">
            Instantly find artist profiles and discover their most recent performance metrics.
          </p>
          <Link href="/statistics" className="text-sm text-sky-400 hover:underline">
            Go to Search →
          </Link>
        </motion.div>

        {/* 📊 Your Dashboard */}
        <motion.div
          className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-md backdrop-blur-md hover:bg-white/10 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <LayoutDashboard className="w-6 h-6 text-white/80" />
            <h2 className="text-lg font-semibold">Your Dashboard</h2>
          </div>
          <p className="text-sm text-white/70 mb-2">
            Access key artist insights, genre stats, and label metrics – all in one place.
          </p>
          <Link href="/features" className="text-sm text-sky-400 hover:underline">
            Learn More →
          </Link>
        </motion.div>

        {/* 🛠️ Tools */}
        <motion.div
          className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-md backdrop-blur-md hover:bg-white/10 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <Wrench className="w-6 h-6 text-white/80" />
            <h2 className="text-lg font-semibold">Tools</h2>
          </div>
          <p className="text-sm text-white/70 mb-2">
            Export data, embed previews, or manage label-level insights — more tools coming soon.
          </p>
          <Link href="/tools" className="text-sm text-sky-400 hover:underline">
            Open Tools →
          </Link>
        </motion.div>

        {/* 📰 Statizer News */}
        <motion.div
          className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-md backdrop-blur-md hover:bg-white/10 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <Newspaper className="w-6 h-6 text-white/80" />
            <h2 className="text-lg font-semibold">Statizer News</h2>
          </div>
          <p className="text-sm text-white/70 mb-2">
            Get to know our latest updates on Statizer. Stay informed about new features and improvements.
          </p>
          <Link href="/changelog" className="text-sm text-sky-400 hover:underline">
            View Changelog →
          </Link>
        </motion.div>

        {/* 🎵 Playlist Finder */}
        <motion.div
          className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-md backdrop-blur-md hover:bg-white/10 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <ListMusic className="w-6 h-6 text-white/80" />
            <h2 className="text-lg font-semibold">Playlist Finder</h2>
          </div>
          <p className="text-sm text-white/70 mb-2">
            Search Spotify playlists by track name and discover which playlists include your favorite songs.
          </p>
          <Link href="/playlist-finder" className="text-sm text-sky-400 hover:underline">
            Open Playlist Finder →
          </Link>
        </motion.div>

        {/* 🤝 Our Partners */}
        <motion.div
          className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-md backdrop-blur-md hover:bg-white/10 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <Users className="w-6 h-6 text-white/80" />
            <h2 className="text-lg font-semibold">Our Partners</h2>
          </div>
          <p className="text-sm text-white/70 mb-2">
            Discover our music partners including Euphonix and INVIBES. Connect, collaborate, and explore demos.
          </p>
          <Link href="/partners" className="text-sm text-sky-400 hover:underline">
            View Partners →
          </Link>
        </motion.div>

      </div>
    </main>
  )
}
