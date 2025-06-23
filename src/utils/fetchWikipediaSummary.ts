export default async function fetchWikipediaSummary(artistName: string) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(artistName)}`
    )

    if (!res.ok) return null

    const data = await res.json()

    if (data.extract) {
      return data.extract
    } else {
      return null
    }
  } catch (error) {
    console.error('Wikipedia fetch error:', error)
    return null
  }
}
