'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

export default function ChangelogPage() {
  const [activeTab, setActiveTab] = useState('v0.1')

  return (
    <main className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Changelog</h1>
      <Separator className="mb-6 bg-white/10" />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="v0.1">v0.1</TabsTrigger>
          <TabsTrigger value="v0.2">v0.2</TabsTrigger>
        </TabsList>

        {/* v0.1 tab */}
        <TabsContent value="v0.1">
          <div className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10 shadow-md backdrop-blur-md">
            <h2 className="text-2xl font-semibold">
              v0.1 <span className="text-sm text-zinc-400">(Released: 2025.06.23)</span>
            </h2>

            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>🔍 <strong>Spotify artist search UI</strong> + backend integration via Spotify API</li>
              <li>⚡ <strong>Enter key search trigger</strong> on the statistics page</li>
              <li>📂 <strong>Local search history</strong> with instant click-to-search</li>
              <li>🔗 <strong>Shareable searches</strong> via unique, copyable URLs</li>
              <li>🎯 <strong>Detailed search results:</strong>
                <ul className="list-disc list-inside ml-5 mt-1 text-white/60">
                  <li>Followers count badge</li>
                  <li>Popularity score badge</li>
                  <li>Genre badges</li>
                  <li>Spotify artist embed (all released tracks)</li>
                  <li>Artist biography fetched from Wikipedia</li>
                  <li>Social links via Musicbrainz API</li>
                </ul>
              </li>
              <li>📂 <strong>Playlist Finder tool</strong> – discover playlists containing your favorite tracks</li>
              <li>💡 <strong>Did You Know? cards</strong> shown when no search is active</li>
              <li>📃 <strong>Features page redesign</strong> with detailed functionality descriptions</li>
              <li>🌙 <strong>Dark theme UI polish</strong>: glassmorphism, smooth animations, hover effects, consistent typography</li>
            </ul>
          </div>
        </TabsContent>

        {/* v0.2 tab */}
        <TabsContent value="v0.2">
          <div className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10 shadow-md backdrop-blur-md">
            <h2 className="text-2xl font-semibold">
              v0.2 <span className="text-sm text-zinc-400">(Planned release: 2025.06.29)</span>
            </h2>

            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>🎵 <strong>New Audio Features tool</strong> for track analysis</li>
              <li>🎯 <strong>Audio Features Search Page</strong> – search tracks by name with clickable results</li>
              <li>📊 <strong>Audio Features Detail Page</strong> with:
                <ul className="list-disc list-inside ml-5 mt-1 text-white/60">
                  <li>Track artwork, title, artist, Spotify link</li>
                  <li>BPM (tempo), Key (Camelot notation), Danceability, Energy, Valence</li>
                  <li>Additional audio features: Acousticness, Instrumentalness, Liveness</li>
                  <li>Colorful badge-based visualization</li>
                </ul>
              </li>
              <li>🚀 Foundation for future upgrades: recommendations, graph-based stats, release timeline</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
