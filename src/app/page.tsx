'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <main className="relative flex items-center justify-center min-h-screen bg-zinc-950 overflow-hidden px-4">

        {/* 🔳 Háttér logó halványan */}
        <Image
          src="/statizer-logo.png"
          alt="Statizer Logo"
          width={400}
          height={400}
          className="absolute z-0 opacity-5 blur-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        {/* 🧊 Hero doboz */}
        <motion.div
          className="relative z-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl p-8 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            All Your Artist Stats In One Place
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Discover real-time <strong className="text-white">artist statistics</strong> from platforms like <strong className="text-white">Spotify</strong> – instantly and without sign-up.
            <br />
            Let <strong className="text-white">Statizer</strong> help you understand your audience in just a few clicks.
          </motion.p>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <Link href="/dashboard">
              <button className="px-6 py-3 rounded-full bg-white/10 text-white font-medium border border-white/20 backdrop-blur-md shadow hover:bg-white/20 transition-all duration-300">
                Start Exploring →
              </button>
            </Link>
          </motion.div>

          <motion.p
            className="text-sm text-zinc-400 italic mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            Built for artists. Designed for data.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-white/90 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl">🎧</span>
              <span className="mt-2">Spotify insights</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">📊</span>
              <span className="mt-2">Detailed stats</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">⚡</span>
              <span className="mt-2">Clean, fast, intuitive</span>
            </div>
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
          >
            <button
              onClick={() => {
                const section = document.getElementById("features")
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              <ChevronDown className="mx-auto animate-bounce text-white/40 cursor-pointer" size={24} />
            </button>
          </motion.div>
        </motion.div>
      </main>

      {/* 🔽 "Why use Statizer?" szekció */}
      <section id="features" className="min-h-screen flex flex-col items-center justify-center px-4 py-24 bg-zinc-900 text-white text-center">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why use Statizer?</h2>
          <p className="text-lg text-zinc-400">
            Statizer gives you instant access to essential artist statistics across platforms like Spotify, with plans to integrate SoundCloud and YouTube Music soon. No sign-up needed – just search and explore.
          </p>
        </div>

        {/* 🎯 Use Cases szekció */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {[
            { icon: "🎤", title: "Artists", desc: "Track your Spotify reach and performance in real time." },
            { icon: "🧑‍💼", title: "Managers", desc: "Monitor and compare data across multiple artists quickly." },
            { icon: "🏷️", title: "Labels", desc: "Analyze engagement before signing new talent." },
          ].map((item, idx) => (
            <div key={idx} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-xl p-6 text-left hover:border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-zinc-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔼 Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 shadow-lg transition"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  )
}
