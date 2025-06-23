'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import useSearchHistory from '@/hooks/useSearchHistory'
import CustomAudioPlayer from '@/components/CustomAudioPlayer'
import { DidYouKnowCard } from '@/components/did-you-know-card'
import { fetchSocialLinks } from '@/utils/fetchSocialLinks'
import fetchWikipediaSummary from '@/utils/fetchWikipediaSummary'
import { Link as LinkIcon, Loader, Share2 } from 'lucide-react'
import toast from 'react-hot-toast'

export const dynamic = 'force-dynamic'

export default function StatisticsPage() {
  const [artist, setArtist] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any | null>(null)
  const [error, setError] = useState('')
  const [socials, setSocials] = useState<string[]>([])
  const [bio, setBio] = useState('')

  const { history, addToHistory, clearHistory } = useSearchHistory()
  const searchParams = useSearchParams()
  

  // Shareable Search auto-load
  useEffect(() => {
    const artistParam = searchParams.get('artist')
    if (artistParam) {
      setArtist(artistParam)
      handleSearchFromParam(artistParam)
    }
  }, [searchParams])

  // Search from URL param
  const handleSearchFromParam = async (artistName: string) => {
    if (!artistName) return
    setLoading(true)
    setError('')
    setData(null)
    setSocials([])
    setBio('')

    try {
      const res = await fetch(`/api/spotify/artist?q=${encodeURIComponent(artistName)}`)
      if (!res.ok) {
        setError('Artist not found. Please try again.')
        setLoading(false)
        return
      }

      const result = await res.json()
      setData(result)

      const socials = await fetchSocialLinks(artistName)
      setSocials(socials)

      const summary = await fetchWikipediaSummary(result.name)
      if (summary) {
        setBio(summary)
      } else {
        setBio('No biography found.')
      }

    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Manual Search
  const handleSearch = async () => {
    if (!artist) return
    setLoading(true)
    setError('')
    setData(null)
    setSocials([])
    setBio('')

    try {
      const res = await fetch(`/api/spotify/artist?q=${encodeURIComponent(artist)}`)
      if (!res.ok) {
        setError('Artist not found. Please try again.')
        setLoading(false)
        return
      }

      const result = await res.json()
      setData(result)
      addToHistory(artist)

      const socials = await fetchSocialLinks(artist)
      setSocials(socials)

      const summary = await fetchWikipediaSummary(result.name)
      if (summary) {
        setBio(summary)
      } else {
        setBio('No biography found.')
      }

    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Share URL to clipboard
  const handleShare = () => {
    if (!artist) return
    const url = `${window.location.origin}/statistics?artist=${encodeURIComponent(artist)}`
    navigator.clipboard.writeText(url)
    toast.success('Search link copied to clipboard!')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Search for a Spotify Artist</h1>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <Input
          placeholder="Artist name e.g. Martin Garrix"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
          className="w-full md:w-80"
        />
        <Button onClick={handleSearch} disabled={!artist || loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
        {data && (
          <Button onClick={handleShare} variant="outline" className="flex items-center gap-2 text-black">
            <Share2 size={16} /> Share Search
          </Button>
        )}
      </div>

      {history.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Recent Searches</h2>
            <button onClick={clearHistory} className="text-sm text-zinc-400 hover:underline">Clear</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 rounded-full text-sm cursor-pointer hover:bg-white/20"
                onClick={() => { setArtist(item); handleSearch(); }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {!data && !loading && (
        <div className="mt-12">
          <DidYouKnowCard />
        </div>
      )}

      {error && <div className="text-red-500 mb-6">{error}</div>}

      {loading && (
        <div className="mb-6 flex justify-center items-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          >
            <Loader className="w-12 h-12 text-white" />
          </motion.div>
        </div>
      )}

      {data && (
        <div className="grid gap-4">

          {/* 1. Artist profile */}
          <motion.div
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={data.image} alt={data.name} className="w-16 h-16 rounded-full object-cover" />
            <h2 className="text-xl font-semibold">{data.name}</h2>
          </motion.div>

          {/* 2. Followers */}
          <motion.div
            className="p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg">Followers: {data.followers.toLocaleString()}</p>
          </motion.div>

          {/* 3. Popularity Score */}
          <motion.div
            className="p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-lg">Popularity Score: {data.popularity} / 100</p>
          </motion.div>

          {/* 4. Biography */}
          <motion.div
            className="p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg mb-2 font-semibold">Artist Biography:</p>
            <p className="text-sm text-white/80">{bio}</p>
          </motion.div>

          {/* 5. All Released Tracks */}
          <motion.div
            className="p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-lg mb-4 font-semibold">All Released Tracks:</p>
            <div className="overflow-hidden rounded-xl">
              <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/artist/${data.id}?utm_source=generator`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          {/* 6. Spotify Profile Link */}
          <motion.a
            href={`https://open.spotify.com/artist/${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md hover:bg-white/10 transition-all text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            View on Spotify →
          </motion.a>

          {/* 7. Social Links */}
          {socials.length > 0 && (
            <motion.div
              className="p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <p className="text-lg mb-2 font-semibold">Social Profiles:</p>
              <div className="flex flex-wrap gap-2">
                {socials.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition"
                  >
                    <LinkIcon size={14} />
                    {link.split('://')[1].split('/')[0]}
                  </a>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      )}
    </div>
  )
}
