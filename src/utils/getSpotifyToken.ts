export async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    if (!res.ok) {
      console.error('Failed to get Spotify token')
      return null
    }

    const data = await res.json()
    return data.access_token
  } catch (error) {
    console.error('Error fetching Spotify token', error)
    return null
  }
}
