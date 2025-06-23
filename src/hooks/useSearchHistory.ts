'use client'

import { useEffect, useState } from 'react'

export default function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('statizer_search_history')
    if (stored) setHistory(JSON.parse(stored))
  }, [])

  const addToHistory = (artist: string) => {
    const updated = [artist, ...history.filter(item => item !== artist)].slice(0, 5)
    setHistory(updated)
    localStorage.setItem('statizer_search_history', JSON.stringify(updated))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('statizer_search_history')
  }

  return { history, addToHistory, clearHistory }
}
