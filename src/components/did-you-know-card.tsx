'use client'

import { useEffect, useState } from 'react'

const facts = [
  'The most streamed song on Spotify is "Blinding Lights" by The Weeknd.',
  'Spotify was founded in 2006 in Sweden.',
  'The longest song on Spotify is over 13 hours long.',
  'Spotify offers over 100 million tracks.',
  'The fastest song to reach 1 billion streams was "Shape of You" by Ed Sheeran.',
  'The most followed artist on Spotify is Taylor Swift.',
  'Spotify’s Discover Weekly algorithm updates every Monday with new suggestions.',
  'Over 60,000 new tracks are uploaded to Spotify every day.',
  'The Spotify Wrapped feature started in 2016 and has become a global end-of-year tradition.',
  'The most popular genre on Spotify globally is pop music.',
  'Spotify was originally invite-only when it launched in Europe.',
  'Spotify has over 500 million active users worldwide as of 2025.',
  'In 2015, Spotify introduced the "Running" feature, which adapted music tempo to your jogging pace.',
  'The artist with the most monthly listeners record is currently held by The Weeknd.',
  'Spotify’s name was randomly generated during a brainstorming session.'
]

export function DidYouKnowCard() {
  const [fact, setFact] = useState('')

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * facts.length)
    setFact(facts[randomIndex])
  }, [])

  return (
    <div className="p-6 bg-white/5 border border-white/10 shadow rounded-xl text-center">
      <h3 className="text-lg font-semibold mb-2">Did you know?</h3>
      <p className="text-sm text-white/80">{fact}</p>
    </div>
  )
}
