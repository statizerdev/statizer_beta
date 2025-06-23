export async function fetchSocialLinks(artistName: string) {
  const searchUrl = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artistName)}&fmt=json`

  try {
    const searchRes = await fetch(searchUrl)
    const searchData = await searchRes.json()

    if (!searchData.artists || searchData.artists.length === 0) return []

    const artistId = searchData.artists[0].id
    const detailUrl = `https://musicbrainz.org/ws/2/artist/${artistId}?inc=url-rels&fmt=json`

    const detailRes = await fetch(detailUrl)
    const detailData = await detailRes.json()

    const socials = detailData.relations
      .filter((rel: any) =>
        ['instagram.com', 'twitter.com', 'youtube.com', 'facebook.com'].some(domain =>
          rel.url.resource.includes(domain)
        )
      )
      .map((rel: any) => rel.url.resource)

    return socials
  } catch (error) {
    console.error('Error fetching social links:', error)
    return []
  }
}
