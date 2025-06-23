import { NextRequest, NextResponse } from 'next/server'
import { getSpotifyToken } from '@/utils/getSpotifyToken'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing track ID' }, { status: 400 })
  }

  const token = await getSpotifyToken()
  if (!token) {
    return NextResponse.json({ error: 'Failed to get Spotify token' }, { status: 500 })
  }

  try {
    const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Track not found' }, { status: 404 })
    }

    const track = await res.json()

    return NextResponse.json({
      name: track.name,
      artists: track.artists.map((a: any) => a.name).join(', '),
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
