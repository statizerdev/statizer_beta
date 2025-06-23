'use client'

import { Separator } from "@/components/ui/separator"

export default function FeaturesPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Features</h1>
      <Separator className="mb-6 bg-white/10" />

      <div className="space-y-6 text-white/90">
        <div>
          <h2 className="text-xl font-semibold">🎧 Artist Statistics</h2>
          <p>
            Explore detailed Spotify artist statistics including follower count, popularity score, genres,
            biography, and social media profiles – all in one dashboard. Visual badges and smooth animations
            provide a clean, enjoyable experience.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">⚡ Real-Time Search with Shareable Links</h2>
          <p>
            Quickly search any artist and fetch real-time data directly from Spotify.
            Share your searches via unique, copyable links so others can instantly see the same statistics.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📂 Playlist Finder</h2>
          <p>
            Search playlists based on track names and discover which public Spotify playlists include your favorite songs.
            Load more results easily and explore directly on Spotify.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">🎵 Spotify Artist Embed</h2>
          <p>
            View a full Spotify artist player embedded directly in the artist profile, allowing you to listen to all released tracks
            without leaving the site.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📚 Search History</h2>
          <p>
            Quickly revisit your most recent searches with a handy local search history. Clear your history anytime.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">💡 Did You Know? Cards</h2>
          <p>
            Fun, rotating facts and tips about the music industry, artists, and Statizer – visible when no search is active.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📱 Simple & Beautiful UI</h2>
          <p>
            Built with modern UI libraries and designed for smooth performance. Statizer is fast, responsive, and easy to use across all devices.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">🔐 No Login Required</h2>
          <p>
            No account needed – just open the site and start exploring immediately.
          </p>
        </div>
      </div>
    </div>
  )
}
