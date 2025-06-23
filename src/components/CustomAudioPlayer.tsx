'use client'

import { useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'

interface CustomAudioPlayerProps {
  previewUrl: string
}

export default function CustomAudioPlayer({ previewUrl }: CustomAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={togglePlay} className="p-2 bg-white/10 rounded hover:bg-white/20 transition">
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <audio ref={audioRef} src={previewUrl} onEnded={() => setIsPlaying(false)} />
      <span className="text-sm text-white/80">{isPlaying ? 'Playing Preview' : 'Track Preview'}</span>
    </div>
  )
}
