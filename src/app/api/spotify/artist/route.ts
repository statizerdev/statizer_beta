import { NextResponse } from 'next/server'

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

let accessToken = ''
let tokenExpiresAt = 0

async function getSpotifyToken() {
  if (Date.now() < tokenExpiresAt && accessToken) {
    return accessToken
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  const data = await response.json()
  accessToken = data.access_token
  tokenExpiresAt = Date.now() + (data.expires_in * 1000) - 60000

  return accessToken
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Missing search query' }, { status: 400 })
  }

  try {
    const token = await getSpotifyToken()

    const artistRes = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=1`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    const artistData = await artistRes.json()
    const artist = artistData.artists.items[0]

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
    }

    const tracksRes = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    const tracksData = await tracksRes.json()

    return NextResponse.json({
      id: artist.id,
      name: artist.name,
      image: artist.images[0]?.url || null,
      followers: artist.followers.total,
      popularity: artist.popularity,
      genres: artist.genres,         
      topTracks: tracksData.tracks.map((track: any) => ({
        name: track.name,
        url: track.external_urls.spotify,
        image: track.album.images[0]?.url || null,
      })),
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
