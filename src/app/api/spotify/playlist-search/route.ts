import { NextRequest, NextResponse } from 'next/server'
import { getSpotifyToken } from '@/utils/getSpotifyToken'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')
  const next = searchParams.get('next')

  if (!q && !next) {
    return NextResponse.json({ error: 'Missing search query or next page URL' }, { status: 400 })
  }

  const token = await getSpotifyToken()
  if (!token) {
    return NextResponse.json({ error: 'Failed to get Spotify token' }, { status: 500 })
  }

  const url = next
    ? decodeURIComponent(next)
    : `https://api.spotify.com/v1/search?q=${encodeURIComponent(q!)}&type=playlist&limit=20`

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Error fetching playlists' }, { status: 500 })
    }

    const data = await res.json()

    return NextResponse.json({
      playlists: data.playlists,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
