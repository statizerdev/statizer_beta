'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import useSearchHistory from '@/hooks/useSearchHistory'
import { DidYouKnowCard } from '@/components/did-you-know-card'
import { Link as LinkIcon, Loader, Users } from 'lucide-react'


// Track ID kinyerő helper
function extractTrackId(spotifyLink: string) {
  const match = spotifyLink.match(/track\/([a-zA-Z0-9]+)/)
  return match ? match[1] : null
}

export default function PlaylistTrackerPage() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [playlists, setPlaylists] = useState<any[]>([])
  const [error, setError] = useState('')
  const [nextPage, setNextPage] = useState<string | null>(null)

  const handleSearch = async (url?: string) => {
    if (!query) return
    setLoading(true)
    setError('')
    setPlaylists([])

    try {
      let searchQuery = query

      if (query.includes('spotify.com/track')) {
        const trackId = extractTrackId(query)
        if (!trackId) {
          setError('Invalid Spotify track link.')
          setLoading(false)
          return
        }

        const trackRes = await fetch(`/api/spotify/track?id=${trackId}`)
        if (!trackRes.ok) {
          setError('Track not found.')
          setLoading(false)
          return
        }

        const trackData = await trackRes.json()
        searchQuery = trackData.name
      }

      const searchRes = await fetch(url || `/api/spotify/playlist-search?q=${encodeURIComponent(searchQuery)}`)
      if (!searchRes.ok) {
        setError('No playlists found.')
        setLoading(false)
        return
      }

      const searchData = await searchRes.json()
      setPlaylists(searchData.playlists.items)
      setNextPage(searchData.playlists.next)

    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    if (!nextPage) return
    setLoading(true)

    try {
      const res = await fetch(`/api/spotify/playlist-search?next=${encodeURIComponent(nextPage)}`)
      if (!res.ok) {
        setError('Error loading more playlists.')
        setLoading(false)
        return
      }

      const data = await res.json()
      setPlaylists(prev => [...prev, ...data.playlists.items])
      setNextPage(data.playlists.next)

    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Spotify Playlist Finder</h1>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <Input
          placeholder="Track link or track name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
          className="w-full md:w-80"
        />
        <Button onClick={() => handleSearch()} disabled={!query || loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {!playlists.length && !loading && (
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

      {playlists.length > 0 && (
        <div className="grid gap-4">
          {playlists
            .filter((playlist: any) => playlist && typeof playlist === 'object')
            .map((playlist: any, index: number) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {playlist.images && playlist.images.length > 0 ? (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name || 'Playlist'}
                    className="w-16 h-16 rounded object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded bg-white/10 flex items-center justify-center text-sm text-white/50">
                    No Image
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{playlist.name || 'Unknown Playlist'}</h2>
                  <p className="text-sm text-white/80">Owner: {playlist.owner?.display_name || 'Unknown'}</p>
                  <p className="text-sm text-white/80 flex items-center gap-1">
                    <Users size={14} /> {playlist.followers?.total?.toLocaleString() || '0'} followers
                  </p>
                </div>
                {playlist.external_urls?.spotify ? (
                  <a
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition"
                  >
                    <LinkIcon size={14} />
                    Spotify
                  </a>
                ) : (
                  <span className="text-sm text-white/50">No Link</span>
                )}
              </motion.div>
            ))}
        </div>
      )}

      {nextPage && (
        <div className="mt-6 flex justify-center">
          <Button onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  )
}
